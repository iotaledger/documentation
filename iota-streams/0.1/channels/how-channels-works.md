# How Channels works

**Channels is a protocol for publishing cryptographic messages on a communication channel. This article explains the core concepts of Channels to help you understand how it works.**

Messages can be published on any communication channel such as HTTP, and addressed by a link type such as a URL.

By default, Channels comes with an API for publishing messages on the [Tangle](root://getting-started/0.1/network/the-tangle.md), making them transparent and tamperproof.

On the Tangle, all messages in a channel are transactions with the same channel address in the `address` field and a different message identifier in the `tag` field. These fields make up the link type for messages on the Tangle.

![Header structure](../images/header-structure.png)

Each channel has **one owner, called the [author](#author)**, and may have **many [subscribers](#subscribers)** who communicate asynchronously by publishing messages on the author's channel.

The author has the following roles:
​
- Publish public and confidential (encrypted) data
- Manage subscribers and authorize their access to confidential data
- Authenticate messages with a signature

Subscribers have the following roles:
​
- Verify any signatures in signed messages to make sure that they were sent by the author
- Publish public or encrypted data on the channel

Public data is published in public payloads for everyone to read and encrypted data is published in private payloads for only authorized users to read.

For example, if an author were an API service, that author may want all subscribers to be able to see a public alert about breaking changes. However, the author may also want to keep some messages private such as sensor data from a private endpoint. In this case, the author would send the breaking changes as plain text, but encrypt the sensor data in a private payload.

![API application example](../images/api-app-example.png)

## Messages

Each message has a type, which defines the type of content and how it should be cryptographically processed. For example, an author's message may contain an private payload as well as a signature. This content must be processed in a specific way that allows subscribers to decrypt it and verify the signature.

### Message types

Messages can be one of seven types, which can be created and published only by users with a particular role.

|**Message type**| **Description**| **Published by**|
|:-----------|:-----------|:---------------------------------------|
|![Announce](../images/announce.png)| The first message in a new channel with information that allows subscribers to verify other messages on the same channel | Author|
|![ChangeKey](../images/changekey.png)| Publishes the author's new [public MSS key](#author) and authenticates it with the previous one, allowing the author to sign messages with the new private key and subscribers to use the new public key to verify signed messages| Author|
|![Keyload](../images/keyload.png)|Publishes a session key that's encrypted for a set of authorized subscribers so they can process subsequent `TaggedPacket` and `SignedPacket` messages that are linked to this `Keyload` message|Author|
|![TaggedPacket](../images/taggedpacket.png)| Publishes private and public payloads that are authenticated with a [message authentication code](https://searchsecurity.techtarget.com/definition/message-authentication-code-MAC|Author and subscribers|
|![SignedPacket](../images/signedpacket.png)|Publishes a signed message that includes private or public payloads| Author|
|![Subscribe](../images/subscribe.png)| Publishes the subscriber's public NTRU key on the channel so that the author can use it to generate a session key in the `Keyload` message| Subscribers
|![Unsubscribe](../images/unsubscribe.png)| Publishes the subscriber's intent to unsubscribe from the channel to save the author the trouble of generating a session key for the subscriber|Subscribers

## States

The author and subscribers have states, which are used to store the information they need to process messages.

For both the author and subscribers, the state contains references to the messages that have already been processed as well as the cryptographic result of [processed messages](#processing-messages), which is called the spongos state.

### The author's state

An author's state may also include:

- A private [signature key](#signature-keys), which is used to sign a message
- A private [encryption key](#encryption-keys), which is used by subscribers to create `Subscribe` messages
- The encryption keys of any trusted subscribers. These keys are used to create `Keyload` messages.

The author must trust subscribers because their keys are used to encrypt the session key. If the subscribers were malicious, they could share the session key with anyone and expose all the private messages.

![Author state](../images/author-state.png)

### Subscriber's state

A subscriber's state may also include:

- A private [encryption key](#encryption-keys), which is used to process `Keyload` messages
- The author's public encryption key, which may be used when creating `Keyload` and `Subscribe` messages
- The author's current public signature key, which is used to verify signatures in signed messages

![Subscriber state](../images/subscriber-state.png)

## Encryption keys

To encrypt private payloads, the author uses a session key. This key is encrypted with the authorized subscribers' public encryption keys and published in `Keyload` messages for them to decrypt and use.

Subscribers can have one of the following encryption keys:

- A pre-shared key
- An NTRU key pair

When [authorizing subscribers' access to encrypted messages](../channels/design-the-workflow.md#authorizing-access-to-encrypted-messages), the author has the option of [accepting subscribers' requests for read access](../channels/design-the-workflow.md#accepting-requests-for-read-access). To do so, the author needs to be created with an NTRU key pair.

## Signature keys

Only authors can sign messages to prove ownership of the channel.
​
To sign messages, the author uses a [Merkle signature scheme (MSS)](https://en.wikipedia.org/wiki/Merkle_signature_scheme). This signature scheme uses a pseudo-random number generator and a secret string to generate [Winternitz one-time signature keys](https://en.wikipedia.org/wiki/Hash-based_cryptography#One-time_signature_schemes). These signatures are quantum robust, meaning that they are resistant against attacks by quantum computers. However, the 'one-time' part, means that each private key can be used only once. Therefore, authors need to decide in advance how many private keys to pre-generate because the public half of these keys is then used to generate the channel address, which is also the Merkle root.
​
![Example of a Merkle tree](../images/merkle-tree-channel.png)

To verify signatures, subscribers use the author's public signature key from either an `Announce` message or a `ChangeKey` message.

## Processing messages

Messages are processed according to their type, using a corresponding `wrap()` and `unwrap()` methods.
​
The `wrap()` method uses the author's or subscriber's state and input data to produce a message of a specific type.
​
The `unwrap()` method uses the author's or subscriber's state to process a message and extract message content.
​
For example, when a subscriber processes a `Keyload` message, the `unwrap_keyload()` method uses the subscriber's state to decrypt the session key. Then, the result of processing the `Keyload` message would be added to the subscriber's spongos state, which can be used to decrypt payloads in future `TaggedPacket` and `SignedPacket` messages.
​
## Next step
​
[Design your own messaging workflow](../channels/design-the-workflow.md).