# C quickstart

**In this quickstart, you learn the basics of IOTA development in C, from setting up a development environment to listening for live transaction on the Tangle.**

In this quickstart, you will learn how to:

1. Set up a developer environment

2. Install packages

3. Connect to a node

## Step 1. Set up a developer environment

To use the C client library, you need a set of programming tools, which make up a development environment.

:::info:
In our guides, we use a Linux [Ubuntu 18.04 LTS](https://www.ubuntu.com/download/server) operating system. If you are on a Windows or Mac operating system, you can try and run these examples on your operating system, or you can [create a Linux server in a virtual machine](root://general/0.1/how-to-guides/set-up-virtual-machine.md).
:::

1. [Install the Bazel build tool](https://docs.bazel.build/versions/master/install.html)

    :::info:
    If you're new to [Bazel](https://docs.bazel.build/versions/master/getting-started.html), we recommend reading their getting-started documentation.
    :::

2. Create a directory for your project

	```bash
	sudo mkdir my-c-iota-project
	```

Now you're ready to start installing packages.

## Step 2. Install packages

The C client library is organized in packages, which contain related methods. All the IOTA-related methods such as requesting information from nodes, creating transactions, and sending them to nodes, are located in the [`api` package](https://github.com/iotaledger/entangled/tree/develop/cclient/api).

1. In the root of your project directory, create a file called `WORKSPACE` and add the following content, which loads the library's dependencies.

    Replace the `$ENTANGLED_COMMIT_HASH` placeholder with the latest Git commit hash of the `entangled` repository. 

    Replace the `$RULES_IOTA_COMMIT_HASH` placeholder with the latest Git commit hash of the `rules_iota` repository. 

    ```bash
    git_repository(
        name = "entangled",
        commit = "$ENTANGLED_COMMIT_HASH",
        remote = "https://github.com/iotaledger/entangled.git",
    )

    # external library build rules
    git_repository(
        name = "rules_iota",
        commit = "$RULES_IOTA_COMMIT_HASH",
        remote = "https://github.com/iotaledger/rules_iota.git",
    )

    load("@rules_iota//:defs.bzl", "iota_deps")

    iota_deps()
    ```

2. Create an `iota_client_service` directory in which to store configuration files and the networking code

3. In the `iota_client_service` directory, create a `config.h` file and add the following:

    ```cpp
    // The IOTA node to connect to and its port
    #define CONFIG_IRI_NODE_URI "nodes.devnet.iota.org"

    #define CONFIG_IRI_NODE_PORT 443

    // Whether your server has TLS enabled
    #define CONFIG_ENABLE_HTTPS

    // If your server has TLS enabled, this constant defines your TLS certificate
    #define TLS_CERTIFICATE_PEM \
            "-----BEGIN CERTIFICATE-----\r\n" \
            "MIIDQTCCAimgAwIBAgITBmyfz5m/jAo54vB4ikPmljZbyjANBgkqhkiG9w0BAQsF\r\n" \
            "ADA5MQswCQYDVQQGEwJVUzEPMA0GA1UEChMGQW1hem9uMRkwFwYDVQQDExBBbWF6\r\n" \
            "b24gUm9vdCBDQSAxMB4XDTE1MDUyNjAwMDAwMFoXDTM4MDExNzAwMDAwMFowOTEL\r\n" \
            "MAkGA1UEBhMCVVMxDzANBgNVBAoTBkFtYXpvbjEZMBcGA1UEAxMQQW1hem9uIFJv\r\n" \
            "b3QgQ0EgMTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALJ4gHHKeNXj\r\n" \
            "ca9HgFB0fW7Y14h29Jlo91ghYPl0hAEvrAIthtOgQ3pOsqTQNroBvo3bSMgHFzZM\r\n" \
            "9O6II8c+6zf1tRn4SWiw3te5djgdYZ6k/oI2peVKVuRF4fn9tBb6dNqcmzU5L/qw\r\n" \
            "IFAGbHrQgLKm+a/sRxmPUDgH3KKHOVj4utWp+UhnMJbulHheb4mjUcAwhmahRWa6\r\n" \
            "VOujw5H5SNz/0egwLX0tdHA114gk957EWW67c4cX8jJGKLhD+rcdqsq08p8kDi1L\r\n" \
            "93FcXmn/6pUCyziKrlA4b9v7LWIbxcceVOF34GfID5yHI9Y/QCB/IIDEgEw+OyQm\r\n" \
            "jgSubJrIqg0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMC\r\n" \
            "AYYwHQYDVR0OBBYEFIQYzIU07LwMlJQuCFmcx7IQTgoIMA0GCSqGSIb3DQEBCwUA\r\n" \
            "A4IBAQCY8jdaQZChGsV2USggNiMOruYou6r4lK5IpDB/G/wkjUu0yKGX9rbxenDI\r\n" \
            "U5PMCCjjmCXPI6T53iHTfIUJrU6adTrCC2qJeHZERxhlbI1Bjjt/msv0tadQ1wUs\r\n" \
            "N+gDS63pYaACbvXy8MWy7Vu33PqUXHeeE6V/Uq2V8viTO96LXFvKWlJbYK8U90vv\r\n" \
            "o/ufQJVtMVT8QtPHRh8jrdkPSHCa2XV4cdFyQzR1bldZwgJcJmApzyMZFo6IQ6XU\r\n" \
            "5MsI+yMRQ+hDKXJioaldXgjUkK642M4UwtBV8ob2xJNDd2ZhwLnoQdeXeGADbkpy\r\n" \
            "rqXRfboQnoZsG4q5WTP468SQvvG5\r\n" \
            "-----END CERTIFICATE-----\r\n"

    // A sensible depth for the node to use for tip selection
    #define DEPTH 3

    // The minimum weight magnitude for the Devnet (for the Mainnet use 14)
    #define MINIMUM_WEIGHT_MAGNITUDE 9

    // The security level to use for your addresses
    #define SECURITY_LEVEL 2
    ```

    In this example, we configure our project to connect to a [Devnet](root://getting-started/0.1/network/iota-networks.md) [node](root://getting-started/0.1/network/nodes.md), so we use a [minimum weight magnitude](root://getting-started/0.1/network/minimum-weight-magnitude.md) of 9. We also define a [security level](root://getting-started/0.1/clients/security-levels.md) of 2 to use for generating addresses.

3. In the `iota_client_service` directory, create a `client_service.c` file and add the following:

    ```cpp
    #include "cclient/api/core/core_api.h"
    #include "cclient/api/extended/extended_api.h"

    #include "common/trinary/tryte_ascii.h"
    #include <inttypes.h>

    #include "config.h"
    #include "client_service.h"

    void init_iota_client(iota_client_service_t *const service)
    {
        service->http.path = "/";
        service->http.content_type = "application/json";
        service->http.accept = "application/json";
        service->http.host = CONFIG_IRI_NODE_URI;
        service->http.port = CONFIG_IRI_NODE_PORT;
        service->http.api_version = 1;
    #ifdef CONFIG_ENABLE_HTTPS
        service->http.ca_pem = TLS_CERTIFICATE_PEM;
    #else
        service->http.ca_pem = NULL;
    #endif
        service->serializer_type = SR_JSON;
        iota_client_core_init(service);
        iota_client_extended_init();
    }
    ```

    This code handles the [service](https://github.com/iotaledger/entangled/blob/develop/cclient/service.h) connection to the node.

4. In the `iota_client_service` directory, create a `client_service.h` file and add the following:

    ```cpp
    #include "cclient/api/core/core_api.h"
    #include "cclient/api/extended/extended_api.h"

    void init_iota_client(iota_client_service_t *const service);
    ```
    
    This code declares the `init_iota_client()` function. This way, your compiled program will contain just one copy of the function, and every module in your program can use it.

5. In the `iota_client_service` directory, create a `BUILD` file and add the following:

    ```bash
    package(default_visibility = ["//visibility:public"])

    cc_library(
        name = "service",
        srcs = [
            "client_service.c",
        ],
        hdrs = [
            "client_service.h",
            "config.h"
        ],
        deps = [
            "@entangled//cclient/api",
        ],
    )
    ```

    This code creates the rules for building the configuration and service targets that you just wrote.

Now you can request information from the node.

## Step 3. Connect to a node

It's best practice to make sure that you're connected to a [synchronized node](root://getting-started/0.1/network/nodes.md#synchronized-nodes) before you start sending transactions to it. This way, you know that it has an up-to-date view of [the Tangle](root://getting-started/0.1/network/the-tangle.md).

Whenever you connect to a node, you need to know which [IOTA network](root://getting-started/0.1/network/iota-networks.md) it's in. Here, we connect to a node on the Devnet, which is the IOTA networks that you can use for testing.

1. Go to the IOTA Foundation [Discord](https://discord.iota.org) and enter **!milestone** in the `botbox` channel

    ![Entering !milestone on Discord](../images/discord-milestone-check.PNG)

    The Discord bot should return the current `latestMilestoneIndex` field from a [node quorum](root://getting-started/0.1/network/nodes.md#node-quorum).

2. In the root of your project directory, create a new directory called `examples`

3. In the `examples` directory, create a file called `hello_world.c` and add the following:

    ```cpp
    #include "cclient/api/core/core_api.h"
    #include "cclient/api/extended/extended_api.h"

    #include <inttypes.h>
    #include "iota_client_service/config.h"
    #include "iota_client_service/client_service.h"

    retcode_t get_iota_node_info(iota_client_service_t *iota_client_service, get_node_info_res_t *node_response) {
        retcode_t ret = RC_ERROR;
        // Connect to the node
        ret = iota_client_get_node_info(iota_client_service, node_response);

        // Define variables to determine whether trit conversion succeeds
        trit_t trytes_out[NUM_TRYTES_HASH + 1];
        size_t trits_count = 0;
        // If the node returned data, print it to the console
        if (ret == RC_OK) {
            printf("appName %s \n", node_response->app_name->data);
            printf("appVersion %s \n", node_response->app_version->data);

            // Convert the returned trits to trytes
            // For more information about trits and trytes, see the IOTA documentation portal: https://docs.iota.org/docs/getting-started/0.1/introduction/ternary
            trits_count = flex_trits_to_trytes(trytes_out, NUM_TRYTES_HASH,
                                            node_response->latest_milestone, NUM_TRITS_HASH,
                                            NUM_TRITS_HASH);
            if (trits_count == 0) {
                printf("trit converting failed\n");
                goto done;
            }
            // Empty this string: we don't need it anymore
            trytes_out[NUM_TRYTES_HASH] = '\0';

            printf("latestMilestone %s \n", trytes_out);
            printf("latestMilestoneIndex %u\n", (uint32_t) node_response->latest_milestone_index);
            printf("latestSolidSubtangleMilestoneIndex %u\n", (uint32_t)
            node_response->latest_solid_subtangle_milestone_index);

            printf("milestoneStartIndex %u\n", node_response->milestone_start_index);
            printf("neighbors %d \n", node_response->neighbors);
            printf("packetsQueueSize %d \n", node_response->packets_queue_size);
            printf("tips %u \n", node_response->tips);
            printf("transactionsToRequest %u\n", node_response->transactions_to_request);
            size_t num_features = get_node_info_req_features_num(node_response);
            for (; num_features > 0; num_features--) {
              printf("%s, ", get_node_info_res_features_at(node_response, num_f$
              printf("\n");
            }

        } else {
            printf("Failed to connect to the node.");
        }

        done:

        // Free the response object
        get_node_info_res_free(&node_response);
        return ret;
    }

    int main(void) {
        // Create the client service
        iota_client_service_t iota_client_service;
        init_iota_client(&iota_client_service);
        // Allocate a response object
        get_node_info_res_t *node_response = get_node_info_res_new();
        // Call the getNodeInfo endpoint
        get_iota_node_info(&iota_client_service, node_response);
    }
    ```

4. In the `examples` directory, create a `BUILD` file that builds your code

    ```bash
    package(default_visibility = ["//visibility:public"])

    cc_binary(
        name = "hello_world",
        srcs = ["e01_hello_world.c"],
        copts = ["-DLOGGER_ENABLE"],
        linkopts = ["-pthread"],
        deps = [
            "//iota_client_service:service",
        ],
    )
    ```

5. Execute the file

    ```bash
    bazel run -c opt examples:hello_world
    ```

The node returns something like the following:

``` 
appName IRI Devnet
appVersion 1.8.1
latestMilestone SFQXAJ9MXLHTVHWVKGYYOOCECPIMSZUYYCFORHBRRQUCWLV9SJHOOYNLSSHIJHUKAJAEIBSBOFBCNR999
latestMilestoneIndex 1429040
latestSolidSubtangleMilestoneIndex 1429040
milestoneStartIndex 434527
neighbors 8
packetsQueueSize 0
tips 4478
transactionsToRequest 0
features: testnet,
RemotePOW,
snapshotPruning,
loadBalancer
```

### Reading the response object

If the `latestMilestoneIndex` field is equal to the one you got from Discord and the `latestSolidSubtangleMilestoneIndex` field, the node is synchronized.

If not, try connecting to a different node. The [iota.dance website](https://iota.dance/) includes a list of Mainnet nodes. Or, you can [run your own node](root://node-software/0.1/iri/how-to-guides/quickstart.md).

In the `features` list, you can see that this node also support [remote proof of work](root://getting-started/0.1/transactions/proof-of-work.md) (RemotePOW). As a result, you can use this node to do proof of work instead of doing it on your local device.

For more information about these fields, see the [IRI API reference](root://node-software/0.1/iri/references/api-reference.md#getNodeInfo).

:::success: Congratulations :tada:
You've confirmed your connection to a synchronized node.
:::

## Run the code

These code samples are hosted on [GitHub](https://github.com/iota-community/c-iota-workshop).

To get started you need [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed on your device.

You also need a C development environment.

In the command-line, do the following:

```bash
git clone https://github.com/iota-community/c-iota-workshop.git
cd c-iota-workshop
bazel run -c opt examples:hello_world
```

In the console, you should see the response object.

## Get involved

[Join our Discord channel](https://discord.iota.org) where you can:

- Take part in discussions with IOTA developers and the community
- Ask for help
- Share your knowledge to help others

We have many channels, including the following:

- `-dev`: These channels are read-only and are where developers discuss topics with each other and where you can see any code updates from GitHub.

- `-discussion`: These channels are where you can participate.

## Next steps

Continue learning with our [C workshop](../how-to-guides/c/get-started.md).

Read our [developer's handbook](root://getting-started/0.1/references/quickstart-dev-handbook.md) for guidance on whether you should run your own node, whether you need a private IOTA network, and what you need to consider for both.