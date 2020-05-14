# Listen to account events in Go

**An account object emits events when they happen. An example of an event is when you make or receive a payment. In this tutorial, you listen for these events and log them to the console.**

Accounts have two types of listeners: One that uses channels and one that uses callbacks. In this tutorial, we use callback listeners. If you're interested in using a channel listener, see our guide for [creating an event-listener plugin](../go/create-plugin.md).

## Packages

To complete this guide, you need to install the following packages (if you're using Go modules, you just need to reference them):

```bash
go get github.com/iotaledger/iota.go/api
go get github.com/iotaledger/iota.go/badger
go get github.com/iotaledger/iota.go/builder
go get github.com/iotaledger/iota.go/timesrc
go get github.com/iotaledger/iota.go/trinary
go get github.com/iotaledger/iota.go/account
```

## IOTA network

In this tutorial, we connect to a node on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet).

## Code walkthrough

1. Build and start an account that has an `EventMachine` object

    ```go
    account, err = builder.NewBuilder().
        // Connect to a node
		WithAPI(iotaAPI).
		// Create the database
		WithStore(store).
		WithSeed(seed).
		// Set the minimum weight magnitude for the Devnet
		WithMWM(9).
		WithTimeSource(timesource).
        // Load the EventMachine
        WithEvents(em)
        // Load the default plugins that enhance the functionality of the account
        WithDefaultPlugins().
        Build()
    handleErr(err)

    handleErr(account.Start())
    ```

2. Create a new `CallbackEventListener` object that listens for incoming and outgoing payments

    ```go
    lis := listener.NewCallbackEventListener(em)
    lis.RegSentTransfers(func(bun bundle.Bundle) {
		fmt.Println("Outgoing payment is pending")
		fmt.Println("Bundle :", bun)
	})
    lis.RegPromotions(func(promoted *promoter.PromotionReattachmentEvent) {
		fmt.Println("Promoting a pending bundle")
		fmt.Printf("%+v\n", *promoted)
	})
	lis.RegReattachments(func(promoted *promoter.PromotionReattachmentEvent) {
		fmt.Println("Reattaching a pending bundle")
		fmt.Printf("%+v\n", *promoted)
	})
    lis.RegConfirmedTransfers(func(bun bundle.Bundle) {
        fmt.Println("Outgoing payment confirmed")
        fmt.Println("Bundle :", bun)
    })
    lis.RegReceivedMessages(func(bun bundle.Bundle) {
        fmt.Println("Received a new message")
        fmt.Println("Bundle :", bun)
    })
    lis.RegReceivingDeposits(func(bun bundle.Bundle) {
        fmt.Println("Receiving a new payment")
        fmt.Println("Bundle :", bun)
    })
    lis.RegReceivedDeposits(func(bun bundle.Bundle) {
        fmt.Println("Received a new payment")
        fmt.Println("Bundle :", bun)
    })
    ```

:::success:Congratulations! :tada:
You're account can now emit events that you can listen to and act on.
:::

## Next steps

Now that you have an event listener, start [making payments to/from your account](../go/make-payment.md) to test it.
