# Read transactions from the Tangle in Node.js

**In this tutorial, you read your "hello world" [transaction](root://getting-started/0.1/transactions/transactions.md) from the Tangle by giving a [node](root://getting-started/0.1/network/nodes.md) your tail transaction hash.**

## Packages

To complete this guide, you need to install the following packages:

--------------------
### npm
```bash
npm install @iota/core @iota/extract-json
```
---
### Yarn
```bash
yarn add @iota/core @iota/extract-json
```
--------------------

## IOTA network

In this tutorial, we connect to a node on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet).

## Code walkthrough

1. Require the packages

    ```js
    const Iota = require('@iota/core');
    const Extract = require('@iota/extract-json');
    ```

2. Connect to a node

    ```js
    const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
    });
    ```

3. Define the tail transaction hash of the bundle

    ```js
    const tailTransactionHash =
    'ZFICKFQXASUESAWLSFFIWHVOAJCSJHJNXMRC9AJSIOTNGNKEWOFLECHPULLJSNRCNJPYNZEC9VGOSV999';
    ```

    :::info:
    We use the tail transaction hash because the `signatureMessageFragment` field is part of the hash. Therefore, the message in the transaction is immutable.

    If you were to use the bundle hash, you may see a different message because anyone can [change the message in the tail transaction](../js/change-message-in-bundle.md) and attach a copy of the bundle to the Tangle.
    :::

4. Use the [`getBundle()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getBundle) method to get all transactions in the tail transaction's bundle. Then, use the [`extractJSON()`](https://github.com/iotaledger/iota.js/tree/next/packages/extract-json) method to decode the JSON messages in the `signatureMessageFragment` fields of the bundle's transactions and print them to the console

    ```js
    iota.getBundle(tailTransactionHash)
    .then(bundle => {
        console.log(JSON.parse(Extract.extractJson(bundle)));
    })
    .catch(err => {
        console.error(err);
    });
    ```

    In the console, you should see your JSON message:

    ```json
    {"message": "Hello world"}
    ```

:::success:Congratulations :tada:
You've just found and read a transaction from the Tangle.
:::

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code in the browser.

Click the green button to run the sample code in this guide and see the results in the window.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Read-a-transaction-from-the-Tangle?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Next steps

[Generate a new address](../js/generate-an-address.md).

