# Troubleshooting

**This article aims to help you understand and resolve common issues and errors that you may see while using Channels.**

## More than one message found

This error message is sent by the Channels app.

You may see this error when trying to use the `Client` object to receive a message on a channel when other copies of that message exist.

To resolve this error, you could do one of the following:

- Iterate over each message and handle each of them
- Use only the first valid message
- Ignore all messages when duplicates exist 

## Provided hashes are not valid: []

This error message is sent by the IOTA node that the `Client` object is connected to.

You may see this error if the Channels messages are sent in an inconsistent bundle.

This is a bug in the Rust client library. You can track this bug on [GitHub](https://github.com/iotaledger/streams/issues/10).

If you see this message please reach out to us in the #streams-discussion on [Discord](https://discord.iota.org/).

