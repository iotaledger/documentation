# Network packets

**Nodes send transactions to their neighbors in data packets. These tables display the data packets that nodes gossip among each other.**

## Header

|**Name**|**Length (bytes)**|**Description**|
|:------|:------------------|:--------------|
Protocol version|1|The used protocol version|
|Type|1|The type of message|
|Length|2|The size of the message|
|Message|N (maximum 65 kilobytes)|The message|

## Message Types

|**Type**|**Length (bytes)**|**Description**|
|:------|:------------------|:--------------|
|Transaction Gossip|Min: 341, Max: 1650 bytes|Contains the byte-encoded transaction data (292-1604 bytes) and the transaction hash of a requested transaction (49 bytes). The byte-encoded transaction data is truncated by removing all 0 bytes from the end of the `signatureMessageFragment` field.|
|Handshake|10|Contains the IOTA node's port number (2 bytes) and the time (8 bytes) that the handshake packet was sent (millisecond timestamp). This message is the first message that's exchanged between two neighbors to identify each other. The timestamp is used to show the latency among neighbors.|
