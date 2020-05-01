# How Channels works

**This article explains the core concepts of Channels to help you understand how it works.**

Channels is a protocol for publishing cryptographic messages on a communication channel.

Messages can be published on any communication channel such as HTTP, and addressed by a link type such as a URL.

By default, Channels comes with an API for publishing messages on the [Tangle](root://getting-started/0.1/network/the-tangle.md), making them transparent and tamperproof.

On the Tangle, all messages in a channel are transactions with the same channel address in the `address` field and a different message identifier in the `tag` field.

![Header structure](../images/header-structure.png)

Each channel has **one owner, called the [author](#author)**, but may have **many [subscribers](#subscribers)** who communicate asynchronously by publishing messages on the author's channel.

Anyone in the channel can publish public messages for everyone to read and private messages for only authorized users to read.

For example, if an author were an API service, that author may want all subscribers to be able to see a public alert about breaking changes. However, the author may also want to keep some messages private such as sensor data from a private endpoint. In this case, the author would send the breaking changes as plain text, but encrypt the sensor data in a private payload.

![API application example](../images/api-app-example.png)

## Messages

Each message has a type, which defines the type of content and how it should be cryptographically processed. For example, an author's message may contain an encrypted payload as well as a signature. This content must be processed in a specific way that allows subscribers to decrypt it and authenticate the signature.

### Message types

Messages can be one of seven types, which can be created and published by users with a particular role.

|**Message type**| **Description**| **Published by**|
|:-----------|:-----------|:---------------------------------------|
|![Announce](../images/announce.png)| The first message in a new channel with information that allows subscribers to authenticate other messages on the same channel | Author|
|![ChangeKey](../images/changekey.png)| Publishes the author's new [public MSS key](#author) and authenticates it with the previous one, allowing the author to sign messages with the new private key and subscribers to use the new public key to authenticate signed messages| Author|
|![Keyload](../images/keyload.png)|Publishes a session key that's encrypted for a set of authorized subscribers so they can process subsequent `TaggedPacket` and `SignedPacket` messages that are linked to this `Keyload` message|Author|
|![TaggedPacket](../images/taggedpacket.png)| Publishes private and public payloads that are authenticated with a message authentication code|Author and subscribers|
|![SignedPacket](../images/signedpacket.png)|Publishes a signed message that includes private or public payloads| Author|
|![Subscribe](../images/subscribe.png)| Publishes the subscriber's public NTRU key on the channel so that the author can use it to generate a session key in the `Keyload` message| Subscribers
|![Unsubscribe](../images/unsubscribe.png)| Publishes the subscriber's intent to unsubscribe from the channel to save the author the trouble of generating a session key for the subscriber|Subscribers

## Author and subscriber states

The author and subscribers have states, which are used to store the information they need to process messages.

For both the author and subscribers, the state contains references to the messages that have already been processed as well as the cryptographic result of processing a message, which is called the spongos state. 

A subscriber's state may also include:

- A pre-shared key, which may be used to process `Keyload` messages
- A private NTRU key, which may be used to process `Keyload` messages
- The author's public NTRU key, which may be used when creating `Keyload` and `Subscribe` messages
- The author's current public MSS key, which is used to authenticate signatures in signed messages

![Subscriber state](../images/subscriber-state.png)

An author's state may include:

- A private MSS key, which are used to prove ownership of the channel
- A private NTRU key, which is used by subscribers to create `Subscribe` messages
- The pre-shared or public NTRU keys of any trusted subscribers. These keys are used to create `Keyload` messages.

The author must trust subscribers because their keys are used to encrypt the session key. If the subscribers were malicious, they could share the session key with anyone and expose all the private messages.

![Author state](../images/author-state.png)

## Processing messages
​
Messages are processed according to their type, using a corresponding `wrap()` and `unwrap()` methods.
​
The `wrap()` method uses the author's or subscriber's state and input data to produce a message of a specific type.
​
The `unwrap()` method uses the author's or subscriber's state to process a message and extract message content.
​
For example, when a subscriber processes a `Keyload` message, the `unwrap_keyload()` method uses the subscriber's state to decrypt the session key. Then, the result of processing the `Keyload` message would be added to the subscriber's spongos state, which can be used to decrypt payloads in future `TaggedPacket` and `SignedPacket` messages.
​
## Author
​
The author has the following roles in a channel:
​
- Manage subscribers and authorize their access to session keys
- Publish public and confidential data on the channel
- Authenticate messages with a signature
​
To sign messages, the author uses a [Merkle signature scheme (MSS)](https://en.wikipedia.org/wiki/Merkle_signature_scheme).
​
To encrypt messages, the author uses session keys, which are encrypted either with the subscribers' pre-shared keys or with the subscribers' public NTRU keys.
​
The author has the option of allowing subscribers to publish their NTRU keys in a `Subscribe` message. To do so, the author needs to be created with an NTRU key pair.
​
When you create an instance of the `Author` object, an MSS is generated and the root is used as the author's public MSS key and the channel address.
​
```rust
let mut author = Author::new("MYAUTHORSECRET", 3, true);
```
​
The first argument is the author's secret, which is used to generate the author's signature keys (public and private keys).
​
The second argument is the height of the Merkle tree, which is used to define how many signature keys the author has. The MSS is a many-time signature scheme, meaning it can produce only a limited number of signatures. The number of signature keys that an author has depends on the height in this method. To calculate the number of signature keys an author has, use this formula: Number of signature keys = 2<sup>height</sup>. For example a height of 3 would result in 8 signature keys.
​
![Example of a Merkle tree](../images/merkle-tree-channel.png)
​
The third argument defines whether the author has an NTRU key pair.
​
## Subscribers
​
Subscribers have the following roles:
​
- Authenticate any signatures in signed messages to verify that they were sent by the author
- Publish public or confidential data on the channel
​
To authenticate signatures, subscribers use the author's public MSS key from either an `Announce` message or a `ChangeKey` message.
​
To encrypt messages, subscribers use the session keys, which are published in the `Keyload` messages.
​
When you create an instance of the `Subscriber` object, you specify the secret and whether to generate an NTRU key pair. The secret is used to generate the NTRU key pairs.
​
```rust
let mut subscriber = Subscriber::new("MYSUBSCRIBERSECRET", true);
```
​
## Next step
​
[Design your own messaging workflow](../channels/design-the-workflow.md).