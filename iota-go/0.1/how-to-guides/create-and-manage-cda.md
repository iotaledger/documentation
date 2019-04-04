# Create and manage conditional deposit addresses

**When you want to deposit IOTA tokens into an account, you must use conditional deposit addresses (CDA), which are special addresses that allow you to specify the conditions in which they are active and may be used for withdrawls and deposits.**

Accounts use CDAs to avoid [address reuse](root://iota-basics/0.1/concepts/addresses-and-signatures.md#address-reuse). In a stateless client library without CDAs, depositors have no way of knowing whether a recipient is about to withdraw from an address before they deposit into it. If this were to happen, the recipient's address would contain IOTA tokens that would be unsafe to withdraw. With CDAs, recipients can create an address that expires after a certain time, allowing a depositor to make a judgement about whether it's safe to deposit into it. If depositors aren't sure if a bundle will confirm in time, they can ask the recipient for another CDA.

:::info:
CDAs can be used only in an account and not in the stateless client libraries. As a result, both you and the sender must have an account to be able to use CDAs.
:::

CDAs can be in either an active or expired state. Active CDAs are part of the seed state. You can't withdraw from active CDAs, but depositors may deposit into them. Expired addresses are removed from the seed state. You may withdraw from expired CDAs, but depositors can't deposit tokens into them.

As a recipient, the process of transferring IOTA tokens to a CDA should be something like the following:

1. You create a CDA
2. You send the CDA to a depositor
3. The depositor decides whether a bundle will be confirmed in the given CDA's timeframe
4. The depositor either requests a new CDA from you or deposits tokens into your CDA

## Create a new CDA

To create a CDA, you specify the following conditions to determine whether it's active or expired:

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


1. Store the current time from your account's timesource object

    ```go
    // get current time
    now, err := timesource.Time()
    handleErr(err)
    ```

2. Define an expiration time for the CDA

    ```go
    // define the time after which the CDA expires
    // (in this case after 2 hours)
    now = now.Add(time.Duration(2) * time.Hour)
    ```

3. Create a new multi-use CDA with an expiration time

    ```go
    // allocate a new deposit address with timeout conditions.
    conditions := &deposit.Request{TimeoutAt: &now, MultiUse: true}
    cda, err := acc.AllocateDepositRequest(conditions)
    handleErr(err)
    ```

## Distribute a CDA

Because CDAs are descriptive objects, you can serialize them into any format and distribute them. For example, you can create a magnet-link for a CDA, with the `timeout_at`, `multi_use`, and `expected_amount` parameters.

1. To serialize the CDA into a magent link, use the `AsMagnetLink()` method of the CDA object

    ```go
    fmt.Println(cda.AsMagnetLink())
    // iota://MBREWACWIPRFJRDYYHAAME…AMOIDZCYKW/?timeout_at=1548337187&multi_use=true&expected_amount=0
    ```

2. To parse the magnet link into a CDA, use the `ParseMagnetLink()` method of the `deposit` object

    ```go
    cda, err := deposit.ParseMagnetLink(cdaMagnetLink)
    handleErr(err)
    ```

## Decide whether to make a deposit into a CDA

A CDA may expire during the time it takes for a bundle to be created, sent, and confirmed. Therefore, before making a deposit into a CDA, you may want to create an oracle that can return a decision about whether to deposit into it.

### Create an oracle

In this example, the `sendOracle` object will return true only if the current time is at least 30 minutes before the end of the CDA's timeout. These 30 minutes give the bundle time to be sent and confirmed.

```go
threshold := time.Duration(30)*time.Minute
// timeDecider is an OracleSource
timeDecider := oracle_time.NewTimeDecider(timesource, threshold)
// we create a new SendOracle with the given OracleSources
sendOracle := oracle.New(timeDecider)
```

### Call an oracle

To call an oracle, pass the CDA to the `OkToSend()` method of the `sendOracle` object

```go
// Ask the SendOracle whether we should make a deposit
ok, info, err := sendOracle.OkToSend(CDA)
handleErr(err)
if !ok {
    logger.Error("won't send transaction:", info)
    return
}

// Send the bundle that makes the deposit
// In thid case, we assume that an expected amount was set in the CDA
// and therefore the transfer is initialized with that amount.
bndl, err = acc.Send(cda.AsTransfers())
handleErr(err)

fmt.Printf("Made deposit into %s in the bundle with the following tail transaction hash %s\n", cda.Address, bndl[0].Hash)
```
