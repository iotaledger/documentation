# Building a Streams application

**This topic guides you through the process of building a Streams application. At the end of the article, you will have an understanding of how to build your own Streams application.**

## Define what your application will do

The first step of any application is to define what you want it to do. At this stage you should do the following:

- Describe the roles that users will have in your application
- Choose the cryptography that you will use in messages

Using this information, you can start to map out your message types.

### Describe the roles

The role of users can affect the actions that they do in an application.

For example, in Channels, users can be an author or a subscriber. The author is the owner of the application and controls all aspects of it, including who has access to encrypted data. On the other hand, subscribers have a passive role. Without the author's authorization, subscribers can only send public data or verify the author's signature in signed messages.

The actions that each role can do depends a lot on the cryptography that your application uses.

### Choose the cryptography

Cryptography is what makes Streams so powerful. Built into the framework are cryptographic tools in the following crates:

- Binary/ternary conversions
- Streams sponge-based constructions (spongos)
- Spongos pseudo-random permutations (PRP)
- Spongos-based pseudo-random number generator (PRNG) and hashing
- [Merkle tree signature scheme (MSS)](https://en.wikipedia.org/wiki/Merkle_signature_scheme) for Winternitz one-time-signatures
- [NTRU key pairs](https://en.wikipedia.org/wiki/NTRU)

For example, the Channels application uses spongos for processing messages that rely on information in other messages.

If want to use another type of cryptography in your own application, you can add another crate that handles it.

## Describe your message types

After laying out the users' roles and the cryptography that you want to use, you can start to give your application some shape by describing the message types.

Message types define the rules for processing messages and are written in a custom syntax called [Protobuf3](#protobuf3-messaging).

Protobuf3 is a cryptographic message definition language that we built for Streams messages.

Protobuf3 builds on the idea of [Protocol Buffers](https://en.wikipedia.org/wiki/Protocol_Buffers) by adding keywords that indicate how a certain message field should be processed.

Protobuf3 is highly extensible so that it's easy to add new keywords for your own applications.

## Write some methods to create, publish, and process messages

After creating your message types, you can write the methods for creating, publishing, and processing them.

## Next steps

We'll be adding more information about building Streams applications in the near future.

In the meantime, take a look at the [Channels application](root://channels/0.1/overview.md) and get involved by discussing your own ideas in the #streams-discussion channel on [Discord](https://discord.iota.org/).



