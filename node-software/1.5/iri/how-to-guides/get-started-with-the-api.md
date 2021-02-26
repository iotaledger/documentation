# Send requests to a node

**Nodes wait to receive transactions from clients on the API port that's set in the `PORT` configuration parameter. You can send HTTP requests to this port to interact with a node's REST API, which allows you to read/write data to the Tangle.**

## Prerequisites

To use the code samples in this tutorial, you must have the following:

- [Node.js (8+)](https://nodejs.org/en/) or [Python (3+)](https://www.python.org/downloads/) and [PIP](https://pip.pypa.io/en/stable/installing/)
- A code editor such as [Visual Studio Code](https://code.visualstudio.com/Download)
- Access to a command-line interface

## Request information about the IOTA node

You can call the [getNodeInfo](../references/api-reference.md#getnodeinfo) endpoint to request general information about the IOTA node.

For more endpoints, see the [API reference](../references/api-reference.md).

1\. Install the libraries

--------------------
### Node.js

```bash
npm install request --save
```
---
### Python

```bash
pip install urllib3
```
--------------------

2\. Import the libraries and encode a request to the `getNodeInfo` endpoint

--------------------
### Node.js

```bash
var request = require('request');

var command = {
    'command': 'getNodeInfo'
}
```
---
### Python

```bash
import json
import urllib3

command = json.dumps({
    "command":"getNodeInfo"
})
```
--------------------

3\. Send the request to the IOTA node

--------------------
### Node.js

```bash
var options = {
url: 'https://nodes.devnet.iota.org:443',
method: 'POST',
headers: {
    'Content-Type': 'application/json',
    'X-IOTA-API-Version': '1'
},
json: command
};

request(options, function (error, response, data) {
    if (!error && response.statusCode == 200) {
        console.log(JSON.stringify(data));
    }
});
```
---
### Python

```bash
http = urllib3.PoolManager()

response = http.request('POST', 'https://nodes.devnet.iota.org:443',
                 headers={'Content-Type': 'application/json', 'X-IOTA-API-Version': '1'},
                 body=command)

results = json.loads(response.data.decode('utf-8'))
print(json.dumps(results, indent=1, sort_keys=True))
```
--------------------

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
"coordinatorAddress":"GYISMBVRKSCEXXTUPBWTIHRCZIKIRPDYAHAYKMNTPZSCSDNADDWAEUNHKUERZCTVAYJCNFXGTNUH9OGTW",
"dbSizeInBytes": 144800000,
"duration":0
}
```

:::info:Want to know what these fields mean?
[Take a look at the `getNodeInfo()` endpoint](root://hornet/1.1/references/api-reference.md#getNodeInfo).
:::

## Run the code

Click the green button to run the sample code in this tutorial and see the results in the web browser.

### Node.js

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Interact-with-a-node-Nodejs?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

### Python

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Interact-with-a-node?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Next steps

Change the `command` variable to a different [API endpoint](../references/api-reference.md) and see the results.




