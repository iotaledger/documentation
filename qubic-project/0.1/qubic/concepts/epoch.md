# Epoch

**Oracles can only join a committee at the beginning of an epoch.  During the epoch when processing is occurring, new oracles may not join.  An epoch has two phases:  Resource Test Phase and Qubic Processing Phase**  

## Resource Test Phase
During the Resource Test Phase, the oracle initiating the committee accepts Proof of Resources based on those described in the qubic transaction metadata.  

The initiator may also add an oracle to the committee without requiring a Proof of Resource.  There are various types of proofs such as, Proof of Work, Proof of Bandwidth, Proof of Spectrum, or simply a request asking to joining the committee.

When oracles publish proof during the Resource Test Phase there is a one-to-many relationship with no trunk or branch in the virtual graph.  The virtual graph has many edges.  Oracles publish many proofs in an attempt to maximize their voting power with the committee.

#### Stake & weighting factors
Each type of resource proof has an associated "stake factor" or weight.  Weights determine voting power.  Additionally, qubic owners will distribute rewards to oracles based on their weights.

## Qubic Processing Phase
During the Qubic Processing Phase, the device runs the Abra code.  Qubic processes are measured in "quants".  Think of a quant like an iterator or a counter.  Abra does not allow infinite loops because the invocation receives a predefined invocation time limit from the qubic transaction.

Results are posted to the Tangle in two separate transactions:  a commit transaction and a reveal transaction

Finally, just before the end of the epoch, all oracles post a transaction with a snapshot of their internal processing state to be used at the start of the next epoch.

#### Commit transaction
The commit transaction hides the result in a hash. These hashed results are compared to see if a quorum was reached. 

#### Reveal transaction
When a quorum is reached, each oracle reveals their results by posting a reveal transaction to the Tangle

## Trustworthy results
Several oracles with good reputations can follow the prescribed process and they will compute a trustworthy result.  If a committee is very small and has a poor reputation then the result is questionable.

### Reputation
The initiator of the committee exposes the reputations of committee members because good reputations will be rewarded by consumers
