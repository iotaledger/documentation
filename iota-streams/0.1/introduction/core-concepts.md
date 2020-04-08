# Core concepts

**This article explains the core concepts of Streams. Before you start working with Streams, you should get to know the core concepts to understand how applications are built.**

## Application structure

Streams applications are structured according to the `iota-streams-app` directory, which includes the following sub-directories:

- Message
- Transport

### Message

Streams applications use a message-oriented protocol, where each message consists of a header and application-specific content.

The `message` module allows you to define the application participants, their roles, and the message syntax.

Messages are written in the [Protobuf3](#protobuf3-messaging) syntax and are processed according to Protobuf3 rules.

### Transport

To send messages in Streams applications, you need to use the `transport` module.

This module includes:

- A generic module, which defines the traits and functions for sending and receiving messages
- A Tangle-specific module for converting messages into bundles and converting bundles back into messages

## Transaction structure

As the name suggests, Streams is a framework that offers tools for sending streams of authenticated data.

To allow others to find transactions in a stream, each transaction has a header, which includes the following identifable information:

- **Stream identifier:** This information is stored in the `address` field of a transaction, and is **the same** for each transaction in the same stream
- **Message identifier:** This information is stored in the `tag` field of a transaction, and is **different** for each new message in the same stream

When a transaction relies on information in others with certain message identifiers, it can reference those message identifiers in its message body to form a path that others can follow through the Tangle.

The rest of the header is stored in the first few trytes of the `signatureMessageFragment` field, which are encoded as Protobuf3 messages:

- **Streams version:** The Streams version that was used to create and encode the message
- **Streams message type:** The type of message content to give the receiver an indication of how to decode it

The rest of the application-specific content is stored in the `signatureMessageFragment` fields.

![Message structure](../introduction/images/message-structure.png)

For an example of application-specific content, [see the message types of the Channels app](../channels/message-types.md).

## Protobuf3 messaging

Protobuf3 is a cryptographic message definition language that we built for encoding and decoding Streams messages.

Protobuf3 builds on the idea of [Protocol Buffers](https://en.wikipedia.org/wiki/Protocol_Buffers) by adding keywords that indicate how a certain message field should be processed. For example, the `mssig` keyword indicates that the content contains a signature that must be generated or verified.

We built Protobuf3 to be highly extensible so that it's easy to add new keywords such as those for Diffie-Hellman signatures.

## Cryptography

Cryptography is what makes Streams so powerful. Built into the framework are the following cryptographic tools.

### Core

The `iota-streams-core` directory contains tools for the following:

- Working with ternary and binary data
- Using the [Troika](https://medium.com/asecuritysite-when-bob-met-alice/meet-troika-a-hashing-method-fit-for-iot-blockchains-47857b4ca1f3) hashing function
- Generating pre-shared keys
- Generating pseudo-random numbers

### Keccak

The `iota-streams-core-keccak` directory contains tools for working with Keccak-F[1600] sponge constructions.

### Merkle tree

The `iota-streams-core-merkletree` directory contains tools for creating traversable Merkle trees.

### MSS

The `iota-streams-core-mss` directory contains tools for creating a [Merkle tree signature scheme (MSS)](https://en.wikipedia.org/wiki/Merkle_signature_scheme) for Winternitz one-time-signatures.

### NTRU

The `iota-streams-core-ntru` directory contains tools for the following:

- Generating [NTRU key pairs](https://en.wikipedia.org/wiki/NTRU)
- Encrypting messages with NTRU private keys
- Decrypting messages with NTRU public keys

