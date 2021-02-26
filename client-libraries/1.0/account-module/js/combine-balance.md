# Combine your balance into one CDA in JavaScript

**You may want to keep the majority of your balance on as few conditional deposit addresses (CDA) as possible. This way, making payments is faster and requires fewer transactions. In this tutorial, you transfer your entire available balance to a new CDA.**

## Packages

To complete this tutorial, you need to install the following packages:

--------------------
### npm
```bash
npm install @iota/account @iota/transaction-converter ntp-client
```
---
### Yarn
```bash
yarn add @iota/account @iota/transaction-converter ntp-client
```
--------------------

## IOTA network

In this tutorial, we connect to a node in the [Devnet](root://getting-started/1.1/networks/overview.md).

## Code walkthrough

1. Create a CDA that expects your account's available balance

    ```js
    account.getAvailableBalance()
    .then(balance => {
        const cda = account.generateCDA({
                timeoutAt: Date.now() + 24 * 60 * 60 * 1000,
                expectedAmount: balance
        })
    ```

    :::info:
    You account's available balance is the total balance of all expired CDAs. This balance is safe to withdraw because no one should transfer IOTA tokens to an expired CDA.

    Your account's total balance includes CDAs that are still active as well as expired.
    :::

2. Send a deposit to your CDA

    ```js
        .then(cda => {
                    account.sendToCDA({
                    ...cda,
                    value: balance
                })
                .then(trytes => {
                    
                    console.log(trytes)
                    // Get the tail transaction and convert it to an object
                    let bundle = TransactionConverter.asTransactionObject(trytes[0]);
                    let bundleHash = bundle.bundle;
                    let address = bundle.address
                    let value = bundle.value;
                    console.log(`Sent ${value} IOTA tokens to ${address} in bundle:  ${bundleHash}`);
                })
            })
        }).catch(error => {
        console.log(error);
        // Close the database and stop any ongoing reattachments
        account.stop();
    });
    ```

    You should see how many IOTA tokens were sent to your address as well as the bundle hash:

    ```
    Sent 1000 to TIZJIRDCZPRJMMVKSGROPKE9VGIQKOLOUSX9MCUTOEQBBHPMLYBVKBPCXJKY9SDWX9FVMOZTWNMVVEYKX in bundle:  RXIA9CBEOASNY9IRIARZFGDLK9YNGW9ZHJGJLUXOUKVGCZLPNDKALFHZWHZKQQXFTIHEIJJPN9EURO9K9
    ```

:::success:
Now your total available balance is in a single address.
:::

## Run the code

These code samples are hosted on [GitHub](https://github.com/iota-community/account-module).

To get started you need [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [Node.js](https://nodejs.org/en/download/) installed on your device.

In the command-line, do the following:

```bash
git clone https://github.com/iota-community/account-module.git
cd account-module/js/account-module
npm i
node combine-balance/combine-balance.js
```

You should see that the deposit was sent.

Your seed state will contain this pending bundle until its tail transaction is confirmed.

## Next steps

[Try exporting your seed state so you back it up or import it onto another device](../js/export-seed-state.md).