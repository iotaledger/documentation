# Streams overview

**Streams is a cryptographic framework for building cryptographic messaging protocols in the [Rust programming language](https://www.rust-lang.org/). Streams comes with a built-in method of sending messages to IOTA nodes, but it's also flexible enough to allow you to extend it to send messages in other ways such as in HTTP URLs.**

Here are just a few ideas of what you can build with Streams:

- An API service that encrypts data if it's behind a paywall
- A marketing subscription service that keeps an auditible record of subscriptions on the Tangle
- A secure messaging protocol that relies on cryptographic keys to identify users

<iframe width="560" height="315" src="https://www.youtube.com/embed/jDCMuML1QBo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Limitations

Messages are intended to be read and processed. After a message is sent, you should not rely on being able to read that message again.

## Roadmap

Streams is in the alpha phase of the release cycle. The purpose of this version of Streams is to get some feedback before we progress towards the final implementation.

See the [roadmap](https://roadmap.iota.org/masked-authenticated-messaging-v1_1) for more information.

## Blog posts

---------------
#### **IOTA Streams Alpha** ####
[IOTA Streams Alpha](https://blog.iota.org/iota-streams-alpha-7e91ee326ac0)

An overview of the alpha release of Streams.
---------------

## Repository

Go to the Streams source code on [Github](https://github.com/iotaledger/streams).

## Next steps

Take a look at our built-in Streams protocol called [Channels](root://channels/0.1/overview.md).

