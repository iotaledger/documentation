# Run an IRI node in a Docker container

**When you run the IRI in a Docker container, your computer becomes a Linux server for an IRI node, which gives you direct access to an IOTA network. By running an IRI node, you help the IOTA network to become more distributed by adding to the number of ledgers and validating your neighbor IRI node's transactions.**

## Prerequisites

* To run the IRI, your computer must meet the following minimum requirements:
    * 4GB RAM
    * 64-bit processor
    * A [public IP address](root://general/0.1/how-to-guides/expose-your-local-device.md) that's either static or connected to a dynamic DNS service such as [duckdns.org](https://www.duckdns.org)

* By default, the IRI uses the following ports. If you're running a Linux server on your local network, you must [forward these ports to your computer's public IP address](root://general/0.1/how-to-guides/expose-your-local-device.md).

---

The IRI Docker container is suitable for the following operating systems:
* Linux
* Mac
* Windows

If you're using a Linux operating system, add `sudo` before all the commands in the following tasks.

The IRI is Java software, so it must be run in a Java runtime environment (JRE).
The IRI Docker container contains the necessary software to run the IRI.

You have two options for downloading the IRI Docker container:
* [Download the pre-built Docker container](#download-the-pre-built-iri-docker-container)(quickest option)
* [Build the Docker container from the source code](#build-the-iri-docker-container-from-the-source-code)

## Install Docker

To build the IRI Docker container, Docker 17.05+ (for multi-stage build support) must be installed on your computer.

1. [Install Docker](https://docs.docker.com/install/#supported-platforms). If you're running a version of Mac or Windows that's older than the system requirements, install the [Docker toolbox](https://docs.docker.com/toolbox/overview/) instead.

2. Make sure that Docker is installed

    ```bash
    docker run hello-world
    ```

    You should see some Docker information like the following:

    ```
    Unable to find image 'hello-world:latest' locally
    latest: Pulling from library/hello-world
    1b930d010525: Pull complete
    Digest: sha256:2557e3c07ed1e38f26e389462d03ed943586f744621577a99efb77324b0fe535
    Status: Downloaded newer image for hello-world:latest

    Hello from Docker!
    This message shows that your installation appears to be working correctly.

    To generate this message, Docker took the following steps:
    1. The Docker client contacted the Docker daemon.
    2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
        (amd64)
    3. The Docker daemon created a new container from that image which runs the
        executable that produces the output you are currently reading.
    4. The Docker daemon streamed that output to the Docker client, which sent it
        to your terminal.

    To try something more ambitious, you can run an Ubuntu container with:
    docker run -it ubuntu bash

    Share images, automate workflows, and more with a free Docker ID:
    https://hub.docker.com/

    For more examples and ideas, visit:
    https://docs.docker.com/get-started/
    ```
  
## Download the pre-built IRI Docker container

The Docker container for the pre-built IRI Java file is available on the IOTA GitHub repository.

```bash
docker pull iotaledger/iri:latest
```

## Build the IRI Docker container from the source code

Instead of downloading the pre-built Docker container, you may want to build the file from the source code for any of the following reasons:
* You want to be sure that the code you run is the same as the source code
* You want to modify the code before you run it

1. [Install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

2. Make sure that Git is installed

    ```bash
    git --version
    ```

    You should see the version number of your Git installation.

3. Build the latest version of the IRI

    ```bash
    git clone https://github.com/iotaledger/iri.git
    cd iri
    export TAG=$(git describe --tags $(git rev-list --tags --max-count=1))
    git checkout ${TAG}
    docker build -t iri .
    ```

## Run the IRI

You can configure the IRI by passing in [IRI configuration options](../references/iri-configuration-options.md) as flags.

1. Run the IRI with the `-p` flag to specify the API port

    ```bash
    docker run --name iri iotaledger/iri:latest --remote -p 14265
    ```

    If you want to save your configuration options in an IRI configuration file, you must pass the path to that file along with the `-c` flag. For example, if you save a config.ini file in the `/path/to/conf/config.ini` on your Docker host, then add `-c /path/to/conf/config.ini` to the DOCKER RUN command.

    **Notes:**
    * If you built the IRI Docker container from the source code, you must change the value of the `-name` flag to `iri iri:latest`
    * To have the IRI Docker container restart on every reboot, add the `--restart=always` flag to the DOCKER RUN command

2. Call the [getNodeInfo](../references/api-reference.md#getnodeinfo) endpoint to request general information about the IRI node

    ```bash
    curl -s http://localhost:14265 -X POST -H 'X-IOTA-API-Version: 1' -H 'Content-Type: application/json' -d '{"command": "getNodeInfo"}' | jq
    ```

    You should see something like the following in the output:

    ```json
    {
    "appName":"IRI",
    "appVersion":"1.6.0-RELEASE",
    "jreAvailableProcessors":1,
    "jreFreeMemory":1037385664,
    "jreVersion":"1.8.0_201",
    "jreMaxMemory":4294967296,
    "jreTotalMemory":2147483648,
    "latestMilestone":"999999999999999999999999999999999999999999999999999999999999999999999999999999999",
    "latestMilestoneIndex":933210,
    "latestSolidSubtangleMilestone":"999999999999999999999999999999999999999999999999999999999999999999999999999999999",
    "latestSolidSubtangleMilestoneIndex":933210,
    "milestoneStartIndex":-1,
    "lastSnapshottedMilestoneIndex":933210,
    "neighbors":0,
    "packetsQueueSize":0,
    "time":1548407444641,
    "tips":0,
    "transactionsToRequest":0,
    "features":["snapshotPruning","dnsRefresher","tipSolidification"],
    "coordinatorAddress":"KPWCHICGJZXKE9GSUDXZYUAPLHAKAHYHDXNPHENTERYMMBQOPSQIDENXKLKCEYCPVTZQLEEJVYJZV9BWU",
    "duration":26
    }
    ```
    
    You'll notice in the output that the value of the `neighbors` field is 0. The IRI node is not yet connected to an IOTA network. To do so, you need to connect to [neighbor IRI nodes](../concepts/neighbor-iri-node.md).

3. [Find neighbors](../how-to-guides/find-neighbor-iri-nodes.md) and add their URL or IP addresses to your config.ini file

Now that your node is up and running, it'll start to [synchronize its ledger with the network](../concepts/the-ledger.md#ledger-synchronization). Give your node some time to synchronize, or read our troubleshooting guide if your IRI node isn't synchronizing.

## Check that the IRI is synchronized

The IRI is considered synchronized when the `latestMilestoneIndex` field is equal to the `latestSolidSubtangleMilestoneIndex` field.

The `latestMilestoneIndex` field is the index of the latest milestone that the IRI has received from its neighbors.

The `latestSolidSubtangleMilestoneIndex` field is the index of the latest milestone for which the IRI node's ledger has all the transactions that the milestone directly and indirectly references.

The `latestMilestoneIndex` and `latestSolidSubtangleMilestoneIndex` fields are accurate only when the IRI node is connected to synchronized neighbors.

1. To check the actual `latestMilestoneIndex` field, go to our [Discord](https://discordapp.com/invite/fNGZXvh) and enter **!milestone** in one of the channels

    ![Entering !milestone on Discord](../discord-milestone-check.PNG)

2. To check these fields for your IRI node, call the `getNodeInfo` API endpoint

    ```bash
    curl -s http://localhost:14265 -X POST -H 'X-IOTA-API-Version: 1' -H 'Content-Type: application/json' -d '{"command": "getNodeInfo"}'
    ```

**Note:** It may take some time for the IRI to synchronize. For help with any issues, read our [troubleshooting guide](../references/troubleshooting.md).

## Next steps

* [Interact with an IRI node](../how-to-guides/interact-with-an-iri-node.md)
* [Subscribe to events in an IRI node](../how-to-guides/subscribe-to-events-in-an-iri-node.md)
