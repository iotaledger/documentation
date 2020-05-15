# Listen to events in an account in Java

**An account object emits events when they happen. An example of an event is when you make or receive a payment. In this tutorial, you listen for these events and log them to the console.**

## IOTA network

In this tutorial, we connect to a node on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet).

## Code walkthrough

1. Create a class that listens to account events

    ```java
	private class AccountListener implements EventListener {
        private IotaAccount account;

        public AccountListener(IotaAccount account) {
            this.account = account;
        }

         @AccountEvent
        public void sent(EventSentTransfer e) {
            System.out.println("Account: " + account.getId());
            System.out.println("Outgoing payment is pending: " + e.getBundle().getBundleHash());
        }

         @AccountEvent
        public void promoted(EventPromotion e) {
            System.out.println("Account: " + account.getId());
            System.out.println("Promoting a pending bundle: " + e.getPromotedBundle());
        }
        
        @AccountEvent
        public void reattach(EventReattachment e) {
            System.out.println("Account: " + account.getId());
            System.out.println("Reattaching a pending bundle: " + e.getNewBundle());
        }
        
        @AccountEvent
        public void confirmed(EventTransferConfirmed e) {
            System.out.println("Account: " + account.getId());
            System.out.println("Outgoing payment confirmed: " + e.getBundle().getBundleHash());
        }
        
        @AccountEvent
        public void received(EventReceivedMessage e) {
            System.out.println("Account: " + account.getId());
            System.out.println("Received a new message: " + e.getMessage());
        }

        @AccountEvent
        public void received(EventReceivingDeposit e) {
            System.out.println("Account: " + account.getId());
            System.out.println("Receiving a new payment: " + e.getBundle());
        }

        @AccountEvent
        public void received(EventReceivedDeposit e) {
            System.out.println("Account: " + account.getId());
            System.out.println("Received a new payment: " + e.getBundle());
        }
        
    }
    ```

2. Register the `AccountListener` object with your account

    ```java
	account.getEventManager().registerListener(new AccountListener(account));
    ```

:::success:Congratulations :tada:
You're account can now emit events that you can listen to and act on.
:::

## Next steps

Now that you have an event listener, start [making payments to/from your account](../java/make-payment.md) to test it.