# Qubic transaction

Qubic transactions contain metadata, Abra code, and a virtual DAG.  They are stored in the SignatureMessageFragment (SMF) of an IOTA transaction that does not require a signature.  Typically, these are zero value transactions.  The qubic transaction specification has not been finalized.

### Metadata
A qubic transaction contains the following metadata:

- epoch start time
- epoch duration
- quorum threshold percentage
- type of resource proof
- predefined invocation time limit to prevent infinite loops
- other data to be determined

### Abra smart contract
[Abra](https://github.com/NelsonPython/Qubic/edit/master/0.1/qubic/concepts/abra.md) describes the work to be accomplished

### Virtual DAG
A qubic contains a virtual DAG that is copied into the local memory of a device so the device can compute it's contribution to the smart contract.  For example, suppose the qubic requested local temperature from an environment sensor.  The device would sense the temperature and report it. 
