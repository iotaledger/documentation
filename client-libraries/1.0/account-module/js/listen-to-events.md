# Listen to events in an account in JavaScript

**An account object emits events when they happen. An example of an event is when you make or receive a payment. In this tutorial, you listen for these events and log them to the console.**

## Packages

To complete this tutorial, you need to install the following packages:

--------------------
### npm
```bash
npm install @iota/account ntp-client
```
---
### Yarn
```bash
yarn add @iota/account ntp-client
```
--------------------

## IOTA network

In this tutorial, we connect to a node in the [Devnet](root://getting-started/1.1/networks/overview.md).

## Code walkthrough

1. Attach listeners to your account for deposit and withdrawal events

    ```js
    account.on('pendingDeposit', ({ address, bundle }) => {
        console.log('Receiving a new payment')
        console.log('Address:', address, 'Tail transaction hash:', bundle[0].hash);
    });

    account.on('includedDeposit', ({ address, bundle }) => {
        console.log('Received a new payment')
        console.log('Address:', address, 'Tail transaction hash:', bundle[0].hash);
    });

    account.on('pendingWithdrawal', ({ address, bundle }) => {
        console.log('Outgoing payment is pending')
        console.log('Address:', address, 'Tail transaction hash:', bundle[0].hash);
    });

    account.on('includedWithdrawal', ({ address, bundle }) => {
        console.log('Outgoing payment confirmed')
        console.log('Address:', address, 'Tail transaction hash:', bundle[0].hash);
    });
    ```

2. Subscribe to `error` events. These events are useful for debugging your application and reacting to exceptions that may be thrown in the background.

    ```js
    account.on('error', (error) => {
        console.log(`Something went wrong: ${error}`);
    });
    ```

    :::info:
    An event is triggered for each transaction that affects any active CDAs in your account.
    :::

:::success:Congratulations! :tada:
You're account can now emit events that you can listen to and act on.
:::

## Account events

|**Event name**|**Callback arguments**|
| :----------| :----------|
|`pendingDeposit`|`{ address, bundle }`|
|`includedDeposit`|`{ address, bundle }`|
|`pendingWithdrawal`|`{ address, bundle }`|
|`includedWithdrawal`|`{ address, bundle }`|
|`selectInput`|`{ transfer, input }`|
|`prepareTransfer`|`{ transfer, trytes }`|
|`getTransactionsToApprove`|`{ trytes, { trunkTransaction, branchTransaction } }`|
|`attachToTangle`|`transactionObjects`|
|`broadcast`|`transactionObjects`|
|`error`|`Error`|

## Next steps

Now that you have an event listener, start [making payments to/from your account](../js/make-payment.md) to test it.


