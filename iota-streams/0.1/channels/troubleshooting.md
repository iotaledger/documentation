# Troubleshooting

**This article helps you understand and resolve common issues and errors that you may see while using Channels.**

## Link not found

You may see this error if the IOTA node the you're connected to does not have the bundle that contains the message that you're trying to reference or process.

To resolve this error, you could do one of the following:

- Wait a few minutes to give the transactions time to propagate through the network
- Send the message again

## More than one message found

You may see this error when trying to use the `Client` object to receive a message on a channel when other copies of that message exist.

To resolve this error, you could do one of the following:

- Iterate over each message and handle each of them
- Use only the first valid message
- Ignore all messages when duplicates exist 

## Provided hashes are not valid: []

You may see this error if the Channels messages are sent in an inconsistent bundle.

If you see this message please reach out to us in the #streams-discussion on [Discord](https://discord.iota.org/).

## No Author's MSS public key found

You may see this error when trying to unwrap a message that relies on information in an `Announce` message.

To resolve this error, you first need to process the `Announce` message by using  the `unwrap_announcement()` method to add the channel information to the subscriber's [state](../channels/how-channels-works.md#author-and-subscriber-states).

