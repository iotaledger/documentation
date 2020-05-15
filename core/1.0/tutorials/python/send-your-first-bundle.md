# Send a "hello world" transaction in Python

**In this tutorial, you send a "hello world" message in a zero-value transaction. These transactions are useful for storing messages on the [Tangle](root://getting-started/0.1/network/the-tangle.md) without having to send any [IOTA tokens](root://getting-started/0.1/clients/token.md).**

## Packages

To complete this guide, you need to install the following package:

```bash
pip install pyota
```

## IOTA network

In this tutorial, we connect to a [node](root://getting-started/0.1/network/nodes.md) on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet) with the following network settings:

- **[Minimum weight magnitude](root://getting-started/0.1/network/minimum-weight-magnitude.md)**: 9

- **[Depth](root://getting-started/0.1/transactions/depth.md)**: 3

1. Import the packages

    ```python
    from iota import Iota
    from iota import ProposedTransaction
    from iota import Address
    from iota import Tag
    from iota import TryteString
    ```

2. Connect to a node

    ```python
    api = Iota('https://nodes.devnet.iota.org:443', testnet = True) 
    ```

    :::info:
    The `testnet` argument sets the [minimum weight magnitude](root://getting-started/0.1/network/minimum-weight-magnitude.md) to 9.
    :::

3. Define an [address](root://getting-started/0.1/clients/addresses.md) to which you want to send a message

    ```python
    address = 'ZLGVEQ9JUZZWCZXLWVNTHBDX9G9KZTJP9VEERIIFHY9SIQKYBVAHIMLHXPQVE9IXFDDXNHQINXJDRPFDXNYVAPLZAW'
    ```

    :::info:
    This address does not have to belong to anyone. To be valid, the address just needs to consist of 81 [trytes](root://getting-started/0.1/introduction/ternary.md).
    :::

4. Define a message that you want to send to the address and convert it to trytes

    ```python
    message = TryteString.from_unicode('Hello world')
    ```

    :::info:
    Although the `from_unicode()` method supports UTF-8 characters, we recommended using only [basic ASCII characters](https://en.wikipedia.org/wiki/ASCII#Printable_characters) until it has been standardized across the other official libraries.
    :::

5. Define a zero-value transaction that sends the message to the address

    ```python
    tx = ProposedTransaction(
    address = Address(address),
    message = message,
    value = 0
    )
    ```

    :::info:
    The Python library makes a disctinction between proposed and regular transaction objects. Proposed transaction objects are those that you can edit because they are not yet attached to the Tangle. In contrast, regular transaction objects are immutable because they are already attached to the Tangle.
    :::

6. Pass your `ProposedTransaction` object to the [`send_transfer()`](https://pyota.readthedocs.io/en/latest/api.html#send-transfer) method to do [tip selection](root://node-software/0.1/iri/concepts/tip-selection.md), [remote proof of work](root://getting-started/0.1/transactions/proof-of-work.md), and to send the bundle to the node

    ```python
    result = api.send_transfer(transfers = [tx])

    print(result['bundle'].tail_transaction.hash)
    ```

    In the console, you should see the tail transaction hash of the bundle you just sent.

:::success:Congratulations :tada:
You've just sent your first zero-value transaction. Your transaction is attached to the Tangle, and will be forwarded to the rest of the network.

You can use this tail transaction hash to read the transaction from the Tangle.
:::

:::warning:
Nodes can delete old transactions from their local copies of the Tangle. Therefore, a time may come where you request your transaction from a node, but the node doesn't have it anymore.

If you want to store data on the Tangle for extended periods of time, we recommend either [running your own node](root://node-software/0.1/iri/how-to-guides/quickstart.md) or running a permanode such as [Chronicle](root://node-software/0.1/chronicle/introduction/overview.md).
:::

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code in the browser.

Click the green button to run the sample code in this tutorial and see the results in the window.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Send-a-hello-world-transaction-Python?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Next steps

Make a note of the tail transaction hash so you can [read the transaction from the Tangle](../python/read-transactions.md) to see your message.

You can also read your transaction, using a utility such as the [Tangle explorer](https://utils.iota.org).
