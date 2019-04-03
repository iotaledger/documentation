# Data in the snapshot metadata file

**This table contains the data that's added to the snapshot.meta file during a [local snapshot](../concepts/local-snapshot.md).**

| **Data**|    **Description** |                                      
| :-----: |  :---------------: | 
|Bootstrap milestone hash |The hash of the milestone transaction from which the IRI started the local snapshot|
|Bootstrap milestone index | The index of the milestone transaction from which the IRI started the local snapshot |
|Unix timestamp |The time that the snapshot files were created |
|<a name="solid-entrypoint"></a>Total number of solid entrypoints|Confirmed transactions for which the IRI had all approvers in its ledger during the time of the snapshot. An IRI node will stop solidifying a transaction if it references a solid entrypoint.|
|<a name="seen-milestone"></a>Total number of seen milestones| Milestones that are newer than the bootstrap milestone. The number of seen milestones is equal to the [`LOCAL_SNAPSHOTS_DEPTH`](../references/iri-configuration-options.md#local-snapshots-depth) configuration option. |
|List of solid entrypoints | A semicolon-separated list of transaction hashes and the index of the milestones that made them solid|
|List of seen milestones | A semicolon-separated list of seen milestone transaction hashes |
