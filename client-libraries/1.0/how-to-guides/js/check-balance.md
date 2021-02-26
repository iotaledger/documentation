# Check the balance of an address in Node.js

**In this tutorial, you request the balance of IOTA tokens on addresses from a node.**

## Packages

To complete this tutorial, you need to install the following package:

--------------------
### npm
```bash
npm install @iota/core
```
---
### Yarn
```bash
yarn add @iota/core
```
--------------------

## IOTA network

In this tutorial, we connect to a node in the [Devnet](root://getting-started/1.1/networks/overview.md).

## Code walkthrough

1. Require the packages

    ```js
    const Iota = require('@iota/core');
    ```

2. Connect to a node

    ```js
    const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
    });
    ```

3. Define the address whose balance you want to check

    ```js
    const address =
    'NBZLOBCWG9BAQTODDKNF9LYYTBOUWSQSGCWFQVZZR9QXCOAIBRYDTZOEGBGMZKJYZOPPGRGFFWTXUKUKW';
    ```

4. Use the [`getBalances()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getBalances) method to ask the IOTA node for the current balance of the address

    ```js
   IOTA.getBalances([address], 100)
      .then(({ balances }) => {
      console.log(balances)
      })
      .catch(err => {
      console.error(err)
      });
    ```

    In the console, you should see a balance of IOTA tokens:

    ```
    [500]
    ```

:::success:Congratulations :tada:
You've just checked the balance of an address.
:::

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code in the browser.

Click the green button to run the sample code in this guide and see the results in the window.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Check-the-balance-of-an-address?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Next steps

[Listen for live transactions in the Tangle](../js/listen-for-transactions.md).

You can also check the balance of an address, using a utility such as the [Tangle explorer](https://utils.iota.org).