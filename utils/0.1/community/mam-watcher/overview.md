# MAM watcher

**Devices on the Internet of Things are often monitoring their environment and creating data. In this tutorial, you encrypt data and stream it on the Tangle through a Masked Authenticated Messaging (MAM) channel. This way, you can allow other devices to subscribe to your data stream through the channel.**

:::info:Go to GitHub
For quickstart instructions or to read the source code, [go to the GitHub repository](https://github.com/iota-community/mam-watcher).
:::

:::warning:
This application uses the [IOTA MAM library](https://www.npmjs.com/package/@iota/mam), which is still in beta development. Do not use this code in production environments.
:::

## Prerequisites

To use this application, you need the following:

- [An LTS version or the latest version of Node.js and NPM](https://nodejs.org/en/download/)

- [Git](https://git-scm.com/download/linux)

## Run the application

1. Clone this repository

    ```
    git clone https://github.com/iota-community/mam-watcher
    ```

2. Change into the `mam-watcher` directory

    ```bash
    cd mam-watcher
    ```

3. Install the dependencies

    ```bash
    npm install
    ```

4. Start sending messages to a MAM stream

    ```bash
    node sender.js
    ```
  
5. Copy the first address that appears in the console

    <img src="../images/copy-mam-root.png" width="400">

6. Open a new command-prompt window

7. Subscribe to the MAM stream by using the address you just copied

    ```
    node fetcher.js <address (also called the MAM root)>
    ```
  
    <img src="../images/paste-mam-root.png" width="400">

In the console, you should see that the `sender.js` window sends transactions and the `fetcher.js` window subscribes to the channel and retrieves the messages from the Tangle.

![MAM watcher](../images/mam-watcher.gif)

## Make your message more private

Until now, anyone who was able to find your transactions on the Tangle could decrypt the message using the address as the key.

To make your message more private and to have more control over who can decrypt it, you can make your channel restricted.

1. Open the `sender.js` file

2. Create a secret 81-tryte side key under the first two lines at the top

    ```js
    var sideKey = asciiToTrytes('mySuperSecretSideKey');

    while(sideKey.length % 81 !== 0){
    sideKey += '9';
    }
    ```

    :::info:
    This is only an example. For your own applications, create your own 81-tryte side key.
    :::

3. Change the `mamState` variable to use the `restricted` method instead of the `public` one

    ```js
    mamState = Mam.changeMode(mamState, 'restricted', sideKey);
    ```

4. Change the message, so we know that now it's secret

    ```js
    publish('Super secret message' + count++);
    ```

5. Open the `fetcher.js` file

6. Give this file the same side key as the one you created in the `sender.js` file

    ```js
    const { asciiToTrytes } = require('@iota/converter')

    var sideKey = asciiToTrytes('mySuperSecretSideKey');

    while(sideKey.length % 81 !== 0){
    sideKey += '9';
    }
    ```

7. Change the fetch method so that it decrypts the message using the side key

    ```js
    await Mam.fetch(root, 'restricted', sideKey, showData)
    ```

:::success:Congratulations!
Now, only those with the side key can decrypt your message, even if they find your transactions on the Tangle.
:::

## Next steps

Try [running your own private Tangle](../one-command-tangle/overview.md) and sending the sending the MAM messages to it.

:::info:
Make sure to change the node URL `https://nodes.devnet.iota.org:443` to the URL of your node (`http:127.0.0.1:14265`) in both the `sender.js` file and the `fetcher.js` file.
:::





