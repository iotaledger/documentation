# Conditional deposit addresss FAQ

## How long should I specify in a CDA's timeout?

The value that you specify in the `timeout_at` field depends on how fast you expect the depositor to make a deposit. If you are in direct contact with the depositor and you are both waiting to settle the transfer, you can specify a short timeout.

**Important:** If a CDA was created with only the `timeout_at` field, it can be used in withdrawals as soon as it has a non-zero balance even if it hasn't expired. Therefore, to avoid address reuse, we recommend creating CDAs with the `multi use` field, even if only one deposit is expected to arrive at an address.

## When should I create a multi-use CDA?

We recommend that you always create a multi-use CDA.

## When should I create a CDA with an expected amount?

You should specify the value of the `expected_amount` field when the value of the deposit is clear from both the depositor's and the receiver's point of views. For example, when you want to withdraw from an exchange. You can give a CDA with an expected amount to the exchange.