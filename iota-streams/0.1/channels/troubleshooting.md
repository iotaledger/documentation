# Troubleshooting

**This article helps you understand and resolve common issues and errors that you may see while using Channels.**

## More than one message found

This error message is produced by the `iota_client::Client` object.

You may see this error when trying to use the `Client` object to receive a message on a channel when other copies of that message exist.

To resolve this error, you could do one of the following:

- Iterate over each message and handle each of them
- Use only the first valid message
- Ignore all messages when duplicates exist 

## Provided hashes are not valid: []

This error message is produced by the IOTA node that the `iota_client::Client` object is connected to.

You may see this error if the Channels messages are sent in an inconsistent bundle.

This is a bug in the Rust client library. You can track this bug on [GitHub](https://github.com/iotaledger/streams/issues/10).

If you see this message please reach out to us in the #streams-discussion on [Discord](https://discord.iota.org/).

## No Author's MSS public key found

This error message is produced by the Channels application.

You may see this error when trying to unwrap a message that relies on information in an `Announce` message.

To resolve this error, you first need to process the `Announce` message by using  the `unwrap_announcement()` method to add the channel information to the subscriber's [state](../channels/how-channels-works.md#author-and-subscriber-states).

