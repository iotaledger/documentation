# Hardware wallet

**A hardware wallet, sometimes referred to as cold storage, is a physical electronic device that secures your funds.**

Hardware wallets do the following:
* Creates and stores seeds
* Signs value transactions

Hardware wallets are an extra layer of security. If you [create a Trinity account with a hardware wallet](https://trinity.iota.org/hardware), you can't send transactions without it.

## Seed creation and seed storage

Seeds are created using a sequence of randomly generated words. After a seed has been created it never leaves the device, even when you connect it to your computer.

When you set up a hardware wallet, it will give you instructions to both write down and never lose your randomly generated words. These words are the key to your device.

If you ever lose a hardware wallet, you can still access your funds by entering your randomly generated words in another hardware wallet.

## Transaction signing

When you send a value transaction, it must contain a valid signature that was created using the correct private key.

Bundles are signed on the device. Private keys never leave a hardware wallet, so it's impossible for an attacker to steal your funds without it.

## Supported hardware wallets

Although many hardware wallets exist, Trinity supports only the [Ledger Nano S](https://www.ledger.com/products/ledger-nano-s).

**Note:** Trinity will support more hardware wallets, including [Trezor](https://trezor.io/) and [Ledger Blue](https://www.ledger.com/products/ledger-blue)
.

## Limitations

If you use a Ledger Nano S with Trinity, you can't withdraw from more than two addresses in the same transaction.

To check the balances of your addresses, go to **Account management** > **View addresses**.

### Example scenario

Address 0: 200 Mi
Address 1: 400 Mi
Address 3: 50 Mi

You try to send 650 Mi from Trinity, using a Ledger Nano S. This transaction would require a bundle that withdraws from three addresses, so it won't be valid and won't send.


