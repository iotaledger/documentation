# Python quickstart

**In this quickstart, you learn the basics of IOTA development in Python, from setting up a development environment to connecting to a node.**

In this quickstart, you will learn how to:

1. Set up a developer environment

2. Install packages

3. Connect to a node

## Step 1. Set up a developer environment

To use the Python client library, you need a set of programming tools, which make up a development environment.

Although it's not necessary, we recommend using [virtual environments](https://realpython.com/python-virtual-environments-a-primer/) like we do in this guide.

1. [Install one of the supported version of Python](https://www.python.org/downloads/):

- Python 2.7,
- Python 3.5,
- Python 3.6,
- Python 3.7

2. If you installed Python 2.7, install the virtual environment package

    ```bash
    pip install virtualenv
    ```

3. Install a code editor. We recommend [Visual Studio Code](https://code.visualstudio.com/Download), but many more are available.

4. Open a command-line interface

    Depending on your operating system, a command-line interface could be [PowerShell in Windows](https://docs.microsoft.com/en-us/powershell/scripting/getting-started/getting-started-with-windows-powershell?view=powershell-6), the [Linux Terminal](https://www.howtogeek.com/140679/beginner-geek-how-to-start-using-the-linux-terminal/) or [Terminal for macOS](https://macpaw.com/how-to/use-terminal-on-mac).

5. Create a new virtual environment

    ```bash
    # Python 2:
    virtualenv myNewEnv

    # Python 3
    python3 -m venv myNewEnv
    ```

6. Change into your virtual environment's directory

    ```bash
    cd myNewEnv
    ```

7. Activate your virtual environment

    ```bash
    Scripts/activate
    ```

Now you are ready to start installing packages.

## Step 2. Install packages

The Python client library, or commonly known as PyOTA, is organized in packages,
which contain related methods.

To install the library packages from [PyPi](https://pypi.org/project/PyOTA/),
use the [PIP package manager](https://pip.pypa.io/en/stable/).

```bash
pip install pyota
```

If everything went well, you should see something like the following in the output:

```shell
Successfully installed certifi-2019.9.11 cffi-1.13.2 chardet-3.0.4 class-registry-2.1.2 cryptography-2.8 enum34-1.1.6 filters-1.3.2 idna-2.8 ipaddress-1.0.23 py2casefold-1.0.1 pyOpenSSL-19.1.0 pycparser-2.19 pyota-2.1.0 pysha3-1.0.2 python-dateutil-2.8.1 pytz-2019.3 regex-2019.11.1 requests-2.22.0 six-1.13.0 typing-3.7.4.1 urllib3-1.25.7
```

After installing a package, you'll have the client library code and its dependencies.

Now you can start coding.

## Step 3. Connect to a node

It's best practice to make sure that you're connected to a [synchronized node](root://getting-started/0.1/network/nodes.md#synchronized-nodes) before you start sending transactions to it. This way, you know that it has an up-to-date view of [the Tangle](root://getting-started/0.1/network/the-tangle.md).

Whenever you connect to a node, you need to know which [IOTA network](root://getting-started/0.1/network/iota-networks.md) it's in. Here, we connect to a node on the Devnet, which is the IOTA networks that you can use for testing.

1. Go to the IOTA Foundation [Discord](https://discord.iota.org) and enter **!milestone** in the `botbox` channel

    ![Entering !milestone on Discord](../images/discord-milestone-check.PNG)

    The Discord bot should return the current `latestMilestoneIndex` field from a [node quorum](root://getting-started/0.1/network/nodes.md#node-quorum).

2. In the directory where you initialized your project, create a new file called `index.py`

3. To check if your node is synchronized, copy and paste the following code into the `index.py` file

    ```python
    from iota import Iota

    # Create a new instance of the IOTA API object
    # Specify which node to connect to
    api = Iota(adapter = 'https://nodes.devnet.iota.org:443')

    # Call the `get_node_info()` method for information about the node and the Tangle
    response = api.get_node_info()

    print(response)
    ```

4. Execute the file

    ```bash
    python index.py
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

Also, this node has its zero message queue (ZMQ) enabled, so you can use it to [listen for live transactions](root://core/1.0/tutorials/python/listen-for-transactions.md).

For more information about these fields, see the [IRI API reference](root://node-software/0.1/iri/references/api-reference.md#getNodeInfo).

:::success: Congratulations :tada:
You've confirmed your connection to a synchronized node.
:::

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code in the browser.

Click the green button to run the code and see the results in the window.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Connect-to-a-node-Python?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Get involved

[Join our Discord channel](https://discord.iota.org) where you can:

- Take part in discussions with IOTA developers and the community
- Ask for help
- Share your knowledge to help others

We have many channels, including the following:

- `-dev`: These channels are read-only and are where developers discuss topics with each other and where you can see any code updates from GitHub.

- `-discussion`: These channels are where you can participate.

## Next steps

Continue learning with our [Python workshop](root://core/1.0/getting-started/get-started-python.md).

Read our [developer's handbook](root://getting-started/0.1/references/quickstart-dev-handbook.md) for guidance on whether you should run your own node, whether you need a private IOTA network, and what you need to consider for both.

Find the in-depth Python library documentation on the [PyOTA documentation page](https://pyota.readthedocs.io/en/latest/).