# Check the balance of an address in Java

**In this tutorial, you request the balance of [IOTA tokens](root://getting-started/0.1/clients/token.md) on [addresses](root://getting-started/0.1/clients/addresses.md) from a [node](root://getting-started/0.1/network/nodes.md).**

## Packages

To complete this guide, you need to install the following packages (if you're using Go modules, you just need to reference them):

```bash
go get github.com/iotaledger/iota.go/api
go get github.com/iotaledger/iota.go/trinary
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
        "fmt"
    )
    ```
2. Connect to a node

    ```go
    var node = "https://nodes.devnet.thetangle.org"
    api, err := ComposeAPI(HTTPClientSettings{URI: node})
    must(err)
    ```

3. Define the address whose balance you want to check

    ```go
    const address = trinary.Trytes("MBYBBFONQZPYZYZHSEZJ9EBEBAFHAZKUFSPBM9YOXJUUAMBUCQQABOWFNPEAGXIGMAVWWFZWDCZJGUTBBZYDSALMPA")
    ```

4. Use the [`GetBalances()`](https://github.com/iotaledger/iota.go/blob/master/.docs/iota.go/reference/api_get_balances.md) method to ask the node for the current balance of the address

    ```go
    balances, err := api.GetBalances(trinary.Hashes{address}, 100)
    must(err)
    fmt.Println("\nBalance: ", balances.Balances[0])
    ```

    In the console, you should see a balance of IOTA tokens:

    ```
    Balance: 500
    ```

:::success:Congratulations :tada:
You've just checked the balance of an address.
:::

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code in the browser.

Click the green button to run the sample code in this guide and see the results in the window.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Check-the-balance-of-an-address-Go?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Next steps

[Listen for live transactions on the Tangle](../go/listen-for-transactions.md).

You can also check the balance of an address, using a utility such as the [Tangle explorer](https://utils.iota.org).