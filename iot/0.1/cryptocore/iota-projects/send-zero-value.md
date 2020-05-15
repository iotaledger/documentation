# Send a zero-value transaction with the CryptoCore

**In this tutorial, you create a bash script that take a user's input and attaches a zero-value transaction to the Tangle, using the CryptoCore UART API.**

This guide walks you through the process of writing the following scripts:

- **`create_tx.sh`:** Uses the CryptoCore to create a zero-value transaction
- **`send-tx.js`:** Connects to a node and sends the transaction to it

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

## Step 1. Create a zero-value transaction on the CryptoCore

In this step, you write the `create_tx.sh` script that prompts the user for the parameters to use to call the `jsonDataTX` endpoint on the CryptoCore. Then you save the returned transaction trytes to a file that the `send-tx.js` script can read.

1. Create a directory called `cryptocore-scripts/bash-scripts`

    ```bash
    cd ~/cryptocore-scripts
    sudo mkdir bash-scripts
    cd bash-scripts
    ```

2. Create a new file called `create_tx.sh`

    ```bash
    sudo nano create_tx.sh
    ```

3. Ask whether the user wants to create a transaction for the Devnet or the Mainnet, and store the answer in the `MWM` variable

    ```bash
    #!/bin/bash

    read -p "Are you sending this transaction to the Devnet or the Mainnet? " MWM
    ```

4. Use a regular expression to check if the user's answer begins with an 'm' and set the [minimum weight magnitude](root://getting-started/0.1/network/minimum-weight-magnitude.md) (MWM) according to the outcome

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
    The MWM is essential for the CryptoCore to generate a valid proof of work.
    :::

5. Ask whether the user wants to send the transaction to a particular address

    ```bash
    read -p "Would you like to send this zero-value transaction to a particular address? " answer

    if [[ $answer =~ ^[yY] ]]
    then
        read -s "Please enter the 81-tryte address: " address
        else
            address="999999999999999999999999999999999999999999999999999999999999999999999999999999999"
    fi
    ```

    :::info:
    If the user does not enter a word beginning with 'y', this code sets the address to all 9s.
    :::

6. Get two tip transaction hashes from the Tangle by executing the `get-branch-and-trunk.js` script

    ```bash
    # Execute the get-branch-and-trunk.js script to get two tip transactions
    trunk_and_branch=$(node ../node-scripts/get-branch-and-trunk.js $MWM)
    trunk=$(echo "$trunk_and_branch" | jq '.trunkTransaction'| tr -d '"\n' )
    branch=$(echo "$trunk_and_branch" | jq '.branchTransaction'| tr -d '"\n' )
    ```

    :::info:
    The `get-branch-and-trunk.js` file uses the [`getTransactionsToApprove()`](https://github.com/iotaledger/iota.js/tree/next/packages/core#module_core.getTransactionsToApprove) method to get two tip transaction from the Tangle.

    You can find the code for this file on [GitHub](https://github.com/iota-community/cryptocore-scripts/blob/master/node-scripts/get-branch-and-trunk.js).
    :::

7. Create a variable in which to store the current Unix epoch in seconds

    ```bash
    timestamp=$(date +%s)
    ```

    This timestamp is used

8. Create a [`jsonDataTX`](../references/api-reference.md#jsondatatx) API request, send it to the CryptoCore through a serial terminal, and save the result to a file

    ```bash
    # Make sure a directory exists in which you can save unfinished or pending transactions
    dir="$( dirname $( readlink -f $0 ) )"
    saved_transaction_directory="$dir/../my-transactions"

    if [ ! -d $saved_transaction_directory ]; then
        mkdir $saved_transaction_directory
    fi

    template='{"command":"jsonDataTX","trunkTransaction":"%s","branchTransaction":"%s","minWeightMagnitude":%d,"tag":"CRYPTOCORE99999999999999999", "address":"%s", "timestamp":%s,"data": { "message": "HELLO WORLD FROM CRYPTOCORE" }}'

    json_string=$(printf "$template" "$trunk" "$branch" $MWM "$address" $timestamp)

    node ../node-scripts/serial.js "$json_string" | jq ".trytes[]" | tr -d '"\n' > $saved_transaction_directory/zero_value_transaction.txt
    ```

    :::info:
    The `serial.js` file uses the [SerialPort package](https://serialport.io/docs/guide-installation) to open a serial connection to the CryptoCore.

    You can find the code for this file on [GitHub](https://github.com/iota-community/cryptocore-scripts/blob/master/node-scripts/serial.js).
    :::

9. Execute the `send-tx.js` script and pass it the user's chosen MWM

    ```bash
    echo "Attaching the transaction to the Tangle"

    # Execute the send-tx.js script to attach the transaction to the Tangle
    attached_trytes=$(node ../node-scripts/send-tx.js $MWM)

    # Print the result of the send-tx.js script
    echo "$attached_trytes"
    ```

Now you have a way to create a zero-value transaction and save the trytes to a file, you can write the `send-tx.js` script to attach the transaction to the Tangle.

## Step 2. Attach the transaction to the Tangle

In this step, you use the Javascript client library to attach the saved transaction trytes to the Tangle of the user's chosen IOTA network.

1. Create a directory called `cryptocore-scripts/node-scripts`

    ```bash
    cd ~
    sudo mkdir cryptocore-scripts/node-scripts
    cd cryptocore-scripts/node-scripts
    ```

2. Create a file called `send-tx.js`

    ```bash
    sudo nano send-tx.js
    ```

4. Use the first argument that was passed to the script to connect to a node on either the Devnet or the Mainnet

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
    // This argument should be the path to which you can save unfinished or pending transactions
    const savedTransactionDirectory = process.argv[3];

    // Check the file for transaction trytes
    const data = fs.readFileSync(`${savedTransactionDirectory}/zero_value_transaction_trytes.txt`);
    const match = data.toString().match(/[A-Z9,]*/g);
    const trytes = [match[0]];

    if (!trytes) {
            console.log("No trytes found. Make sure that proof of work was done and check the following file :");
            console.log(`${savedTransactionTrytes}/zero_value_transaction.txt`);
    }
    ```
6. Use the [`storeAndBroadcast()`](https://github.com/iotaledger/iota.js/tree/next/packages/core#corestoreandbroadcasttrytes-callback) method to send the transaction to the connected node, and print the attached transaction object to the console

    ```js
    iota.storeAndBroadcast(trytes)
    .then(result => {
            console.log(Transaction.asTransactionObject(result));
    })
    .catch(error => {
            console.log(error)
    });
    ```

:::success:
You have just written a command-line interface (CLI) program that uses the CryptoCore to create a zero-value transaction and attaches it to the Tangle.
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

3. Run the `create_tx.sh` script and respond to the prompts

    ```bash
    cd ~/cryptocore-scripts/bash-scripts
    ./create_tx.sh
    ```

4. Follow the prompts

You should see the transaction object that was sent to the node. For example:

```js
{
  hash: 'YQNCKGIGOZJJJGMNMAVWKJGDJLQOXDTADIJTYU9HBIGKTDKUXHBMOBXVZYWAUWOSKKYUSUIDVPNZZ9999',
  signatureMessageFragment: 'ODGAADTCGDGDPCVCTCGADBGARBOBVBVBYBEAFCYBACVBNBEAPBACYBWBEAMBACHCZBCCYBMBYBACOBGAQD99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999',
  address: '999999999999999999999999999999999999999999999999999999999999999999999999999999999',
  value: 0,
  obsoleteTag: 'CWYPTOCORE99999999999999999',
  timestamp: 1059930011,
  currentIndex: 0,
  lastIndex: 0,
  bundle: 'DAIHSSITPKSZRVHDTVLXIBPYGKLGKZBRDZSGRFYGIBXTPCZFIL9JAJDEGABAUVCJNHWAUULGXRBDGNDIZ',
  trunkTransaction: 'HEWJUPLE9GHUDOFGCARASDIUDMXDQSV99WBSJYIXWHVCMHFGIXRTTTHBIEJGUPHCQQQGEZMZPRSRA9999',
  branchTransaction: 'HEWJUPLE9GHUDOFGCARASDIUDMXDQSV99WBSJYIXWHVCMHFGIXRTTTHBIEJGUPHCQQQGEZMZPRSRA9999',
  tag: 'CRYPTOCORE99999999999999999',
  attachmentTimestamp: 1581607894939,
  attachmentTimestampLowerBound: 0,
  attachmentTimestampUpperBound: 11,
  nonce: 'ICCFPGA9B9999999UVNPNVVMMMM'
}
```

You can copy the `hash` field of your transaction object and paste it into a [Tangle explorer](https://utils.iota.org/).

If the Tangle explorer doesn't display your transaction after 5 minutes, the node may not have sent your transaction to its neighbors.

To resend your transaction, you can pass the transaction trytes in the `my-transactions/zero_value_transaction_trytes.txt` file to the [`storeAndBroadcast()`](https://github.com/iotaledger/iota.js/tree/next/packages/core#corestoreandbroadcasttrytes-callback) method in the JavaScript client library.

## Next steps

Try [creating a large bundle of zero-value transactions](../iota-projects/do-proof-of-work.md) and doing proof of work for all of them on the CryptoCore.


