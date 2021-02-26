# Send a "hello world" transaction in Python

**In this tutorial, you send a "hello world" message in a zero-value transaction. These transactions are useful for storing messages in the Tanglewithout having to send any IOTA tokens.**

## Packages

To complete this tutorial, you need to install the following package:

```bash
pip install pyota
```

## IOTA network

In this tutorial, we connect to a node in the [Devnet](root://getting-started/1.1/networks/overview.md).

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
    The `testnet` argument sets the [minimum weight magnitude](root://getting-started/1.1/first-steps/sending-transactions.md#doing-proof-of-work) to 9.
    :::

3. Define an address to which you want to send a message

    ```python
    address = 'ZLGVEQ9JUZZWCZXLWVNTHBDX9G9KZTJP9VEERIIFHY9SIQKYBVAHIMLHXPQVE9IXFDDXNHQINXJDRPFDXNYVAPLZAW'
    ```

    :::info:
    This address does not have to belong to anyone. To be valid, the address just needs to consist of 81 trytes.
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

6. Pass your `ProposedTransaction` object to the [`send_transfer()`](https://pyota.readthedocs.io/en/latest/api.html#send-transfer) method to do tip selection, remote proof of work, and to send the bundle to the node. For details about this process, see [Sending transactions](root://getting-started/1.1/first-steps/sending-transactions.md).

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
Nodes can delete old transactions from their local copies of the Tangle. Therefore, a time may come where you request your transaction from a node, but the IOTA node doesn't have it anymore.

If you want to store data in the Tangle for extended periods of time, we recommend [running your own node](root://node-software/1.0/overview.md).
:::

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code in the browser.

Click the green button to run the sample code in this guide and see the results in the window.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Send-a-hello-world-transaction-Python?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Next steps

Make a note of the tail transaction hash so you can [read the transaction from the Tangle](../python/read-transactions.md) to see your message.

You can also read your transaction, using a utility such as the [Tangle explorer](https://utils.iota.org).
