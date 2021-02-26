# Check if a transaction is confirmed

**Before IOTA tokens can be transferred, the transactions must be confirmed. Transactions in a bundle remain in a pending state until the tail transaction is referenced and approved by a [milestone](root://getting-started/1.1/references/glossary.md#milestone).**

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

1. Go to [utils.iota.org](https://utils.iota.org/) and find a confirmed transaction

    :::info:Can't find a confirmed transaction?
    Click a transaction hash in the Latest milestones box, then click the branch transaction hash. This transaction is referenced and approved by the milestone, so it is in a confirmed state.
    :::

2. Pass the transaction hash to the [`getInclusionStates()`](https://github.com/iotaledger/iota.js/tree/next/packages/core#module_core.getInclusionStates) method to check if the IOTA node's latest solid subtangle milestone approves it

    ```js
   IOTA.getInclusionStates(['TRANSACTION HASH'])
    .then(states => console.log(states));
    ```

    When you execute the file, you should see an array that contains the `true` boolean, meaning that the transaction is confirmed.

5. Go to [utils.iota.org](https://utils.iota.org) and find a pending transaction

    :::info:Can't find a pending transaction?
    Click a transaction hash in the Latest transactions box. This transaction is a tip, so it is in a pending state.
    :::

6. Pass the transaction hash to the `getInclusionStates()` method to check if the IOTA node's latest solid subtangle milestone approves it

    ```js
   IOTA.getInclusionStates(['TRANSACTION HASH'])
    .then(states => console.log(states));
    ```

    When you execute the file, you should see an array that contains the `false` boolean, meaning that the transaction is not yet confirmed.

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code from the JavaScript client library in the browser.

Click the green button to run the sample code in this guide and see the results in the window.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Check-transaction-confirmation?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Next steps

[Increase the likelihood of a pending transaction being confirmed](../js/confirm-pending-bundle.md)

