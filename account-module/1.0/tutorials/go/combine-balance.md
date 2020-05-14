# Combine your balance into one CDA in Go

**You may want to keep the majority of your balance on as few conditional deposit addresses (CDA) as possible. This way, making payments is faster and requires fewer transactions. In this tutorial, you transfer your entire available balance to a new CDA.**

## Packages

To complete this guide, you need to install the following packages (if you're using Go modules, you just need to reference them):

```bash
go get github.com/iotaledger/iota.go/account/builder
go get github.com/iotaledger/iota.go/account/deposit
go get github.com/iotaledger/iota.go/account/oracle
go get github.com/iotaledger/iota.go/account/oracle/time
go get github.com/iotaledger/iota.go/account/store/badger
go get github.com/iotaledger/iota.go/account/timesrc
go get github.com/iotaledger/iota.go/api
```

## IOTA network

In this tutorial, we connect to a node on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet).

## Code walkthrough

1. Create a CDA that expects your account's available balance

    ```go
    // Get the current time
    now, err := timesource.Time()
    handleErr(err)

    now = now.Add(time.Duration(24) * time.Hour)

    // Specify the conditions
    conditions := &deposit.Conditions{TimeoutAt: &now, MultiUse: false, ExpectedAmount: account.AvailableBalance() }

    cda, err := account.AllocateDepositAddress(conditions)
    handleErr(err)
    ```

    :::info:
    You account's available balance is the total balance of all expired CDAs. This balance is safe to withdraw because no one should send IOTA tokens to an expired CDA.

    Your account's total balance includes CDAs that are still active as well as expired.
    :::

2. Use the oracle to make sure that the CDA is still active, then send a deposit to it

    ```go
    // Ask the oracle if the CDA is OK to send to
	ok, rejectionInfo, err := sendOracle.OkToSend(cda)
	handleErr(err)
	if !ok {
		fmt.Println("Won't send transaction: ", rejectionInfo)
		return
	}

	// Create and send the bundle
	bundle, err := account.Send(cda.AsTransfer())
	handleErr(err)

	fmt.Printf("Sent deposit to %s in the bundle with the following tail transaction hash %s\n", cda.Address, bundle[len(bundle)-1].Hash)
    ```

:::success:
Now your total available balance is in a single address.
:::

## Run the code

These code samples are hosted on [GitHub](https://github.com/iota-community/account-module).

To get started you need [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [Go](https://golang.org/doc/install) installed on your device.

In the command-line, do the following:

```bash
git clone https://github.com/iota-community/account-module.git
cd account-module/go/account-module
go mod download
go run combine-balance/combine-balance.go
```
You should see that the deposit was sent.

Your seed state will contain this pending bundle until it is confirmed.

## Next steps

[Try exporting your seed state so you back it up or import it onto another device](../go/export-seed-state.md).