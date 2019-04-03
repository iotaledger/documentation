# Subscribe to events in the IRI

**If an IRI node has the ZMQ port enabled, you can subscribe to its events such as transaction confirmations. These events give you real-time data from an IOTA network.**

You may want to subscribe to events in the [zero message queue (ZMQ)](../concepts/zero-message-queue.md) to do the following:

* Monitor an address for when a transaction is sent to it and confirmed
* Create a Tangle visualisation website, such as [thetangle.org](https://thetangle.org/)

You can subscribe to events in the ZMQ by doing the following:

1. Install the open-source ZMQ library

2. Create a ZMQ socket and connect it to an IRI node that has the [`ZMQ-enabled` configuration parameter](../references/iri-configuration-options.md#zmq-enabled) set to `true`

3. Subscribe to events on the ZMQ

In the following how-to guide we use NodeJS, but you could use any [programming language that is supported by the ZMQ library](http://zguide.zeromq.org/page:all).

## Listen for recently confirmed transactions

You can subscribe to the `sn` event on the ZMQ of the IRI to listen for recently confirmed transactions. The data that is returned from the `sn` event is the following:
* The index of the first milestone that referenced the transaction
* The transaction hash

### Prerequisites

To use the code samples in this guide, your computer must have the following:

* [Node JS (8+)](https://nodejs.org/en/)
* A code editor such as [Visual Studio Code](https://code.visualstudio.com/Download)
* Access to a command prompt
* An Internet connection

1. Create a working directory called zmq-example

    ```bash
    mkdir zmq-example
    cd zmq-example
    ```

2. In the zmq-example directory, install the zeromq library

    ```bash
    npm install zeromq --save
    ```

3. Create a file called index.js in the zmq-example directory

4. In the index.js file, copy and paste the following:

    ```javascript
    let zmq = require('zeromq');
    //Create a zmq socket
    let sock = zmq.socket('sub');

    //Connect the ZMQ socket to the IRI by passing the `connect` function the URL or the IP address of the IRI and the ZMQ port
    sock.connect('tcp://zmq.devnet.iota.org:5556');
    //Subscribe to the confirmed transactions event
    sock.subscribe('sn');

    //Create a callback function to process the data that is returned from the ZMQ
    sock.on('message', msg => {
    //Split the data into an array
    const data = msg.toString().split(' ');
    console.log(`Transaction confirmed by milestone index: ${data[1]}` );
    console.log(`Transaction hash: ${data[2]}` );
    });
    ```

    The output should display something like the following:
    ```shell
    Transaction confirmed by milestone index: 964091
    Transaction hash: QUU9NXGQBKF9XVIVOGAPEMELTEKANNJPUFCEEFWHQKRASFGDUQNSFMRXULPDSLXUZU9NVQQEBAQLVG999
    Transaction confirmed by milestone index: 964091
    Transaction hash: DXFNIOMKEOETZXSMGEDUIY9JFWCFQTGSVJHIUWMQWKCUMCTYZRWAMVURZYJPYGUBZPUELKVZSALNNU999
    Transaction confirmed by milestone index: 964091
    Transaction hash: OHRNZFLVXJVHBT9HNOQWIOQHICJ9NVTLKAPYLBUVVGIRTYGUSZKWINSUTSJJGPBBFLNCGUFTVYFNNF999
    Transaction confirmed by milestone index: 964091
    Transaction hash: QNCPDSSMPISSVXBENGGNNBTRBSLCBXTVBLTZLH9DFNXUWWPQNAIFJPAQENDUYL9XTWOMNURAGRFNWN999
    ```
## Next steps

Use your knowledge of the ZMQ to build an application that monitors the IRI for other [events](../references/zmq-events.md). 
