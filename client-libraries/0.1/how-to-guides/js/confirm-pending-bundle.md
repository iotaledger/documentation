# Help a bundle to become confirmed

**To be referenced by a [milestone](root://getting-started/0.1/network/the-coordinator.md), a transaction must be selected during tip selection, which favors new transactions over old ones. Therefore, the longer a [bundle](root://getting-started/0.1/transactions/bundles.md) is stuck in a [pending state](root://getting-started/0.1/network/the-tangle.md#transaction-states), the less likely it is to be confirmed. To increase the chances of a bundle being confirmed, you can reattach and promote its tail transaction.**

## Packages

To complete this guide, you need to install the following package:

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

In this tutorial, we connect to a node on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet) with the following network settings:

- **[Minimum weight magnitude](root://getting-started/0.1/network/minimum-weight-magnitude.md)**: 9

- **[Depth](root://getting-started/0.1/transactions/depth.md)**: 3

## Step 1. Create a timer function

To keep a counter of long it took for a bundle to be confirmed, create a timer function.

1. Define the tail transaction hash of the pending bundle that you want to confirm

    ```js
    const tails = ["tail transaction hash"];
    ```

    :::info:
    The tail transactions of any reattachment bundles will also be appended to this array for checking.
    :::

2. Create a variable to store the number of seconds for the timer

    ```js
    var seconds = 0;
    ```

3. Set the timer to measure how long it takes for the bundle to be confirmed. Every second, the timer will increment the `seconds` variable by one.

    ```js
    var timer = setInterval(stopWatch, 1000);
    function stopWatch (){
    seconds++
    }
    ```

## Step 2. Create a function to auto-promote and auto-reattach bundles

To promote and reattach a bundle, you need to pass its tail transaction hash to the relevant function in the client library.

The [`isPromotable()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.isPromotable) method checks if the tail transaction is consistent and was not attached to the Tangle before the most recent 6 milestones.

If the tail transaction is promotable, the [`promoteTransaction()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.promoteTransaction) method promotes it.

If the tail transaction isn't promotable, the [`replayBundle()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.replayBundle) method reattaches the bundle, then the new reattached bundle's tail transaction hash is added to the `tails` array so that it can be checked for confirmation later on.

```js
function autoPromoteReattach (tail) {
  iota.isPromotable(tail)
    .then(promote => promote
    ? iota.promoteTransaction(tail, 3, 14)
        .then(()=> {
            console.log(`Promoted transaction hash: ${tail}`);
        })
    : iota.replayBundle(tail, 3, 14)
        .then(([reattachedTail]) => {
            const newTailHash = reattachedTail.hash;

            console.log(`Reattached transaction hash: ${tail}`);

            // Keep track of all reattached tail transaction hashes to check for confirmation
            tails.push(newTailHash);
        })
    )
    .catch((error)=>{
         console.log(error);
    });
}
```

## Step 3. Create a function to check for confirmation at regular intervals

To be able to check the array of tail transactions for confirmation at regular intervals, you need a function that can be passed to a `setInterval()` function.

The [`getLatestInclusion()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getLatestInclusion) method checks if any of the tail transactions in the array have been confirmed. If any of the transactions have been confirmed this method returns `true`.

The `tail` variable stores the last tail transaction in the array so that the latest reattachment can be promoted or reattached.

If none of the tail transactions have been confirmed yet, the `tail` variable is passed to the [`autoPromoteReattach()`](#create-a-function-to-auto-promote-and-auto-reattach-bundles) function.

If a tail transaction has been confirmed, it's logged to the console along with the number of minutes it took to confirm.

```js
function autoConfirm(tails){
console.log(tails);
    iota.getLatestInclusion(tails)
        .then(states => {
            // Check that none of the transactions have been confirmed
            if (states.indexOf(true) === -1) {
                // Get latest tail hash
                const tail = tails[tails.length - 1]
                autoPromoteReattach(tail);
            } else {
                console.log(JSON.stringify(states,null, 1));
                clearInterval(interval);
                clearInterval(timer);
                var minutes = (seconds / 60).toFixed(2);
                var confirmedTail = tails[states.indexOf(true)];
                console.log(`Confirmed transaction hash in ${minutes} minutes: ${confirmedTail}`);
                return;
            }
        }).catch(error => {
            console.log(error);
        }
    );
}
```

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code from the JavaScript client library in the browser.

Click the green button to run the sample code in this guide and see the results in the window.

Before you run this sample code, find a pending tail transaction hash and store it in the `tails` array.

:::info:Can't find a pending transaction?
Go to [utils.iota.org](https://utils.iota.org) and click a transaction hash in the Latest transactions box. This transaction is a tip, so it is in a pending state.
:::

<iframe height="500px" width="100%" src="https://repl.it/@jake91/Confirm-pending-bundle?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

:::info:
This sample code may take a few minutes to complete. If you see `Started autoConfirm() function => undefined`, the code is running in the background. Wait until the code finishes. You should see messages appear in the console.
:::
