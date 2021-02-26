# Read transactions from the Tangle in Python

**In this tutorial, you read your "hello world" transaction from the Tangle by giving a node your tail transaction hash.**

## Packages

To complete this tutorial, you need to install the following package:

```bash
pip install pyota
```

## IOTA network

In this tutorial, we connect to a node in the [Devnet](root://getting-started/1.1/networks/overview.md).

## Code walkthrough

1. Import the packages

    ```python
    from iota import Iota
    ```

2. Connect to a node

    ```python
    api = Iota('https://nodes.devnet.iota.org:443', testnet = True)
    ```

3. Define the tail transaction hash of the bundle

    ```python
    tail_transaction_hash = 'ZFICKFQXASUESAWLSFFIWHVOAJCSJHJNXMRC9AJSIOTNGNKEWOFLECHPULLJSNRCNJPYNZEC9VGOSV999'
    ```

    :::info:
    We use the tail transaction hash because the `signatureMessageFragment` field is part of the hash. Therefore, the message in the transaction is immutable.

    If you were to use the bundle hash, you may see a different message because anyone can change the message in the tail transaction and attach a copy of the bundle to the Tangle.
    :::

4. Use the [`get_bundles()`](https://pyota.readthedocs.io/en/latest/extended_api.html?highlight=getbundles#get-bundles) method to get all transactions in the tail transaction's bundle

    ```python
    bundle = api.get_bundles(tail_transaction_hash)
    ```

5. Convert the message in the bundle's first transaction to ASCII characters and print it to the console

    ```python
    message = bundle['bundles'][0].tail_transaction.signature_message_fragment
    print(message.decode())
    ```

    In the console, you should see your message:

    ```
    Hello world
    ```

:::success:Congratulations :tada:
You've just found and read a transaction from the Tangle.
:::

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code in the browser.

Click the green button to run the sample code in this guide and see the results in the window.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Read-a-transaction-from-the-Tangle-Python?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Next steps

[Generate a new address](../python/generate-an-address.md).

