# Controlling access to private messages

**This article explains the options that authors have for restricting access to private messages on a channel.**

Authors can send public as well as private message payloads. Public message payloads can be seen by anyone, but private ones can be seen only by subscribers that the author chooses.

Before authors announce a channel, it's important that they decide how they will manage subscribers' access to the channel's private messages.

For example, if an author were an API service, that author may want all subscribers to be able to see a public alert about breaking changes. However, the author may also want to keep some messages private such as sensor data from a private endpoint. In this case, the author would encrypt the private message payloads with a key.

![API application example](../images/api-app-example.png)

To control access to private message payloads on a channel, authors generate a session key for each subscriber, which is used to decrypt the private messages. Then, authors send these session keys to subscribers, using [`Keyload`](../references/message-types.md#keyload) messages.

Authors have two choices for giving subscribers access to session keys:

- Allow subscribers to request access
- Set up subscribers outside of the channel

## Allowing subscribers to request access at any time

Authors can allow new subscribers to send [`Subscribe`](../references/message-types.md#subscribe) messages to the channel at any time to request access to encrypted message payloads.

Authors may choose this option in cases where all subscribers are not known before the start of the channel.

To allow subscribers to send these message, the application must use a workflow such as the following:

- The author generates an [NTRU key pair](https://en.wikipedia.org/wiki/NTRU) and sends the public key to the subscribers in an `Announce` message
- Subscribers read the `Announce` message and use the author's NTRU public key to encrypt their own NTRU public keys for privacy before sending them in the `Subscribe` message
- The author listen for `Subscribe` messages and decides to which subscribers to give access to private messages
- The author gathers the subscribers NTRU public keys and uses each one to generate a unique session key for each subscriber
- The author sends those session keys in a `Keyload` message
- Subscribers listen for `Keyload` messages and read them to find their own session key

## Setting up subscribers before announcing the channel

Before announcing a channel, authors can decide which subscribers should be allowed access to private message payloads. These subscribers may come from an external source such as a list of members' email addresses in a database.

Authors may choose this option to avoid the overhead of managing `Subscribe` messages.

To set up subscribers before announcing the channel, authors can choose them in advance and either establish a pre-shared key or request their NTRU keys.