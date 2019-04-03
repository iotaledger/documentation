# The Tangle overview

**The Tangle is the data structure that's formed by the connections among transactions in the ledger. These connections allow an IRI node to traverse transactions and validate them.**

The data structure that forms the Tangle is a type of [directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) (DAG), and it was formally introduced in the IOTA whitepaper by Professor Serguei Popov in 2015.

In the Tangle, transactions are connected to each other by reference through their [`branchTransaction` and `trunkTransaction` fields](root://iota-basics/0.1/references/structure-of-a-transaction.md). These fields contain the transaction hash of either a transaction in the same bundle or a tip transaction that was returned during [tip selection](../concepts/tip-selection.md).

References form a family tree, whereby if a transaction is a **child**, the branch and trunk transactions are its **parents**.

![A directed acyclic graph](../dag.png)

In this diagram, transaction 6 directly references transaction 5, so transaction 5 is a **parent** of transaction 6. On the other hand, transaction 6 indirectly references transaction 3, so, transaction 3 is a **grandparent** of transaction 6.

Because tip selection causes IRI nodes to validate bundles, any transaction that directly or indirectly references other transactions approves them and their entire history.

**Note:** Transaction 0 is the genesis transaction, which is the very first transaction in the Tangle.

## Consensus

In IOTA, the nodes must reach consensus about when a transaction can be considered confirmed before they can update the balances of addresses.

A transaction is considered confirmed when it's approved by a [Coordinator](../concepts/the-coordinator.md)-issued milestone.

## Further Research

The IOTA Foundation has an active research department that focuses on developing the Tangle and its related protocols.

* [Academic Papers](https://www.iota.org/research/academic-papers)
* [Roadmap](https://www.iota.org/research/roadmap)
