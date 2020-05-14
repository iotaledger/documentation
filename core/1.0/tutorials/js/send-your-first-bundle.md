# Send a "hello world" transaction in Node.js

**In this tutorial, you send a "hello world" message in a zero-value transaction. These transactions are useful for storing messages on the [Tangle](root://getting-started/0.1/network/the-tangle.md) without having to send any [IOTA tokens](root://getting-started/0.1/clients/token.md).**

## Packages

To complete this guide, you need to install the following packages:

--------------------
### npm
```bash
npm install @iota/core @iota/converter
```
---
### Yarn
```bash
yarn add @iota/core @iota/converter
```
--------------------

## IOTA network

In this tutorial, we connect to a [node](root://getting-started/0.1/network/nodes.md) on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet) with the following network settings:

- **[Minimum weight magnitude](root://getting-started/0.1/network/minimum-weight-magnitude.md)**: 9

- **[Depth](root://getting-started/0.1/transactions/depth.md)**: 3

## Code walkthrough

1. Require the packages

    ```js
    const Iota = require('@iota/core');
    const Converter = require('@iota/converter');
    ```

2. Connect to a node

    ```js
    const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
    });
    ```

3. Define the depth and the minimum weight magnitude

    ```js
    const depth = 3;
    const minimumWeightMagnitude = 9;
    ```

4. Define an [address](root://getting-started/0.1/clients/addresses.md) to which you want to send a message

    ```js
    const address =
    'HEQLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWOR99D';
    ```

    :::info:
    This address does not have to belong to anyone. To be valid, the address just needs to consist of 81 [trytes](root://getting-started/0.1/introduction/ternary.md).
    :::

5. Define a seed

    ```js
    const seed =
    'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';
    ```

    :::info:
    Because this is a zero-value transaction, the seed is not used. However, the library expects a valid seed, so we use a random string of 81 characters. If you enter a seed that consists of less than 81 characters, the library will append 9s to the end of it to make 81 characters.
    :::

6. Create a JSON message that you want to send to the address and convert it to trytes

    ```js
    const message = JSON.stringify({"message": "Hello world"});
    const messageInTrytes = Converter.asciiToTrytes(message);
    ```

    We encode the message in JSON to make it easier to read the message when we get the transaction from the Tangle in the next guide.

    :::info:
    The `asciiToTrytes()` method supports only [basic ASCII characters](https://en.wikipedia.org/wiki/ASCII#Printable_characters). As a result, diacritical marks such as accents and umlauts aren't supported and result in an `INVALID_ASCII_CHARS` error.
    :::

7. Define a zero-value transaction that sends the message to the address

    ```js
    const transfers = [
    {
        value: 0,
        address: address,
        message: messageInTrytes
    }
    ];
    ```

8. To create a bundle from your `transfers` object, pass it to the [`prepareTransfers()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.prepareTransfers) method. Then, pass the returned bundle trytes to the [`sendTrytes()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.sendTrytes) method, which handles [tip selection](root://node-software/0.1/iri/concepts/tip-selection.md), [remote proof of work](root://getting-started/0.1/transactions/proof-of-work.md), and sending the bundle to the node

    ```js
    iota.prepareTransfers(seed, transfers)
        .then(trytes => {
            return iota.sendTrytes(trytes, depth, minimumWeightMagnitude);
        })
        .then(bundle => {
            console.log(bundle[0].hash)
        })
        .catch(err => {
            console.error(err)
        });
    ```

    In the console, you should see the tail transaction hash of the bundle you just sent.

:::success:Congratulations :tada:
You've just sent your first zero-value transaction. Your transaction is attached to the Tangle, and will be forwarded to the rest of the network.

You can use this tail transaction hash to read the transaction from the Tangle.
:::

:::warning:
Nodes can delete old transactions from their local copies of the Tangle. Therefore, a time may come where you request your transaction from a node, but the node doesn't have it anymore.

If you want to store data on the Tangle for extended periods of time, we recommend either [running your own node](root://node-software/0.1/iri/how-to-guides/quickstart.md) or running a permanode such as [Chronicle](root://node-software/0.1/chronicle/introduction/overview.md).
:::

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code in the browser.

Click the green button to run the sample code in this guide and see the results in the window.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Send-a-hello-world-transaction?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Next steps

Make a note of the tail transaction hash so you can [read the transaction from the Tangle](../js/read-transactions.md) to see your message.

You can also read your transaction, using a utility such as the [Tangle explorer](https://utils.iota.org).
