# Generate a conditional deposit address in Go

**In this tutorial, you generate a conditional deposit address (CDA), serialize it into a magnet link, and send test IOTA tokens to it.**

## Packages

To complete this guide, you need the following packages (if you're using Go modules, you just need to reference them):

```bash
go get github.com/iotaledger/iota.go/account/builder
go get github.com/iotaledger/iota.go/account/deposit
go get github.com/iotaledger/iota.go/account/store/badger
go get github.com/iotaledger/iota.go/account/timesrc
go get github.com/iotaledger/iota.go/api
go get github.com/iotaledger/iota.go/trinary
```

## IOTA network

In this tutorial, we connect to a node on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet).

## Code walkthrough

1. [Plan the conditions](../../how-it-works.md#advice-for-creating-cdas) that you would like your conditional deposit address to have

2. Create a new CDA. This one expires tomorrow.

    ```go
    // Get the current time
	now, err := timesource.Time()
	handleErr(err)

	// Define the same time tomorrow
	now = now.Add(time.Duration(24) * time.Hour)

	// Specify the conditions
	conditions := &deposit.Conditions{TimeoutAt: &now, MultiUse: true}

	// Generate the CDA
	cda, err := account.AllocateDepositAddress(conditions)
	handleErr(err)
    ```

    :::info:
    By default, this method generates a CDA, using your account's security level settings. To generate a CDA with a different security level, you need to update your account settings.
    :::

3. Use the `AsMagnetLink()` method to serialize the CDA into a magnet link and print it to the console

    ```go
    fmt.Println(cda.AsMagnetLink())
    ```

    :::info:
    The last 9 trytes of a CDA are the checksum, which is a hash of the address and all of its conditions.
    :::

4. Copy and paste your address into the [Devnet faucet](https://faucet.devnet.iota.org), then wait for the tokens to be transferred to your address

    :::info:
    Make sure to remove the checksum before requesting IOTA tokens from the Devnet faucet.
    :::

    For example:

    ```bash
    DL9CSYICJVKQRUTWBFUCZJQZ9WNBSRJOA9MGOISQZGGHOCZTXVSKDIZN9HBORNGDWRBBAFTKXGEJIAHKD
    ```

:::success:
Now you have a CDA that contains IOTA tokens, you can make payments to it.
:::

## Run the code

These code samples are hosted on [GitHub](https://github.com/iota-community/account-module).

To get started you need [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [Go](https://golang.org/doc/install) installed on your device.

In the command-line, do the following:

```bash
git clone https://github.com/iota-community/account-module.git
cd account-module/go/account-module
go mod download
go run generate-cda/generate-cda.go
```

You should see the magnet link in the console.

```bash
iota://DL9CSYICJVKQRUTWBFUCZJQZ9WNBSRJOA9MGOISQZGGHOCZTXVSKDIZN9HBORNGDWRBBAFTKXGEJIAHKDJUYJJCFHC/?timeout_at=1574514007&multi_use=1&expected_amount=0
```

You can copy this magnet link and send it to someone else so they can deposit IOTA tokens into it.

## Next steps

[Start making payments with your account](../go/make-payment.md).