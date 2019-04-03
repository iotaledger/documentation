# Interact with the IRI

**IRI nodes wait to receive transactions from clients on the API port that's set in the `PORT` configuration parameter.**

An IRI node always accepts REST API requests from computers on the same network.

**Note:** If the [`REMOTE` configuration parameter](../references/iri-configuration-options.md#remote) is set to `true`, anyone can connect to the IRI through its public URL or its public IP address.

In the following how-to guide we use NodeJS and the IOTA JavaScript client library to interact with an IRI node on the Devnet.

## Request information about the IRI

You can call the [getNodeInfo](../references/api-reference.md#getnodeinfo) endpoint to request general information about the IRI node.

For more endpoints, see the [API reference](../references/api-reference.md).

### Prerequisites

To use the code samples in this guide, your computer must have the following:

* [Node JS (8+)](https://nodejs.org/en/)
* A code editor such as [Visual Studio Code](https://code.visualstudio.com/Download)
* Access to a command prompt
* An Internet connection

1. Create a working directory called node-info-example

    ```bash
    mkdir node-info-example
    cd node-info-example
    ```

2. In the node-info-example directory, install the [request module](https://github.com/request/request) and the IOTA library by doing the following:
    ```bash
    npm install request --save
    npm install iota.lib.js --save
    ```
3. Create a file called index.js in the node-info-example directory
4. In the index.js file, copy and paste the following code:
    ```javascript
    var request = require('request');

    var command = {
        'command': 'getNodeInfo'
    }

    var options = {
    url: 'https://nodes.devnet.iota.org:443',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-IOTA-API-Version': '1',
        'Content-Length': Buffer.byteLength(JSON.stringify(command))
    },
    json: command
    };

    request(options, function (error, response, data) {
        if (!error && response.statusCode == 200) {
            console.log(JSON.stringify(data));
        }
    });
    ```
    The output should display something like the following:
    ```json
    {
    "appName":"IRI Testnet",
    "appVersion":"1.5.6-RELEASE",
    "jreAvailableProcessors":8,
    "jreFreeMemory":9216518096,
    "jreVersion":"1.8.0_181",
    "jreMaxMemory":51469877248,
    "jreTotalMemory":51469877248,
    "latestMilestone":"HNRPRXQLEOXFQAAIZTYFBCBJPNENNIGSKAUEDFULYYYYVGSUDWLYZVNZTPTFV9OCP9DAMNVJ9JYMOA999",
    "latestMilestoneIndex":1076316,
    "latestSolidSubtangleMilestone":"HNRPRXQLEOXFQAAIZTYFBCBJPNENNIGSKAUEDFULYYYYVGSUDWLYZVNZTPTFV9OCP9DAMNVJ9JYMOA999",
    "latestSolidSubtangleMilestoneIndex":1076316,
    "milestoneStartIndex":434525,
    "neighbors":7,
    "packetsQueueSize":0,
    "time":1548410587420,
    "tips":1364,
    "transactionsToRequest":0,
    "features":["snapshotPruning","dnsRefresher","testnet","zeroMessageQueue","tipSolidification","RemotePOW"],
    "coordinatorAddress":"EQQFCZBIHRHWPXKMTOLMYUYPCN9XLMJPYZVFJSAY9FQHCCLWTOLLUGKKMXYFDBOOYFBLBI9WUEILGECYM",
    "duration":0
    }
    ```
## Next steps

* [Subscribe to real-time events](../how-to-guides/subscribe-to-events-in-an-iri-node.md) in the IRI node.




