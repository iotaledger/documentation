# Send a "hello world" transaction in Go

**In this tutorial, you send a "hello world" message in a zero-value transaction. These transactions are useful for storing messages in the Tangle without having to send any IOTA tokens.**

## Packages

To complete this tutorial, you need to install the following packages (if you're using Go modules, you just need to reference them):

```bash
go get github.com/iotaledger/iota.go/api
go get github.com/iotaledger/iota.go/bundle
go get github.com/iotaledger/iota.go/converter
go get github.com/iotaledger/iota.go/trinary
```

## IOTA network

In this tutorial, we connect to a node in the [Devnet](root://getting-started/1.1/networks/overview.md).

## Code walkthrough

1. Import the packages

    ```go
    package main

    import (
        . "github.com/iotaledger/iota.go/api"
        "github.com/iotaledger/iota.go/bundle"
        "github.com/iotaledger/iota.go/converter"
        "github.com/iotaledger/iota.go/trinary"
        "fmt"
    )
    ```
    
2. Connect to a node

    ```go
    var node = "https://nodes.devnet.iota.org"
    api, err := ComposeAPI(HTTPClientSettings{URI: node})
    must(err)
    ```

3. Define the depth and the minimum weight magnitude

    ```go
    const depth = 3;
    const minimumWeightMagnitude = 9;
    ```

4. Define an address to which you want to send a message

    ```go
    const address = trinary.Trytes("ZLGVEQ9JUZZWCZXLWVNTHBDX9G9KZTJP9VEERIIFHY9SIQKYBVAHIMLHXPQVE9IXFDDXNHQINXJDRPFDXNYVAPLZAW")
    ```

    :::info:
    This address does not have to belong to anyone. To be valid, the address just needs to consist of 81 trytes. For more information about trytes, see [Ternary](root://getting-started/1.1/the-tangle/ternary.md).
    :::

5. Define a seed

    ```go
    const seed = trinary.Trytes("JBN9ZRCOH9YRUGSWIQNZWAIFEZUBDUGTFPVRKXWPAUCEQQFS9NHPQLXCKZKRHVCCUZNF9CZZWKXRZVCWQ")
    ```

    :::info:
    Because this is a zero-value transaction, the seed is not used. However, the library expects a valid seed, so we use a random string of 81 characters. If you enter a seed that consists of less than 81 characters, the library will append 9s to the end of it to make 81 characters.
    :::

6. Create a JSON message that you want to send to the address and convert it to trytes

    ```go
    var data = "{'message' : 'Hello world'}"
    message, err := converter.ASCIIToTrytes(data)
    must(err)
    ```

    We encode the message in JSON to make it easier to read the message when we get the transaction from the Tangle in the next guide.

    :::info:
    The `AsciiToTrytes()` method supports only [basic ASCII characters](https://en.wikipedia.org/wiki/ASCII#Printable_characters). As a result, diacritical marks such as accents and umlauts aren't supported and result in an `INVALID_ASCII_CHARS` error.
    :::

7. Define a zero-value transaction that sends the message to the address

    ```go
    transfers := bundle.Transfers{
        {
            Address: address,
            Value: 0,
            Message: message,
        },
    }
    ```

8. To create a bundle from your `transfers` object, pass it to the [`PrepareTransfers()`](https://github.com/iotaledger/iota.go/blob/master/.docs/iota.go/reference/api_prepare_transfers.md) method. Then, pass the returned bundle trytes to the [`SendTrytes()`](https://github.com/iotaledger/iota.go/blob/master/.docs/iota.go/reference/api_send_trytes.md) method, which handles tip selection, remote proof of work, and sending the bundle to the node. For details about this process, see [Sending transactions](root://getting-started/1.1/first-steps/sending-transactions.md).

    ```go
    trytes, err := api.PrepareTransfers(seed, transfers, PrepareTransfersOptions{})
    must(err)
    
    myBundle, err := api.SendTrytes(trytes, depth, minimumWeightMagnitude)
    must(err)

    fmt.Println(bundle.TailTransactionHash(myBundle))
    ```

    In the console, you should see the bundle hash of the transaction you just sent.

:::success:Congratulations :tada:
You've just sent your first zero-value transaction. Your transaction is attached to the Tangle, and will be forwarded to the rest of the network.

You can use this tail transaction hash to read the transaction from the Tangle.
:::

:::warning:
Nodes can delete old transactions from their local copies of the Tangle. Therefore, a time may come where you request your transaction from a node, but the IOTA node doesn't have it anymore.

If you want to store data in the Tangle for extended periods of time, we recommend [running your own node](root://node-software/1.0/overview.md)
:::

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code in the browser.

Click the green button to run the sample code in this guide and see the results in the window.

<iframe height="400px" width="100%" src="https://repl.it/@jake91/Send-a-hello-world-transaction-Go?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Next steps

Make a note of the bundle hash so you can [read the transaction from the Tangle](../go/read-transactions.md) to see your message.

You can also read your transaction, using a utility such as the [Tangle explorer](https://utils.iota.org).
