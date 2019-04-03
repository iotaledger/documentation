# Confirm a pending bundle

**Before IOTA tokens can be transferred, the bundle that transfers them must be confirmed. Transactions in a bundle remain in a pending state until the tail transaction is approved by a milestone, at which point the bundle is confirmed. To be approved by a milestone, a transaction must be selected during tip selection, which favors new transactions over old ones. Therefore, the longer a bundle is stuck in a pending state, the less likely it is to be confirmed. To increase the chances of a bundle being confirmed, you can reattach and promote it, depending on the circumstances.**

## Prerequisites

To complete these guides, you need the following:

* [Node JS (8+)](https://nodejs.org/en/)
* A code editor such as [Visual Studio Code](https://code.visualstudio.com/Download)
* Access to a command prompt
* An Internet connection
* A tail transaction hash (`currentIndex` 0) from any pending bundle. You can create one by following the ['Send a bundle of zero-value transactions' article](../how-to-guides/send-bundle.md)

---

A bundle can be stuck in a pending state for many reasons, for example if it's too old to be selected during tip selection or if it's attached to a part of the Tangle that leads to an invalid state such as a double-spend (inconsistent subtangle).

To increase the chances of a pending transaction being confirmed, you can either reattach or promote it.

In this guide, you'll create a script that does the following every 30 seconds:

* Check if the tail transaction has been confirmed
* If the transaction is still pending, promote or reattach it

## Create the file and directory

The sample code for this guide uses the IOTA core library. To use this library, you must create a working directory and install it using the `npm` package manager.

1. Create a new directory called `iota-basics`

2. Change into the `iota-basics` directory, and install the [IOTA core library](https://github.com/iotaledger/iota.js/tree/next/packages/core)

    ```bash
    cd iota-basics
    npm install --save @iota/core
    ```

3. In the `iota-basics` directory, create a new file called pending-to-confirmed.js

## Create a timer function

If you want to know how long it took for a bundle to be confirmed, create a timer function.

1. In the pending-to-confirmed.js file, require the IOTA library

    ```js
    const Iota = require('@iota/core');
    ```

2. Create an array variable to store the tail transaction hash of the pending bundle that you want to confirm as well as the tail transaction hashes of any future reattached bundles

    ```js
    const tails = ["tail transaction hash"];
    ```

3. Create a variable to store the number of seconds for the timer

    ```js
    var seconds = 0;
    ```

4. Set the timer to measure how long it takes for the bundle to be confirmed. Every second, the timer will increment the `seconds` variable by one.

    ```js
    var timer = setInterval(stopWatch, 1000);
    function stopWatch (){
    seconds++
    }
    ```

## Create a function to auto-promote and auto-reattach bundles

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

## Create a function to check for confirmation at regular intervals

To be able to check the array of tail transactions for confirmation at regular intervals, you need a function that can be passed to a `setInterval()` function.

The [`getLatestInclusion()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getLatestInclusion) method checks if any of the the tail transactions in the array have been confirmed. If any of the transactions have been confirmed this method returns `true`.

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


## Final code

Before you run this sample code, find a pending tail transaction hash and store it in the `tails` array.

```js
const Iota = require('@iota/core');

const iota = Iota.composeAPI({
  provider: 'https://nodes.thetangle.org:443'
  });

var tails = ["tail transaction hash"];
var seconds = 0;

var anonymousMainFunction = autoConfirm.bind(global,tails);

// Run the autoConfirm() function every 30 seconds to check for confirmations
var interval = setInterval(anonymousMainFunction, 30000);

// Set a timer to measure how long it takes for the bundle to be confirmed
var timer = setInterval(stopWatch, 1000);
function stopWatch (){
  seconds++
}

console.log("Started autoConfirm() function");

// Create a function that checks if a bundle is attached to a valid subtangle
// and not older than the last 6 milestone transactions
// If it is, promote it, if not, try to reattach it.
function autoPromoteReattach (tail) {
  iota.isPromotable(tail)
    .then(promote => promote
    ? iota.promoteTransaction(tail, 3, 14)
        .then(()=> {
            console.log(`Promoted transaction hash: ${tail}`);
        })
    : iota.replayBundle(tail, 3, 14)
        .then(([reattachedTail]) => {
            const newTailHash = reattachedTail.hash

            console.log(`Reattached transaction hash: ${tail}`);

            // Keep track of all reattached tail transaction hashes to check for confirmation
            tails.push(newTailHash);
        })
    )
    .catch((error)=>{
         console.log(error);
    });
}

// Create the autoConfirm function
// that checks if one of the bundles have been confirmed
// If not, start to promote and reattach the tail transactions until at least one of them is confirmed
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
