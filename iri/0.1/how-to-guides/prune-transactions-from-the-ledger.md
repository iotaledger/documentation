# Prune transactions from the ledger

**Over time, the ledger of an IRI node accumulates many valid transactions, which often cause it to become larger than the IRI node's available memory. To stop the ledger from becoming too large, you can choose to delete old transactions from the ledger at regular intervals.**

By default, IRI nodes delete transactions that are older than around 28 days.

Transactions are pruned only if they were confirmed by a milestone transaction that is older than the result of the following calculation:

current milestone index - ([`LOCAL_SNAPSHOTS_DEPTH`](../references/iri-configuration-options.md#local-snapshots-depth) +
[`LOCAL_SNAPSHOTS_PRUNING_DELAY`](../references/iri-configuration-options.md#local-snapshots-pruning-delay))

## Prerequisites

You must stop the IRI before making changes to the configuration options.

---

1. Make sure that the `LOCAL_SNAPSHOTS_ENABLED` and the `LOCAL_SNAPSHOTS_PRUNING_ENABLED` configuration options are set to `true`

2. Change the value of the `LOCAL_SNAPSHOTS_PRUNING_DELAY` and the `LOCAL_SNAPSHOTS_DEPTH` configuration options

Milestones are sent approximately every minute. Therefore, use the following formula to calculate the number of days that transactions will remain in the ledger:

 * **Total milestone index:** `LOCAL_SNAPSHOTS_PRUNING_DELAY` + `LOCAL_SNAPSHOTS_DEPTH` 

 * **Total amount of time in minutes:** milestone index / 60
 
 * **Total amount of time in days:** total amount of time in minutes / 24