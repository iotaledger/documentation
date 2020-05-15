# Nodes

**Nodes are the core of an IOTA network. They run the [node software](root://node-software/0.1/introduction/overview.md) that gives them read and write access to the [Tangle](../network/the-tangle.md). Like any [distributed system](https://en.wikipedia.org/wiki/Distributed_computing), nodes are connected to others called neighbors to form an IOTA network. When one node, no matter where it is in the world, receives a [transaction](../transactions/transactions.md), it will try to forward it to all its neighbors. This way, all nodes eventually validate all transactions and store them in their local copy of the [Tangle](../network/the-tangle.md) called a ledger.**

## How nodes work

Nodes are the core of an IOTA network, and are responsible for the following key functions:

- Keeping a record of the addresses with a balance greater than 0
- Validating transactions
- Attaching valid transactions to the Tangle

:::info:
Many applications such as [Trinity](root://wallets/0.1/trinity/introduction/overview.md) interact with a node's API through the [client libraries](root://client-libraries/1.0/overview.md).
:::

## Validation

Nodes are responsible for validating transactions in the [Tangle](../network/the-tangle.md) to make sure that their histories do not conflict and that counterfeit transactions are never confirmed. To validate a transaction, nodes check the following:

- [Proof of work](../transactions/proof-of-work.md) is done according to the [minimum weight magnitude](../network/minimum-weight-magnitude.md)
- The value of any transaction doesn’t exceed the [total global supply](../clients/token.md)
- The total value of all transactions in a [bundle] is 0 (all IOTA tokens that are withdrawn are also deposited into other addresses)
- Any [signatures](../clients/signatures.md) in value transactions are valid

Nodes don't know which client owns an address because they don't have the clients' seeds, so they use cryptography to [validate the signature in a transaction](../clients/signatures.md#how-nodes-validate-signatures).

## Neighbor nodes

Neighbors are nodes that are mutually connected and that communicate directly with each other on the same IOTA network. To synchronize their ledgers with the rest of the network, all nodes send and receive transactions among their neighbors.

After receiving a new transaction, nodes check that they have the transaction's history in its ledger. If a node is missing any transactions, it starts to ask its neighbors for them to become synchronized with the rest of the network.

## Synchronized nodes

Because nodes are distributed throughout the world, they may have different transactions in their ledgers at any time.

The transactions in any node's ledger make up its **view of the Tangle**.

To make sure that all nodes eventually have the same view of the Tangle, they must synchronize with the rest of the network.

A node is synchronized when it has solidified all milestones up to the latest one.

In the IRI and cIRI [node software](root://node-software/0.1/introduction/overview.md), which runs the Mainnet, a node is synchronized when the values of the  `latestMilestoneIndex` and `latestSolidSubtangleMilestoneIndex` fields are equal.

:::info:
The `latestMilestoneIndex` field is accurate only when the node is connected to synchronized neighbors.
:::

### Solidification

Solidification is the process in which a node asks its neighbors for the history of all [milestones](../network/the-coordinator.md#milestones) in the Tangle, starting from an **entry point milestone** and ending at the latest one.

When a node has a milestone's history up to the entry point milestone, it marks that milestone as **solid**, and starts the process again from the next milestone.

As a result, the older the entry point milestone, the longer solidification takes.

## Consensus

Consensus describes how nodes agree on which transactions are trustworthy and should be considered for confirmation.

For a transaction to be considered confirmed, nodes must reach a consensus on when to consider it final before they can update the balances of addresses.

A transaction is considered confirmed when it's solid and it's directly or indirectly referenced by a transaction that's signed by the [Coordinator](../network/the-coordinator.md).

## Node quorums

A node quorum is a group of nodes to which you send the same request and compare the responses for consistency.

When you rely only on one node as a source of information from the Tangle, you can't be confident that it's correct. For example, that node could send you the wrong information about your available balance. To increase your confidence in a node, you can request information from a node quorum.

## Local snapshots

IOTA is a permissionless network. For 24 hours a day, 7 days a week, anyone can store any amount of data on the Tangle for free (just a small amount of [proof of work](root://getting-started/0.1/transactions/proof-of-work.md) per transaction)

As a result, the size of the databases that contain the Tangle are always growing, and this storage space costs a lot of money. To stop their ledgers from becoming too large, nodes often do local snapshots.

A local snapshot is the process in which a node records the state of its ledger in snapshot files. Using these files, nodes can synchronizing with their neighbors a lot faster because the Tangle contains fewer transactions.

## Permanodes

For many business use cases, data in the IOTA Tangle needs to be stored for long periods of time. For example, financial data must be stored for 10 years in some cases, and identity data needs to be kept for the lifetime of the identity.

Rather than doing local snapshots, a permanode stores the full history of the Tangle and enables applications to search the data through an extended API.

## Related guides

Run [IRI](root://node-software/0.1/iri/introduction/overview.md), the node software that runs on the public IOTA networks.

Run [GoShimmer](root://node-software/0.1/goshimmer/introduction/overview.md), the prototype node software that will lead to Coordicide. 

Run [Chronicle](root://node-software/0.1/chronicle/introduction/overview.md), the IOTA Foundation's permanode software.
