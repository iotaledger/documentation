# How Channels works

**This article explains the core concepts of Channels to help you understand how it works.**

In Channels, users can have one of the following roles:

- [Author](#authors)
- [Subscriber](#subscribers)

Each channel has only one author, but may have many subscribers who all communicate asynchronously by publishing messages on a channel.

Authors are the [owners of a channel](#how-channels-are-created) and prove their ownership by publishing signed messages that subscribers can authenticate.

Both authors and subscribers can publish plain text and private payloads on the channel for each other to read. Anyone can read the plain text payloads, but only authorized users can read the private payloads.

For example, if an author were an API service, that author may want all subscribers to be able to see a public alert about breaking changes. However, the author may also want to keep some messages private such as sensor data from a private endpoint. In this case, the author would send the breaking changes as plain text, but encrypt the sensor data in a private message payload.

![API application example](../images/api-app-example.png)

## How channels are created

A new channel is created by creating an instance of the `Author` object. This object generates an internal Merkle tree, whose root is the channel address.

```rust
let mut author = Author::new("MYAUTHORSECRET", 3, true);
```

Internally, authors use a [Merkle tree signature scheme (MSS)](https://en.wikipedia.org/wiki/Merkle_signature_scheme) that generates key pairs from the author's secret, using the Winternitz [one-time signatures](https://en.wikipedia.org/wiki/Hash-based_cryptography#One-time_signature_schemes) (W-OTS).

![Example of a Merkle tree](../images/merkle-tree-channel.png)

By generating a Merkle tree, the author can prove ownership of the channel by doing the following:

- Signing each channel message with a different private key that belongs to one of the public key leaves
- Publishing enough of the Merkle tree in the signed message to allow subscribers to validate the signature

The number of public keys that are pre-generated depends on the height of the Merkle tree, which is the second argument of the `new()` method.

## Messages

In Channels, messages are linked to one another by their [stream and message identifiers](../introduction/core-concepts.md).

On the Tangle, the stream identifier is the address of a [transaction](root://getting-started/0.1/transactions/transactions.md), and the message identifier is the tag of the transaction. Together, these identifiers are called the link.

![Header structure](../images/header-structure.png)

To allow authors and subscribers to find messages on the same channel, the channel address is the same for all messages in a channel.

To allow authors and subscribers to avoid reading the same message twice, the message identifier is different for each new message.

To read a message on a channel, authors and subscribers need both the channel address and the message identifier.

### Message types

Messages can be one of seven types, which have a specific purpose in the workflow of a Channels application.

|**Message type**| **Description**| **Sent by**|
|:-----------|:-----------|:---------------------------------------|
|`Announce`| Publishes a new channel with information to allow subscribers to authenticate other messages on it | Authors|
|`ChangeKey`| Generates a new Merkle tree of the same height as the original `Author` object and publishes information to allow subscribers to authenticate other messages on the channel, using the new Merkle root| Authors|
|`Keyload`|Generates and publishes reusable session keys to allow subscribers to decrypt messages in `TaggedPacket` messages and `SignedPacket` messages|Authors|
|`TaggedPacket`| Publishes encrypted or plain text messages on a channel|Authors and subscribers
|`SignedPacket`|Publishes encrypted or plain text messages that include the a signature for authentication purposes| Authors|
|`Subscribe`| Publishes the subscriber's NTRU public key on the channel so that the author can use it to generate a session key in the `Keyload` message| Subscribers
|`Unsubscribe`| Publishes the subscriber's intent to unsubscribe from the channel to save the author the trouble of generating a session key for the subscriber|Subscribers

## Link stores

Authors and subscribers each have a state, called the link store.

This is where they save the important contents of read messages. For example, when a subscriber authenticates an `Announce` message, the author's information is saved internally in the subscriber's link store. This way, the subscriber can authenticate `SignedPacket` messages, using the information in the link store.

image of link store

## Next step

[Design your own messaging workflow](../channels/design-the-workflow.md).
