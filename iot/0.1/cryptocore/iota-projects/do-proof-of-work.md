# Do proof of work for a large bundle

**In this tutorial, you use the CryptoCore to do proof of work for a bundle that contains eight zero-value transactions.**

This guide walks you through the process of writing the following scripts:

- **`create_bundle.sh`:** Creates a bundle of eight zero-value transactions without a proof of work
- **`do_pow.sh`:** Uses the CryptoCore to do proof of work for the bundle
- **`send-bundle.js`:** Connects to a node and sends the bundle's transactions to it

:::info:
These code samples are also hosted on [GitHub](https://github.com/iota-community/cryptocore-scripts).
:::

:::warning:
For your convenience, all sample code uses the default secret key and the default API key.

If you want to use the CryptoCore in a production environment, you should follow the instructions in the 'Securing the FPGA' section of the [manual](https://gitlab.com/iccfpga-rv/iccfpga-manual/-/blob/master/iccfpga.pdf).
:::

## Prerequisites

To complete this guide, you need to have completed the [CryptoCore getting started guide](../introduction/get-started.md).

You also need Node.js installed on the Raspberry Pi. See [this article](https://github.com/nodesource/distributions/blob/master/README.md#debinstall) and follow the Ubuntu installation instructions.

## Packages

To complete this guide, you need to install the following Node.js packages:

--------------------
### npm
```bash
npm install @iota/core @iota/transaction-converter serialport
```
---
### Yarn
```bash
yarn add @iota/core @iota/transaction-converter serialport
```
--------------------

You will also need to install the following Linux package:

```bash
sudo apt-get install jq
```

## Step 1. Create a bundle

In this step, you write a script that creates eight zero-value transactions, chains them into a bundle, and returns the transaction trytes without a proof of work.

1. Create a file called `create-bundle.js`

    ```bash
    cd ~/cryptocore-scripts/node-scripts
    sudo nano create-bundle.js
    ```

2. Use the first argument that is passed to the script to connect to a node on either the Devnet or the Mainnet

    ```js
    
    // This argument should be a minimum weight magnitude (14 or 9)
    const network = process.argv[2];

    // Define a node for each IOTA network
    const nodes = {
            devnet: 'https://nodes.devnet.iota.org:443',
            mainnet: `https://nodes.iota.org:443`
    }

    // Connect to the correct IOTA network, depending on the user's
    // selection in the CryptoCore script
    if (network === '14') {
            iota = Iota.composeAPI({
            provider: nodes.mainnet
            });
    } else {
            iota = Iota.composeAPI({
            provider: nodes.devnet
            });
    }
    ```

3. Create a `transfer` object for each zero-value transaction that you want to add to the bundle

    ```js
    // Define an address to send all transaction to
    const address = "CRYPTOCORE99999999999999999999999999999999999999999999999999999999999999999999999"

    // Create one transfer object for each transaction that you want to send
    var transfers = [{
        'address': address,
        // These transactions do not send IOTA tokens
        'value': 0,
        // The `asciiToTrytes()` method supports only basic ASCII characters. As a result, diacritical marks such as accents and umlauts aren't supported and result in an `INVALID_ASCII_CHARS` error.
        'message': Converter.asciiToTrytes('Hello, this is my first message on a CryptoCore'),
        'tag': 'CRYPTOCORE'
    },
        
    {
        'address': address, 
        'value': 0,
        'message': Converter.asciiToTrytes('Hello, this is my second message on a CryptoCore'),
        'tag': 'CRYPTOCORE'
    },

    {
        'address': address, 
        'value': 0,
        'message': Converter.asciiToTrytes('Hello, this is my third message on a CryptoCore'),
        'tag': 'CRYPTOCORE'
    },

    {
        'address': address, 
        'value': 0,
        'message': Converter.asciiToTrytes('Hello, this is my fourth message on a CryptoCore'),
        'tag': 'CRYPTOCORE'
    },

    {
        'address': address, 
        'value': 0,
        'message': Converter.asciiToTrytes('Hello, this is my fifth message on a CryptoCore'),
        'tag': 'CRYPTOCORE'
    },

    {
        'address': address, 
        'value': 0,
        'message': Converter.asciiToTrytes('Hello, this is my sixth message on a CryptoCore'),
        'tag': 'CRYPTOCORE'
    },

    {
        'address': address, 
        'value': 0,
        'message': Converter.asciiToTrytes('Hello, this is my seventh message on a CryptoCore'),
        'tag': 'CRYPTOCORE'
    },

    {
        'address': address, 
        'value': 0,
        'message': Converter.asciiToTrytes('Hello, this is my eighth message on a CryptoCore'),
        'tag': 'CRYPTOCORE'
    }];
    ```
    
4. Use the [`prepareTransfers()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.prepareTransfers) method to create transactions from the `transfer` objects and chain them into a bundle

    ```js
    // The library expects a seed, but it is not used because these are zero-value transactions and the bundle does not need to be signed
    const seed = "999999999999999999999999999999999999999999999999999999999999999999999999999999999"

    // Chain the transactions into a bundle
    iota.prepareTransfers(seed, transfers)
        .then(function(trytes){
        console.log(JSON.stringify(trytes));
        })
        .catch(error => {
            console.log(error)
    });
    ```
    ```

## Step 2. Do proof of work on the CryptoCore

In this step, you use the CryptoCore API to do proof of work for the eight transactions that were created by the `create-bundle.js` script.

1. Create a new file called `do_pow.sh`

    ```bash
    sudo nano do_pow.sh
    ```

2. Ask whether the user wants to create a transaction for the Devnet or the Mainnet, and store the answer in the `MWM` variable

    ```bash
    #!/bin/bash

    read -p "Are you sending this transaction to the Devnet or the Mainnet? " MWM
    ```

3. Use a regular expression to check if the user's answer begins with an 'm' and set the [minimum weight magnitude](root://getting-started/0.1/network/minimum-weight-magnitude.md) (MWM) according to the outcome

    ```bash
    if [[ $MWM =~ ^[mM] ]]
    then
            echo "Setting minimum weight magnitude to 14 for the Mainnet."
            MWM=14
    else
            echo "Setting minimum weight magnitude to 9 for the Devnet."
            MWM=9
    fi
    ```

    :::info:
    The MWM is essential for the CryptoCore to output a valid proof of work.
    :::

4. Create a bundle of zero-value transactions by executing the `create-bundle.js` script and save the output to a `trytes` variable

    ```bash
    echo "Creating bundle"

    trytes=$(node ../node-scripts/create-bundle.js $MWM)
    ```

5. Get two tip transaction hashes from the Tangle by executing the `get-branch-and-trunk.js` script

    ```bash
    echo "Getting tip transactions"

    trunk_and_branch=$(node ../node-scripts/get-branch-and-trunk.js $MWM)

    trunk=$(echo "$trunk_and_branch" | jq '.trunkTransaction')
    branch=$(echo "$trunk_and_branch" | jq '.branchTransaction')
    ```

    :::info:
    The `get-branch-and-trunk.js` file uses the [`getTransactionsToApprove()`](https://github.com/iotaledger/iota.js/tree/next/packages/core#module_core.getTransactionsToApprove) method to get two tip transaction from the Tangle.

    You can find the code for this file on [GitHub](https://github.com/iota-community/cryptocore-scripts/blob/master/node-scripts/get-branch-and-trunk.js).
    :::

6. Create an `attachToTangle` API request, send it to the CryptoCore through a serial terminal, and save the result to a file

    ```bash
    # Get the current Unix epoch in milliseconds for the `attachmentTimestamp` field
    timestamp=$(date +%s%3N)

    # Make sure a directory exists in which to save the transaction trytes
    dir="$( dirname $( readlink -f $0 ) )"
    saved_transaction_directory="$dir/../my-transactions"

    if [ ! -d $saved_transaction_directory ]; then
        mkdir $saved_transaction_directory
    fi

    echo "Doing proof of work on CryptoCore"

    template='{"command":"attachToTangle","trunkTransaction": %s,"branchTransaction":%s,"minWeightMagnitude":%d,"timestamp":%s,"trytes":%s}'

    json_string=$(printf "$template" $trunk $branch $MWM $timestamp $trytes)

    node ../node-scripts/serial.js "$json_string" > $saved_transaction_directory/attached_trytes.txt
    ```

    :::info:
    The `serial.js` file uses the [SerialPort package](https://serialport.io/docs/guide-installation) to open a serial connection to the CryptoCore.

    You can find the code for this file on [GitHub](https://github.com/iota-community/cryptocore-scripts/blob/master/node-scripts/serial.js).
    :::

7. Send the transaction trytes, which now include a proof of work, to the connected IOTA node by executing the `send-bundle.js` script

    ```bash
    attached_trytes=$(node ../node-scripts/send-bundle.js $MWM)

    echo "$attached_trytes"
    ```

## Step 3. Send a bundle

In this step, you write a script that attaches a bundle of transactions to the Tangle.

1. Create a file called `send-bundle.js`

    ```bash
    cd ~/cryptocore-scripts/node-scripts
    sudo nano send-bundle.js
    ```

2. Use the first argument that was passed to the script to connect to a node on either the Devnet or the Mainnet

    ```js
    // This argument should be a minimum weight magnitude (14 or 9)
    const network = process.argv[2];

    // Define a node for each IOTA network
    const nodes = {
            devnet: 'https://nodes.devnet.iota.org:443',
            mainnet: `https://nodes.iota.org:443`
    }

    // Connect to the correct IOTA network, depending on the user's
    // selection in the CryptoCore script
    if (network === '14') {
            iota = Iota.composeAPI({
            provider: nodes.mainnet
            });
    } else {
            iota = Iota.composeAPI({
            provider: nodes.devnet
            });
    }

5. Read the transaction trytes from the file

    ```js
    // This argument should be the path to which you can save the attached transaction trytes
    const savedTransactionDirectory = process.argv[3];

    // Read transaction trytes from the file
    let trytes = fs.readFileSync(`${savedTransactionDirectory}/attached_trytes.txt`).toString();

    if (!trytes) {
            console.log("No trytes found. Make sure that proof of work was done and check the following file :");
            console.log(`${savedTransactionDirectory}/attached_trytes.txt`);
    }

    // Parse the JSON into an array
    trytes = JSON.parse(trytes);
    ```
6. Use the [`storeAndBroadcast()`](https://github.com/iotaledger/iota.js/tree/next/packages/core#corestoreandbroadcasttrytes-callback) method to send the transactions to the connected node, then print the attached tail transaction hash to the console

    ```js
    // Send the transaction trytes to the connected IOTA node
    iota.storeAndBroadcast(trytes)
    .then(trytes => {
        console.log("Successfully attached transactions to the Tangle");
        // Print the transaction details
        console.log("Tail transaction hash: ");
        console.log(JSON.stringify(trytes.map(t => Transaction.asTransactionObject(t))[trytes.length-1].hash))
    })
    .catch(error => {
        console.log(error);
    });
    ```

:::success:
You have just written a command-line interface (CLI) program that uses the CryptoCore API to do proof of work for eight transactions, and attaches them to the Tangle.
:::

## Run the code

To get started you need [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [Node.js](https://nodejs.org/en/download/) installed on your device.

In the command-line, do the following:

1. Clone the repository and change into the `cryptocore-scripts/node-scripts` directory

    ```bash
    git clone https://github.com/iota-community/cryptocore-scripts
    cd cryptocore-scripts/node-scripts
    ```

2. Install the packages

    ```bash
    sudo npm i
    ```

    You should see something like the following:

    ```
    npm notice created a lockfile as package-lock.json. You should commit this file.
    added 128 packages from 68 contributors and audited 338 packages in 34.171s

    2 packages are looking for funding
    run `npm fund` for details

    found 0 vulnerabilities
    ```

3. Run the `do_pow.sh` script and respond to the prompts

    ```bash
    cd ~/cryptocore-scripts/bash-scripts
    sudo ./do_pow.sh
    ```

4. Follow the prompts

You should see something like the following:

```bash
Welcome to the spam bundle creator
Are you sending transactions to the Devnet or the Mainnet? m
Setting minimum weight magnitude to 14 for the Mainnet.
Creating bundle
Getting tip transactions
Doing proof of work on CryptoCore
Successfully attached transactions to the Tangle
Tail transaction hash:
"XDAHIDSSUXIPWPUSVBUWPMYIXWAWPTKLUAHUCVGQRHH9MYGUGVVNVDPRMKULLWTPYQRKSWNTXUQMA9999"
```

To see your bundle on the Tangle, copy the tail transaction hash and paste it into a [Tangle explorer](https://utils.iota.org/).

If the Tangle explorer doesn't display your transaction after 5 minutes, the node may not have sent your transaction to its neighbors.

To resend your transaction, you can pass the transaction trytes in the `my-transactions/attached_trytes.txt` file to the [`storeAndBroadcast()`](https://github.com/iotaledger/iota.js/tree/next/packages/core#corestoreandbroadcasttrytes-callback) method in the JavaScript client library.

## Next steps

[Generate a random seed](../iota-projects/generate-a-seed.md) on the CryptoCore and store it in the secure memory.