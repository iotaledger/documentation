# Local snapshot

**A local snapshot is the process in which an IRI node records the state of its ledger in snapshot files. When an IRI node starts running, it must synchronize its ledger with its neighbors, starting from a particular milestone. Each version of the IRI has a hard-coded milestone that nodes can start from. To synchronize faster, an IRI node can choose to use local snapshot files.**

:::info:
Local snapshots are available only in version 1.6.0 and later of the IRI.
:::

## Snapshot files

Snapshot files store the state of an IRI node's ledger at regular intervals. 

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

On startup, IRI nodes can use the snapshot files as an entry point to synchronize their ledgers with their neighbors.

## Example scenario of a local snapshot

**Configuration parameter:**

- `LOCAL_SNAPSHOTS_DEPTH` = 100
- `LOCAL_SNAPSHOTS_INTERVAL_SYNCED` = 10

**Current milestone index:**

- 990, 100

In this scenario, the IRI node is synchronized. So, at milestone 990, 110, the IOTA node will do the following:

- Take the previous 100 milestones and add them to the snapshot.meta file as [seen milestones](../references/data-in-the-snapshot-metadata-file.md#seen-milestone)
- Find the solid transactions and add them as [solid entry points](../references/data-in-the-snapshot-metadata-file.md#solid-entry-point)
- In the snapshot.state file, add a list of all addresses and their balances

When the IRI node restarts, it can use the snapshot files as the entry point to synchronize its ledger.

## Transaction pruning

During a local snapshot, an IRI node can prune transactions from its ledger if they were confirmed by an old milestone.

An old milestone is one that has an index greater than the combined value of the [`LOCAL_SNAPSHOTS_DEPTH`](../references/iri-configuration-options.md#local-snapshots-depth) and [`LOCAL_SNAPSHOTS_PRUNING_DELAY`](../references/iri-configuration-options.md#local-snapshots-pruning-delay) configuration options.

## Example scenario of transaction pruning

**Configuration parameters:**

- `LOCAL_SNAPSHOTS_PRUNING_DELAY` = 50,000
- `LOCAL_SNAPSHOTS_DEPTH` = 100

**Current milestone index:**

- 990, 100

In this scenario, the sum of `LOCAL_SNAPSHOTS_PRUNING_DELAY` + `LOCAL_SNAPSHOTS_DEPTH` is 50, 100. Therefore, an IRI node will prune transactions that were confirmed by any milestone with an index lower than 940, 000 (990, 100 - 50,100). As a result all transactions between milestones 940, 000 and 990, 100 will be kept in the ledger.




