# Create and manage conditional deposit addresses

**To send and receive transactions in an account, you must use conditional deposit addresses (CDA), which are special addresses that allow you to specify the conditions in which they are active and may be used for withdrawls and deposits.**

Accounts use CDAs to avoid address reuse. Without CDAs, recipients have no way of knowing whether a sender is about to debit an address before they credit it. With CDAs, recipients can create an address that expires after a certain time, allowing senders to make a judgement about whether to make a deposit. If senders aren't sure if a bundle will confirm in time, they can ask the recipient for another CDA.

**Note:** CDAs can be used only in an account and not in the generic client library methods. As a result, both you and the sender must have an account to be able to use CDAs.

CDAs can be in either an active or expired state. Active addresses are part of the seed state, so they may not be used in withdrawals, but may be sent deposits. Expired addresses are removed from the seed state, so they may be used in withdrawals, but may not be sent deposits.

The workflow of a CDA should be the following:

1. You create a CDA
2. You send the CDA to a depositor
3. Based on the address's state, the depositor must decide whether a bundle will be confirmed in the given timeframe. If depositors decide the timeframe is too small, they should request a new CDA.

## Create a CDA

To create a CDA you specify the following conditions, which are used to determine if it's active or expired:

* **address (required):** An address
* **timeout_at (required):** The time at which the address expires
**multi_use (optional):** A boolean that specifies if the address may be sent more than one deposit
**expected_amount (optional):** The amount of IOTA tokens that the address is expected to contain. When this amount is reached, the address is considered expired.

The combination of fields that you use to create a CDA determines if it can be used in withdrawals.

|  **Combination of fields** | **Withdrawal conditions**
| :----------| :----------|
|`timeout_at` |The CDA can used in withdrawals as long as it contains IOTA tokens|
|`timeout_at` and `multi_use` |The CDA can be used in withdrawals as soon as it expires, regardless of how many deposits were made to it. |
|`timeout_at` and `expected_amount`| The CDA can be used in withdrawals as soon as it contain the expected amount|
|`timeout_at`, `multi_use`, and `expected_amount` (recommended) |The CDA can be used in withdrawals as soon as it contains the expected amount (or more) of IOTA tokens |

**Important:** If a CDA was created with only the `timeout_at` field, it can be used in withdrawals as soon as it has a non-zero balance even if it hasn't expired. Therefore, to avoid address reuse, we recommend creating CDAs with the `multi_use` field, even if only one deposit is expected to arrive at an address.

## Distribute a CDA

Because CDAs are descriptive objects, you can serialize them into any format and distribute them. For example, you can create a magnet-link for a CDA, with a `timeout_at`, `multi_use` and the `expected_amount` parameters.

```json
iota://MBREWACWIPRFJRDYYHAAME…AMOIDZCYKW/?timeout_at=1548337187&multi_use=true&expected_amount=0
```
