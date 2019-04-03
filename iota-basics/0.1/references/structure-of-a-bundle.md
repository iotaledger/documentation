# Structure of a bundle

**This table displays the structure of a bundle.**

All transactions in a bundle, except the head, are connected to each other through the [`trunkTransaction` field](../references/structure-of-a-transaction.md). These connections allow nodes to find all transactions in the same bundle and validate them.

![Connections in a bundle](../bundle-structure.png)

| Transaction index                         |`trunkTransaction` field| `branchTransaction` field| Description   |
| :----------------------------- | :------ |:---|:---|
| 0| Transaction 1 in this bundle| Tail transaction hash from another bundle. This transaction hash is returned from the [tip selection process](root://the-tangle/0.1/concepts/tip-selection.md).|This transaction is called the **tail transaction**. |
|1 | Transaction 2 in this bundle| The same branch transaction hash as transaction 0|This transaction is linked to transaction 0 through the `trunkTransaction` field |
|2 | Transaction 3 in this bundle| The same branch transaction hash as transactions 0 and 1|This transaction is linked to transaction 1 through the `trunkTransaction` field |
|Last index | The same branch transaction hash as all other transactions in this bundle| Tail transaction hash from another bundle. This transaction hash is returned from the [tip selection process](root://the-tangle/0.1/concepts/tip-selection.md).| This transaction is called the **head transaction**. A bundle can consist of any number of transactions. |
