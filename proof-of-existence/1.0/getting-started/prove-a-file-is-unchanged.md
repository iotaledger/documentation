# Prove that a file is unchanged

**Files are important for transporting information such as contracts among different parties. Sometimes, one party may change a file without the others knowing. So, all parties need a way to reliably prove that a file has not been changed so they can trust it. To prove that a file is unchanged, you can use this library to hash the file's contents and attach it to the Tangle. This way, any party can later hash the file and compare it to the immutable one on the Tangle. If the hashes are the same, the file is unchanged.**

##

In this tutorial, you use the [proof-of-existence library](https://github.com/iotaledger/iota-poex-tool) to prove that a file is unchanged.

First, we create a file that we later want to prove is unchanged. Then, we hash the file and add its hash to a transaction before attaching it to the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet) Tangle. The Devnet is similar to the Mainnet, except the tokens are free. Any transactions that you send to the Devnet do not exist on other networks such as the Mainnet.

:::info:
Transactions on the Tangle are immutable, so we can use the transaction as a source of truth.
:::

Then, we read the transaction from the Tangle to retrieve the file hash. When we have the file hash, we hash the original file again and compare the two. If both hashes are the same, the original file is unchanged.

### Prerequisites

To complete this guide, you need the following:

- Node.js 8, or Node.js 10 or higher. We recommend the [latest LTS](https://nodejs.org/en/download/).
- A code editor such as [Visual Studio Code](https://code.visualstudio.com/Download)
- Access to a command-line interface

### Packages

To complete this guide, you need to install the following packages:

--------------------
### npm
```bash
npm install @iota/poex-tool regenerator-runtime
```
---
### Yarn
```bash
yarn add @iota/poex-tool regenerator-runtime
```
--------------------

### Step 1. Create an example contract

Create a new file called `contract.txt` in your working directory, then add the following text to it

    ```
    My super secret contract.
    ```

### Step 2. Set up the sample

1. Create a new file called `index.js` in the same directory as the `contract.txt` file, then require the packages

    ```js
    require('regenerator-runtime');
    const PoEx = require ('@iota/poex-tool');
    ```

2. Create an asynchronous function that takes a path to a file whose hash you want to attach to the Tangle

    ```js
    async function publish (file) {
    }
    ```
    
    :::info:
    You can also pass this function binary data.
    :::

3. In the `publish` function, hash the file, then send it in a transaction to a Devnet node

    ```js
    async function publish (file) {

    const hash = PoEx.hash(file);

        try {
            // Attach the file hash to the Tangle in a bundle
            const bundle = await PoEx.publish({
            provider: 'https://nodes.devnet.iota.org:443',
            data: hash,
            tag: 'POEXTUTORIAL',
            address: 'HELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDD',
            seed: 'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX',
            depth: 3,
            minWeightMagnitude: 9
            });
            tailTransaction = bundle[0];
            console.log(`Attached the transaction to the Tangle with hash: ${tailTransaction.hash}`);
            } catch(error) {
            console.log(`Something went wrong: ${error}`);
            }
        }
    }
    ```

4. Run the `publish` function, and pass it the path to the `contract.txt` file

    ```js
    publish('contract.txt');
    ```

    When you execute the file, you should see that the transaction was attached to the Tangle. Now, you can use the bundle hash to verify that the file is unchanged.

5. At the end of the `publish` function, verify that the hash of the file still matches the one that was attached to the Tangle

    ```js
    // Set the node to check for the transaction
    tailTransaction.provider = 'https://nodes.devnet.iota.org:443';

    // Verifying if the file is unchanged
    const verified = PoEx.verify(tailTransaction, false, file);
    verified? console.log('File verified: The file matches the hash on the Tangle')
    : ('Something has changed. The hash on the Tangle is no longer a match.');
    ```

    :::info:
    We set the `provider` field again so that the library knows to request the transaction from a Devnet node.

    The transaction is attached to the Devnet Tangle, so it does not exist on any other networks such as the Mainnet.

    [Find out more about IOTA networks](root://getting-started/0.1/network/iota-networks.md).
    :::

:::success:Congratulations :tada:
You can now use the Tangle as a single source of truth to verify that a file is still unchanged.
:::

## Run the code

Click the green button to run the sample code in this tutorial and see the results in the web browser.

:::info:
In this example, we don't use a file. Instead, we pass a string to the `publish` function and specify that it's a binary input in the second argument.
:::

<iframe height="600px" width="100%" src="https://repl.it/@jake91/proof-of-existence-utility?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

You can also run the sample code on your own device by using the following command

```bash
node index.js
```

If the file is a match, you should see the following output:

```
File verified: The file matches the hash on the Tangle
```

## Next steps

Use what you've learned to build an application that secures signed documents on the Tangle. You can use the [document immutability blueprint](root://blueprints/0.1/doc-immutability/overview.md) for inspiration.

Use the user interface to [upload a file hash to the Tangle](https://iota-poex.dag.sh).
