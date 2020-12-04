# The origin of the IOTA token

**This topic discusses the origins of the IOTA token and how nodes keep track of them.**

The IOTA token was launched on the Mainnet in June 2017. At this point, nodes in the network were hard-coded with a **total supply** of **2,779,530,283 277,761**.

This large supply allows each of the billions of devices, which are expected to be a part of the Internet, to have its own wallet and transact with other devices.

## How the IOTA token was created

All IOTA tokens were created in the very first transaction in the Tangle, called the **genesis transaction**. This transaction gave the total supply of IOTA tokens to one address.

From the genesis, IOTA tokens were then transferred to the accounts of the original investors in the project. After some time, a peer-to-peer trading network was established.

Today, IOTA tokens are spread across many different addresses. You can see [how IOTA tokens are distributed](https://thetangle.org/statistics/tokens-distribution) on a Tangle explorer.

## The origin of the IOTA token

Prior to the Chrysalis update, nodes at IOTA created local snapshots to produce ledger representations at a point in time of a given milestone to be able to:

- Start up from a recent milestone instead of having to synchronize from the genesis transaction
- Delete old transaction data below a given milestone

These node implementations used a [local snapshot file format](https://github.com/iotaledger/iri-ls-sa-merger/tree/351020d3b5e342b6e9a41f2868575ab7ff8c251c#generating-an-export-file-from-a-localsnapshots-db) which only worked with account based ledgers.

## How nodes keep track of IOTA tokens

Based on the UTXO ledger, snapshot files are broken into two formats:

- A full format which represents a complete ledger state
- A delta format which only contains diffs (consumed and spent outputs) of milestones from a given milestone index onwards

This separation allows nodes to swiftly create new delta snapshot files, which then can be distributed with a companion full snapshot file to reconstruct a recent state. These new formats do not include spent addresses since this information is no longer held by nodes.

## Value of the IOTA token

The following attributes give the IOTA token its value:

- **It's finite:** The maximum number of IOTA tokens is built into the network and cannot be changed
- **It's useful:** To transfer value in an IOTA network, you must use the IOTA token

The value of the IOTA token is determined by supply and demand on any of the [available markets](https://www.iota.org/get-started/buy-iota).

## Next steps

See [what happens in the Tangle to transfer IOTA tokens](../the-tangle/how-transfer-tokens.md) from one address to another.

