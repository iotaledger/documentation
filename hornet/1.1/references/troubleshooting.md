# Troubleshooting

**This topic contains known issues that you may find while using Hornet and some suggested steps to resolve them.**

## My node won't synchronize

It may take some time for your node to synchronize, so we recommend that you wait a while to see if it synchronizes by itself.

If your node still doesn't synchronize, try one of the following.

### Make sure your node is following the correct Coordinator

On August 19, 2020, the address of the Mainnet Coordinator was changed, following a network upgrade.

If your node is running on the Mainnet, restart your node, using the `--overwriteCooAddress` flag.

### Check that your neighbors are synchronized

In the **Neighbors** tab on the dashboard, you can see which neighbors are synchronized by the label next to their IP addresses.

![An unsynchronized neighbor](../images/neighbor-unsynced.png)

If your neighbors aren't synchronized, the autopeering module will eventually disconnect from them and find new ones.

If you have fixed neighbors that aren't synchronized, you can wait until they are or find new ones to connect to. See [Managing fixed neighbors](../guides/managing-neighbors.md).


### Handle many transactions

To prevent DDOS attacks, Hornet returns only a maximum of 1000 transactions from an address.
So if there are more transactions available, it will return 1000 random transactions.
You can configure the limit `httpAPI.limits.findTransactions` in the configuration file described [here](https://github.com/gohornet/hornet/wiki/Configuration#httpapi).

### Ask for more support

On [Discord](https://discord.iota.org) ask a question either in our #help or #fullnodes channel.