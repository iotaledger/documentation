# Prune transactions from the ledger

**Over time, the ledger of an IRI node accumulates many transactions, which often cause it to become larger than the IRI node's available memory. To stop the ledger from becoming too large, you can choose to delete old transactions from the ledger at regular intervals.**

Transactions are pruned only if they were confirmed by a milestone transaction that is older than the result of the following calculation:

current milestone index - ([`LOCAL_SNAPSHOTS_DEPTH`](../references/iri-configuration-options.md#local-snapshots-depth) +
[`LOCAL_SNAPSHOTS_PRUNING_DELAY`](../references/iri-configuration-options.md#local-snapshots-pruning-delay))

## Configure your node

You must stop the IRI before making changes to the configuration options.

1. Make sure that the [`LOCAL_SNAPSHOTS_ENABLED` and the `LOCAL_SNAPSHOTS_PRUNING_ENABLED` configuration options](../references/iri-configuration-options.md#local-snapshots) are set to `true`

2. Change the value of the `LOCAL_SNAPSHOTS_PRUNING_DELAY` and the `LOCAL_SNAPSHOTS_DEPTH` configuration options

Milestones are sent approximately every two minute. So, use the following formula to calculate the number of days that new transactions will remain in the ledger:

- **Total milestone index:** `LOCAL_SNAPSHOTS_PRUNING_DELAY` + `LOCAL_SNAPSHOTS_DEPTH` 

- **Total amount of time in minutes:** Total milestone index / 120

- **Total amount of time in days:** Total amount of time in minutes / 24