# What is the Tangle?

**The Tangle is the data structure that's formed by the connections among a node's transactions. Transactions in the Tangle can be in one of two states: Pending or confirmed.**

One of the validation criteria of a transaction is that each one must directly reference two previous transactions. It's these references that connect transactions and _attach_ them to the Tangle.

This referencing model forms a type of [directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) (DAG), in which each transaction represents a vertex.

![A directed acyclic graph](../dag.png)

In this diagram, transaction 5 is **directly** referenced by transaction 6, and because transaction 5 directly references transaction 3, transaction 3 is **indirectly** referenced by transaction 6.

IOTA tokens can't be transferred until all transactions in a bundle are confirmed. To go from a pending state to a confirmed state, nodes must reach consensus on the state of a transaction. At the moment, transactions reach consensus on confirmed transactions if they're directly or indirectly referenced by a Coordinator-issued milestone transaction.

[Learn more about the Coordinator, tip selection, and the Tangle](root://the-tangle/0.1/introduction/overview.md).

