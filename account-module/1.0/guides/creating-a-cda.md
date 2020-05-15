# Creating a conditional deposit address

**When creating a conditional deposit address, you can set the conditions in which it is considered active or expired. This topic walks you through those options to help you decide which conditions to set.**

## Condition combination reference

Use this table as a quick reference for choosing your conditions.

|  **Combination of fields** | **Withdrawal conditions**
| :----------| :----------|
|`timeout_at` (required) |The CDA can be used in withdrawals as long as it contains IOTA tokens|
|`timeout_at` and `multi_use` (recommended) |The CDA can be used in withdrawals as soon as it expires, regardless of how many deposits were made to it|
|`timeout_at` and `expected_amount` (recommended) | The CDA can be used in withdrawals as soon as it contain the expected amount|

## Setting an expiry time

When you create a CDA, you must specify the `timeout_at` field to define at what point it will expire.

The expiry time that you choose depends on how fast you expect the depositor to make a deposit. If you are in direct contact with the depositor and you are both waiting to settle the transfer, you can specify a shorter timeout. If you're not sure who the depositor is, for example if the CDA is used for accepting donations, you can specify a longer timeout.

:::info
If a CDA is created with only the `timeout_at` field, it can be used in withdrawals as soon as it has a non-zero balance even if it hasn't expired. Therefore, to avoid withdrawing from a spent address, we recommend allowing more than one deposit or setting a balance limit whenever possible.
:::

## Allowing more than one deposit

To keep your CDA active after it receives a deposit, you can set the `multi_use` field to true.

One scenario for `multi_use` CDAs is sharing a donation address in an application. In this scenario, you can receive more than one deposit and you can refresh the CDA in the application each time the CDA is 72 hours before its `timeout_at` value runs out. This gives depositors enough time to finalize the payments they may have sent before you refreshed the CDA.

We recommend that you allow more than one deposit when the following conditions are true:

- You expect multiple payments from more than one depositor
- When you cannot share a CDA with the a balance limit for each depositor

## Setting a balance limit

To make sure your CDA expires when it receives a certain amount of IOTA tokens, you can set the amount in the `expected_amount` field.

You should set this field when the value of the deposit is clear from both the depositor's and the receiver's point of view. For example, when you want to withdraw from an exchange, you can give the exchange a CDA with the expected amount that you want to withdraw.

