# IOTA networks

- **Permissionless networks:** Access to the Tangle is public, so any transactions you send in these networks are visible to anyone. These networks are made up of nodes from all over the world. Anyone is free to join the network.

## Official permissionless networks

The IOTA Foundation maintains the following permissionless networks, where anyone can run a node.

|**Network** |**Status**|**Description**|
:-----|:------|:---------|
|[Mainnet](../networks/mainnet.md)|Active|The main IOTA network, where the IOTA token has value that's traded on platforms such as cryptocurrency exchanges|
|[Devnet](../networks/devnet.md)|Active|A development network where the IOTA token has no value except for testing purposes|

## Community permissionless networks

The IOTA community maintains the following permissionless network, where anyone can run a node.

|**Network** |**Status**|**Description**|
:-----|:------|:---------|
|[Comnet](../networks/comnet.md)|Active|A development network where the IOTA token has no value except for testing purposes

## Minimum weight magnitude

All nodes in the same IOTA network must accept transactions with the same or higher [minimum weight magnitude](../references/glossary.md#minimum-weight-magnitude) (MWM). If a transaction has a MWM that's too low, nodes in that network will reject it.

Every increment of the MWM triples the difficulty of the PoW.

## Coordinator address

In the current IOTA networks, nodes rely on the Coordinator to reach a consensus, therefore each one is hard-coded with the address of a Coordinator. Nodes use this address to validate the Coordinator's signatures in milestones.

## Next steps

See an overview of the [Mainnet](../networks/mainnet.md).