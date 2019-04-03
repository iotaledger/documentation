# About Compass

**Compass is an open-source Coordinator that acts as a temporary safety mechanism until the majority transactions in an IOTA network are honest. To protect the network, IRI nodes are set up to recognize any transaction as confirmed if it's referenced by a trusted Compass milestone.**

An IOTA network relies on clients sending a majority of honest transactions to IRI nodes. However, the fewer transactions that are sent in an IOTA network, the easier it is for an attacker to send a majority of dishonest transactions to IRI nodes. As a result, an attacker may be able to double spend tokens, and carry out network-splitting attacks.
 
To protect the network against these attacks, Compass sends bundles of honest transactions to IRI nodes at regular intervals. These bundles include a signed zero-value transaction called a milestone. The IRI nodes in an IOTA network consider a transaction as confirmed only if it's approved by a milestone.

## How Compass works

Compass has three main phases:
* Merkle tree generation
* Setup
* Start

### Merkle tree generation

Before Compass can start creating milestones, it generates a [Merkle tree](https://en.wikipedia.org/wiki/Merkle_tree). This Merkle tree makes sure that every milestone directly or indirectly references the fixed address of Compass that's known by every IRI node in the IOTA network.

As a result of the Merkle tree, milestones are valid only if they are generated with the seed of Compass because IRI nodes can verify the Merkle root (fixed address) of any given leaf (milestone).

The amount of milestones Compass can send is based on the following formula: 2<sup>depth</sup>.
So, a depth of 16 is 2<sup>16</sup>, resulting in a maximum of 65536 milestones. If Compass sends milestones every minute, it can run 2<sup>depth</sup> minutes before it runs out of milestones. As a result, the depth needs to be high enough for your test to complete.

The higher the depth, the longer the Merkle tree generation takes.

A depth of 24 would allow Compass to send milestones for over 31 years, but it would take a lot of CPU hours to generate that Merkle tree. If you don't want to wait 15-30 minutes to generate the Merkle tree, you can choose a depth of 8, which would only take a couple of seconds to generate, but Compass could send milestones only for a couple of hours.

### The setup phase

During the setup phase, Compass asks the IRI node that it's connected to for the latest milestone. If the `-bootstrap` flag is passed during setup, Compass checks if a milestone exists on the IRI Node.

Then, Compass receives the latest milestone index from the IRI node and stores it. If no latest milestone exists, Compass uses the index from the configuration file.

### The start phase

During the start phase, Compass enters an indefinite `while` loop and begins to send milestones.

If the `bootstrap` flag was passed during setup, Compass creates a chain of four milestones that sequentially reference the previous milestone.

Compass sends milestones by doing the following:
* Ask the IRI node for tip transactions ([tip selection](root://the-tangle/0.1/concepts/tip-selection.md))
* Ask the IRI node to broadcast the milestone
* Sleep until the next tick
 
## Further Reading 

To learn more about the Coordinator, read the following resources:
- [IOTA Papers discussing the Tangle and other protocol features](https://www.iota.org/research/academic-papers)
- [A series of posts discussing the removal of the Coordinator](https://blog.iota.org/coordinator-part-1-the-path-to-coordicide-ee4148a8db08)
