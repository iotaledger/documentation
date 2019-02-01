# Compass overview

**Compass is an open-source [Coordinator](root://the-tangle/0.1/concepts/the-coordinator.md) that can be used to protect an IOTA network against attacks. Any transaction that's referenced by a Compass milestone is considered confirmed by any IRI nodes in the network.**

Compass sends honest, zero-value milestones to IRI nodes at regular intervals. Milestones can't modify balances or censor transactions because all transactions, including milestones, are [validated by each IRI node](root://iri/0.1/concepts/transaction-validation.md) in the network.

You can use Compass to [create your own IOTA network](../how-to-guides/create-an-iota-network.md) for the following use cases:

- **Security testing and research:** Use Compass to create a controlled environment to test assumptions and produce attacks.
- **Development of proof of concepts:** Use Compass to develop proof-of-concept applications without sharing your ideas on a [permissionless network](root://getting-started/0.1/references/iota-networks.md).

**Note:** By releasing Compass, the IOTA Foundation aims to further its research into finding a viable replacement for the Coordinator.

## Repository

Jump directly to the Compass source code on [Github](https://github.com/iotaledger/compass)
