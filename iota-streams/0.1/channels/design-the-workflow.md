# Design the messaging workflow

**As a channel author, you have many options for designing how you and your subscribers will interact. To create a fluid and natural experience, it is important to think about all the different ways a subscriber might need to interact with your app as well as the types of messages you may need to send. This article walks you through the process of designing a Channels messaging app.**

## Starting a channel

All channels must start with this simple workflow to announce the channel.

Flowchart

### Creating the author

The first step in starting a channel is to create an instance of the `Author` object that you can use to manage the channel.

```rust
let mut author = Author::new("AUTHORSECRET", 3, true);
```

The first argument is the author's secret, which is used by a [pseudo-random number generator](https://en.wikipedia.org/wiki/Pseudorandom_number_generator) (PRNG) to generate the author's [signature keys](../channels/how-channels-works.md#signature-keys).

The second argument is the height of the Merkle tree, which is used to define how many signature keys the author has. To calculate the number of signature keys an author has, use this formula: Number of signature keys = 2<sup>height</sup>. For example a height of 3 would result in 8 signature keys, which could be used to sign 8 messages.
    ​
The third argument defines whether the author has an encryption key pair. This argument must be `true` if you plan on [getting the public encryption keys of subscribers on the channel](#getting-the-public-encryption-keys-of-subscribers).

### Announcing a channel

A channel does not exist until it has been announced.

To announce the channel, an author must publish an [`Announce`](../channels/how-channels-works.md#message-types) message.

The author object has a method for creating each type of message.

```rust
let announcement = author.announce();
```

This message contains the author's public keys that subscribers need for processing future messages.

### Sending the link to the subscriber

To let subscribers know about the channel, you must send them the link (channel address and the message identifier) outside of the channel.

How you send this link is up to you. For example, if your application is a mobile app, you could send the link through a push notification.

```rust
let channel_address = announcement.link.appinst;
let message_identifier = announcement.link.msgid;
```

:::info:
All message types include the `link` property, which you can use to get the channel address (`appinst`) and message identifier (`msgid`).
:::

Subscribers can then get the message from the commmunication channel and process it, using the corresponding `unwrap()` method.

```rust
subscriber.unwrap_announcement(parsed_message);
```

:::info:
All message types have a corresponding `unwrap()` method for processing the message.
:::

## Other messaging workflows

After announcing a channel, you can start interacting with others on the channel, using the following messaging workflows as a guide:

- [Publishing public payloads](#publishing-public-payloads)
- [Publishing masked payloads](#publishing-masked-payloads)
- [Getting the public encryption keys of subscribers](#getting-the-public-encryption-keys-of-subscribers)
- [Changing the author's signature keys](#changing-the-signature-keys)

The workflow is important because it affects whether receivers (the author and subscribers) have the correct information in their [states](../channels/how-channels-works.md#author-and-subscriber-states) to be able to process messages correctly.

### Publishing public payloads

The most basic messaging workflow for publishing **public payloads** on a channel is where all messages are linked to the `Announce` message. In this workflow, subscribers only rely on the `Announce` message to be able to process future `SignedPacket` or `TaggedPacket` messages.

Subscribers can also send their own `TaggedPacket` messages and link them to the `Announce` message.

![Annonce message linked to a SignedPacket message](../images/workflow.png)

### Publishing masked payloads

The workflow for publishing masked payloads is a little bit more complex because it depends on how you [get the public encryption keys from subscribers](#getting-the-public-encryption-keys-of-subscribers).

In general though, all masked payloads rely on a `Keyload` message, which contains the encrypted session key for authorized subscribers. With this session key, authorized subscribers can do the following:

- Decrypt the author's masked payloads in future messages that use this session key
- Encrypt their own masked payloads in `TaggedPacket` messages

flowchart

To give authorized subscribers access to decrypt the session key in a `Keyload` message, the author encrypts it using their public [encryption keys](#encryption-keys).

:::info:
The author must trust subscribers because their keys are used to encrypt the session key. If the subscribers were malicious, they could share the session key with anyone and expose the masked payloads.
:::

Authorized subscribers can then process the `Keyload` message and use the resulting session key that's in their states.

:::info:
Before being able to decrypt a masked payload, susbcribers need to process the corresponding `Keyload` and `Announce` messages.

If you were to ever [change the author's signature keys](#changing-the-signature-keys), the subscriber would also need to have processed the corresponding `ChangeKey` message.
:::

### Getting the public encryption keys of subscribers

To get the public encryption keys of authorized subscribers, you can use one of the following workflows.

| **Workflow**    |**Advantages**|**Disadvantages**|
|:----|:-----|:----|:----|
|On the channel|You can use the built-in `Subscribe` and `Unsubscribe` messages to authorize and deauthorize subscribers | You must set up a process for handling all `Subscribe` and `Unsubscribe` messages, some of which could be sent as spam by malicious subscribers|
|Outside of the channel|You can avoid the overhead of managing all `Subscribe` and `Unsubscribe` messages|If you want to authorize or deauthorize subscribers after announcing the channel, you must set up a process for doing so outside of the channel

#### On the channel

If the author is created with an encryption key pair, subscribers can publish  `Subscribe` messages on the channel to request access to a session key.

:::info:
`Subscribe` messages should always be linked to the `Announce` message.
:::

flowchart

After publishing a `Subscribe` message, the subscriber sends the author the message identifier. The author then decides whether to publish a `Keyload` message for that subscriber.

:::info:
A single `Keyload` message can contain a session key for more than one subcriber.
:::

If the subscribers who published the `Subscribe` messages no longer plan on reading encrypted messages on the channel, they can notify the author by publishing  `Unsubscribe` messages. By notifying the author of their intent to unsubscribe, subscribers reduce the amount of computation that the author must do to generate future session keys. It's in the author's interest to listen to the channel for these messages.

:::info:
`Unsubscribe` messages should always be linked to the corresponding `Subscribe` message because it contains the information that the author needs to verify the message.
:::

#### Outside of the channel

Instead of allowing subscribers to request access to a session key, you may decide which subscribers should be allowed access to masked payloads before announcing the channel. These subscribers may come from an external source such as a list of members' email addresses in a database.

To set up subscribers before announcing the channel, you can choose them in advance and either establish a pre-shared key or request their NTRU keys.

The author can then later use these keys to publish a `Keyload` message.

## Changing the signature keys

You may want to change the author's signature keys if it runs out of them and you want to continue sending messages on the same channel instead of starting a new one.

flowchart

To generate a new set of [signature keys](../channels/how-channels-works.md#signature-keys), the author publishes a `ChangeKey` message.

:::info:
The author needs at least one signature key left in the Merkle tree to be able to sign the `ChangeKey` message and prove your ownership of the channel.
:::

The `ChangeKey` message should be linked to either an `Announce` message or a previous `ChangeKey` message so that subscribers can process it.

## Next steps

Once your messaging workflows are ready, you can build the logic that defines how these messages will be processed.

Try our guide for [building a simple app](../channels/build-a-simple-app.md) that uses the public message workflow.