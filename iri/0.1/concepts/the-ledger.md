# The ledger

**IRI nodes keep a record of all valid transactions that they receive by storing them in a ledger, which is an embedded, append-only RocksDB database.**

After validating a transaction, IRI nodes append [data about that transaction](../references/data-in-the-ledger.md) to the ledger.

The ledger is the primary data source for an IRI node. The data in the ledger is a complete history of all the valid transactions that an IRI node has seen.

## Ledger synchronization

When an IRI node starts running, it synchronizes its ledger by solidifying every transaction that approves each milestone, starting from an **entrypoint milestone** and ending at the latest milestone.

The older the entrypoint milestone, the longer synchronization takes.

<dl><dt>solidify</dt><dd>Request transactions from neighbor IRI nodes until all transactions and their referenced transactions are stored in the ledger.</dd></dl>

An IRI node is considered synchronized when its `latestMilestoneIndex` field is equal to the `latestSolidSubtangleMilestoneIndex` field.

The `latestMilestoneIndex` field is the index of the latest milestone that the IRI has received from its neighbors.

The `latestSolidSubtangleMilestoneIndex` field is the index of the latest milestone for which the IRI node has all the transactions that the milestone directly and indirectly references.

**Tip:** The `getNodeInfo` API endpoint returns this information. Try [interacting with an IRI node](../how-to-guides/interact-with-an-iri-node.md) to see this information.
