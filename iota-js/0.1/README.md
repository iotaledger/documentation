# IOTA JS Library

This is the **official** JavaScript client library, which allows you to do the following:
- Create transactions
- Sign transactions
- Generate addresses
- Interact with an IRI node

[IOTA JS GitHub repository](https://github.com/iotaledger/iota.js).

This is beta software, so there may be performance and stability issues.
Please report any issues in our [issue tracker](https://github.com/iotaledger/iota.js/issues/new).

## Audience

This documentation is designed for people who are familiar with the JavaScript programming language and object-oriented programming concepts. You should also be familiar with basic IOTA concepts such as [address reuse](root://iota-basics/0.1/concepts/addresses-and-signatures.md#address-reuse), [bundles, and transactions](root://iota-basics/0.1/concepts/bundles-and-transactions.md).

This guide is designed to let you quickly start exploring and developing applications with IOTA.

## Prerequisites

To use the library, your computer must have one of the following [supported](https://github.com/iotaledger/iota.js/blob/next/.travis.yml#L5) versions of [Node.js](https://nodejs.org):
- Node JS 10 or higher. Recommended version is [latest LTS](https://nodejs.org/en/download/).
- Node JS 8

To install [library packages](https://www.npmjs.com/org/iota), your computer must have one of the following package managers:

- [npm](https://www.npmjs.com/) (Included in Node.js [downloads](https://nodejs.org/en/download/))
- [Yarn](https://yarnpkg.com/)

You must also have a `package.json` file. Generate one by doing [`npm init`](https://docs.npmjs.com/cli/init) or [`yarn init`](https://yarnpkg.com/lang/en/docs/cli/init/).

## Install the library

To install the IOTA JavaScript client library and its dependencies, you can use one of the following options:

- Install the library with npm
    ```bash
    npm install @iota/core
    ```
- Install the library with Yarn
    ```bash
    yarn add @iota/core
    ```

## Get started

After you've [installed the library](#install-the-library), you can connect to an IRI and interface with it.

To connect to a local IRI node, do the following:

```js
import { composeAPI } from '@iota/core'

const iota = composeAPI({
    // replace with your IRI node address 
    // or connect to a Devnet node for testing: 'https://nodes.devnet.iota.org:443'
    provider: 'http://localhost:14265'
})

iota.getNodeInfo()
    .then(info => console.log(info))
    .catch(error => {
        console.log(`Request error: ${error.message}`)
    })
```


## API reference

For details on all available API methods, see the [reference page](https://github.com/iotaledger/iota.js/blob/next/api_reference.md).


- [.composeApi([settings])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.composeApi)
- [.addNeighbors(uris, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.addNeighbors)
- [.attachToTangle(trunkTransaction, branchTransaction, minWeightMagnitude, trytes, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.attachToTangle)
- [.broadcastBundle(tailTransactionHash, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.broadcastBundle)
- [.broadcastTransactions(trytes, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.broadcastTransactions)
- [.checkConsistency(transactions, [options], [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.checkConsistency)
- [.findTransactionObjects(query, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.findTransactionObjects)
- [.findTransactions(query, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.findTransactions)
- [.getAccountData(seed, options, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getAccountData)
- [.getBalances(addresses, threshold, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getBalances)
- [.getBundle(tailTransactionHash, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getBundle)
- [.getInclusionStates(transactions, tips, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getInclusionStates)
- [.getInputs(seed, [options], [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getInputs)
- [.getLatestInclusion(transactions, tips, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getLatestInclusion)
- [.getNeighbors([callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getNeighbors)
- [.getNewAddress(seed, [options], [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getNewAddress)
- [.getNodeInfo([callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getNodeInfo)
- [getTips([callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getTips)
- [getTransactionObjects(hashes, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getTransactionObjects)
- [.getTransactionsToApprove(depth, [reference], [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getTransactionsToApprove)
- [.getTrytes(hashes, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getTrytes)
- [.isPromotable(tail, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.isPromotable)
- [.prepareTransfers(seed, transfers, [options], [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.prepareTransfers)
- [.promoteTransaction(tail, depth, minWeightMagnitude, transfer, [options], [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.promoteTransaction)
- [.removeNeighbors(uris, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.removeNeighbors)
- [.replayBundle(tail, depth, minWeightMagnitude, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.replayBundle)
- [.sendTrytes(trytes, depth, minWeightMagnitude, [reference], [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.sendTrytes)
- [.storeAndBroadcast(trytes, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.storeAndBroadcast)
- [.storeTransactions(trytes, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.storeTransactions)
- [.traverseBundle(trunkTransaction, [bundle], [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.traverseBundle)
- [.generateAddress(seed, index, [security], [checksum])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.generateAddress)

## Examples

As well as the following examples, you can take a look at our [examples directory](https://github.com/iotaledger/iota.js/tree/next/examples) for more.

### Create and broadcast transactions

This example shows you how to create and send a transaction to an IRI node by calling the [`prepareTransfers`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.prepareTransfers) method and piping the prepared bundle to the [`sendTrytes`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.sendTrytes) method.

```js
import { composeAPI } from '@iota/core'

const iota = composeAPI({
    // replace with your IRI node address 
    // or connect to a Devnet node for testing: 'https://nodes.devnet.iota.org:443'
    provider: 'http://localhost:14265'
})

// Must be truly random & 81-trytes long.
const seed = ' your seed here '

// Array of transfers which defines transfer recipients and value transferred in IOTAs.
const transfers = [{
    address: ' recipient address here ',
    value: 1000, // 1Ki
    tag: '', // optional tag of `0-27` trytes
    message: '' // optional message in trytes
}]

// Depth or how far to go for tip selection entry point.
const depth = 3 

// Difficulty of Proof-of-Work required to attach transaction to tangle.
// Minimum value on mainnet is `14`, `7` on spamnet and `9` on devnet and other testnets.
const minWeightMagnitude = 14

// Prepare a bundle and signs it.
iota.prepareTransfers(seed, transfers)
    .then(trytes => {
        // Persist trytes locally before sending to network.
        // This allows for reattachments and prevents key reuse if trytes can't
        // be recovered by querying the network after broadcasting.

        // Does tip selection, attaches to tangle by doing PoW and broadcasts.
        return iota.sendTrytes(trytes, depth, minWeightMagnitude)
    })
    .then(bundle => {
        console.log(`Published transaction with tail hash: ${bundle[0].hash}`)
        console.log(`Bundle: ${JSON.stringify(bundle, null, 1)}`)
    })
    .catch(err => {
        // handle errors here
    })
```

### Create custom API methods

1. Install an IRI HTTP client

    ```bash
    npm install @iota/http-client
    ```

2. Create an API method

    ```js
    import { createHttpClient } from '@iota/http-client'
    import { createGetNodeInfo } from '@iota/core'

    const client = createHttpClient({
        // replace with your IRI node address 
        // or connect to a Devnet node for testing: 'https://nodes.devnet.iota.org:443'
        provider: 'http://localhost:14265'
    })

    const getNodeInfo = createGetNodeInfo(client)
    ```

## Support the project

If the IOTA JavaScript client library has been useful to you and you feel like contributing, consider posting a [bug report](https://github.com/iotaledger/iota.js/issues/new), [feature request](https://github.com/iotaledger/iota.js/issues/new) or a [pull request](https://github.com/iotaledger/iota.js/pulls/).  

### Clone and bootstrap the repository on GitHub

1. Click the <kbd>Fork</kbd> button in the top-right corner
2. Clone your fork and change directory into it
3. Bootstrap your environment

    ```bash
    npm run init
    ```

This step will download all dependencies, build and link the packages together. iota.js uses [Lerna](https://lernajs.io/) to manage multiple packages. You can re-bootstrap your setup at any point with `lerna bootstrap` command.

### Run tests

Make your changes on a single package or across multiple packages and test the system by running the following from the root directory:

```bash
npm test
```
To run tests of specific package, change directory into the package's directory and run `npm test` from there.

### Update documentation

Please update the documention when needed by editing [`JSDoc`](http://usejsdoc.org) annotations and running `npm run docs` from the root directory.

## Join the discussion

If you want to get involved in the community, need help with getting setup, have any issues related with the library or just want to discuss IOTA, Distributed Registry Technology (DRT) and IoT with other people, feel free to join our [Discord](https://discordapp.com/invite/fNGZXvh).
