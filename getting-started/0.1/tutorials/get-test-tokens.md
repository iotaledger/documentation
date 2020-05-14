# Get test IOTA tokens

**When testing IOTA, you may want to send [IOTA tokens](../clients/token.md) from one [address](root://getting-started/0.1/clients/addresses.md) to another. On the Mainnet, these tokens have a monetary value that can be traded on exchanges. To send test [transactions](../transactions/transactions.md), you can use the [Devnet](../network/iota-networks.md), which uses free test tokens.**

## Prerequisites

To complete this guide, you need an unspent address.

You can generate an unspent address, using any of the following options:

- [C client library](root://core/1.0/tutorials/c/generate-an-address.md)
- [Go client library](root://core/1.0/tutorials/go/generate-an-address.md)
- [Java client library](root://core/1.0/tutorials/java/generate-an-address.md)
- [JavaScript client library](root://core/1.0/tutorials/js/generate-an-address.md)
- [Python client library](root://core/1.0/tutorials/python/generate-an-address.md)
- [Trinity wallet](root://wallets/0.1/trinity/how-to-guides/receive-a-transaction.md)

:::danger:Important
If you own IOTA tokens on the Mainnet, we recommend [creating a new seed](../tutorials/create-a-seed.md) to use on the Devnet.
:::

---

To get some test tokens, you need to request some from a Devnet faucet website, which distributes tokens in batches of 1 Ki.

1. Go to [the Devnet faucet](https://faucet.devnet.iota.org/)

2. Copy and paste your address into the input field

3. Complete the [reCAPTCHA](https://en.wikipedia.org/wiki/ReCAPTCHA)

4. Click **Request**

    :::info:
    The Request button appears only if your address is valid (81 or 90 trytes long).
    :::

5. Click **Check balance**

This link takes you to a Devnet Tangle explorer, which connects to nodes on the Devnet and requests information from them about the bundle that just transferred the free tokens to your address. When the bundle is confirmed, 1 Ki will be added to the balance of your address.

:::info:These tokens are valid only on the Devnet
You can use these tokens only when you're connected to a Devnet node. Other IOTA networks have neither received nor validated the bundle that transferred the tokens to your address. As a result, they haven't updated the balance of your address.
:::

## Troubleshooting

If the Devnet faucet is not working, feel free to try the [community-built faucet](https://faucet.einfachiota.de/).

## Next steps

You can transfer these tokens on the Devnet, using Trinity or one of the client libraries:

- [Transfer your test tokens with Trinity](root://wallets/0.1/trinity/how-to-guides/send-a-transaction.md)

- [Transfer your test tokens with the JavaScript client library](root://core/1.0/tutorials/js/transfer-iota-tokens.md)
