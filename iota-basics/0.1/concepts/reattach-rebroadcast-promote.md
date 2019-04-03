# Reattach, rebroadcast, and promote

**A bundle may be pending for many reasons such as an increased load on the network. To increase the chances of a bundle being confirmed, you can reattach, rebroadcast, or promote a bundle**

## Reattach

To reattach a bundle means to create a new one and attach it to a different part of the Tangle. When you reattach a bundle, you keep most of the original bundle's fields the same, but you request new tip transactions, and do the proof of work again. As a result, the only fields that change are the following:

* [`hash`](../references/structure-of-a-transaction.md)
* [`trunkTransaction`](../references/structure-of-a-transaction.md)
* [`branchTransaction`](../references/structure-of-a-transaction.md)
* [`attachmentTimestamp`](../references/structure-of-a-transaction.md)
* [`nonce`](../references/structure-of-a-transaction.md)

You may want to reattach a bundle if its transactions have been pending for more than ten minutes. After this time, the tail transaction in the pending bundle is unlikely to be selected during tip selection, which makes it unlikely to be confirmed.

When you reattach a bundle that transfers IOTA tokens, only one will ever be confirmed. The others will remain pending because they will lead to double-spends.

## Rebroadcast

To rebroadcast a bundle means to send the same bundle to a node again.

You may want to rebroadcast a bundle if you think that the node you sent it to didn't forward the transactions to its neighbors. Nodes might not forward transactions to neighbors if they either go offline or are under heavy load after receiving a bundle.

## Promote

To promote a bundle means to increases its chances of being selected during tip selection by increasing the [cumulative weight](root://the-tangle/0.1/concepts/tip-selection.md) of its tail transaction. When you promote a bundle, you create and send a zero-value transaction that references both its tail transaction and the latest milestone.

Promoting a bundle is often more effective than reattaching a bundle, unless the bundle you're promoting leads to an inconsistent state (double-spend) or is older than the last six milestones.