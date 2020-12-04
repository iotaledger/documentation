# The Devnet

**The Devnet is similar to the Mainnet, except the tokens are free and it takes less time and computational power to create and send a transaction. This topic lists some practical information for connecting to the Devnet.**

## Nodes

The IOTA Foundation hosts the following nodes that you can use to connect to the Devnet:

### Load balancer node

The IOTA Foundation hosts many nodes behind the following load balancer:

**URL:** https://nodes.devnet.iota.org

Use this URL for sending messages and requesting information about the Tangle from nodes in the Devnet.

### ZMQ node

Use this endpoint to poll the node for new transactions:

**URL:** tcp://zmq.devnet.iota.org:5556

## Faucets

Use the following [faucets](../references/glossary.md#faucet) to transfer up to 1 Ki of IOTA tokens to one of your addresses in the Devnet:

- **[Official faucet](https://faucet.devnet.iota.org/):** Distributes tokens in batches of 1 Ki

## Coordinator address

Nodes in the Devnet use a Coordinator that is run by the IOTA Foundation with the following address:

```
GYISMBVRKSCEXXTUPBWTIHRCZIKIRPDYAHAYKMNTPZSCSDNADDWAEUNHKUERZCTVAYJCNFXGTNUH9OGTW
```

:::info:
The Coordinator is temporary. The IOTA Foundation is working on a project to remove the Coordinator and from the network: [Coordicide](https://coordicide.iota.org/post-coordinator).
:::

## Next steps

See an overview of the [Comnet](../networks/comnet.md).
