# Plan your IRI configuration

**Before you run IRI, you should consider whether you need to override some of its default settings. This guide gives you some advice about what to consider.**

:::info:
You must stop IRI before making any configuration changes.
:::

## Are you planning on accessing your node on the Internet?

If you want to access your node's API from any network, you must expose its API to the Internet by using one of the following options:

- [Set up a reverse proxy](../how-to-guides/set-up-a-reverse-proxy.md)
- Open port 14265 on your server and set the [`API_Host`](../references/iri-configuration-options.md) configuration option to 0.0.0.0

If you just want to access your node's API on your local network, you can use the default configuration settings.

## Which IOTA network do you want to use?

The IOTA network in which your node runs is determined by the following configuration options:

- [`MWM`](../references/iri-configuration-options.md#mwm)
- [`NEIGHBORS`](../references/iri-configuration-options.md#neighbors)
- [`TESTNET`](../references/iri-configuration-options.md#testnet)

### MWM

The [minimum weight magnitude](root://getting-started/0.1/network/minimum-weight-magnitude.md) (MWM) is important because nodes use this setting to determine whether transactions are valid. To be valid, transactions must contain a [proof of work](root://getting-started/0.1/transactions/proof-of-work.md) that used at least the MWM in the node's configuration.

### NEIGHBORS

The neighbors to which your node connects must use either the same minimum weight magnitude as your node or a higher one.

If one of your neighbors accepts transactions with a MWM of 9 and your node accepts transactions with a MWM of 14, you and your neighbor will have two different views of the Tangle.

### TESTNET

The `TESTNET` configuration option determines whether your node runs on the Mainnet.

If you set this option to `true`, your node will be configured to run on the Devnet by default. You don't need to change any other testnet options because the defaults set up IRI to listen to the Devnet Coordinator and accept transactions with a [minimum weight magnitude] of 9.

To run on another network such as a private Tangle, you must configure the other testnet options. For example, you must configure your node to recognize the Coordinator's address in your network and accept transactions with your chosen  minimum weight magnitude. 

## Do you want your node to do proof of work?

[Proof of work](root://getting-started/0.1/transactions/proof-of-work.md) (PoW) is a resource-intensive operation that uses computational power on your device.

Allowing your node to do remote PoW, means that anyone who sends a request to the [`attachToTangle`](../references/api-reference.md#attachToTangle) endpoint can ask your node to do proof of work for their transactions.

By default, the `attachToTangle` endpoint is disabled in the `REMOTE_LIMIT_API` configuration option.

If you want to enable this option only for certain users, you can remove it from the `REMOTE_LIMIT_API` configuration option, and [set up a reverse proxy server](../how-to-guides/set-up-a-reverse-proxy.md) to limit calls to the `attachToTangle` endpoint to certain IP addresses. Or, you can [install a proof of work proxy server](root://proof-of-work-proxy/1.0/overview.md) to intercept calls to your node's `attachToTangle` endpoint.

## Do you want to keep all transactions in the ledger?

Over time, the ledger of an IRI node accumulates many transactions, which often cause it to become larger than its available memory. To stop the ledger from becoming too large, you can choose to delete old transactions at regular intervals in local snapshots.

:::info:
Local snapshots are available only in version 1.6.0 and later of the IRI.
:::

During a local snapshot, an IRI node can delete transactions from its ledger if they were confirmed by an old milestone.

An old milestone is one that has an index greater than the combined value of the [`LOCAL_SNAPSHOTS_DEPTH`](../references/iri-configuration-options.md#local-snapshots-depth) and [`LOCAL_SNAPSHOTS_PRUNING_DELAY`](../references/iri-configuration-options.md#local-snapshots-pruning-delay) configuration options.

If you want to delete old transactions, you need to make sure that the [`LOCAL_SNAPSHOTS_ENABLED` and the `LOCAL_SNAPSHOTS_PRUNING_ENABLED`](../references/iri-configuration-options.md#local-snapshots) configuration options are set to `true`. Then, change the values of the `LOCAL_SNAPSHOTS_PRUNING_DELAY` and the `LOCAL_SNAPSHOTS_DEPTH` configuration options, depending on how long you want to keep transactions in the ledger.

Milestones are sent approximately every two minute. So, use the following formula to calculate the number of days that new transactions will remain in the ledger:

- **Total milestone index:** `LOCAL_SNAPSHOTS_PRUNING_DELAY` + `LOCAL_SNAPSHOTS_DEPTH` 

- **Total time in minutes:** Total milestone index / 120

- **Total time in days:** Total time in minutes / 24

### Example of deleting old transaction from the ledger

**Configuration parameters:**

- `LOCAL_SNAPSHOTS_PRUNING_DELAY` = 50,000
- `LOCAL_SNAPSHOTS_DEPTH` = 100

**Current milestone index:**

- 990, 100

In this scenario, the sum of `LOCAL_SNAPSHOTS_PRUNING_DELAY` + `LOCAL_SNAPSHOTS_DEPTH` is 50, 100. Therefore, the node will prune transactions that were confirmed by any milestone with an index lower than 940, 000 (990, 100 - 50,100). As a result all transactions between milestones 940, 000 and 990, 100 will be kept in the ledger.

## Do you want to create snapshot files?

After a snapshot, nodes store the state of the ledger in snapshot files, which any node can use as an entry point during synchronization.

If you want to create snapshot files, you need to make sure that the [`LOCAL_SNAPSHOTS_ENABLED`](../references/iri-configuration-options.md#local-snapshots) configuration option is set to `true`. Then, change the value of the `LOCAL_SNAPSHOTS_DEPTH` configuration option, depending on how often you want to create snapshot files.

If an IRI node is synchronized, it creates snapshot files at the milestone intervals that are defined in the [`LOCAL_SNAPSHOTS_INTERVAL_SYNCED`](../references/iri-configuration-options.md#local-snapshots-interval-synced) configuration option.

If an IRI node isn't synchronized, it creates snapshot files at the milestone intervals that are defined in the [`LOCAL_SNAPSHOTS_INTERVAL_UNSYNCED`](../references/iri-configuration-options.md#local-snapshots-interval-unsynced) configuration option.

:::info:
At each interval, the snapshot file is overwritten.
:::

Local snapshots result in the following snapshot files:
- **snapshot.meta:** [Transaction data that the IRI uses to start synchronizing its ledger with neighbor IRI nodes](../references/data-in-the-snapshot-metadata-file.md)
- **snapshot.state:** A list of all addresses that have a balance greater than 0 at the time of the local snapshot.

:::info:
These files are located in the path of the [`LOCAL_SNAPSHOTS_BASE_PATH`](../references/iri-configuration-options.md#local-snapshots-base-path) configuration option.
:::

#### Example of creating snapshot files

**Configuration parameter:**

- `LOCAL_SNAPSHOTS_DEPTH` = 100
- `LOCAL_SNAPSHOTS_INTERVAL_SYNCED` = 10

**Current milestone index:**

- 990, 100

In this scenario, the IRI node is synchronized. So, at milestone 990, 110, the node will do the following:

- Take the previous 100 milestones and add them to the snapshot.meta file as [seen milestones](../references/data-in-the-snapshot-metadata-file.md#seen-milestone)
- Find the solid transactions and add them as [solid entry points](../references/data-in-the-snapshot-metadata-file.md#solid-entry-point)
- In the snapshot.state file, add a list of all addresses and their balances

When the IRI node restarts, it can use the snapshot files as the entry point to synchronize its ledger.

## Next steps

[Install and run IRI](../how-to-guides/install-iri.md).