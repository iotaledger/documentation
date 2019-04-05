# Send and receive transactions

**To send and receive transactions in an account, you must use conditional deposit addresses (CDA). CDAs are special addresses that allow you to specify the conditions in which they may be used in account withdrawls and deposits.**

Accounts use CDAs to avoid address reuse. Without CDAs, recipients have no way of knowing whether a sender is about to withdraw tokens from an address before they deposit tokens into it. With CDAs, recipients can create an address that expires after a certain time, allowing senders to make a judgement about whether to deposit tokens into it. If senders aren't sure if a bundle will confirm in time, they can ask the recipient for another CDA.

:::info:
CDAs can be used only in an account and not in the generic [client library methods](root://client-libraries/0.1/introduction/overview.md). As a result, both you and the sender must have an account to be able to use CDAs.
:::

CDAs can be in either an active or expired state. Active addresses are part of the seed state, so you can't withdraw tokens from them, but depositors can deposit tokens into them. Expired addresses are removed from the seed state, so you can withdraw tokens from them, but depositors can't deposit tokens into them.

The workflow of a CDA should be the following:

1. You create a CDA
2. You send the CDA to a depositor
3. Based on the address's state, the depositor must decide whether a bundle will be confirmed in the given timeframe. If depositors decide the timeframe is too small, they should request a new CDA.

## Create a CDA

To create a CDA you specify the following conditions, which are used to determine if it's active or expired:

* **address (required):** An address
* **timeout_at (required):** The time at which the address expires
* **multi_use (recommended):** A boolean that specifies if the address may be sent more than one deposit
* **expected_amount (recommended):** The amount of IOTA tokens that the address is expected to contain. When this amount is reached, the address is considered expired. We highly recommend using this condition.

The combination of fields that you use to create a CDA determines if it can be used in withdrawals.

|  **Combination of fields** | **Withdrawal conditions**
| :----------| :----------|
|`timeout_at` |The CDA can used in withdrawals as long as it contains IOTA tokens|
|`timeout_at` and `multi_use` |The CDA can be used in withdrawals as soon as it expires, regardless of how many deposits were made to it. |
|`timeout_at` and `expected_amount`| The CDA can be used in withdrawals as soon as it contain the expected amount|
|`timeout_at`, `multi_use`, and `expected_amount` (recommended) |The CDA can be used in withdrawals as soon as it contains the expected amount (or more) of IOTA tokens |

:::warning:Warning
If a CDA was created with only the `timeout_at` field, it can be used in withdrawals as soon as it has a non-zero balance even if it hasn't expired.

To avoid address reuse, we recommend creating CDAs with the `multi_use` field, even if only one deposit is expected to arrive at an address.
:::

1. Define an expiration time for the CDA
  
    ```java
    // define the time after which the CDA expires
    // (in this case after 1 hour)
    Date hour = new Date(System.currentTimeMillis() + 1000 * 60 * 60);
    ```

2. Create a new multi-use CDA with an expiration time

    ```java
    Future<ConditionalDepositAddress> cda = account.newDepositAddress(hour, true, 1000);
    ```

## Distribute a CDA

Because CDAs are descriptive objects, you can serialize them into any format and distribute them. For example, you can create a magnet-link for a CDA, with the `timeout_at`, `multi_use`, and `expected_amount` parameters.

```json
iota://MBREWACWIPRFJRDYYHAAME…AMOIDZCYKW/?timeout_at=1548337187&multi_use=true&expected_amount=10000000
```

1. To serialize a CDA to a magnet link, do the following:

    ```java
    String magnet = DepositFactory.get().build(cda.get(), MagnetMethod.class);
    
    System.out.println(magnet);
    // iota://YWEQLREFJQORXXKKEBBBDKOPAXHXJRGVPBUTBJFSRPPYVWWYUWSBDJTIUBJVFREXEAUZWRICKH9VBSQE9KPNLTCLNC/?timeout_at=1554472983208&multi_use=false&expected_amount=10000000
    ```

## Deposit IOTA tokens into a CDA

1. After making sure that the CDA is still active, you can use the `sendToCDA()` method to deposit IOTA tokens into it

    ```java
    String addressWithChecksum = "SEED...99999";
    Long expectedAmount = 10000000;
    Future<Bundle> bundle = account.send(
            addressWithChecksum, 
            expectedAmount, 
            Optional.of("Hello world!"), Optional.of("AWESOME9TAG"));
    ```