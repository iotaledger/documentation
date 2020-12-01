# Messages

**This topic explores the makeup and management of IOTA messages.**

A message is the object nodes gossip around in the network. It always references two other messages that are known as `parents`. It is stored as a vertex on the Tangle data structure that the nodes maintain.

Messages also contain payloads. Some are core payloads that are processed by all nodes as part of the core protocol. 

Others are community payloads that enable the building of new functionalities on top of the Tangle. And some payloads may, additionally, have other nested payloads embedded inside them. Where upon parsing, it is done layer by layer.

## How messages work

To better understand this layered design, consider the internet protocol, for example: there is an Ethernet frame that contains an IP payload. This in turn contains a TCP packet that encapsulates an HTTP payload. Each layer has a certain responsibility and once this responsibility is completed, we move on to the next layer.

The same is true with how messages are parsed. The outer layer of the message enables the mapping of the message to a vertex in the Tangle and performing some basic validation. The next layer may be a transaction that mutates the ledger state or the next layer may provide some extra functionality on the transactions to be used by applications.

## Message design

Messages are designed with multiple working parts including:

- Data types
- Message ID
- Message structures
- Message validations; and
- Payloads 

### Data types

Data types are used for when we specifcy fields in the messages and payloads.

| Name         | Description                                                  |
| ------------ | ------------------------------------------------------------ |
| uint8        | An unsigned 8 bit integer encoded in Little Endian.          |
| uint16       | An unsigned 16 bit integer encoded in Little Endian.         |
| uint32       | An unsigned 32 bit integer encoded in Little Endian.         |
| uint64       | An unsigned 64 bit integer encoded in Little Endian.         |
| ByteArray[N] | A static size array of size N.                               |
| ByteArray    | A dynamically sized array. A uint32 denotes its length.      |
| string       | A dynamically sized array of an UTF-8 encoded string. A uint16 denotes its length. |

### Message ID

The message ID is the `BLAKE2b-256` hash of the byte contents of the message. It should be used by the nodes to index the messages and by external APIs.

### Message structure

| Name               | Type            | Description                                                  |
| ------------------ | --------------- | ------------------------------------------------------------ |
| NetworkID          | uint64          | Network identifier. This field will signify whether this message was meant for mainnet, testnet, or a private net. It also tells what protocol rules apply to the message. It is first 8 bytes of the `BLAKE2b-256` hash of the concatenation of the network type and the protocol version string. |
| Parent1 (`trunk`)  | ByteArray[32]   | The Message ID of the first *Message* it references.         |
| Parent2 (`branch`) | ByteArray[32]   | The Message ID of the second *Message* it references.        |
| Payload Length     | uint32          | The length of the Payload. Since its type may be unknown to the node it must be declared in advanced. 0 length means no payload will be attached. |
| Payload            | Generic Payload |                                                              |
| Nonce              | uint64          | The nonce which lets this message fulfill the Proof-of-Work requirement. |

### Message validation

A message is considered valid, if the following syntactic rules are met:

- The message size must not exceed 32 KB
- When parsing the message is complete, there should not be any trailing bytes left that were not parsed
- If the payload type is in the core payload range (0-127) and the node is familiar with it, or if it is above this range
- If the Message PoW Hash will contain at least the number of trailing 0 trits the node defines as required

:::info:
For more information on validations, reference [RFC - 0025]([iotaledger/protocol-rfcs#0024](https://github.com/iotaledger/protocol-rfcs/pull/0024)) and [RFC - 0008]([iotaledger/protocol-rfcs#0008](https://github.com/iotaledger/protocol-rfcs/pull/0008)).
:::

### Payloads

A message may contain a payload. Below is a table of the currently specified core payloads with a link to their specifications. The `indexation payload` is specified here as an example:

| Payload Name                                                 | Type Value |
| ------------------------------------------------------------ | ---------- |
| [Signed Transaction](https://github.com/luca-moser/protocol-rfcs/blob/signed-tx-payload/text/0000-signed-transaction-payload/0000-signed-transaction-payload.md) | 0          |
| [Milestone Draft](https://github.com/jakubcech/protocol-rfcs/blob/jakubcech-milestonepayload/text/0019-milestone-payload/0019-milestone-payload.md) | 1          |
| [Indexation Payload](https://github.com/GalRogozinski/protocol-rfcs/blob/message/text/0017-message/0017-message.md#indexation-payload) | 2          |

:::info:
For more information on payloads, reference [RFC - 0018](iotaledger/protocol-rfcs#18) and [RFC - 0019](https://github.com/iotaledger/protocol-rfcs/pull/19).
:::

The Indexation Payload concept allows the addition of an index to the encapsulating message, as well as some arbitrary data. Nodes  expose an API that enables the querying of messages by the index. 

The structure of the payload is simple:

| Name         | Type      | Description                  |
| ------------ | --------- | ---------------------------- |
| Payload Type | uint32    | Must be set to **2**         |
| Index        | string    | The index key of the message |
| Data         | ByteArray | Data we are attaching        |

:::info:
For further information on confirming conflicting messages, or how messages work with the White Flag method, refer to updated types of transactions and methods, see:

- [RFC - 0030](https://github.com/iotaledger/protocol-rfcs/pull/30)

  :::

## Next steps


