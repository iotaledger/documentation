# GoShimmer

**GoShimmer is a work-in-progress prototype of a node software that allows nodes to reach a consensus without the Coordinator, allowing IOTA networks to be decentralized.**

GoShimmer nodes run the prototype software that includes the following Coordicide modules:

- **Autopeering:** Each new node on the network tries to connect to four neighbors and accepts connections from a further four neighbors
- **Node identities:** Each node creates a unique public/private key pair. The public key is used to identify nodes during autopeering. In the future, these identities will allow nodes to receive mana.

By running a GoShimmer node, you can test the cutting-edge developments in the next stage of the IOTA protocol.

## Limitations

GoShimmer is a prototype node software that the Research Department are developing to test [Coordicide](https://coordicide.iota.org).

When all the modules become available, the GoShimmer nodes will become the Coordicide testnet, which is a release candidate for the next IOTA protocol.

## Blog posts

Read the following blog posts about GoShimmer:

- [Open Sourcing the GoShimmer Prototype](https://blog.iota.org/open-sourcing-of-the-goshimmer-prototype-891c0a8eafcb)

## Source code

Go to the GoShimmer source code on [Github](https://github.com/iotaledger/goshimmer).

## Discord channels

[Join our Discord channel](https://discord.iota.org) where you can:

- Take part in discussions with IOTA developers and the community
- Ask for help
- Share your knowledge to help others

We have the following channels for GoShimmer:

- **#goshimmer-dev:** A read-only channel where developers discuss topics and where any GitHub updates are displayed

- **#goshimmer-discussion:** An open channel where anyone is free to discuss GoShimmer

## Next steps

[Run GoShimmer](../how-to-guides/run-the-node.md) to get started with your own node and test the modules.



