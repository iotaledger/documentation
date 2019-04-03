# Bundles and transactions

**A transaction is a single operation that you can send to a node. Transactions can withdraw/deposit IOTA tokens or send data. To send a node one or more transactions, you must package them in a bundle.**

Each transaction in a bundle must be [structured](../references/structure-of-a-transaction.md) according to the IOTA protocol and contain valid values for all the transaction fields.

When a transaction is packaged in a bundle, it's given both a `currentIndex` field, which defines its place in the bundle, and a `lastIndex` field, which defines the end of the bundle (head). Next, each transaction in the bundle, except the head, is [connected to each other](../references/structure-of-a-bundle.md) through the `trunkTransaction` field. Then, the values of each transaction's `address`, `value`, `obsoleteTag`, `currentIndex`, `lastIndex` and `timestamp` fields are absorbed and squeezed by a cryptographic sponge function to produce an 81-tryte bundle hash. This bundle hash is included in each transaction's `bundle` field to seal the package.

Bundles are atomic, meaning that if any of the transactions in the bundle change, the bundle hash of each transaction would be invalid.

To explain why bundles need to be atomic, take this example.

You're at an online checkout and the total to pay is 10Mi. Your seed has 2 addresses (index 0 and 1), which both contain 5Mi. So, you create three transactions: One input transaction to withdraw 5Mi from address 0, another input transaction to withdraw 5Mi from address 1, and one output transaction to deposit 10Mi to the vendor's address. (We'll assume that both addresses in the input transactions were created from a private key with security level 1, so the signatures can fit in each transaction.)

For the vendor to receive 10Mi, all three of those transactions must be valid. They're sequential instructions that rely on each other's validity to achieve the overall goal of transferring IOTA tokens.

**Note:** It's not just multiple transactions that need to be packaged in a bundle, even individual ones do.

## Withdrawals and deposits

A bundle can consist of any number of withdrawals and deposits. However because of the time and resources that are involved during [proof of work](root://the-tangle/0.1/concepts/proof-of-work.md), we recommend a maximum of 30 transactions in a bundle.

### Input transaction

Input transactions withdraw IOTA tokens from addresses.

Bundles can contain multiple input transactions, and each one must include a valid signature. The length of the signature depends on the [security level](../references/security-levels.md) of the address. If the security level of the address is greater than 1, the signature is too large to fit in one transaction and must be fragmented across zero-value output transactions.

**Important:** [Addresses must not be withdrawn from more than once](../concepts/addresses-and-signatures.md#address-reuse). Therefore, input transactions must withdraw all IOTA tokens from an address even if the sender does not want to transfer all of them to the recipient. The remaining IOTA tokens can be deposited into a remainder address (usually the sender's address) in an output transaction.

### Output transaction

Output transactions can be one of the following:

* A zero-value transactions that contains only a message in the `signatureMessageFragment` field
* A transaction with a positive value that deposits IOTA tokens into an address

Bundles can contain multiple output transactions. If a message in an output transaction is larger than the `signatureMessageFragment` field, the message can be fragmented across other zero-value output transactions.

**Note:** Transactions that deposit IOTA tokens can also contain a message because they don't withdraw IOTA tokens, and therefore don't contain a signature.

## How bundles are validated

After you send a bundle to a [node](root://iri/0.1/introduction/overview.md), it validates each transaction and appends each one to its ledger.

During [tip selection](root://the-tangle/0.1/concepts/tip-selection.md), a node finds and [validates each transaction in your bundle](root://iri/0.1/concepts/transaction-validation.md#bundle-validator) by traversing its `trunkTransaction` field. When the node has validated all transactions up to the head (or [`lastIndex` field](../references/structure-of-a-transaction.md)), your bundle is considered valid.

![Example of a bundle of 4 transactions](../bundle.png)

## Example bundles

### Withdraw from address with security level 1

This bundle transfers 80i to a recipient from an address with a security level of 1.

| Transaction index | Transaction contents                                                     | Transaction value                                          |
| ----- | ------------------------------------------------------------------------- | --------------------------------------------------------------- |
| 0     | Recipient's address                       | 80 (sent to the recipient's address)                    |
| 1     | Sender's address and its signature | -100 (the total balance of the sender's address as a negative value) |
| 2    | An address for the transfer of the remaining IOTA tokens (usually one of the sender's addresses)                      | 20 (remainder of the sender's address in transaction 1)                          |

### Withdraw from address with security level 2

This bundle transfers 80i to a recipient from an address with a security level of 2.

| Transaction index | Transaction contents                                                     | Transaction value                                          |
| ----- | ------------------------------------------------------------------------- | --------------------------------------------------------------- |
| 0     | Recipient's address                       | 80 (sent to the recipient's address)                    |
| 1     | Sender's address and the first part of its signature | -100 (the total balance of the sender's address as a negative value) |
| 2     | Sender's address and the rest of its signature                                        | 0                                                               |
| 3     | An address for the transfer of the remaining IOTA tokens (usually one of the sender's addresses)                      | 20 (remainder of the sender's address in transaction 1)                          |

### Withdraw from an address with security level 3

This bundle transfers 80i to a recipient from an address with a security level of 3.

| Transaction index | Transaction contents                                                     | Transaction value                                          |
| ----- | ------------------------------------------------------------------------- | --------------------------------------------------------------- |
| 0     | Recipient's address                       | 80 (sent to the recipient's address)                    |
| 1     | Sender's address and the first part of its signature | -100 (the total balance of the sender's address as a negative value) |
| 2     | Sender's address and the second part of its signature                                         | 0                                                               |
| 3    | Sender's address and the rest of its signature                                         | 0                                                               |
| 4     | An address for the transfer of the remaining IOTA tokens (usually one of the sender's addresses)                             | 20 (remainder of the sender's address in transaction 1)                          |

