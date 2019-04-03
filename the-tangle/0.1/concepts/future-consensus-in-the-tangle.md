# Future consensus in the Tangle

**The Tangle [whitepaper](https://iota.org/IOTA_Whitepaper.pdf) proposes a distributed approach to consensus that relies on confirmation confidence instead of the Coordinator-issued milestones.**

At the moment, IRI nodes reach consensus on transactions that are approved by a milestone. However, the Coordinator is only a temporary safety mechanism that protects the network until the majority transactions in it are honest. At that point, the Coordinator will be removed, and IRI nodes will reach a consensus on the confirmation confidence of transactions.

## Confirmation confidence

The confirmation of a transaction in permissionless, distributed system is not a matter of true or false. Instead, confirmation is a percentage of the likelihood that a transaction will remain either confirmed or unconfirmed.

In distributed systems, confirmation can be measured by a specific threshold at which the reversal of a transaction would require an unreasonable amount of resources, such as [proof of work](../concepts/proof-of-work.md).

## Example of confirmation confidence

To calculate the confirmation confidence of a particular transaction, IRI nodes could do the tip selection process 100 times.

**Note:** The number 100 is arbitrary. If clients were to want more confidence, they could ask the IRI nodes to do the tip selection process more than 100 times.

If the transaction were to be approved by 80 tip transactions (approvers) out of 100, its confirmation confidence would be 80%. 

This process considers that the more approvers a transaction has, the larger its cumulative weight. The larger the cumulative weight, the more likely it is that the transaction is valid and will be chosen by the tip selection algorithm for new transactions.

**Note:** IRI nodes might see different confidence rates for the same transaction because their view of the Tangle is not identical, and their tip selection algorithm may select different tip transactions.



