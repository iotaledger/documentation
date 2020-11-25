# About the Tangle

**The Tangle is the distributed ledger in IOTA that contains an up-to-date history of transactions. This section introduces you to the Tangle.**

The Tangle is a single source of truth. Any user, anywhere in the world, is able to send valid transactions to any node, and that transaction will be replicated across the rest of the network to form one version of truth: The Tangle.

All transactions in the Tangle are attached to two others to form a [directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) (DAG).

![A directed acyclic graph](../images/dag.png)

Each transaction in the graph is represented by a box, and each attachment is represented by a line.

When a new transaction is attached to the Tangle, it is attached to two previous transactions, adding two new lines to the graph.

## References

Transactions are attached to the Tangle by referencing other transactions in their [`branchTransaction` and `trunkTransaction` fields](../references/transaction-fields.md).

References in the Tangle can be one of two types:

- **Direct:** Connects a transaction with those in its `branchTransaction` and `trunkTransaction` fields. For example, transaction 5 **directly** references transactions 2 and 3.

- **Indirect:** Connects a transaction with those that come before the ones in its `branchTransaction` and `trunkTransaction` fields. For example, transaction 6 **indirectly** references transaction 3 (through transaction 5).

These references form a transaction's history, where if a transaction is a **child**, its direct references are its **parents** and its indirect references are its **grandparents**, and so on.

In Tangle explorers, you can usually see links to the parents of a transaction to allow you to follow its history.

![Parents](../images/parents.png)

## Next steps

[Get an overview of the differences between the Tangle and blockchains](../the-tangle/tangle-vs-blockchain.md).