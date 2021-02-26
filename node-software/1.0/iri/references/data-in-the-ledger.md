# Data in the ledger

**This table contains the data that an IRI node appends to its ledger for each valid transaction.**

| **Column**|    **Data**                                            | **Description**           
| :-------------------: |  :---------------------------------------: | :----------------------------------------
| `transaction`     |Transaction hash     | The transaction bytes of this transaction|
| `transactionMetadata` | Transaction hash|This transaction's data and additional metadata that's added by IRI|
|`milestone`      |Milestone index      | Both the tail transaction hash and the index of the transaction in the milestone bundle that approves this transaction                |
| `stateDiffs`        |Milestone hash          |  The changes to the address's balance that a milestone confirmed on the ledger   |
| `address`          | Address hash         | List of transaction hashes that changed the balance of this address|
|`approvees`       |Transaction hash | The transaction hashes of the transactions that directly reference this transaction|
|`bundle`       |  Bundle hash| List of transaction hashes that belong to this transaction's bundle |
|`obsoleteTag`       | The obsolete tag |List of transaction hashes that have the same obsolete tag, which is part of the bundle essence (the part that is signed)|
|`tag`       | The tag |List of transaction hashes that have the same tag, which isn't part of the bundle essence (the part that isn't signed)|

## Transaction metadata

The following table contains the metadata that an IRI node appends to the `transactionMetadata` column.

|**Field**|**Data** |**Description**|
|:--------|:---------------|:-------|
|`validity`|-1, 0, or 1|This value is set by the [bundle validator](../concepts/transaction-validation.md#bundle-validator). The value can be -1 (invalid), 1 (valid), 0 (unknown)|
|`type`|`PREFILLED_SLOT` or `FILLED SLOT` |`PREFILLED_SLOT` means that the transaction hash exists, but the IOTA node doesn't have it in its ledger. `FILLED_SLOT` means that the IOTA node has the transaction hash in its ledger.|
|`arrivalTime`|integer |This value is the time in milliseconds that the IOTA node received the transaction|
|`parsed`|boolean |This value is used internally to check whether the metadata has been parsed|
|`solid`|boolean|This value is set to `true` only if this transaction and the history of all transactions that it approves are in the ledger|
|`sender`|URL or IP address|URL or the IP address of the IOTA node that sent the transaction|
|`snapshot`|Milestone index|Milestone index of the first milestone transaction that confirmed this transaction|
