# Qubic lifecycle

**The following steps are taken in order for a committee of oracles to reach a quorum and process a qubic smart contract**

1. A qubic owner posts a qubic transaction.  A qubic transaction contains the contract terms in metadata, as well as, the Abra code defining the work to be accomplished.

2. The qubic owner chooses a committee to process their qubic by looking for specific transactions in the Tangle called "assembly transactions".
Assembly transactions provide information about a committee of oracles, such as their reputation

3. Attaching a qubic transaction to an assembly transaction informs the oracles that the qubic is available for processing

4. The device runs the Abra code

5. Each oracle hides the result using a hash.  Then, they post a commit transaction to the Tangle

6. The hashes are compared and a quorum is achieved

7. Each oracle posts a reveal transaction to the Tangle so the qubic owner receives their result

8.  Qubic owners reward oracles


