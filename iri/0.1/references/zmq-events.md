# ZMQ events

**This table contains the zero message queue (ZMQ) events that an IRI node can publish.**

All events that you subscribe to must be in lowercase letters except the trytes of the address event, which must be in uppercase letters.

All events return at least one buffer object that contains space-separated data. The first item in the buffer is always the name of the event.

The information in the Returned data column is displayed as though the buffer had been converted to a string and split on a space character into an array.

Index 0 of each array of returned data is not displayed because it is always the name of the event.

|  **Event and description** | **Returned data**
| :----------| :----------|
|`mctn`|
|Number of transactions traversed during tip selection| <ul><li>**Index 1:** Total number of transactions that were traversed during tip selection</li></ul>
|`dnscv` |
|Neighbor DNS validations| <ul><li>**Index 1:** Neighbor's hostname</li><li>**Index 2:** Neighbor's IP address</li></ul>
|`dnscc`|
|Neighbor DNS confirmations| <ul><li>**Index 1:** Neighbor's hostname</li></ul>
|`dnscu` |
|Update to a Neighbor's IP address| <ul><li>**Index 1:** Neighbor's hostname</li></ul>
|`hmr`|
|The ratio of received transactions that the IRI node stored in cache (hit) to received transaction that the IRI node randomly removed (miss)| <ul><li>**Index 1:** Hit count</li><li>**Index 2:** Miss count</li></ul>
|`antn` |
|Information about non-tethered neighbors that were added (available only on the testnet network)| <ul><li>**Index 1:** URL of a non-tethered neighbor</li></ul>
|`rntn`|
|Information about non-tethered neighbors that were refused (available only on the testnet network)| <ul><li>**Index 1:** URL of the neighbor</li><li>**Index 2:** The maximum number of peers that are specified in the IRI configuration options</li></ul>
|`rstat` |
|Information about the tip transaction requester|<ul><li>**Index 1:** Number of received tip transactions that the IRI node is yet to process </li><li>**Index 2:** Number of tip transactions that the IRI node is yet to broadcast to its neighbors</li><li>**Index 3:** Number of tip transactions that the IRI node is yet to request from its neighbors</li><li>**Index 4:** Number of requested tip transaction that the IRI node is yet to send as a reply to its neighbors</li><li>**Index 5:** Number of stored transactions in the ledger</li></ul>
|`rtl` |
|Transaction that the IRI node randomly removed from the request queue| <ul><li>**Index 1:** Transaction hash that was removed</li></ul>
|`lmi` |
|The latest milestone index|<ul><li>**Index 1:** Index of the previous solid subtangle milestone</li><li>**Index 2:** Index of the latest solid subtangle milestone</li></ul>
|`lmsi` |
|The latest solid subtangle milestone| <ul><li>**Index 1:** Index of the previous solid subtangle milestone</li><li>**Index 2:** Index of the latest solid subtangle milestone</li></ul>
|`lmhs`|
| The latest solid subtangle milestone transaction hash| <ul><li>**Index 1:** Milestone transaction hash</li></ul>
|`sn`|
| Transaction that has recently been confirmed| <ul><li>**Index 1:** Index of the milestone that confirmed the transaction</li><li>**Index 2:** Transaction hash</li><li>**Index 3:** Address</li><li>**Index 4:** Trunk transaction hash</li><li>**Index 5:** Branch transaction hash</li><li>**Index 6:** Bundle hash</li></ul>
|`tx_trytes`|
| Raw transaction trytes that the IRI node recently appended to its ledger| <ul><li>**Index 1:** [Raw transaction object](root://iota-basics/0.1/references/structure-of-a-transaction.md)</li><li>**Index 2:** Transaction hash</li></ul>
|<a name="tx" /> `tx` |
|Transaction that the IRI node has recently appended to the ledger| <ul><li>**Index 1:** Transaction hash</li><li>**Index 2:** Address</li><li>**Index 3:** Value</li><li>**Index 4:** Obsolete tag</li><li>**Index 5:** Value of the transaction's `timestamp` field</li><li>**Index 6:** Index of the transaction in the bundle</li><li>**Index 7:** Last transaction index of the bundle</li><li>**Index 8:** Bundle hash</li><li>**Index 9:** Trunk transaction hash</li><li>**Index 10:** Branch transaction hash</li><li>**Index 11:** Unix timestamp for when the IRI received the transaction</li><li>**Index 12:** Tag</li></ul>
|81-tryte address| 
|Monitor a given address for a confirmed transaction| <ul><li>**Index 1:** Address</li><li>**Index 2:** Transaction hash of a confirmed transaction that the address appeared in</li><li>**Index 3:** Index of the milestone that confirmed the transaction </li></ul>
