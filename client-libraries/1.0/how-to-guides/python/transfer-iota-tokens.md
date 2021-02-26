# Send a micropayment in Python

**In this tutorial, you send a micropayment of 1 IOTA to a node.**

## Packages

To complete this tutorial, you need to install the following package:

```bash
pip install pyota
```

## IOTA network

In this tutorial, we connect to a node in the [Devnet](root://getting-started/1.1/networks/overview.md).

## Step 1. Get test IOTA tokens

To send test IOTA tokens in the Devnet, nodes must have a record of a greater than 0 balance for one of the addresses that belongs to your seed. To get test IOTA tokens to use in the Devnet, you can use the Devnet faucet.

1\. Create a new seed and back it up

--------------------
### Linux
```bash
cat /dev/urandom |tr -dc A-Z9|head -c${1:-81}
```
---
### macOS
```bash
cat /dev/urandom |LC_ALL=C tr -dc 'A-Z9' | fold -w 81 | head -n 1
```
---
### Windows PowerShell
```bash
$b=[byte[]] (1..81);(new-object Security.Cryptography.RNGCryptoServiceProvider).GetBytes($b);-join($b|%{[char[]] (65..90+57..57)[$_%27]})
```
---
### Python
```python
from iota.crypto.types import Seed
seed = Seed.random()
print(seed)
```
--------------------

2\. [Generate a new address for your seed](../python/generate-an-address.md)

3\. Copy and paste your address into the [Devnet faucet](https://faucet.devnet.iota.org), then wait for the tokens to be transferred to your address

## Step 2. Create and send a transfer bundle

To transfer your test tokens from one address to another, you need to create and send a transfer bundle. This bundle needs an input transaction to withdraw the IOTA tokens from your address and an output transaction to deposit them into another address.

1. Import the packages

    ```python
    from iota import Iota
    from iota import ProposedTransaction
    from iota import Address

    ```

2. Define your seed. Replace this seed with one that owns an address with test IOTA tokens

    ```python
    seed = 'JBN9ZRCOH9YRUGSWIQNZWAIFEZUBDUGTFPVRKXWPAUCEQQFS9NHPQLXCKZKRHVCCUZNF9CZZWKXRZVCWQ'
    ```

    :::info:
    Because this bundle transfers IOTA tokens, the seed is used to sign it. Therefore, this seed's addresses must contain at least 1 IOTA token.
    :::

3. Connect to a node

    ```python
    api = Iota('https://nodes.devnet.iota.org:443', seed, testnet = True)
    ```

    :::info:
    The `testnet` argument sets the [minimum weight magnitude](root://getting-started/1.1/first-steps/sending-transactions.md#doing-proof-of-work) to 9.
    :::

4. Define the address to which you want to send your IOTA token

    ```python
    address = 'ZLGVEQ9JUZZWCZXLWVNTHBDX9G9KZTJP9VEERIIFHY9SIQKYBVAHIMLHXPQVE9IXFDDXNHQINXJDRPFDXNYVAPLZAW'
    ```

5. Create a `ProposedTransaction` object that specifies the amount of IOTA tokens you want to transfer and the address to send the tokens to

    ```python
    tx = ProposedTransaction(
    address=Address(address),
    value = 1
    )
    ```

6. To create a transfer bundle from your `ProposedTransaction` object, pass it to the [`send_transfer()`](https://pyota.readthedocs.io/en/latest/api.html#send-transfer) method, which handles tip selection, remote proof of work, and sending the bundle to the node. For details about this process, see [Sending transactions](root://getting-started/1.1/first-steps/sending-transactions.md).

    ```python
    result = api.send_transfer(transfers=[tx] )
    print('Bundle: ')
    print(result['bundle']
    ```

    This method asks the IOTA node to check the balance of your seed's addresses. If your addresses have enough IOTA tokens to complete the transfer, the method creates input transactions to withdraw the full balance from enough of your addresses to fulfill the transfer. Then, the library adds those transactions to the transfer bundle and signs the bundle with the private keys of any withdrawn addresses.

    :::info:
    Your seed never leaves your device.

    The library generates addresses on your local device and sends them to the IOTA node.
    :::

    If the amount you want to transfer is less than the balance of your withdrawn addresses, the method creates another output transaction to transfer the remainder to an unspent address that belongs to your seed.

    In the console, you should see the bundle hash of the transaction you just sent.

:::success:Congratulations :tada:
You've just sent your first transfer bundle. Your transactions are attached to the Tangle and will be forwarded to the rest of the network. Now, you just need to wait until the transaction is confirmed for your balance to be updated.
:::

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code in the browser.

Click the green button to run the sample code in this guide and see the results in the window.

Before you run this sample code, replace the seed with your own test seed.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Send-IOTA-tokens-on-the-Devnet-Python?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Next steps

[Check the balance of your address](../python/check-balance.md).

You can also read your transaction, using a utility such as the [Tangle explorer](https://utils.iota.org). Just enter your bundle hash in the search bar.
