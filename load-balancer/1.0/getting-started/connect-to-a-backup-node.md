# Connect to a backup node

**In this tutorial, you connect to two nodes and use one as a backup in case the other is offline or does not have the transactions that you request.**

## Prerequisites

To complete this guide, you need the following:

- Node.js 8, or Node.js 10 or higher. We recommend the [latest LTS](https://nodejs.org/en/download/).
- A code editor such as [Visual Studio Code](https://code.visualstudio.com/Download)
- Access to a command-line interface

## Packages

To complete this guide, you need to install the following package:

--------------------
### npm
```bash
npm install iotaledger/client-load-balancer
```
---
### Yarn
```bash
yarn add iotaledger/client-load-balancer
```
--------------------

## Code walkthrough

1. Create a new file called `index.js`, and require the package

    ```js
    const { composeAPI, FailMode, RandomWalkStrategy, SuccessMode } = require('@iota/client-load-balancer');
    ```

2. Configure an API object with two [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet) nodes 

    ```js
    const devnetApi = composeAPI({
        nodeWalkStrategy: new RandomWalkStrategy(
            [
                {
                    "provider": "https://altnodes.devnet.iota.org:443",
                    "depth": 3,
                    "mwm": 9
                },
                {
                    "provider": "https://nodes.devnet.iota.org:443",
                    "depth": 3,
                    "mwm": 9
                }
            ],
            3
        ),
        successMode: SuccessMode.next,
        failMode: FailMode.all,
        timeoutMs: 5000,
        tryNodeCallback: (node) => {
            console.log(`Trying to send request to ${node.provider}`);
        },
        failNodeCallback: (node, err) => {
            console.log(`Failed to send request to ${node.provider}, ${err.message}`);
        }
    });
    ```

    In this tutorial, we use a random walk strategy that selects the next node in the list after every successful request and that tries all nodes before throwing an exception.

    You can find other strategies in the guide for [configuring the API](../guides/configuring-the-api.md).

    :::info:
    If you want to be able to connect to Mainnet nodes, change the `provider` fields to the URLs of Mainnet nodes, and change the `mwm` field to 14.
    :::

3. Send a request to a random node's `getNodeInfo` endpoint
    
    ```js
    devnetApi.getNodeInfo().then(info => {
    console.log("App Name:", info.appName);
    console.log("App Version:", info.appVersion);
    }).catch(error => {
    console.error(`Something went wrong: ${error.message}`);
    });
    ```

    If the API connects to the node, you should see a response object.

    If not, the API will try the other node.

    If both nodes are unavailable, an error will be returned.

:::success:Congratulations :tada:
You can now use the JavaScript client library with the client load balancer, which increases your chances of connecting to an online node.
:::

## Run the code

Click the green button to run the sample code in this tutorial and see the results in the web browser.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Client-load-balancer?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

You can also run the sample code on your own device by using the following command

```bash
node index.js
```

## Next steps

See the GitHub repository for the client load balancer's [API reference](https://github.com/iotaledger/client-load-balancer/tree/master/docs).
