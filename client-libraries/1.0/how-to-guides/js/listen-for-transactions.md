# Listen for live transactions in Node.js

**In this tutorial, you listen to the Tangle for recent transactions by subscribing to events on a node.**

## Packages

To complete this tutorial, you need to install the following package:

--------------------
### npm
```bash
npm install zeromq
```
---
### Yarn
```bash
yarn add zeromq
```
--------------------

## IOTA network

In this tutorial, we connect to a node in the [Devnet](root://getting-started/1.1/networks/overview.md).

## Code walkthrough

1. Require the package and create a ZMQ subscribe socket

    ```js
    const zmq = require('zeromq');
    const sock = zmq.socket('sub');
    ```

2. Connect the socket to a node's ZMQ port

    ```js
    sock.connect('tcp://zmq.devnet.iota.org:5556');
    ```

3. If the script is executed with no additional arguments, subscribe to the [`tx`](root://hornet/1.1/references/events.md) event to see all transactions, otherwise subscribe to the address event to see only transactions that were sent to that address

    ```js
    // Check for a command-line argument
    if (!process.argv[2]) {
        // Prompt user to add an address to the commmand line
        console.log('Listening for all transactions')
        console.log('---------------------')
        console.log('If you want to listen for transactions that are sent to a particular address,');
        console.log('pass the address to the `node` command as a command-line argument.');
        console.log('For example: node 6-zmq-listen.js AN...ADDRESS')

        // Subscribe to all transactions that the IOTA node receives
        sock.subscribe('tx');
    } else {
        console.log('Listening for transactions sent to this address: ' + process.argv[2])
        console.log(
            'Remember to send a transaction to this address, and be patient: It can take 30seconds for the transaction to appear.')
        // Subscribe to the address thats passed in via the CLI
        sock.subscribe(process.argv[2])
    }
    ```

    :::info:
    All events must be in lowercase letters except the trytes of the address event, which must be in uppercase letters.
    :::

4. Process the event data that the IOTA node returns

    ```js
    sock.on('message', msg => {
    // Split the data into an array
        const data = msg.toString().split(' ');
        switch (
            // Use index 0 to match the name of the topic
            data[0]
        ) {
            // Display all transactions as the IOTA node receives them
            case 'tx': 
                console.log(`I'm a transaction!`, data)
                break
            // Display only transactions that were sent to a given address
            case process.argv[2]: 
                console.log(`I'm the transaction you are looking for!`, data);
                break
        }
    });
    ```

    In the console, you should see something like the following:

    ```shell
    Listening for all transactions
    ---------------------
    If you want to listen for transactions that are sent to a particular address,
    pass the address to the `node` command as a command-line argument.
    For example: node 6-zmq-listen.js AN...ADDRESS
    I'm a transaction! [ 'tx',
    'ZHSNSJFUYIUGPWLK9JZWWQJFHHPIYMYWMXCQPKMUTAYVDNPWYCKAWBXWVFFXOHBKVAUZOKVUCLMEER999',
    'XMBNQGZLNYMNAHFUNBCTYNKKO9IVVDVGIWYQFONUNYUQWPHBIEULTEN9GNYMNWCVPVFBNJFHIZNKJJAUM',
    '0',
    'SEMARKETMAM9999999999999999',
    '1572612274',
    '4',
    '5',
    'JVLVVTESJLCVKSJSGXXKUTBZLEKNRFB9NNSHVHJXBDIHUJRHBXQJQQBLYER9KQRKFLPZI9EVZFFPTTSCX',
    'S9XVKPZDMI9VHLON9BN9FQLIHWZSNGOYAUH9CWBWZFNTWRZYZODT9UHBHNRXAAGFKTBBZRDNROGPHG999',
    'SB9UKUMXQEDETOCOH9CBKVAPDFHFHFDBUKYQBUULKUUTWBBLARBWHTSRLIZSHLDOBCUOPIHXFNODRO999',
    '1572612275265',
    'SEMARKETMAM9999999999999999' ]
    ```

:::success:Congratulations :tada:
You're monitoring a node for incoming transactions.
:::

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code in the browser.

Click the green button to run the sample code in this guide and see the results in the window.

:::info:
It may take a minute or two to receive data from the IOTA node.
:::

<iframe height="600px" width="100%" src="https://repl.it/@jake91/ZMQ-example-Nodejs?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Next steps

[Start using Masked Authenticated Messaging](../../mam/introduction/overview.md) to send encrypted streams of data that others can subscribe to in the Tangle.

Take a look at our [app blueprints](root://blueprints/0.1/introduction/overview.md) for inspiration.