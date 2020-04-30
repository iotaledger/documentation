# Design the messaging workflow

**This article walks you through the process of designing a Channels messaging app.**

As a channel author, you have many options for designing how you and your subscribers will interact.

To create a fluid and natural experience, it is important to think about all the different ways a subscriber might need to interact with your app as well as the types of messages you may need to send.

## Messaging workflows

In a channel, messages can reference the message identifier of any other [message type](../channels/how-channels-works.md#message-types).

These references allow authors and subscribers to make sure that the information in their [link store](../channels/how-channels-works.md#link-stores) came from the correct message.

This section guides you through some best practices for creating messaging workflows.

### Sending public messages

The most basic messaging workflow links all messages to the `Announce` message.

This workflow is useful if your application needs to publish only plain text messages that subscribers can authenticate.

![Announce workflow](../images/workflow.png)

### Sending encrypted messages

To control read access to private payloads on a channel, authors generate an encrypted session key that authorized subscribers can use to decrypt the private messages. Then, authors publish the session key to the channel in a `Keyload` message.

Authors have two choices of workflows to generate the session key for authorized subscribers.

#### Taking subscribers' requests for read access

In this workflow, subscribers request read access to private payloads by using the information in the `Announce` message to create and publish a `Subscribe` message.

The author listens for these messages and adds the information in them to the link store.

Using this information, the author generates a session key for subscribers and publishes it in a `Keyload` message. This message references the `Announce` message because it contains the information that subscribers need to decrypt the session key.

When subscribers read and decrypt the `Keyload` message, they add the information to their link stores.

The author can then publish encrypted messages in either `SignedPacket` or `TaggedPacket` messages and reference the `Keyload` message to tell subscribers where the correct session key for the encrypted message is.

#### Pre-selecting authorized subscribers 

This workflow does not include `Subscribe` messages because before announcing a channel, authors decide which subscribers should be allowed access to private message payloads. These subscribers may come from an external source such as a list of members' email addresses in a database.

Authors may choose this option to avoid the overhead of managing `Subscribe` messages.

To set up subscribers before announcing the channel, authors can choose them in advance and either establish a pre-shared key or request their NTRU keys.

Authors can then later use these keys to encrypt the session key.

### Changing the signature keys

If authors run out of signature keys, they can generate a new set by publishing a `ChangeKey` message. This way, authors can continue signing messages on the same channel.

The logic of when to change signature keys is dependent on your app, however you need at least one key pair left in your Merkle tree to be able to sign the `ChangeKey` message and prove your ownership of the channel.

In terms of references, the `ChangeKey` message should reference either an `Announce` message or a previous `ChangeKey` message so that subscribers can authenticate the current signature against any previous signatures.

### Unsubscribing from a channel

If subscribers no longer plan on reading encrypted messages on the channel, they can send an `Unsubscribe` message to notify the author. This way the author can do fewer computations while generating future session keys because those unsubscribed subscribers will not be included.

`Unsubscribe` messages must always reference the corresponding `Subscribe` message because it contains the information that the author needs to verify message.

## Next steps

Once your messaging workflows are ready, you can build the logic that defines how these messages will be processed.

Try our guide for [building a simple app](../channels/build-a-simple-app.md) that uses the public message workflow.