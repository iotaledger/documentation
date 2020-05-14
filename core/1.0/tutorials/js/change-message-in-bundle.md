# Change the messages in a bundle

**In this tutorial, you learn how to create a copy of a bundle and change the message in the tail transaction.**

Messages in transactions are stored in their `signatureMessageFragment` field, which isn't included in the [bundle essence](root://getting-started/0.1/transactions/bundles.md#bundle-essence). Therefore, you can change the value of this field without changing the bundle hash.

## Packages

To complete this guide, you need to install the following packages:

--------------------
### npm
```bash
npm install @iota/core @iota/converter @iota/bundle @iota/transaction @iota/transaction-converter
```
---
### Yarn
```bash
yarn add @iota/core @iota/converter @iota/bundle @iota/transaction @iota/transaction-converter
```
--------------------

## IOTA network

In this tutorial, we connect to a node on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet).

## Code walkthrough

1. Require the packages

    ```js
    const Iota = require('@iota/core');
    const Converter = require('@iota/converter');
    const Bundle = require('@iota/bundle');
    const { TRANSACTION_LENGTH, SIGNATURE_OR_MESSAGE_LENGTH } = require('@iota/transaction');
    const { asTransactionTrytes } = require('@iota/transaction-converter');
    ```

2. Connect to a node

    ```js
    const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
    });
    ```

3. Define the hash of the tail transaction whose message you want to change

    ```js
    const tail = 'UZSQCOKPEDTIZWLFNJWTPDNYZCYYHAMJAJVVHOHAHSQLPYOYYN9PT9DN9OOCESNS9RPYFIESTOCGCL999'
    ```

    :::info:
    We use a tail transaction because it is more likely to be an input, which means that it won't contain a signature.

    If we were to change a signature, the bundle would be invalid. But, if we change a message, the bundle will still be valid after we do proof of work to calculate the new transaction hash.
    :::

4. Use the [`getBundle()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getBundle) method to get all transactions in the tail transaction's bundle

    ```js
    iota.getBundle(tail).then(bundle => {

    });
    ```

5. Create a copy of the returned bundle

    ```js
    // Create new bundle array with a length equal to the number of transactions in the bundle
    let newBundle = new Int8Array(bundle.length * TRANSACTION_LENGTH);
    for (let i = 0; i < bundle.length; i++) {
        // Fill the bundle with the transaction trits from the bundle
        newBundle.set(Converter.trytesToTrits(asTransactionTrytes(bundle[i])), i * TRANSACTION_LENGTH);
    }
  ```

6. Use the [`addSignatureOrMessage()`](https://github.com/iotaledger/iota.js/tree/next/packages/bundle#bundleaddsignatureormessagebundle-signatureormessage-index) method to add a new message to the tail transaction of your copy

    ```js
    // Define an array to hold your new message
    const message = new Int8Array(SIGNATURE_OR_MESSAGE_LENGTH)
    // Set the new message
    message.set(Converter.trytesToTrits("HIJACKED"))
    // Add the new message to the tail transaction in the bundle
    newBundle = Bundle.addSignatureOrMessage(newBundle,message,0);
    ```

7. Use the [`finalizeBundle()`](https://github.com/iotaledger/iota.js/tree/next/packages/bundle#bundlefinalizebundlebundle) method to calculate the bundle hash of your copy

    ```js
    newBundle = Bundle.finalizeBundle(newBundle);
    ```

    :::info:
    This bundle hash is the same as the original bundle.
    :::

8. Convert the transactions in your copy from trits to trytes

    ```js
    const newTrytes = [];
    for (let i = 0; i < bundle.length; i++) {
        // Convert the transaction trits to trytes and add them to a new array
        newTrytes.push(Converter.tritsToTrytes(newBundle.slice(i * TRANSACTION_LENGTH, (i + 1) * TRANSACTION_LENGTH)))
    }
    ```

9. Send your copy to a node

    ```js
    iota.sendTrytes(newTrytes.reverse(),3,9).then(transactions => {
    // Print your new tail transaction hash to the console
    console.log(transactions[0].hash);
    })
    ```

    :::info:
    You reverse the bundle array because the library expects bundles to be sent head first.
    :::

Now, you can [search for your new tail transaction](https://devnet.thetangle.org/) on the Tangle and see that it's in a bundle with the same bundle hash as the original.

:::success:Congratulations :tada:
You've just changed the message of a tail transaction in a bundle and reattached a copy of that bundle to the Tangle.
:::

:::warning:
If your original tail transaction belongs to a transfer bundle, the nodes will mark either your copy or the original bundle as a double spend. Therefore, only one of them will be confirmed.
:::

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code in the browser.

Click the green button to run the sample code in this guide and see the results in the window.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Change-message-in-a-bundle?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Next steps

[Increase the chances of your reattached bundle being confirmed](../js/confirm-pending-bundle.md).