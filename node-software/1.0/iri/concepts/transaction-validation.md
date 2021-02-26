# Transaction validation in IRI nodes

**IRI nodes validate transactions during the following stages: On receipt of new transactions and during the tip selection process**

## Validation of new transactions

When an IRI node receives a new transaction, the transaction validator checks it for the following:

- The proof of work was done
- The value of any transaction in the bundle doesn’t exceed the total global supply
- The transaction is not older than the last snapshot and not newer than two hours ahead of the IOTA node’s current time
- The last trit of an address is 0 for value transactions

## Transaction validation during tip selection

The bundles of each transaction that the IRI node traverses during the tip selection process are checked by the bundle validator and the ledger validator.

### Bundle validator

The bundle validator makes sure that all transactions in a bundle are valid.

During a [weighted random walk](../concepts/tip-selection.md), the bundle validator checks the bundle of transactions for the following:

- The value of any transaction in the bundle doesn’t exceed the total global supply
- The total value of all transactions in the bundle is 0 (all IOTA tokens that are withdrawn are also deposited into other addresses)
- Any signatures in value transactions are valid

### Ledger validator

The ledger validator makes sure that double spends are never confirmed.

During a [weighted random walk](../concepts/tip-selection.md), the ledger validator checks that each bundle does not lead to a double-spend by checking the values of all addresses in a bundle. If a double spend is found, the weighted random walk steps back one transaction and finds another route to a tip transaction.
