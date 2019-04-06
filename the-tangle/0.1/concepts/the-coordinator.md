# The Coordinator

**The Coordinator is a client application that sends milestone transactions to an IRI node at regular intervals. A transaction is considered confirmed when it's chosen by the tip selection algorithm and referenced by a milestone transaction.**

The Coordinator acts as a temporary safety mechanism until the majority transactions in a permissionless IOTA network are honest.

An IOTA network relies on clients sending a majority of honest transactions to IRI nodes. However, the fewer transactions that are sent in an IOTA network, the easier it is for an attacker to send a majority of dishonest transactions to IRI nodes. As a result, an attacker may be able to double spend tokens, and carry out network-splitting attacks.

To protect the network against these attacks, the Coordinator sends bundles of honest transactions to IRI nodes at regular intervals. These bundles include a signed zero-value transaction called a milestone.

IRI nodes in an IOTA network reach a consensus on transactions that are approved by a milestone.