# Local snapshot

**When an IRI node starts running, it must synchronize its ledger with its neighbors, starting from the oldest milestone (entrypoint) in the version of the IRI that it's running. To synchronize faster, an IRI node can choose to use local snapshot files as the entrypoint.**

A local snapshot is the process in which an IRI node records the state of its ledger in snapshot files.

**Note:** Local snapshots are available only in version 1.6.0 and higher of the IRI.

## Snapshot files

Snapshot files store the state of an IRI node's ledger at regular intervals. 

If an IRI node is [synchronized](../concepts/the-ledger.md#ledger-synchronization), it creates snapshot files at the milestone intervals that are defined in the [`LOCAL_SNAPSHOTS_INTERVAL_SYNCED`](../references/iri-configuration-options.md#local-snapshots-interval-synced) configuration option.

If an IRI node isn't synchronized, it creates snapshot files at the milestone intervals that are defined in the [`LOCAL_SNAPSHOTS_INTERVAL_UNSYNCED`](../references/iri-configuration-options.md#local-snapshots-interval-unsynced) configuration option.

At each interval, the snapshot file is overwritten.

Local snapshots create the following snapshot files:
* **snapshot.meta:** [A list of transaction data that the IRI uses to start synchronizing its ledger with neighbor IRI nodes](../references/data-in-the-snapshot-metadata-file.md)
* **snapshot.state:** A list of all addresses that have a balance greater than 0 at the time of the local snapshot.

**Note:** These files are located in the path of the [`LOCAL_SNAPSHOTS_BASE_PATH`](../references/iri-configuration-options.md#local-snapshots-base-path) configuration option.

On startup, IRI nodes can use the snapshot files as an entrypoint to synchronize their ledgers with their neighbor IRI nodes.

## Example scenario of a local snapshot

**Configuration parameter:**

* `LOCAL_SNAPSHOTS_DEPTH` = 100
* `LOCAL_SNAPSHOTS_INTERVAL_SYNCED` = 10

**Current milestone index:**

* 990, 100

In this scenario, the IRI node is synchronized. Therefore, at milestone 990, 110, the node will do the following:

* Take the previous 100 milestones and add them to the snapshot.meta file as [seen milestones](../references/data-in-the-snapshot-metadata-file.md#seen-milestone)
* Find the solid transactions and add them as [solid entrypoints](../references/data-in-the-snapshot-metadata-file.md#solid-entrypoint)
* In the snapshot.state file, add a list of all addresses and their balances

When the IRI node restarts, it can use the snapshot files as the entrypoint to [synchronize its ledger](../concepts/the-ledger.md#ledger-synchronization).

## Pruning of old transactions

During a local snapshot, an IRI node can prune transactions from its ledger if they were confirmed by an old milestone.

The milestone must be older than the value of the [`LOCAL_SNAPSHOTS_DEPTH`](../references/iri-configuration-options.md#local-snapshots-depth) configuration option by the number of milestones that's defined in the [`LOCAL_SNAPSHOTS_PRUNING_DELAY`](../references/iri-configuration-options.md#local-snapshots-pruning-delay).

## Example scenario of pruning old transactions

**Configuration parameters:**

* `LOCAL_SNAPSHOTS_PRUNING_DELAY` = 50,000
* `LOCAL_SNAPSHOTS_DEPTH` = 100

**Current milestone index:**

* 990, 100

In this scenario, the sum of `LOCAL_SNAPSHOTS_PRUNING_DELAY` + `LOCAL_SNAPSHOTS_DEPTH` is 50, 100. Therefore, an IRI node will prune transactions that were confirmed by any milestone before 940, 000 (990, 100 - 50,100). As a result all transactions between milestones 940, 000 and 990, 100 will be kept in the ledger.




