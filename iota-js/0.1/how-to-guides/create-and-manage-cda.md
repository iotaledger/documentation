# Send and receive transactions

**To send and receive transactions in an account, you must use conditional deposit addresses (CDA). CDAs are special addresses that allow you to specify the conditions in which they may be used in account withdrawals and deposits.**

Accounts use CDAs to avoid address reuse. When you request IOTA tokens from a someone, you can create a CDA that's active for a certain period of time. This way, you let the sender know that you intend to withdraw from that address only after that time. As a result, the sender can decide whether to make a deposit, depending on how much time is left on a CDA.

:::info:
CDAs can be used only in an account and not in the generic [client library methods](root://client-libraries/0.1/introduction/overview.md). As a result, both you and the sender must have an account to be able to use CDAs.
:::

## State of a CDA

CDAs can be in either an active or expired state. The state of a CDA determines whether you can withdraw from it or deposit into it:

**Active CDA:** You can deposit IOTA tokens into an active address. You can't withdraw tokens from an active address.

**Expired CDA:** You can withdraw tokens from an expired address. You can't deposit tokens into an expired address.

## Conditions of a CDA

To create a CDA, specify the following condition, which defines whether it's active or expired:

* **timeoutAt (required):** The time at which the address expires

And one of the following, recommended fields:

* **multiUse (recommended):** A boolean that specifies if the address may be sent more than one deposit.
* **expectedAmount (recommended):** The amount of IOTA tokens that the address is expected to contain. When the address contains this amount, it's considered expired. We highly recommend using this condition.

:::info:
You can't specify the `expected_amount` and `multi_use` fields in the same CDA. Please refer to the [FAQ](../references/cda-faq.md) for more information.
:::

|  **Combination of fields** | **Withdrawal conditions**
| :----------| :----------|
|`timeoutAt` |The CDA can used in withdrawals as long as it contains IOTA tokens|
|`timeoutAt` and `multiUse` (recommended) |The CDA can be used in withdrawals as soon as it expires, regardless of how many deposits were made to it. See the [CDA FAQ](../references/cda-faq.md) on when to use addresses with the `multiUse` field set. |
|`timeoutAt` and `expectedAmount` (recommended) | The CDA can be used in withdrawals as soon as it contain the expected amount. See the [CDA FAQ](../references/cda-faq.md) on when to use addresses with the `multi_use` field set.|

:::warning:Warning
If a CDA was created with only the `timeoutAt` field, it can be used in withdrawals as soon as it has a non-zero balance even if it hasn't expired. 

To avoid address reuse, we recommend creating CDAs with either the `multiUse` field or with the `expectedAmount` field whenever possible.
:::

## Create a CDA

1. Pass the CDA fields to the `generateCDA()` method

    ```js
    account.generateCDA({
        timeoutAt: Math.floor(new Date('7-16-2186').getTime() / 1000), // Date in seconds
        multiUse: true,
        security: 2
    })
        .then(cda => {
            // Do something with the CDA
            console.log(JSON.stringify(cda, null, 1));
        })
        .catch(error => {
            // Handle errors here
            console.log(error);
        })
    ```

:::info:
If you created an account with a `timeSource()` method, you can call that method in the `timeoutAt` field.
:::

## Deposit IOTA tokens into a CDA

1. After making sure that the CDA is still active, use the `account.sendToCDA()` method to deposit IOTA tokens into it

    ```js   
    account.sendToCDA({
        address: 'AT9GOVPQDDKAJ...ADFA9IRSV', // must include the checksum
        multiUse: false,
        timeoutAt: 6833278800,
        expectedAmount: 10000000,
        value: 10000000
    })
         .then((trytes) => {
            console.log('Successfully prepared transaction trytes:', trytes)
        })
        .catch(err => {
            // Handle errors here...
        });

    // Start attaching transactions to the Tangle
    // The startAttaching routine will keep on attaching uncomfirmed transactions until they are confirmed
    // The routine stops when there are no uncomfirmed bundles anymore, and resumes when you send another one
    account.startAttaching({
        depth: 3,
        minWeightMagnitude: 9,
        delay: 30 * 1000 // 30 second delay
    });
    
    // Or stop attaching
    account.stopAttaching();
    ```

2. **Optional:** To use a CDA as a magnet link, pass it to the `parseCDAMagnet()` method, then and pass the result to the`sendToCDA()` method

    ```js
     const magnetLink = 'iota://MBREWACWIPRFJRDYYHAAME…AMOIDZCYKW/?timeout_at=1548337187&multi_use=1&expected_amount=0'
     const { address, timeoutAt, multiUse, expectedAmount } = parseCDAMagnet(
        magnetLink
    );

    account.sendToCDA({
        address,
        timeoutAt,
        multiUse,
        expectedAmount,
        value: 1 // Value to send to the CDA
    })
        .then((trytes) => {
            console.log('Successfully prepared transaction trytes:', trytes)
        })
        .catch(err => {
            // Handle errors here...
        });

    // Start attaching transactions to the Tangle
    // The startAttaching routine will keep on attaching uncomfirmed transactions until they are confirmed
    // The routine stops when there are no uncomfirmed bundles anymore, and resumes when you send another one
    account.startAttaching({
        depth: 3,
        minWeightMagnitude : 9,
        delay: 30 * 1000 // 30 second delay
    });
    
    // Or stop attaching
    account.stopAttaching();
    ```

## Distribute a CDA

The `generateCDA()` method returns a CDA object with the following fields. You can serialize a CDA into any format before distributing it to senders:

```js
{
   address, // The last 9 trytes are the checksum
   timeoutAt,
   multiUse,
   expectedAmount
}
```

1. To serialize a CDA into a magnet link, use the `serializeCDAMagnet()` method in the `@iota/cda` module

    ```js
    const CDA = require('@iota/cda');
    
    const magnetLink = CDA.serializeCDAMagnet(cda);
    // iota://MBREWACWIPRFJRDYYHAAME…AMOIDZCYKW/?timeout_at=1548337187&multi_use=1
    ```
