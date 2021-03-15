# The Comnet

**The Comnet is similar to the [Devnet](../networks/devnet.md), except it's maintained by the IOTA community who use it to test network upgrades. This topic lists some practical information for connecting to the Comnet.**

## Nodes

The IOTA community hosts many nodes behind the following load balancer; you can also use this URL for sending messages and requesting information about the Tangle from nodes on the Comnet:

- **URL:** https://nodes.comnet.thetangle.org

## Faucets

Use the following [faucet](../references/glossary.md#faucet) to transfer up to 1 Ki of IOTA tokens to one of your addresses on the Comnet:

- **[Community faucet](https://faucet.comnet.einfachiota.de/#/):** Distributes tokens in batches of up to 1 Ki

## Coordinator public key

Nodes on the Mainnet use a Coordinator that relies on a public key to validate the singatures within a milestone payload. For reference, see [RFC-19](https://github.com/jakubcech/protocol-rfcs/blob/jakubcech-milestonepayload/text/0019-milestone-payload/0019-milestone-payload.md).

:::info:
The Coordinator is temporary. After Chrysalis is completed, we will transition into removing the Coordinator: [Coordicide](https://coordicide.iota.org/post-coordinator).
:::

## Next steps

Learn about deploying a production application on IOTA with the [Production checklist](../accounts/overview.md).
