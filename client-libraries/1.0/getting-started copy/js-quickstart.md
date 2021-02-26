# JavaScript quickstart

**In this quickstart, you learn the basics of IOTA development in Node.js, from setting up a development environment to listening for live transaction in the Tangle.**

In this quickstart, you will learn how to:

1. Set up a developer environment

2. Install packages

3. Connect to a node

## Step 1. Set up a developer environment

To use the JavaScript client library, you need a set of programming tools, which make up a development environment.

1. Install the [latest long-term support (LTS) version of Node.js](https://nodejs.org/en/download/)

2. Install a code editor. We recommend [Visual Studio Code](https://code.visualstudio.com/Download), but many more are available.

3. Open a command-line interface

    Depending on your operating system, a command-line interface could be [PowerShell in Windows](https://docs.microsoft.com/en-us/powershell/scripting/getting-started/getting-started-with-windows-powershell?view=powershell-6), the [Linux Terminal](https://www.howtogeek.com/140679/beginner-geek-how-to-start-using-the-linux-terminal/) or [Terminal for macOS](https://macpaw.com/how-to/use-terminal-on-mac).

4. Create a new directory to use for your project and change into it

    ```bash
    mkdir myNewProject
    cd myNewProject
    ```

5. Initialize a new project

    ```bash
    npm init
    ```

Now you have a `package.json` file, which includes the packages and applications your project depends on, and specific metadata like the project's name, description, and author. Whenever you install packages, those packages will be added to this file as a dependency. For more information, see this excellent [package.json guide](https://flaviocopes.com/package-json/).

## Step 2. Install packages

The JavaScript client library is organized in packages, which contain related methods. For example, the `core` package contains methods for requesting information from nodes, creating transactions, and sending them to nodes.

All the packages are listed in the [iota.js GitHub repository](https://github.com/iotaledger/iota.js/tree/next/packages).

To install the library packages, you can use one of the following package managers:

- [npm](https://www.npmjs.com/) (included in Node.js downloads)
- [Yarn](https://yarnpkg.com/)

In a command-line interface, change into the directory where you initialized your project, and install the packages

--------------------
### npm
This command installs the `core` package

```bash
npm install @iota/core
```
---
### Yarn
This command installs the `core` package

```bash
yarn add @iota/core
```
--------------------

If everything went well, you should see something like the following in the output. You can ignore any 'npm WARN' messages.

```shell
+ @iota/core@1.0.0-beta.8
added 19 packages from 10 contributors and audited 68 packages in 5.307s
found 0 vulnerabilities
```

After installing a package, you'll have a `node_modules` directory, which contains the `core` package code and its dependencies.

Now you can start coding.

## Step 3. Connect to a node

It's best practice to make sure that you're connected to a synchronized node before you start sending transactions to it. This way, you know that it has an up-to-date view of the Tangle. For more information, see [About nodes](root://getting-started/1.1/running-nodes/overview.md).

Whenever you connect to a node, you need to know which IOTA network it's in. Here, we connect to a node in the Devnet, which is the IOTA networks that you can use for testing.

1. Go to the IOTA Foundation [Discord](https://discord.iota.org) and enter **!milestone** in the `botbox` channel

    ![Entering !milestone on Discord](../images/discord-milestone-check.PNG)

    The Discord bot should return the current `latestMilestoneIndex` field from a [node quorum](root://getting-started/1.1/references/glossary.md#node-quorum).

2. In the directory where you initialized your project, create a new file called `index.js`

3. To check if your node is synchronized, copy and paste the following code into the `index.js` file

    ```js
    // Require the IOTA library
    const Iota = require('@iota/core');

    // Create a new instance of the IOTA API object
    // Use the `provider` field to specify which node to connect to
    const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
    });

    // Call the `getNodeInfo()` method for information about the IOTA node and the Tangle
   IOTA.getNodeInfo()
    // Convert the returned object to JSON to make the output more readable
    .then(info => console.log(JSON.stringify(info, null, 1)))
    .catch(err => {
        // Catch any errors
        console.log(err);
    });
    ```

4. Execute the file

    ```bash
    node index.js
    ```

The IOTA node returns something like the following:

```json
{
    "appName": "IRI Testnet",
    "appVersion": "1.5.6-RELEASE",
    "jreAvailableProcessors": 8,
    "jreFreeMemory": 12052395632,
    "jreVersion": "1.8.0_181",
    "jreMaxMemory": 22906667008,
    "jreTotalMemory": 16952328192,
    "latestMilestone": "FPRSBTMKOP9JTTQSHWRGMPT9PBKYWFCCFLZLNWQDFRCXDDHZEFIEDXRIJYIMVGCXYQRHSZQYCTWXJM999",
    "latestMilestoneIndex": 1102841,
    "latestSolidSubtangleMilestone": "FPRSBTMKOP9JTTQSHWRGMPT9PBKYWFCCFLZLNWQDFRCXDDHZEFIEDXRIJYIMVGCXYQRHSZQYCTWXJM999",
    "latestSolidSubtangleMilestoneIndex": 1102841,
    "milestoneStartIndex": 434525,
    "neighbors": 3,
    "packetsQueueSize": 0,
    "time": 1549482118137,
    "tips": 153,
    "transactionsToRequest": 0,
    "features": ["snapshotPruning", "dnsRefresher", "testnet", "zeroMessageQueue", "tipSolidification", "RemotePOW"],
    "coordinatorAddress": "GYISMBVRKSCEXXTUPBWTIHRCZIKIRPDYAHAYKMNTPZSCSDNADDWAEUNHKUERZCTVAYJCNFXGTNUH9OGTW",
    "dbSizeInBytes": 144800000,
    "duration": 0
}
```

### Reading the response object

If the `latestMilestoneIndex` field is equal to the one you got from Discord and the `latestSolidSubtangleMilestoneIndex` field, the IOTA node is synchronized.

If not, try connecting to a different node. The [iota.dance website](https://iota.dance/) includes a list of Mainnet nodes. Or, you can [run your own node](root://node-software/1.0/overview.md).

In the `features` array, you can see that this node also support [remote proof of work](root://getting-started/1.1/references/glossary.md#remote-proof-of-work) (RemotePOW). As a result, you can use this node to do proof of work instead of doing it on your local device.

Also, this node has its zero message queue (ZMQ) enabled, so you can use it to [listen for live transactions](../how-to-guides/js/listen-for-transactions.md).

For more information about these fields, see the [node API reference](root://hornet/1.1/references/api-reference.md#getNodeInfo).

:::success: Congratulations :tada:
You've confirmed your connection to a synchronized node.
:::

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code in the browser.

Click the green button to run the code and see the results in the window.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Connect-to-a-node?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Support the project

If the IOTA JavaScript client library has been useful to you and you feel like contributing, consider posting a [bug report](https://github.com/iotaledger/iota.js/issues/new), [feature request](https://github.com/iotaledger/iota.js/issues/new), or a [pull request](https://github.com/iotaledger/iota.js/pulls/).  

### Running tests

Make your changes on a single package or across multiple packages and test the them by running the following command from the root directory:

```bash
npm run test
```
To run tests for a specific package, change into the package's directory and run the `npm run test` command.

### Updating the documentation

If your changes affect the documentation, please update it by editing the [`JSDoc`](http://usejsdoc.org) annotations and running `npm run docs` from the root directory.

## Get involved

[Join our Discord channel](https://discord.iota.org) where you can:

- Take part in discussions with IOTA developers and the community
- Ask for help
- Share your knowledge to help others

We have many channels, including the following:

- `-dev`: These channels are read-only and are where developers discuss topics with each other and where you can see any code updates from GitHub.

- `-discussion`: These channels are where you can participate.

## Next steps

Continue learning with our [JavaScript workshop](../how-to-guides/js/get-started.md).

