# Publish restricted messages

**If you want to publish secret messages to a channel that only permitted users can read, you can use a restricted channel. These channels are open for any user to find, but only those with the side key can decrypt it. This type of channel is useful for private communications.**

## Packages

To complete this guide, you need to install the following packages:

--------------------
### npm
```bash
npm install @iota/mam @iota/converter
```
---
### Yarn
```bash
yarn add @iota/mam @iota/converter
```
--------------------

## IOTA network

In this tutorial, we connect to a [node](root://getting-started/0.1/network/nodes.md) on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet) with the following network settings:

- **[Minimum weight magnitude](root://getting-started/0.1/network/minimum-weight-magnitude.md)**: 9

- **[Depth](root://getting-started/0.1/transactions/depth.md)**: 3

## Code walkthrough

1. Require the packages

  ```js
  const Mam = require('@iota/mam');
  const { asciiToTrytes, trytesToAscii } = require('@iota/converter');
  ```

2. Set the privacy mode to restricted, choose, a side key, connect to a Devnet node, and set the MAM explorer URL to use for seeing messages in a user interface

  ```js
  const mode = 'restricted'
  const sideKey = 'VERYSECRETKEY'
  const provider = 'https://nodes.devnet.iota.org'

  const mamExplorerLink = `https://mam-explorer.firebaseapp.com/?provider=${encodeURIComponent(provider)}&mode=${mode}&key=${sideKey.padEnd(81, '9')}&root=`
  ```

3. Initialize the MAM state

  ```js
  let mamState = Mam.init(provider);
  mamState = Mam.changeMode(mamState, mode, sideKey);
  ```

4. Create a function to convert ASCII data to trytes and store it in JSON before publishing it to a MAM channel

  ```js
  const publish = async packet => {
      // Create MAM message as a string of trytes
      const trytes = asciiToTrytes(JSON.stringify(packet));
      const message = Mam.create(mamState, trytes);

      // Save your new mamState
      mamState = message.state;
      // Attach the message to the Tangle
      await Mam.attach(message.payload, message.address, 3, 9)

      console.log('Published', packet, '\n');
      return message.root
  }
  ```

  :::info:
  The `message.root` property is the MAM channel ID for this MAM stream.
  :::

5. Create a function that publishes three MAM messages

  ```js
  const publishAll = async () => {
    const root = await publish({
      message: 'Message from Alice',
      timestamp: (new Date()).toLocaleString()
    })

    await publish({
      message: 'Message from Bob',
      timestamp: (new Date()).toLocaleString()
    })

    await publish({
      message: 'Message from Charlie',
      timestamp: (new Date()).toLocaleString()
    })

    return root
  }
  ```

6. Publish the messages, fetch them, and decrypt them

  ```js
  // Callback used to pass data out of the fetch
  const logData = data => console.log('Fetched and parsed', JSON.parse(trytesToAscii(data)), '\n');

  publishAll()
    .then(async root => {

    const result = await Mam.fetch(root, mode, sideKey)
    result.messages.forEach(message => console.log('Fetched and parsed', JSON.parse(trytesToAscii(message)), '\n'));
  ```

7. Print the link to the console to see these messages in the MAM Explorer

  ```js
      console.log(`Verify with MAM Explorer:\n${mamExplorerLink}${root}\n`);
    });
  ```

You should see something like the following in the console:

```
Published { message: 'Message from Alice',
  timestamp: '9/11/2019, 4:39:32 PM' }

Published { message: 'Message from Bob',
  timestamp: '9/11/2019, 4:39:33 PM' }

Published { message: 'Message from Charlie',
  timestamp: '9/11/2019, 4:39:34 PM' }

Fetched and parsed { message: 'Message from Alice',
  timestamp: '9/11/2019, 4:39:32 PM' }

Fetched and parsed { message: 'Message from Bob',
  timestamp: '9/11/2019, 4:39:33 PM' }

Fetched and parsed { message: 'Message from Charlie',
  timestamp: '9/11/2019, 4:39:34 PM' }

Verify with MAM Explorer:
https://mam-explorer.firebaseapp.com/?provider=https%3A%2F%2Fnodes.devnet.iota.org&mode=restricted&key=VERYSECRETKEY99999999999999999999999999999999999999999999999999999999999999999999&root=DNIBZEUZNILPOZMGVWKKSHUECHFZEPRCMF9WRFPMSBRBKZWFFTTBIUYQNUBYB9NPHGHU9KPVRH9HD9JXO
```

:::success:Congratulations :tada:
You've published messages to a restricted MAM channel. Anything you publish to this channel can be decrypted only by those to whom you give the side key.
:::

## Run the code

Click the green button to run the sample code and see the results in the web browser.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/MAM-restricted?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Next steps

[Display MAM messages on a webpage](../js/create-mam-webpage.md).
