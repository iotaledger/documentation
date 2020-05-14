# Compress and store a zero-value transaction

**In this tutorial, you create and send a transaction. Then, you compress the transaction trytes and store them in a binary file on the local device. This way, you can later reattach the transaction if it doesn't reach the rest of the network or it doesn't get confirmed.**

## Prerequisites

To complete this guide, you need the following:

- Node.js 8, or Node.js 10 or higher. We recommend the [latest LTS](https://nodejs.org/en/download/).
- A code editor such as [Visual Studio Code](https://code.visualstudio.com/Download)
- Access to a command-line interface

### Packages

To complete this guide, you need to install the following packages:

--------------------
### npm
```bash
npm install @iota/core @iota/converter @iota/tryte-compress
```
---
### Yarn
```bash
yarn add @iota/core @iota/converter @iota/tryte-compress
```
--------------------

## IOTA network

In this tutorial, we connect to a node on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet).

## Code walkthrough

1. Create a new file called `index.js` in your working directory, then require the libraries

    ```js
    const Iota = require('@iota/core');
    const Compressor = require('@iota/tryte-compress');
    const Converter = require('@iota/converter');
    const fs = require('fs');
    ```

2. Create an instance of the IOTA object and use the `provider` field to connect to a Devnet node

    ```js
    const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
    });
    ```

3. Create variables to store your seed and an address to use in the transaction

    ```js
    const seed =
    'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';

    const address = 'HELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDD';
    ```

    :::info:
    This seed doesn't have to contain any addresses with IOTA tokens.
    
    If you enter a seed that consists of less than 81 characters, the library will append 9s to the end of it to make 81 characters.
    :::

4. Create a transfers object that specifies the amount of IOTA tokens you want to send, the message that you want to send, and the address to send it to

    ```js
    const message = Converter.asciiToTrytes('Hello World!');
    const transfers = [
    {
        value: 0,
        address: address,
        message: message
    }
    ];
    ```

5. Create a bundle from the `transfers` object, store the returned trytes in a global variable, then send them to the node

    ```js

    let bundleTrytes;

    iota.prepareTransfers(seed, transfers)
    .then(trytes => {
        // Store the trytes in a global variable
        bundleTrytes = trytes[0];
        return iota.sendTrytes(trytes, 3/*depth*/, 9/*MWM*/)
    })
    .then(bundle => {
        // Store the tail transaction hash and the transaction trytes
        storeTailTransaction(bundle[0].hash, bundleTrytes);
    })
    .catch(error => {
        // Catch any errors
        console.log(error);
    });
    ```

6. Create the `storeTailTransaction` function that compresses the trytes and saves them to a binary file

    ```js
    function storeTailTransaction (transactionHash, bundleTrytes) {

    let compressed = Compressor.compressTrytes(bundleTrytes);

    let wstream = fs.createWriteStream(transactionHash);

    wstream.on('finish', function () {
        console.log(`Compressed tail transaction trytes were saved to: ${transactionHash}`);
      });

    wstream.write(compressed);

    wstream.end();

    }
    ```

    :::info:
    Here, we use the transaction hash to name the file.
    :::

:::success:Congratulations :tada:
Whenever you send a transaction, you are now compressing the transaction trytes and storing them on your local device.
:::

## Run the code

You can run the sample code by using the following command

```bash
node index.js
```

You should see something like the following:

```
Compressed tail transaction trytes were saved to: MZGKBEXTDCVNBRZYFLFPWWQKWT9OB9ULHKQDHTCMQGITEIXKUDJJU9KVOW9UEIKJAMQAOJU9OITXEV999
```

## Sample code

```js
// Require the packages
const Iota = require('@iota/core');
const Compressor = require('@iota/tryte-compress');
const Converter = require('@iota/converter');
const fs = require('fs');

// Create a new instance of the IOTA object
// Use the `provider` field to specify which IRI node to connect to
const iota = Iota.composeAPI({
provider: 'https://nodes.devnet.iota.org:443'
});

const address = 'HELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDD';

const seed = 'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';

const message = Converter.asciiToTrytes('Compress transaction trytes tutorial');

const transfers = [
    {
    value: 0,
    address: address,
    message: message
    }
];

let bundleTrytes;

iota.prepareTransfers(seed, transfers)
  .then(trytes => {
    // Store the trytes in a global variable
    bundleTrytes = trytes[0];
    return iota.sendTrytes(trytes, 3/*depth*/, 9/*MWM*/)
  })
  .then(bundle => {
    // Store the tail transaction hash and the transaction trytes
    storeTailTransaction(bundle[0].hash, bundleTrytes);
    var JSONBundle = JSON.stringify(bundle,null,1);
    console.log(`Sent bundle: ${JSONBundle}`);
  })
  .catch(error => {
    // Catch any errors
    console.log(error);
});

function storeTailTransaction (transactionHash, bundleTrytes) {

    let compressed = Compressor.compressTrytes(bundleTrytes);

    let wstream = fs.createWriteStream(transactionHash);

    wstream.on('finish', function () {
        console.log(`Compressed tail transaction trytes were saved to: ${transactionHash}`);
      });

    wstream.write(compressed);

    wstream.end();
}
```

## Next steps

Use the [trytes compressor utility](https://utils.iota.org/compress) to compress trytes and see what memory savings you make.

![Compressor](../images/compress.png)

Use the trytes compressor API to decompress the trytes before resending them to a node. For example, you could do the following:

```js
function readCompressedTailTransaction (file){

    let transactionBytes = fs.readFileSync(file);

    let transactionTrytes = Compressor.decompressTrytes(transactionBytes);

    console.log(transactionTrytes);

}
```
