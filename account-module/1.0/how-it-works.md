# How the account module works

**The account module allows you to build an account object that keeps track of your seed state in a local database.**

To see your seed state, you can export it, allowing you to back it up and/or import it into another account.

These are examples of exported seed states in Go, Java, and JavaScript:

--------------------
### Go
```json
{
    // The ID of the account.
    // The account's ID is the hash of the account's address with index 0 and security level 2
    "id":"9KYMSUEUSOVQN9CPOHVHRNSYTZGBHTWYWR9LGJGYATUMQVNYFQXTEOLEMEACONMAR9AELKPVRCMGQ9MMD",
    // The date that the seed state was exported
    "date":"2019-12-09T11:32:25.1705032Z",
    // The last key index that was used to generate the addresses.
    // This allows the account to make sure it generates a new address
    "key_index":2,
    // Active addresses, their conditions, and their security levels.
    // These allow the account to prevent withdrawals from addresses that may still receive deposits
    "deposit_addresses":{
        "1":{
            "timeout_at":"2019-12-10T11:29:02.23687483Z",
            "multi_use":true,
            "security_level":2
        },
        "2":{
            "timeout_at":"2019-12-10T11:32:09.549810701Z",
            "multi_use":true,
            "security_level":3
        }
    },
    // Trytes of any pending transfer bundles.
    // These allow the account to monitor pending transactions and rebroadcast or reattach them if necessary
    "pending_transfers":{}
}
```
---
### Java
```json
{
    // The date that the seed state was exported
    "exportedDate":1575890827622,
    // The ID of the account.
    // The account's ID is the hash of the account's address with index 0 and security level 2
    "id":"NJJHM9IKUAK9DF9B9WIHYSGQPLOPMJYEWXOYXN9BHCTCLLQKGYFDKFDWNYSQJLFFMJCABVDMG9S9DH9FY",
    "state":{
        // The last key index that was used to generate the addresses.
        // This allows the account to make sure it generates a new address
        "keyIndex":2,
        // Active addresses, their conditions, and their security levels.
        // These allow the account to prevent withdrawals from addresses that may still receive deposits
        "depositRequests":{
            "0":{
                "request":{
                    "timeOut":1575977014862,
                    "multiUse":true,
                    "expectedAmount":0
                    },
                "securityLevel":2
            },
            "1":{
                "request":{
                    "timeOut":1575977051855,
                    "multiUse":true,
                    "expectedAmount":0
                    },
                "securityLevel":3
            }
        },
    // Trytes of any pending transfer bundles.
    // These allow the account to monitor pending transactions and rebroadcast or reattach them if necessary
    "pendingTransfers":{},
    // Whether the account is new (no generated addresses)
    "new":false
    }
}
```
---
### JavaScript
```json
{
    // The last key index that was used to generate the addresses.
    // This allows the account to make sure it generates a new address
    "lastKeyIndex": 2,
    // Active addresses, their conditions, and their security levels.
    // These allow the account to prevent withdrawals from addresses that may still receive deposits
    "deposits":[
        {
            "address":"RDRPSRBQPEJFRXXJYOUF9AZKAWOSHKZFDOMXJQHLOFAOMVPTQEKDKDKTKQJQ9QKGQHSJGQQZCHTAVCLUW",
            "index":2,
            "security":3,
            "timeoutAt":1575974515544,
            "multiUse":false,
            "expectedAmount":0
        },
        {
            "address":"YDXSBOKPKVXLCSGAGBLY9XGPQQFHEWDNQIHTXIHIKQGEYVU9RBUPE9GRZMPXNLDRBUZTDOQFF9NIASMYC",
            "index":1,
            "security":2,
            "timeoutAt":1575974481246,
            "multiUse":false,
            "expectedAmount":0
        }],
    // Trytes of any pending transfer bundles.
    // These allow the account to monitor pending transactions and rebroadcast or reattach them if necessary
    "withdrawals":[]
}
```
--------------------

## Conditional deposit addresses

One of the many benefits of using accounts is that you can define conditions in which your addresses are active or expired. These conditions help senders to decide whether it's safe to send tokens to an address. For this reason, addresses in accounts are called _conditional deposit addresses_ (CDA).

Accounts use CDAs to help reduce the risk of withdrawing from [spent addresses](root://getting-started/0.1/clients/addresses.md#spent-addresses). When you request IOTA tokens from someone, you can create a CDA that's active for a certain period of time. This way, you let the sender know that you intend to withdraw from that address only after that time. As a result, the sender can decide whether to make a deposit, depending on how much time is left on a CDA.

### Conditions of a CDA

When you create a CDA, you must specify the `timeout_at` field to define whether it's active or expired.

You can also specify one of the following recommended fields:

- **multi_use (recommended):** A boolean that specifies if the address may receive more than one deposit.
- **expected_amount (recommended):** The amount of IOTA tokens that the address is expected to receive. When the address contains this amount, it's considered expired. We recommend specifying this condition.

|  **Combination of fields** | **Withdrawal conditions**
| :----------| :----------|
|`timeout_at` |The CDA can be used in withdrawals as long as it contains IOTA tokens|
|`timeout_at` and `multi_use` (recommended) |The CDA can be used in withdrawals as soon as it expires, regardless of how many deposits were made to it|
|`timeout_at` and `expected_amount` (recommended) | The CDA can be used in withdrawals as soon as it contain the expected amount|

:::warning:Warning
If a CDA was created with only the `timeout_at` field, it can be used in withdrawals as soon as it has a non-zero balance even if it hasn't expired. Therefore, to avoid withdrawing from a spent address, we recommend creating CDAs with either the `multi_use` field or with the `expected_amount` field whenever possible.
:::

### Advice for creating CDAs

When creating a CDA, you should consider the following questions.

#### How long should you specify in a CDA's timeout?

The value that you specify in the `timeout_at` field depends on how fast you expect the depositor to make a deposit. If you are in direct contact with the depositor and you are both waiting to settle the transfer, you can specify a shorter timeout.

:::danger:Important
If a CDA was created with only the `timeout_at` field, it can be used in outgoing payments as soon as it has a non-zero balance even if it hasn't expired. So, to avoid withdrawing from a spent address, we recommend creating CDAs with either the `multi_use` field or with the `expected_amount` field whenever possible.
:::

#### When should you create a multi-use CDA?

We recommend that you use multi-use CDAs when the following conditions are true:

- You expect multiple payments of arbitrary value from multiple depositors.
- You fully control the creation and sharing of the CDA, for example on your website.
- When you cannot share a CDA with the `expected_amount` field value set with each depositor individually.

Or when communicating with depositors who reliably request a new CDA when the `timeout_at` field value is running out.

One scenario for `multi_use` CDA addresses is sharing a donation address on a website or other digital medium, such as a screen. In this scenario, you can receive multiple deposits of arbitrary value and you fully control the sharing of the CDA. You can refresh the CDA on the website or screen each time the CDA is 72 hours before its `timeout_at` value runs out. This gives depositors enough time to finalize the payments they may have sent before you refreshed the CDA.

#### When should you create a CDA with an expected amount?

You should specify the value of the `expected_amount` field when the value of the deposit is clear from both the depositor's and the receiver's point of view. For example, when you want to withdraw from an exchange, you can give the exchange a CDA with the expected amount that you want to withdraw.