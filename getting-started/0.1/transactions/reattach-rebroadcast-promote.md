# Reattach, rebroadcast, and promote

**A transaction in the [Tangle](../network/the-tangle.md) may remain in a pending state for many reasons such as an increased load on the network or if it was attached to an inconsistent subtangle. To increase the chances of a bundle becoming confirmed, you can reattach, rebroadcast, or promote it.**

## Reattach

Sometimes, transactions are attached to a part of the Tangle that is no longer considered valid. As a result, that transaction will never be referenced by a [milestone](../network/the-coordinator.md#milestones), thus it will never be confirmed.

To reattach a bundle means to create a new one and attach it to a different part of the Tangle. This way, you give your transaction another chance at being included in the consensus.

You may want to reattach a bundle if its transactions have been pending for more than ten minutes. After this time, it is unlikely to be referenced by a milestone.

When you reattach a bundle, you keep most of the original bundle's fields the same, but you request new tip transactions (the new part of the Tangle), and do the proof of work again. As a result, the only fields that change are the following:

- `hash`
- `trunkTransaction`
- `branchTransaction`
- `attachmentTimestamp`
- `nonce`

When you reattach a bundle that transfers IOTA tokens, only one will ever be confirmed. The others will remain pending because they will lead to double spends (spending the same IOTA tokens twice in different transactions).

## Rebroadcast

While your transactions are being sent to a node, it may go offline. In this case, the node may not forward your transactions to its neighbors, and the rest of the network won't ever see your transactions. As a result, that transaction will never be referenced by the [Coordinator](../network/the-coordinator.md), thus it will never be confirmed.

To rebroadcast a bundle means to send the same bundle to a node again. This way, you give your transactions another chance at being forwarded to the rest of the network.

## Promote

To promote a bundle means to increase its chances of being selected during [tip selection](root://node-software/0.1/iri/concepts/tip-selection.md) by increasing the cumulative weight of its tail transaction. When you promote a bundle, you create and send a zero-value transaction that references both its tail transaction and the latest milestone.

Promoting a bundle is often more effective than reattaching a bundle, unless the bundle you're promoting leads to an inconsistent state (double spend) or is older than the last six milestones.

## Related guides

[Check if a transaction is confirmed in JavaScript](root://core/1.0/tutorials/js/check-transaction-confirmation.md).

[Help a transaction to be confirmed in JavaScript](root://core/1.0/tutorials/js/confirm-pending-bundle.md).

