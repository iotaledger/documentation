# ZMQ events

**This table contains the zero message queue (ZMQ) events that an IRI node can publish.**

All events return one or more buffer objects, which contain space-separated data. The first item in the buffer is always the name of the event. The information in the Returned data column is displayed as though the buffer had been converted to a string and split on a space character into an array.

|  **Event and description** | **Returned data**
| :----------| :----------|
|`mctn`|
|Number of transactions that IRI traversed during tip selection| <ul><li>**Index 1:** Total number of transactions that were traversed during tip selection</li></ul>
|`lmi` |
|The latest milestone index|<ul><li>**Index 1:** Index of the previous solid subtangle milestone</li><li>**Index 2:** Index of the latest solid subtangle milestone</li></ul>
|`lmsi` |
|The latest solid subtangle milestone| <ul><li>**Index 1:** Index of the previous solid subtangle milestone</li><li>**Index 2:** Index of the latest solid subtangle milestone</li></ul>
|`lmhs`|
| The latest solid subtangle milestone transaction hash| <ul><li>**Index 1:** Milestone transaction hash</li></ul>
|`sn`|
| Transaction that has recently been confirmed| <ul><li>**Index 1:** Index of the milestone that confirmed the transaction</li><li>**Index 2:** Transaction hash</li><li>**Index 3:** Address</li><li>**Index 4:** Trunk transaction hash</li><li>**Index 5:** Branch transaction hash</li><li>**Index 6:** Bundle hash</li></ul>
|`sn_trytes`|
| Transaction trytes of recently confirmed transactions| <ul><li>**Index 1:** Transaction trytes</li><li>**Index 2:** Transaction hash</li><li>**Index 3:** Index of the milestone that confirmed the transaction</li></ul>
|`trytes`|
| Transaction trytes of any new transactions| <ul><li>**Index 1:** Transaction trytes</li><li>**Index 2:** Transaction hash</li></ul>
|<a name="tx"></a> `tx` |
|Transaction that the IRI node has recently appended to the ledger| <ul><li>**Index 1:** Transaction hash</li><li>**Index 2:** Address</li><li>**Index 3:** Value</li><li>**Index 4:** Obsolete tag</li><li>**Index 5:** Value of the transaction's `timestamp` field</li><li>**Index 6:** Index of the transaction in the bundle</li><li>**Index 7:** Last transaction index of the bundle</li><li>**Index 8:** Bundle hash</li><li>**Index 9:** Trunk transaction hash</li><li>**Index 10:** Branch transaction hash</li><li>**Index 11:** Unix epoch of when the IRI received the transaction</li><li>**Index 12:** Tag</li></ul>
|<a name="address"></a>81-tryte address (uppercase characters)| 
|Monitor a given address for a confirmed transaction| <ul><li>**Index 1:** Address</li><li>**Index 2:** Transaction hash of a confirmed transaction that the address appeared in</li><li>**Index 3:** Index of the milestone that confirmed the transaction </li></ul>
