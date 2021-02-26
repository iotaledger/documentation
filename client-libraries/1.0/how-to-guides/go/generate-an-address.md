# Generate an address in Go

**In this tutorial, you learn how to generate a new address for a seed with a given security level.**

## Packages

To complete this tutorial, you need to install the following packages (if you're using Go modules, you just need to reference them):

```bash
go get github.com/iotaledger/iota.go/api
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

3. Define the security level that you want to use for your address

    ```go
    const securityLevel = 2;
    ```

4. Define a seed for which to generate an address

    ```go
    const seed = trinary.Trytes("PUETPSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX")
    ```

5. Use the [`GetNewAddress()`](https://github.com/iotaledger/iota.go/blob/master/.docs/iota.go/reference/api_get_new_address.md) method to generate an unspent address

    ```go
    addresses, err := api.GetNewAddress(seed, GetNewAddressOptions{Security:securityLevel})
    must(err)

    fmt.Println("\nYour address is: ", addresses[0])
    ```

Starting from the given index, the connected node checks if the address is spent by doing the following:

- Search its view of the Tangle for input transactions that withdraw from the address
- Search for the address in the list of spent addresses

If an address with the given index is spent, the index is incremented until the IOTA node finds one that isn't spent.

:::warning:
This way of generating addresses replies on the IOTA node to return valid data about your addresses. To have more control over your addresses, we recommend using the [account module](../../account-module/introduction/overview.md) to keep track of spent addresses in your own local database.
:::

In the console, you should see an address.

```
Your address is: WKJDF9LVQCVKEIVHFAOMHISHXJSGXWBJFYEQPOQKSVGZZFLTUUPBACNQZTAKXR9TFVKBGYSNSPHRNKKHA
```

:::success:Congratulations :tada:
You've just generated a new unspent address. You can share this address with anyone who wants to send you a transaction.
:::

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code in the browser.

Click the green button to run the sample code in this guide and see the results in the window.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Generate-an-address-Go?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Next steps

[Send test IOTA tokens to your new address](../go/transfer-iota-tokens.md).
