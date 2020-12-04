# How IOTA tokens are transferred

**This topic explains how IOTA tokens are transferred in the Tangle.**

To explain how IOTA tokens are transferred from one address to another, this topic follows three characters:

- Alice

- Bob

- Charlie

## The goal

Charlie wants to transfer 10 i to Bob.

## What is in the Tangle

In this example, Alice had 10 i that she transferred to Bob.

Therefore, the Tangle now includes a [value message](../the-tangle/transaction-types.md) that transferred those 10 i to Bob.

## Choosing where to attach messages

To transfer 10 i to Bob, Charlie must attach a value message to the Tangle. To do so, he needs two tip messages to which he can attach his own message.

To get these tip messages, Charlie requests them from a node.

The node selects two messages by using an algorithm called [tip selection](../the-tangle/tip-selection.md). This algorithm selects two valid tip messages that lead to a valid ledger state.

:::info:
The ledger state is a record of all the value message that have transferred IOTA tokens in the Tangle, including the state of all balances on addresses. This state must always be balanced: The total number of IOTA tokens must always add up to the [total supply](../the-tangle/genesis.md).
:::

By using the tip messages that the node gave him, Charlie lets the network know that he is also approving them and their history. If any of those messages turn out to be invalid, Charlie's messages will also be treated as invalid and will not be selected by other nodes during tip selection.

:::info:
Nodes ignore invalid parts of the Tangle during tip selection. These parts are called an invalid subtangle.
:::

## Signing the messages

To prove to nodes that he is indeed the owner of the IOTA tokens in his address, Charlie signs an input message with his private key. This input message withdraws 10 i from his address.

Charlie then creates an output message to deposit that 10 i into Bob's address. This message does not need a signature because it is not withdrawing IOTA tokens.

Then Charlie puts all the messages in a UTXO and sends them to a node on an IOTA network.

## Waiting for the messages to be confirmed

Anyone is free to send messages to a node at any time. As a result, it is not always a simple matter of selecting valid tip messages. Sometimes a node must make a decision on which of two valid messages to prefer.

For example, what if Alice actually attached two messages to the Tangle: One that transferred 10 i to Bob, and one that transferred 10 i to Charlie?  Together, these messages would be called a double spend because they try to transfer the same IOTA tokens to different addresses.

Both of Alice's messages could not be part of the ledger state because it would result in a negative balance for Alice’s address: - 10 i.

Messages in the Tangle are confirmed by special messages called milestones.

After Charlie's message is confirmed by a milestone, the nodes update his and Bob's balances to reflect the transfer of 10 i to Bob's address.

Bob can now spend his new IOTA tokens.

## Next steps

[Learn about the Coordinator](../the-tangle/the-coordinator.md) and how its milestones are used in an IOTA network.