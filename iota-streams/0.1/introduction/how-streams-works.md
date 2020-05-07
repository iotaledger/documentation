# How Streams works

**This article explains the core concepts of Streams to help you understand how to build your own applications.**

## Application structure

A Streams application is a message-oriented protocol where the rules for processing the messages are defined in a custom syntax called [Protobuf3](#protobuf3-messaging).

## Protobuf3 messaging

Protobuf3 is a cryptographic message definition language that we built for Streams messages.

Protobuf3 builds on the idea of [Protocol Buffers](https://en.wikipedia.org/wiki/Protocol_Buffers) by adding keywords that indicate how a certain message field should be processed. For example, the `mssig` keyword indicates that the content contains a signature that must be generated or verified.

Protobuf3 is highly extensible so that it's easy to add new keywords such as those for Diffie-Hellman key exchange.

## Transport

To publish messages in Streams applications, you use the `transport` module, which includes a Tangle-specific module for converting messages into [bundles](root://getting-started/0.1/transactions/bundles.md) and converting bundles back into messages.

To allow others to find messages in a stream, each one has a header, which includes the following identifable information:

- **Application identifier:** An identifier for the instance of the application. This identifier is the same for each message in the same application instance.
- **Message identifier:** An identifier for the message in the application instance. This identifier should be different for each new message in the same application instance.
- **Streams version:** The Streams version that was used to create and encode the message
- **Streams message type:** The type of message content. This type gives the receiver an indication of how to process it.

![Message structure](../images/message-structure.png)

## Cryptography

Cryptography is what makes Streams so powerful. Built into the framework are cryptographic tools for the following:

- Binary/ternary conversions
- Streams sponge-based constructions (Spongos)
- Spongos pseudo-random permutations (PRP): Troika, Keccak
- Spongos-based pseudo-random number generator (PRNG) and hashing
- [Merkle tree signature scheme (MSS)](https://en.wikipedia.org/wiki/Merkle_signature_scheme) for Winternitz one-time-signatures
- [NTRU key pairs](https://en.wikipedia.org/wiki/NTRU)

