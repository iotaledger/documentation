# Overview

**Qubic allows resource-constrained devices to offload computations to oracle computers that deliver trustworthy results based on achieving a quorum.  These computations are described in self-executing programs called “smart contracts” or "qubics".**

Suppose you wish to rent computer processing time to render a large picture.  You publish a description of work plus payment terms by sending a transaction to the Tangle.  This is called a “smart contract”.  A transaction-routing machine, referred to as a “Q-Node”, sees your contract and forwards it to oracle machines.  

Oracle machines review your contract and respond with proof that they have resources to render your picture.  Several oracle machines form a committee.  Each oracle sends their proposed result in a hidden format.  The results are hidden so lazy or malicious oracles cannot cheat and copy them.  The hidden format is a hash that can be compared.  

When a quorum of oracles reach the same result, the result is revealed.  If you like the result, then you pay the oracles and your picture is rendered.  When you publish the contract, you also publish the quorum threshold.  A quorum threshold is generally 2/3 but it may be any amount over 51%.

### Novel features of Qubic

Quorum in distributed computing is not new.  It is a way of establishing trust without centralized servers or a third-party overseer.  What is unique about Qubic is the way of organizing committees and forming a quorum in a distributed manner.  Abra is also unique.  Additionally, the opportunity for resource-constrained devices to offload computation to the IOTA Tangle is innovative.

