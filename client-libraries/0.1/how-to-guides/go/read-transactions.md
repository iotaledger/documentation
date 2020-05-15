# Read transactions from the Tangle in Go

**In this tutorial, you read your "hello world" [transaction](root://getting-started/0.1/transactions/transactions.md) from the Tangle by giving a [node](root://getting-started/0.1/network/nodes.md) your tail transaction hash.**

## Packages

To complete this guide, you need to install the following packages (if you're using Go modules, you just need to reference them):

```bash
go get github.com/iotaledger/iota.go/api
go get github.com/iotaledger/iota.go/trinary
go get github.com/iotaledger/iota.go/transaction
```

## IOTA network

In this tutorial, we connect to a node on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet).

## Code walkthrough

1. Import the packages

    ```go
    package main

    import (
        . "github.com/iotaledger/iota.go/api"
        "github.com/iotaledger/iota.go/trinary"
        "github.com/iotaledger/iota.go/transaction"
        "fmt"
    )
    ```

2. Connect to a node

    ```go
    var node = "https://nodes.devnet.thetangle.org"
    api, err := ComposeAPI(HTTPClientSettings{URI: node})
    must(err)
    ```

3. Define the tail transaction hash that you want to use to filter transactions 

    ```go
    const tailTransactionHash = trinary.Trytes("RXPDFDAUJHMSYBSWUHHNJM9YTOACXYYIRSIEIVUOGQIRUUAHQFNXQBURQJHLXWYLZLWNRMVIABKC9C999")
    ```

    :::info:
    We use the tail transaction hash because the `signatureMessageFragment` field is part of the hash. Therefore, the message in the transaction is immutable.

    If you were to use the bundle hash, you may see a different message because anyone can change the message in the tail transaction and attach a copy of the bundle to the Tangle.
    :::

4. Use the [`GetBundle()`](https://github.com/iotaledger/iota.go/blob/master/.docs/iota.go/reference/api_get_bundle.md) method to get all transactions in the tail transaction's bundle. Then, use the [`ExtractJSON()`](https://github.com/iotaledger/iota.go/blob/master/.docs/iota.go/reference/transaction_extract_j_s_o_n.md) method to decode the JSON messages in the `signatureMessageFragment` fields of the transactions and print them to the console

    ```go
    bundle, err := api.GetBundle(tailTransactionHash)
    must(err)

    jsonMsg, err := transaction.ExtractJSON(bundle)
    must(err)
    fmt.Println(jsonMsg)
    ```

    In the console, you should see your JSON message:

    ```json
    {"message": "Hello world"}
    ```

:::success:Congratulations :tada:
You've just found and read a transaction from the Tangle.
:::

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code in the browser.

Click the green button to run the sample code in this guide and see the results in the window.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Read-a-transaction-from-the-Tangle-Go?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Next steps

[Generate a new address](../go/generate-an-address.md).

