# Set up a private Tangle

**A private Tangle is one that you control and that contains only nodes that you know. You may want to set up a private Tangle if you want to test an application without using a public IOTA network such as the Mainnet or the Devnet where everyone can see your transactions in the public Tangle.**

For this basic setup, you'll install an IRI node and Compass on the same server or virtual machine with the same configuration settings as the [Devnet](root://getting-started/0.1/network/iota-networks.md).

![Single-node private Tangle](../images/single-node-tangle.svg)

:::info:
If you want try a test private Tangle before setting up your own, you can [try the one-command Tangle](https://github.com/iota-community/one-command-tangle). This utility sets up a private Tangle in a Docker container, allowing you to start running it in one command.

The difference between setting up your own private Tangle and using the one-command Tangle is that the one-command Tangle uses a pre-made seed that you didn't create. As a result, if you want to expose your private Tangle to the Internet, it's better to set up your own private Tangle.
:::

## Prerequisites

A Linux server with the following minimum requirements. If you are on a Windows or macOS operating system, you can [create a Linux server in a virtual machine](root://general/0.1/how-to-guides/set-up-virtual-machine.md).

- A new installation of an Ubuntu 18.04 Server / Virtual Machine
- At least 8GB RAM
- Preferably 4+ CPU cores, the more cores the faster the Merkle tree will be generated.
- At least a 10GB SSD

## Step 1. Install the dependencies

Compass uses [Bazel](https://bazel.build/) to build and [Docker](https://www.docker.com/) to run, so we need to make sure both are installed.

1. Install the dependencies for Bazel

	```bash
	sudo apt-get install pkg-config zip g++ zlib1g-dev unzip python
	```

2. Download the latest Bazel installer

	```bash
	wget https://github.com/bazelbuild/bazel/releases/download/0.18.0/bazel-0.18.0-installer-linux-x86_64.sh
	```

3. Check that you can execute the script before you run it

	```bash
	chmod +x bazel-0.18.0-installer-linux-x86_64.sh
	```

4. Install Bazel under your active user, using the `--user` flag

	```bash
	./bazel-0.18.0-installer-linux-x86_64.sh --user
	```
	You may need to restart your computer after you install Bazel.

5. Install the necessary packages

	```bash
	sudo apt install apt-transport-https ca-certificates curl software-properties-common
	```

6. Install Docker 

	```bash
	curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
	sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
	sudo apt update
	sudo apt install docker-ce
	```
	
7. Install the `jq` tool for formatting JSON data

	```bash
	sudo add-apt-repository universe
	sudo apt install jq
	```

## Step 2. Compute the Merkle tree

For this guide, we use a [Merkle tree](root://getting-started/0.1/network/the-tangle.md#milestones) with a [depth](../references/compass-configuration-options.md) of 16, which allows Compass to send milestones for around 45 days, depending on the interval between them.

:::info:
[See our example Merkle tree compute times](../references/merkle-tree-compute-times.md) that show how the `depth` parameter affects both the time it takes to compute the Merkle tree and the total network uptime.
:::

The Compass repository includes a tool to compute a Merkle tree and save it in a `data` directory for Compass to use later on. 

1. Clone the Compass GitHub repository

	```bash
	git clone https://github.com/iotaledger/compass.git
	cd compass
	```

2. Build the `layers_calculator` tool that will compute the Merkle tree

	```bash
	bazel run //docker:layers_calculator
	```

	:::info:
	If you see a `no such package @io_netty_netty_tcnative_boringssl_static//jar` error, see the [related issue](https://github.com/iotaledger/compass/issues/142#issuecomment-586735326) for guidance.
	:::

	This process can take some time. You should see the following in the output:

	```
	INFO: SHA256 (https://github.com/grpc/grpc-java/archive/fe7f043504d66e1b3f674c0514ce794c8a56884e.zip) = 19c51698d4837d1978a10ed7a01f4e45a0b15bcbd3db44de2a2a1c3bdd1cf234
	Analyzing: target //docker:layers_calculator (8 packages loaded)
	```

3. Create a seed for Compass. Compass will use this seed to derive public/private keys for signing bundles.

	```bash
	cat /dev/urandom |LC_ALL=C tr -dc 'A-Z9' | fold -w 81 | head -n 1 
	```

4. Create a backup of the seed

	:::danger:Keep your seed safe
	An attacker with the seed could send fraudulent milestones and disrupt the operation of the network.
	:::

5. Change into the directory that contains the scripts for setting up and running Compass

	```bash
	cd docs/private_tangle
	```

6. Copy the example configuration file

	```bash
	cp config.example.json config.json
	```

7. Open the `config.json` file and replace the value of the `seed` field with the seed you created in step 3

	```bash
	nano config.json
	```

8. Change the value of the `depth` field to `16`

	The finished `config.json` file should look like this:

	```json
	{
		"seed": "MYSEEDHEREPLEASEREPLACEMEIMMEDIATELYWITHSOMETHINGSECURE99999999999999999999999999",
		"powMode": "CURLP81",
		"sigMode": "CURLP27",
		"security": 1,
		"depth": 16,
		"milestoneStart": 0,
		"mwm": 9,
		"tick": 60000,
		"host": "http://localhost:14265"
	}
	```

	:::info:
	Find out how to [customize the configuration of Compass](../references/compass-configuration-options.md) for your own private Tangle.
	:::

9. Compute the Merkle tree by executing the script in the `docs/private_tangle` directory

	```bash
	sudo ./01_calculate_layers.sh
	```

This process will take a while (with a 4 core virtual machine it takes around 15 minutes). After the process finishes, the root of the Merkle tree is displayed in the output:

```shell
[main] INFO org.iota.compass.LayersCalculator - Calculating 65536 addresses.
...
[main] INFO org.iota.compass.LayersCalculator - Successfully wrote Merkle Tree with root: JMRTYHMGNZGNOLPSSBVLWRPMGIAMOXPLURNDIBKXIFTCJCLOYKH9FMVNKPBVFVMGSUFEYVUUIEARFQXAK
```

The Merkle tree is stored in the data directory, so Compass can use the private keys when it starts running.

## Step 3. Run an IRI node

Compass must send milestones to an IRI node. Compass sends milestones to an IRI node through an HTTP RPC API.

To make the IRI node recognize Compass transactions as trusted milestones, we created a script that uses the default IRI Docker container with some additional parameters.

The IRI node must use a snapshot.txt file to set the initial state of the ledger.

The `snapshot.example.txt` file puts the total IOTA supply of 2.7Pi in the first address that's derived from the following seed:
`SEED99999999999999999999999999999999999999999999999999999999999999999999999999999`. The first address (index 0) of this seed is  `FJHSSHBZTAKQNDTIKJYCZBOZDGSZANCZSWCNWUOCZXFADNOQSYAHEJPXRLOVPNOQFQXXGEGVDGICLMOXX` (excluding the checksum). 

1. Create a `snapshot.txt` file

	```bash
	touch snapshot.txt
	nano snapshot.txt
	```

2. Add the following line to the `snapshot.txt` file:

	```shell
	FJHSSHBZTAKQNDTIKJYCZBOZDGSZANCZSWCNWUOCZXFADNOQSYAHEJPXRLOVPNOQFQXXGEGVDGICLMOXX;2779530283277761
	```

	:::warning:
	Do not exceed the maximum supply of 2.7Pi
	:::

3. Run the IRI

	```bash
	sudo ./02_run_iri.sh
	```

	:::info:
	If you want to allow neighbors to automatically connect to your node, edit the `02_run_iri.sh` file and add the `--auto-tethering-enabled true` flag to the list of other flags.

	Find out which [other flags](root://node-software/0.1/iri/references/iri-configuration-options.md) you can change to customize the IRI for your own private Tangle.
	:::

	:::info:
	If you see a `malformed snapshot state file` error, check the snapshot.txt file and make sure that you didn't include a line break at the end of the line.
	
	If you see a `NumberFormatException` error or an `IllegalArgumentException` error, check that no space characters are either side of the semicolon.
	:::

4. Press **Ctrl** + **C** in the command-line interface. IRI will continue to run in the background.

:::danger:Important
If the IRI node to which Compass is connected becomes compromised, an attacker could manipulate Compass to receive favorable treatment. Possible scenarios include the following:
- Return tip transactions that prioritize the attackers transactions over the regular tip selection algorithm.
- Return tip transactions that conflict with the ledger state (double spend IOTA tokens) causing Compass to send an inconsistent milestone. IRI nodes will not accept this milestone and no more transactions will be confirmed.
- Stop propagating milestone transactions to the rest of the network, causing no more transactions to be confirmed.
:::

## Step 4. Run Compass

After you've created the Merkle tree and you're running an IRI node, you can run Compass.

1. Go back to your `compass` directory and run Bazel

	```bash
	cd ~/compass/
	bazel run //docker:coordinator
	```
	
2. Change into the directory that contains the scripts for setting up and running Compass

	```bash
	cd docs/private_tangle
	```

3. Run Compass

	```bash
	sudo ./03_run_coordinator.sh -bootstrap -broadcast
	```

	:::info:
	Compass enters an indefinite `while` loop and starts sending milestones.

	When the `-bootstrap` flag is passed during setup, Compass creates a chain of four milestones that sequentially reference the previous milestone.

	Then, Compass sends milestones by doing the following:
	* Ask the IRI node for tip transactions ([tip selection](root://node-software/0.1/iri/concepts/tip-selection.md))
	* Ask the IRI node to broadcast the milestone
	* Sleep until the next tick interval
	:::

:::success:Compass is sending milestones in your own IOTA network! :tada:
If you restart Compass, you don't need to pass it the `-bootstrap` flag (Compass won't start if you do). But, you should pass it 	the `-broadcast` flag as a security measure so that Compass broadcasts its milestones to the IRI node.
:::

## Step 5. Test your network

When the application is running, you can interact with the network through the IRI node's API port at the following address http://localhost:14265.

For a list of API endpoints see the [IRI API reference](root://node-software/0.1/iri/references/api-reference.md).

--------------------
### getBalances
Call the [`getBalances`](root://node-software/0.1/iri/references/api-reference.md#getbalances) endpoint to get the total balance of your seed.

 ```js
 var request = require('request');

 const iota = require('@iota/core');

 Iota = iota.composeAPI({
     provider: 'http://localhost:14265'
 });

 var address = iota.generateAddress('SEED99999999999999999999999999999999999999999999999999999999999999999999999999999',0);

 getBalance(address);

 function getBalance(address) {

     var command = {
     'command': 'getBalances',
     'addresses': [
     address
     ],
     'threshold':100
     }

     var options = {
     url: 'http://localhost:14265',
     method: 'POST',
     headers: {
     'Content-Type': 'application/json',
     'X-IOTA-API-Version': '1'
     },
     json: command
     };

     request(options, function (error, response, data) {
         if (!error && response.statusCode == 200) {
         console.log(JSON.stringify(data,null,1));
         }
     });
 }
 ```
---
### Example response

This example response shows that we have a balance of 2.7Pi.

```json
{
 "balances": [
  "2779530283277761"
 ],
 "references": [
  "BDZPAONKWQTVCXFFO9GBTJ9GGWPRLITXZ9BMYALTCVWNOLFYPNHFJHPDWICRPGCZWUNDQHV9UDEXGW999"
 ],
 "milestoneIndex": 7,
 "duration": 1
}
```
--------------------
 
## Step 6. Connect to the network through a wallet

If you want to send and receive transactions on the network through a user interface, you can use the [IOTA Light Wallet](https://github.com/iotaledger/wallet/releases).

![IOTA Light Wallet](../images/light-wallet-test-tangle.png)

1. Open the wallet and log in with your seed

	`SEED99999999999999999999999999999999999999999999999999999999999999999999999999999`


1. To connect to your node, go to **Tools** > **Edit Node Configuration**, and enter the URL of your node (http://localhost:14265).

	![Wallet configuration](../images/light-wallet-node-configuration.png)

2. Go to **RECEIVE** > **ATTACH TO TANGLE** to see your full balance

3. Send test transactions and see them confirmed by Compass milestones

## Next steps

- Try adding multiple nodes to your network to make a similar architecture to the [Devnet](root://getting-started/0.1/network/iota-networks.md)

![Multi-node private Tangle](../images/multi-node-tangle.svg)
