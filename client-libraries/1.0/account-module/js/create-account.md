# Create an account in JavaScript

**In this tutorial, you create an account to keep track of your seed state in a local database and learn how to display your available balance.**

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

1\. Create a new seed and back it up

:::info:
Existing seeds are not safe to use because their state is unknown. As such, these seeds may have spent addresses that the account is not aware of.
:::

--------------------
### Linux
```bash
cat /dev/urandom |tr -dc A-Z9|head -c${1:-81}
```
---
### macOS
```bash
cat /dev/urandom |LC_ALL=C tr -dc 'A-Z9' | fold -w 81 | head -n 1
```
---
### Windows PowerShell
```bash
$b=[byte[]] (1..81);(new-object Security.Cryptography.RNGCryptoServiceProvider).GetBytes($b);-join($b|%{[char[]] (65..90+57..57)[$_%27]})
```
--------------------

2\. Define the seed that your account will use

```js
const seed = 'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';
```

3\. Define your network settings

```js
// The IOTA node to connect to
const provider = 'https://nodes.devnet.iota.org:443';

// How far back in the Tangle to start the tip selection
const depth = 3;

// The minimum weight magnitude for the Devnet
const minWeightMagnitude = 9;

// How long to wait between each reattachment round
const delay = 1000 * 30;

// The depth at which transactions are no longer promotable
// and are automatically reattached
const maxDepth = 6;
```

4\. Create a `timeSource` function that returns a promise, which the account will use to decide if your CDAs are still active. In this example, we use the [ntp-client](https://www.npmjs.com/package/ntp-client) package to connect to the [Google NTP (network time protocol) servers](https://developers.google.com/time/faq).

```js
const timeSource = () => util.promisify(ntpClient.getNetworkTime)("time.google.com", 123);
```

5\. Create your account and connect it to a node
   
```js
const account = createAccount({
      seed,
      provider,
      depth,
      minWeightMagnitude,
      delay,
      maxDepth,
      timeSource
});
```

By default, the account includes a plugin that reattaches and promotes the tail transactions of any pending bundles that your account sends.

:::info:
The default security level for CDAs is 2. You can change this setting by passing the account a `security` field.
:::

6\. Start the account and any plugins, and open the database

```js
account.start();
```

7\. Check your account's balance

```js
account.getAvailableBalance()
.then(balance => {
    console.log(`Your total available balance is: ${balance}`);
})
.catch(error => {
    console.log(error);
    // Close the database and stop any ongoing reattachments
    account.stop();
});
```

You should see your balance.

:::success:Congratulations! :tada:
You've created an account that will automatically promote and reattach transactions as well as manage the state of your seed.
:::

## Run the code

These code samples are hosted on [GitHub](https://github.com/iota-community/account-module).

To get started you need [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [Node.js](https://nodejs.org/en/download/) installed on your device.

In the command-line, do the following:

```bash
git clone https://github.com/iota-community/account-module.git
cd account-module/js/account-module
npm i
node create-account/create-account.js
```

You should see the balance of your new account.

You'll also have a database file that keeps track of your seed state.

## Next steps

After certain events happen in your account, it emits them, and allows you to listen for them. For example, you may want to monitor your account for new payments. To do so, you need to [create an event listener](../js/listen-to-events.md).

Instead of using the default `leveldown` flavor of the [LevelDB database](https://github.com/google/leveldb), you can use the [PersistenceAdapter](https://github.com/iotaledger/iota.js/tree/next/packages/persistence#PersistenceAdapter) interface to create a custom one.

:::warning:
A new adapter instance is created for each new account, therefore you can use only one adapter instance for each account at the same time.
:::
