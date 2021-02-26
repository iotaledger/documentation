# Run Chronicle on a Linux server

**When you run Chronicle, it subscribes to transaction events on one or more IRI nodes, then saves that transaction data to a ScyllaDB cluster. This way, all transaction data is saved no matter when/if the IRI node prunes it from its ledger during a local snapshot.**

:::warning:
This project is not intended for production use.

This is an alpha project that we will continue to develop and rewrite in Rust, which is faster and more efficient than Elixir in terms of resource and memory management.
:::

## Prerequisites

To complete this tutorial, you need the following:

- [Create a Scylla cluster on a single data center](https://docs.scylladb.com/operating-scylla/procedures/cluster-management/create_cluster/) (Scylla version 3.0.6 or later). At the moment, Chronicle supports only clusters in a single data center.

- [Install Elixir](https://elixir-lang.org/install.html) version 1.8.1 or later and Erlang VM version 22 or later (included with Elixir). If your package manager doesn't offer these versions, use [this tool](https://github.com/asdf-vm/asdf ).

- [Install Phoenix](https://hexdocs.pm/phoenix/installation.html)

- [Install Bazel](https://docs.bazel.build/versions/master/install.html)

When setting up your Scylla cluster, consider the following:

- **Data transmission:** We recommend frames with an MTU (maximum transmission unit) of at least 9000 bytes for communications between ScyllaDB and Chronicle.  

- **Power outage:** Devices running Chronicle and ScyllaDB should have a backup power supply and Internet connection. A power outage for a number of nodes will not affect data consistency if you have at least one active node writing the same queries.

- **Data security:** IOTA transactions provide a trustworthy record of data and value, so securing this data in Chronicle is important. Because Chronicle data is stored in a Scylla database, you can follow the [official instructions](https://docs.scylladb.com/operating-scylla/security/security_checklist/) for setting up authorization, authentication, encryption, and security audits.

## Step 1. Configure Chronicle

1. Clone the repo and change into the `chronicle` directory

    ```bash
    git clone https://github.com/iotaledger/chronicle.git
    cd chronicle
    ```

2. Open the core `config.exs` file

    ```bash
    sudo nano apps/core/config/config.exs
    ```

3. In the `__ DATA_CENTERS__` object, change the IP address from `127.0.0.1` to the IP address of your Scylla cluster

4. Open the broker `config.exs` file

    ```bash
    sudo nano apps/broker/config/config.exs
    ```

5. In the `tx_trytes` array, add the URL of one or more nodes that have ZMQ enabled

    ```bash
    {'zmq.iota.org',5556}
    ```

6. [Download the historical Tangle data](http://u204324-sub2.your-storagebox.de/) from November 2016 to July 2019

    **Username:** u204324-sub2
    **Password:** Ldtd22LiXaztAPUg

7. Move the downloaded files to the `/historical/data` directory

8. Change into the `historical` directory

    ```bash
    cd ..
    ```

9. Make sure that the `dmps.txt` file has all the names of the files that you moved to the `/historical/data` directory (without the `.dmp` file extension), then close the file

## Step 2. Compile Chronicle

1. Install the dependencies

    ```bash
    mix deps.get
    ```

2. Generate the phoenix secret and copy it to the clipboard

    ```bash
    mix phx.gen.secret
    ```

3. Compile the project

    ```bash
    mix deps.compile
    mix compile
    ```

## Step 3. Run Chronicle

To run Chronicle, execute the following command:

```
SECRET_KEY_BASE=theGenerated64-byteSecretString PORT=4000 HOST=localhost MIX_ENV=prod elixir --name app@hostname --cookie "MySecretChronicleCookie" -S mix run --no-halt
```

- `SECRET_KEY_BASE`: Your Phoenix secret from step 2.2
- `PORT`: The port that you want the API server to listen to
- `HOST`: The hostname or IP address that you want the API to listen to

:::info:
If the host is localhost, then the value of the `--name` flag can be `Chronicle@localhost`. Otherwise, replace localhost with your hostname.

Keep the value of the `--cookie` flag secret.
:::

You should see something like the following:

```bash
20:57:18.560 [info] TxFeeder is ready, topic: tx_trytes, host: zmq.iota.org
20:57:18.807 [info] Running ExtendedApiWeb.Endpoint with cowboy 2.6.3 at :::4000 (http)
20:57:18.822 [info] Access ExtendedApiWeb.Endpoint at http://localhost:4000
```

When Chronicle starts, you should see the `imported the last dmp 'milestone' file` message. When you see this message, you can check that the import was successful by opening the `dmps.txt` file and seeing that it's empty.

:::success: Congratulations :tada:
Chronicle is now saving all transaction data to your Scylla cluster.
:::

## Step 4. Test Chronicle

To make sure that Chronicle is receiving transaction data, use the API to query your Scylla cluster.

1. Go to [thetangle.org](https://thetangle.org/) and copy a transaction hash to your clipboard

2. In the command-line interface create a cURL request to the `getTrytes` endpoint of the Chronicle API. Paste your transaction hash into the `hashes` array, and replace the URL with the URL of your Chronicle node such as http://localhost:4000/api

    ```bash
    curl http://host:port/api \
    -X POST \
    -H 'Content-Type: application/json' \
    -H 'X-IOTA-API-Version: 1' \
    -d '{
    "command": "getTrytes",
    "hashes": [""]
    }'
    ```

You should see something like the following:

```json
{
"trytes": [{"address":"JPYUAV9MBDZG9ZX9BAPBBMYFEVORNBIOOZCYPZDZNRGKQYT9HFEXXXBG9TULULJIOWJWQMXSPLILOJGJG","attachmentTimestamp":1567166602904,"attachmentTimestampLowerBound":0,"attachmentTimestampUpperBound":12,"branchTransaction":"OLZDBGOWXCLNZPJZMFUVYPL9COCBSHPIJGIN9L9SNUMMYVZQNDVOCWOYYGJXKHEJGWANXWRBVELB99999","bundle":"VVCRIZWRJ9GOUJRXRBWDEULYKIBIZNKIWGCWZCWVBTVIBAHKVTWLGYQNIZ9JCZJKVEAXABBAUEIGNGWP9","currentIndex":0,"lastIndex":0,"nonce":"JVF9999999RMF99999999999999","obsoleteTag":"HUIWONTO9999999999999999999","signatureMessageFragment":"ODGAHDLDGDNCGDIDRCRCTCTCSCTCSCGADBZAABZACBCBXAABQAGAHDLDGDNCUCPCXC9DTCSCGADB9BBBABQAGAQCPCSCNCQCFDPCBDRCWCGADBVAUAVAZAQAGAQCPCSCNCHDFDIDBDZCGADBVAUAVAZAQAGAQCPCSCNCHDF...","snapshotIndex":null,"tag":"999GOPOW9ATTACHTOTANGLE9ZIG","timestamp":1567166602,"trunkTransaction":"BXZWFMSFBAYWJKJUAKWYTUCZRY9GMNETX9MLN9UKRR9ORGRRIENPERNWCLHBCE9XBMYHAMGFYRRL99999","value":0}]
}
```

:::info:
The `snapshotIndex` field is the index of the milestone that confirmed the transaction.

If this field is `null`, the transaction is pending.
:::

:::warning:
At the moment, Chronicle does not know when a transaction is confirmed.

This issue will be solved when the next version of the IRI is released with [this  pull request](https://github.com/iotaledger/iri/pull/1551).
:::

:::success: Congratulations :tada:
You can successfully query the data in the Chronicle database.
:::

## Step 5. Contribute to the project

Now that you've got Chronicle running, see the [GitHub repository](https://github.com/iotaledger/chronicle) to contribute to issues and to keep up to date with development.

This is an alpha project that we will continue to develop and rewrite in Rust, which is faster and more efficient than Elixir in terms of resource and memory management.


