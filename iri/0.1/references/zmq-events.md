# ZMQ events

**This table contains the zero message queue (ZMQ) events that the IRI publishes and that clients can subscribe to.**

All events that you subscribe to must be in lowercase letters except the trytes of the address event, which must be in uppercase letters.

All events return at least one buffer object that contains space-separated data. The first item in the buffer is always the name of the event.

The information in the Returned data column is displayed as though the buffer had been converted to a string and split on a space character into an array.

Index 0 of each array of returned data is not displayed because it is always the name of the event.

|  **Event/Description** | **Returned data**
| :----------| :----------|
|`mctn`|
|Number of transactions traversed during tip selection| <ul><li>Index 1: Total number of transactions that were traversed during tip selection</li></ul>
|`dnscv` |
|Neighbor DNS validations| <ul><li>Index 1: Neighbor's hostname</li><li>Index 2: Neighbor's IP address</li></ul>
|`dnscc`|
|Neighbor DNS confirmations| <ul><li>Index 1: Neighbor's hostname</li></ul>
|`dnscu` |
|Update to a Neighbor's IP address| <ul><li>Index 1: Neighbor's hostname</li></ul>
|`hmr`|
|The ratio of received transactions that the IRI stored in cache to received transaction that the IRI randomly removed (hit to miss ratio)| <ul><li>Index 1: Hit count</li><li>Index 2: Miss count</li></ul>
|`antn` |
|Information about non-tethered neighbors that were added (available only on the testnet network)| <ul><li>Index 1: URL of a non-tethered neighbor</li></ul>
|`rntn`|
|Information about non-tethered neighbors that were refused (available only on the testnet network)| <ul><li>Index 1: URL of the neighbor</li><li>Index 2: The maximum number of peers that are specified in the IRI configuration options</li></ul>
|`rstat` |
|Information about the tip transaction requester|<ul><li>Index 1: Number of received tip transactions that the IRI is yet to process </li><li>Index 2: Number of tip transactions that the IRI is yet to broadcast to its neighbors</li><li>Index 3: Number of tip transactions that the IRI is yet to request from its neighbors</li><li>Index 4: Number of requested tip transaction that the IRI is yet to send as a reply to its neighbors</li><li>Index 5: Number of stored transactions in the ledger</li></ul>
|`rtl` |
|Transaction that the IRI randomly removed from the request queue| <ul><li>Index 1: Transaction hash that was removed</li></ul>
|`lmi` |
|The latest milestone index|<ul><li>Index 1: Index of the previous solid subtangle milestone</li><li>Index 2: Index of the latest solid subtangle milestone</li></ul>
|`lmsi` |
|The latest solid subtangle milestone| <ul><li>Index 1: Index of the previous solid subtangle milestone</li><li>Index 2: Index of the latest solid subtangle milestone</li></ul>
|`lmhs`|
| The latest solid subtangle milestone transaction hash| <ul><li>Index 1: Milestone transaction hash</li></ul>
|`sn`|
| Transaction in the ledger that the IRI has recently confirmed| <ul><li>Index 1: Transaction hash</li><li>Index 2: Address</li><li>Index 3: Trunk transaction hash</li><li>Index 4: Branch transaction hash</li><li>Index 5: Bundle hash</li></ul>
|`tx_trytes`|
| Signature of a transaction that the IRI has recently confirmed| <ul><li>Index 1: Transaction signature</li></ul>
|`tx` |
|Transactions that the IRI has recently appended to the ledger| **Array 0**<ul><li>Index 1: Transaction hash</li><li>Index 2: Address</li><li>Index 3: Amount of IOTA</li><li>Index 4: Obsolete tag</li><li>Index 5: Timestamp of the bundle creation (seconds since the last snapshot)</li><li>Index 6: Index of the transaction in the bundle</li><li>Index 7: Last transaction index of the bundle</li><li>Index 8: Bundle hash</li><li>Index 9: Trunk transaction hash</li><li>Index 10: Branch transaction hash</li><li>Index 11: Timestamp of the attachment to the Tangle (milliseconds since the last snapshot)</li><li>Index 12: Tag</li></ul>**Array 1**<ul><li>Index 0: "tx_trytes"</li><li>Index 1: Transaction signature</li></ul>
|81 character address or 90 character address with checksum| 
|Activity on an address| <ul><li>Index 1: Index of the latest solid subtangle milestone</li><li>Index 2: </li><li>Index 3: Address </li><li>Index 4: Trunk transaction hash</li><li>Index 5: Branch transaction hash</li><li>Index 6: Bundle hash</li></ul>