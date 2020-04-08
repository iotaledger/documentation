# Controlling access to private messages

**This article explains the options that authors have for restricting access to private messages on a channel.**

To control access to private message payloads on a channel, authors generate a session key for each subscriber, which is used to decrypt the private messages. Then, authors send these session keys to subscribers, using [`Keyload`](../channels/message-types.md#keyload) messages.

Authors have two choices for giving subscribers access to session keys:

- Allow subscribers to request access
- Set up subscribers outside of the channel

### Allowing subscribers to request access at any time

Authors can allow new subscribers to send [`Subscribe`](../channels/message-types.md#subscribe) messages to the channel at any time to request access to encrypted message payloads.

To allow subscribers to send these message, the Channels applications must following a workflow such as the following:

- The author generates an [NTRU key pair](https://en.wikipedia.org/wiki/NTRU) and sends the public key to the subscribers in an `Announce` message
- Subscribers read the `Announce` message and use the author's NTRU public key to encrypt their own NTRU public keys for privacy before sending them in the `Subscribe` message
- The author listen for `Subscribe` messages and decides to which subscribers to give access to private messages
- The author gathers the subscribers NTRU public keys and uses each one to generate a unique session key for each subscriber
- The author sends those session keys in a `Keyload` message
- Subscribers listen for `Keyload` messages and read them to find their own session key

Authors may choose this option in cases where all subscribers are not known before the start of the channel.

```rust
let mut author = Author::new("AUTHORSECRET", 2, true);
```

Here, the third argument indicates whether to generate an [NTRU key pair](https://en.wikipedia.org/wiki/NTRU), which is used for allowing new subscribers.

### Setting up subscribers before announcing the channel

Before announcing a channel, authors can decide which subscribers should be allowed access to private message payloads. These subscribers may come from an external source such as a list of members' email addresses in a database.

It's not possible for authors to use Channels to exchange the keys without first announcing the channel. Instead, authors can choose the subscribers in advance and establish either a pre-shared key or request the subscribers' NTRU keys.

Authors may choose this option to avoid the overhead of managing `Subscribe` messages.

```rust
let mut author = Author::new("AUTHORSECRET", 2, false);
```

Here, the third argument indicates whether to generate an [NTRU key pair](https://en.wikipedia.org/wiki/NTRU), which is used for allowing new subscribers.