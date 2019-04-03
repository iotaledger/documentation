# What is a node?

**A node is a computer that's responsible for validating transactions to make sure that counterfeit ones are never confirmed. Clients in an IOTA network must send their bundles to nodes so that the transactions can be validated and attached to the Tangle.**

When a client sends a bundle to a node, the node does some basic checks to make sure that the transactions within it are valid, for example that the values of transactions don't exceed the total global supply. At this point, the transactions are considered 'attached' to a data structure called [the Tangle](../introduction/what-is-the-tangle.md).

After validating a transaction, a node sends it to neighbors so that it can be validated by the whole network. This way, all nodes see and validate all transactions.

To use any IOTA network, you can interact with a node through the [client libraries](root://client-libraries/0.1/introduction/overview.md). Many IOTA applications, such as [Trinity](root://trinity/0.1/introduction/overview.md), use one of these client libraries behind the scenes.

IOTA is a permissionless DLT. Therefore, nodes can be run by anyone, including individuals and businesses. Node owners often don't open them to the public because a high volume of API calls can be costly. Therefore, we suggest that you run your own node for direct access to an IOTA network.

If you can't run your own node, you can use the public ones in Trinity or use websites such as [IOTA Dance](https://iota.dance) to find a list them.

[Learn more about node software](root://iri/0.1/introduction/overview.md).
