# About the Tangle

**The Tangle is the distributed ledger in IOTA that contains an up-to-date history of transactions. This section introduces you to the Tangle.**

The Tangle is a single source of truth. Any user, anywhere in the world, is able to send valid messages to any node, and that message will be replicated across the rest of the network to form one version of truth: The Tangle.

All messages in the Tangle are attached to two others to form a [directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) (DAG).

![A directed acyclic graph](../images/dag.png)

Each message in the graph is represented by a box, and each attachment is represented by a line.

When a new message is attached to the Tangle, it is attached to two previous messages, known as `parents` adding two new lines to the graph.

## References

Messages are attached to the Tangle by referencing other messages in their `Parent1` and `Parent2` fields.

References in the Tangle can be one of two types:

- **Direct:** Connects a message with those in its `Parent2` and `Parent1` fields. For example, transaction 5 **directly** references messages 2 and 3.

- **Indirect:** Connects a message with those that come before the ones in its `Parent2` and `Parent1` fields. For example, message 6 **indirectly** references transaction 3 (through transaction 5).

These references form a message's history, whereby if a message is a **child**, its direct references are its **parents** and its indirect references are its **grandparents**, and so on.

## Next steps

[Get an overview of the differences between the Tangle and blockchains](../the-tangle/tangle-vs-blockchain.md).