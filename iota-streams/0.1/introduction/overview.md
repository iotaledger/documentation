# Streams overview

**Streams is a cryptographic framework for building messaging applications. Streams comes with a built-in method of sending messages to IOTA nodes, but it's also flexible enough to allow you to extend it to send messages over another medium such as in HTTP URLs.**

Here are just a few ideas of what you can build with Streams:

- An API service that encrypts data if it's behind a paywall
- A marketing subscription service that keeps an auditible record of subscriptions on the Tangle
- A secure messaging application that does not require personally identifiable information

## Cryptography

Cryptography is what makes Streams so powerful. Built into the framework are cryptographic tools for the following.

- Working with ternary and binary data
- Using the [Troika](https://medium.com/asecuritysite-when-bob-met-alice/meet-troika-a-hashing-method-fit-for-iot-blockchains-47857b4ca1f3) hashing function
- Generating pre-shared keys
- Generating pseudo-random numbers
- Working with Keccak-F[1600] sponge constructions
- Creating traversable Merkle trees
- Creating a [Merkle tree signature scheme (MSS)](https://en.wikipedia.org/wiki/Merkle_signature_scheme) for Winternitz one-time-signatures
- Generating [NTRU key pairs](https://en.wikipedia.org/wiki/NTRU)
- Encrypting messages with NTRU private keys
- Decrypting messages with NTRU public keys

## Limitations

Streams messages are intended to be read and processed. After a message is sent, you should not rely on being able to read that message again.

## Blog posts

Read the following blog posts about Streams:

- [IOTA Streams Alpha](https://blog.iota.org/iota-streams-alpha-7e91ee326ac0)

## Repository

Go to the Streams source code on [Github](https://github.com/iotaledger/streams).

## Discord channels

[Join our Discord channel](https://discord.iota.org) where you can:

- Take part in discussions with IOTA developers and the community
- Ask for help
- Share your knowledge to help others

We have the following channels for Streams:

- **#streams-dev:** A read-only channel where developers discuss topics and where any GitHub updates are displayed

- **#streams-discussion:** An open channel where anyone is free to discuss Streams

## Next steps

Take a look at our built-in Streams application called [Channels](root://channels/0.1/introduction/overview.md).

