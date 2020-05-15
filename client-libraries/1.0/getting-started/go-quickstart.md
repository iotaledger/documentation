# Go quickstart

**In this quickstart, you learn the basics of IOTA development in Go, from setting up a development environment to connecting to a node.**

In this quickstart, you will learn how to:

1. Set up a developer environment

2. Install packages

3. Connect to a node

## Step 1. Set up a developer environment

To use the Go client library, you need a set of programming tools, which make up a development environment.

To download the Go library and its dependencies, we recommend that you use [vgo modules](https://github.com/golang/go/wiki/Modules) (since Go 1.11) to manage dependencies in your project.

1. [Install Go version 1.11 or later](https://golang.org/doc/install)

2. Install a code editor. We recommend [Visual Studio Code](https://code.visualstudio.com/Download), but many more are available.

3. Open a command-line interface

    Depending on your operating system, a command-line interface could be [PowerShell in Windows](https://docs.microsoft.com/en-us/powershell/scripting/getting-started/getting-started-with-windows-powershell?view=powershell-6), the [Linux Terminal](https://www.howtogeek.com/140679/beginner-geek-how-to-start-using-the-linux-terminal/) or [Terminal for macOS](https://macpaw.com/how-to/use-terminal-on-mac).

4. In any directory outside of `$GOPATH`, create a directory for your project and initialize it. Replace the `<your-module-path>` placeholder with the path to your project such as `github.com/me/awesome-project`.

	```bash
	go mod init <your-module-path>
	```

Now you have a `go.mod` file and a `go.sum` file, and you're ready to start installing packages.

## Step 2. Install packages

The Go client library is organized in packages, which contain related methods. For example, the `api` package contains methods for requesting information from nodes, creating transactions, and sending them to nodes.

All the packages are listed on the [Go GitHub repository](https://github.com/iotaledger/iota.go/).

This command installs the `api` package

```bash
go get github.com/iotaledger/iota.go/api
```

If everything went well, you should see something like the following in the output:

```shell
go: finding github.com/iotaledger/iota.go/api latest
go: finding github.com/iotaledger/iota.go v1.0.0-beta.10
go: downloading github.com/iotaledger/iota.go v1.0.0-beta.10
```

After installing the `api` package, it is added as a dependency in your module's `go.mod` file, and the package's dependencies are added to you `go.sum` file.

Now you can start coding.

## Step 3. Connect to a node

It's best practice to make sure that you're connected to a [synchronized node](root://getting-started/0.1/network/nodes.md#synchronized-nodes) before you start sending transactions to it. This way, you know that it has an up-to-date view of [the Tangle](root://getting-started/0.1/network/the-tangle.md).

Whenever you connect to a node, you need to know which [IOTA network](root://getting-started/0.1/network/iota-networks.md) it's in. Here, we connect to a node on the Devnet, which is the IOTA networks that you can use for testing.

1. Go to the IOTA Foundation [Discord](https://discord.iota.org) and enter **!milestone** in the `botbox` channel

    ![Entering !milestone on Discord](../images/discord-milestone-check.PNG)

    The Discord bot should return the current `latestMilestoneIndex` field from a [node quorum](root://getting-started/0.1/network/nodes.md#node-quorum).

2. In the directory where you initialized your project, create a new file called `connectToANode.go`

3. To check if your node is synchronized, copy and paste the following code into the `connectToANode.go` file

    ```go
    package main

    import (
        . "github.com/iotaledger/iota.go/api"
        "fmt"
    )

    var node = "https://nodes.devnet.iota.org:443"

    func main() {
        // Create a new instance of the IOTA API object
        // and specify which node to connect to
        api, err := ComposeAPI(HTTPClientSettings{URI: node})
        must(err)

        // Call the `getNodeInfo()` method for information about the node and the Tangle
        nodeInfo, err := api.GetNodeInfo()
        must(err)

        fmt.Println(nodeInfo)

    }

    func must(err error) {
        if err != nil {
            panic(err)
        }
    }
    ```

4. Execute the file

    ```bash
    go run connectToANode.go
    ```

The node returns something like the following:

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
    "coordinatorAddress": "EQQFCZBIHRHWPXKMTOLMYUYPCN9XLMJPYZVFJSAY9FQHCCLWTOLLUGKKMXYFDBOOYFBLBI9WUEILGECYM",
    "duration": 0
}
```

### Reading the response object

If the `latestMilestoneIndex` field is equal to the one you got from Discord and the `latestSolidSubtangleMilestoneIndex` field, the node is synchronized.

If not, try connecting to a different node. The [iota.dance website](https://iota.dance/) includes a list of Mainnet nodes. Or, you can [run your own node](root://node-software/0.1/iri/how-to-guides/quickstart.md).

In the `features` array, you can see that this node also support [remote proof of work](root://getting-started/0.1/transactions/proof-of-work.md) (RemotePOW). As a result, you can use this node to do proof of work instead of doing it on your local device.

Also, this node has its zero message queue (ZMQ) enabled, so you can use it to [listen for live transactions](root://core/1.0/tutorials/go/listen-for-transactions.md).

For more information about these fields, see the [IRI API reference](root://node-software/0.1/iri/references/api-reference.md#getNodeInfo).

:::success: Congratulations :tada:
You've confirmed your connection to a synchronized node.
:::

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code in the browser.

Click the green button to run the code and see the results in the window.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Connect-to-a-node-Go?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Support the project

If the Go library has been useful to you and you feel like contributing, consider posting a [bug report](https://github.com/iotaledger/iota.go/issues/new-issue), feature request or a [pull request](https://github.com/iotaledger/iota.go/pulls/). 

We thank everyone for their contributions. In order for your pull requests to be accepted, they must fulfill the following criteria:
- You must write tests for your additions with Ginkgo
- You must write example code that describes the parameters and the functionality of your additions 
- Your pull request must pass the continuous integration configuration

### Writing tests with Ginkgo

Before your pull requests can be accepted, you must test your code in Ginkgo.

1. Download Ginkgo

	```bash
	go get github.com/onsi/ginkgo/ginkgo
	go get github.com/onsi/gomega/...
	```

2. If you've written a new package, generate a corresponding test-suite file

	```bash
	cd <dir-of-your-package>
	ginkgo bootstrap
	```

3. Generate a new testing file

	```bash
	ginkgo generate <package-name>
	```

After creating a testing file, you'll have following two files:

- `<package-name>_suite_test.go`
- `<package-name>_test.go`

:::info:
You can use the existing tests as a reference on how to write Ginkgo tests or
you can [read the documentation](https://onsi.github.io/ginkgo/).
:::

4. Run your tests
	```bash
	go test -v
	=== RUN   TestAddress
	Running Suite: Address Suite
	============================
	Random Seed: 1542616006
	Will run 11 of 11 specs

	•••••••••••
	Ran 11 of 11 Specs in 0.261 seconds
	SUCCESS! -- 11 Passed | 0 Failed | 0 Pending | 0 Skipped
	--- PASS: TestAddress (0.26s)
	PASS
	ok  	github.com/iotaledger/iota.go/address	0.264s
	```

### Updating the documentation

If your changes affect the documentation, please update it.

1. If non existent, add a `.examples` directory in your newly created package

2. Create a new file with the following convention: `<package-name>_examples_test.go` inside
the `.examples` directory

3. Write examples in the following schema:
	```
	// i req: s, The ASCII string to convert to Trytes.
	// o: Trytes, The Trytes representation of the input ASCII string.
	// o: error, Returned for non ASCII string inputs.
	func ExampleASCIIToTrytes() {
		trytes, err := converter.ASCIIToTrytes("IOTA")
		if err != nil {
			// handle error
			return
		}
		fmt.Println(trytes) // output: "SBYBCCKB"
	}
	```

| **Symbol**     | **Description** |
|:---------------|:--------|
| i req | Describes a parameter to the function. |
| i | Describes an optional parameter to the function. |
| o | Describes a return value of the function. |

Syntax:

- For parameters: `<symbol>: <parameter_name>, <description>.`  
- For return values: `<symbol>: <type>, <description>.`
- Example function: `Example<OriginFunctionName>`

## Get involved

[Join our Discord channel](https://discord.iota.org) where you can:

- Take part in discussions with IOTA developers and the community
- Ask for help
- Share your knowledge to help others

We have many channels, including the following:

- `-dev`: These channels are read-only and are where developers discuss topics with each other and where you can see any code updates from GitHub.

- `-discussion`: These channels are where you can participate.

## Next steps

Continue learning with our [core Go workshop](root://core/1.0/getting-started/get-started-go.md).

Read our [developer's handbook](root://getting-started/0.1/references/quickstart-dev-handbook.md) for guidance on whether you should run your own node, whether you need a private IOTA network, and what you need to consider for both.