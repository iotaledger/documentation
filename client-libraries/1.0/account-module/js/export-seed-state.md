# Import/export an existing seed state in JavaScript

**When you use your account to make payments, your account updates your seed state. In this tutorial, you learn how to export your account's seed state so that you can import it on another device or simply back it up.**

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

1. Export your account's seed state

    ```js
    account.exportState().then(state => {
    
    });
    ```

2. Serialize your seed state and save it to a JSON file

    ```js
    let JSONstate = JSON.stringify(state);
    fs.writeFile('exported-seed-state.json', JSONstate,
    function(err, result) {
        if (err) {
            console.log('error', err);
        } else {
            console.log('Seed state saved')
        });
    ```

    :::info:
    It's best practice to back up your seed state at regular intervals.
    :::

3. Read your exported seed state

    ```js
    let JSONSeedState = fs.readFileSync("exported-seed-state.json");
    ```

4. Deserialize your JSON seed state into an object

    ```js
    let state = JSON.parse(JSONSeedState);
    ```

5. Import your seed state into your account's database

    ```js
    account.importState(state).then(err => {
        if (err) {
            console.log('error', err);
            // Close the database and stop any ongoing reattachments
            account.stop();
        } else {
            console.log('Seed state imported')
        }
    });
    ```

    :::warning:
    When you import a seed state, you overwrite any existing seed state in your account's database.
    :::

:::success:Congratulations! :tada:
You've learned how to export and import your seed state.
:::

## Run the code

These code samples are hosted on [GitHub](https://github.com/iota-community/account-module).

To get started you need [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [Node.js](https://nodejs.org/en/download/) installed on your device.

In the command-line, do the following:

```bash
git clone https://github.com/iota-community/account-module.git
cd account-module/js/account-module
npm i
node export-account/export-account.js
```

You should have an `exported-seed-state.json` file that contains your seed state. You can use this file to import your seed state on another device.

## Next steps

Take a look at [GitHub](https://github.com/iotaledger/iota.js/tree/next/packages/account/src) to continue learning about the account module.
