# Core concepts

**This article explains the core concepts of Channels to help you understand how it works.**

## Roles

In Channels, users can have one of the following roles:

- [Author](#authors)
- [Subscriber](#subscribers)

Each channel has only one author, but may have many subscribers.

Authors and subscribers communicate asynchronously by publishing messages on a channel.

The main difference between authors and subscribers is that authors can prove their identity and ownership of a channel by signing messages.

## Messages

In Channels, messages are linked to one another by their [stream and message identifiers](../introduction/core-concepts.md).

On the Tangle, the stream identifier is the address of a [transaction](root://getting-started/0.1/transactions/transactions.md), and the message identifier is the tag of the transaction. Together, these identifiers are called the link.

![Header structure](../images/header-structure.png)

So that users can find messages on the same channel, the channel address is the same for all messages in a channel. The message identifier is different for each new message so that users can avoid reading the same message twice.

### Message types

Messages can be one of seven [types](../introduction/core-concepts.md#message-types), which have a specific purpose in the workflow of a Channels application.

|**Message type**| **Description**| **Sent by**|
|:-----------|:-----------|:---------------------------------------|
|`Announce`| Publishes a new channel with information to allow subscribers to authenticate other messages on it | Authors|
|`ChangeKey`| Generates a new Merkle tree of the same height as the original `Author` object and publishes information to allow subscribers to authenticate other messages on the channel, using the new Merkle root| Authors|
|`Keyload`|Generates and publishes reusable session keys to allow subscribers to decrypt messages in `TaggedPacket` messages and `SignedPacket` messages|Authors|
|`TaggedPacket`| Publishes encrypted or plain text messages on a channel|Authors and subscribers
|`SignedPacket`|Publishes encrypted or plain text messages that include the a signature for authentication purposes| Authors|
|`Subscribe`| Publishes the subscriber's NTRU public key on the channel so that the author can use it to generate a session key in the `Keyload` message| Subscribers
|`Unsubscribe`| Publishes the subscriber's intent to unsubscribe from the channel to save the author the trouble of generating a session key for the subscriber|Subscribers

## Authors

Authors are devices that can do the following:

- Create a channel and prove ownership of it
- Control subscribers' read access to private messages
- Publish messages on the channel

### How channels are created

Authors create channels by generating a Merkle tree, whose root is the channel address.

To generate the channel address, authors use a [Merkle tree signature scheme (MSS)](https://en.wikipedia.org/wiki/Merkle_signature_scheme) that generates key pairs, using the Winternitz [one-time signatures](https://en.wikipedia.org/wiki/Hash-based_cryptography#One-time_signature_schemes) (W-OTS).

![Example of a Merkle tree](../images/merkle-tree-channel.png)

By generating a Merkle tree, the author can prove ownership of the channel by doing the following:

- Signing each channel message with a different private key that belongs to one of the public key leaves
- Publishing enough of the Merkle tree in the signed message to allow subscribers to validate the signature

The number of public keys that are pre-generated depends on the height of the Merkle tree.

When you create a new instance of the `Author` object, you have the option to decide the height of your author's Merkle tree.

### How authors can control subscribers' read access to private messages

Authors can choose to send plain text and/or encrypted payloads in both `SignedPacket` and `TaggedPacket` messages.

For example, if an author were an API service, that author may want all subscribers to be able to see a public alert about breaking changes. However, the author may also want to keep some messages private such as sensor data from a private endpoint. In this case, the author would send the breaking changes as plain text, but encrypt the sensor data in a private message payload.

![API application example](../images/api-app-example.png)

To control read access to private payloads on a channel, authors generate an encrypted session key that only authorized subscribers can use to decrypt the private messages. Then, authors publish the session key to the channel in a [`Keyload`](../introduction/core-concepts.md#message-types#keyload) message.

Authors have two choices for choosing authorizing subscribers before generating the session key:

- Allow subscribers to send `Subscribe` messages
- Set up subscribers outside of the channel

#### Allowing subscribers to send `Subscribe` messages

Authors can allow new subscribers to publish [`Subscribe`](../introduction/core-concepts.md#message-types#subscribe) messages to request read access to private messages. These messages contain the subscribers' NTRU public keys that are encrypted with the author's NTRU public key to mask the subscribers' identities. Authors can then decrypt the public keys and use them to encrypt the session key.

Authors may choose this option in cases where all subscribers are not known before the start of the channel.

To allow subscribers to publish these message, the author must be generated with an NTRU key pair.

#### Setting up subscribers before announcing the channel

Before announcing a channel, authors can decide which subscribers should be allowed access to private message payloads. These subscribers may come from an external source such as a list of members' email addresses in a database.

Authors may choose this option to avoid the overhead of managing `Subscribe` messages.

To set up subscribers before announcing the channel, authors can choose them in advance and either establish a pre-shared key or request their NTRU keys.

Authors can then later use these keys to encrypt the session key.

## Subscribers

Subscribers are devices that can do the following:

- Authenticate author's signatures to make sure that messages were sent by the trusted author
- Publish messages on a channel

Subscribers communicate with authors and other subscribers by sending `TaggedPacket` messages.


