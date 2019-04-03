# Glossary

**This glossary contains definitions specific to IOTA.**

Terms are listed in alphabetical order by category.

### Acronymns

<dl><dt>CTPS</dt><dd>Number of Confirmed Transactions Per Second</dd></dl>

<dl><dt>TPS</dt><dd>Number of Transactions Per Second processing through an [IRI node](#iota-terms)</dd></dl>

### Accounts

<dl><dt>address</dt><dd>Account that owns IOTA tokens. Addresses can send and receive data and IOTA tokens</dd></dl>

<dl><dt>multi-signature address (multi-sig address)</dt><dd>Address that needs multiple parties to sign a transaction before IOTA tokens can be withdrawn from it</dd></dl>

<dl><dt>security level</dt><dd>An integer (1, 2, or 3) that affects the length of a signature. The higher the security level, the longer the signature, and the stronger the security of the address.</dd></dl>

<dl><dt>seed</dt><dd>81-tryte password used to generate addresses and signatures</dd></dl>

<dl><dt>signature</dt><dd>Cryptograhic proof of ownership of an address. IOTA tokens can't be withdrawn from an address without a valid signature.</dd></dl>

### Cryptography

<dl><dt>checksum</dt><dd>Hashed data that allows you to detect errors and verify that you entered the correct data.  For example, in Trinity, a 9-character checksum is appended to the 81-tryte address so users can easily differentiate between their seed (81-trytes) and their address (90-characters) </dd></dl>

<dl><dt>Curl</dt><dd>Main hash function that's used in IOTA. Curl is based on a sponge construction, which was invented by the [Keccak creators](https://en.wikipedia.org/wiki/SHA-3) (SHA-3). Curl is designed for the Internet of things (IoT).
</dd></dl>

<dl><dt>Kerl</dt><dd>Keccek-384 hash function that includes the additional conversion of its input and output from/to 243 trits to 48 bytes, using [two's complement](https://en.wikipedia.org/wiki/Two%27s_complement).
</dd></dl>

<dl><dt>Winternitz one-time signature (W-OTS)</dt><dd>Post-quantum signature scheme that's used to sign input transactions that withdraw IOTA tokens.
</dd></dl>

## General terms

<dl><dt>directed acyclic graph (DAG)</dt><dd>Data structure that's based on a graph without any directed cycles. In IOTA, vertices represent transactions, and edges represent approvals </dd></dl>

<dl><dt>peer-to-peer network</dt><dd>Decentralized network that consists of nodes, which share data among each other</dd>
</dl>

<dl><dt>proof of work (PoW)</dt><dd>Computational puzzle that's hard to solve and easy to verify. IOTA uses a Hashcash-based puzzle to prevent both denial of service (DoS) attacks and spam attacks on the network</dd>
</dl>

## IOTA terms

<dl><dt>blowball</dt><dd>Tangle formation that consists of one central transaction, which is surrounded by a large number of tip transactions.</dd></dl>

<dl><dt>client</dt><dd>Device running software that connects to an IRI node to interact with an IOTA network and send transactions.</dd></dl>

<dl><dt>distributed ledger</dt><dd>Common ledger that is held by all IRI nodes in an IOTA network. IRI nodes share their ledgers with each other until all of them contain the same valid transactions.</dl>

<dl><dt>IRI node</dt><dd>Software that's responsible for validating transactions and storing a copy of them in a ledger</dd></dl>

<a name="ledger"></a><dl><dt>ledger</dt><dd>Database storing all transactions validated by an IRI node</dd></dl>

<a name="subgraph"></a><dl><dt>subgraph</dt><dd>Section of the ledger that contains all transactions between a milestone transaction and tip transactions</dd></dl>

<dl><dt>Tangle</dt><dd>Name of the directed acyclic graph (DAG) that is formed by connecting IOTA transactions in the distributed ledger to the transactions that they reference</dd></dl>

### Transactions

<dl><dt>approver</dt><dd>Transaction that directly references another transaction as its trunk transaction or branch transaction</dd></dl>

<a name="branch"></a><dl><dt>branch transaction</dt><dd>Transaction that is referenced by another transaction.</dd></dl>

<dl><dt>bundle</dt><dd>Group of transactions that are sent together to an IRI node.  Bundles are atomic. Either all transactions inside the bundle are accepted or none of them are.</dd></dl>

<dl><dt>confirmed</dt><dd>State of a transaction when it's been approved by a milestone</dd></dl>

<dl><dt>cumulative weight</dt><dd>Rating that an [IRI node](#iota-terms) gives to a [transaction](#transactions)</dd></dl>

<dl><dt>depth</dt><dd>Entrypoint [milestone](#milestone) that's used to start a weighted random walk through a [subgraph](#subgraph). The higher the value, the farther back in the subgraph the weighted random walk starts. A typical depth that wallets use is 3, which causes the weighted random walk to start 3 milestones in the past.</dd></dl>

<dl><dt>future set</dt><dd>Group of transactions that approve the same transaction</dd></dl>

<dl><dt>inconsistent</dt><dd>State of a transaction when it leads to withdrawing non-available funds</dd></dl>

<dl><dt>inclusion state</dt><dd>Process that an [IRI node](#iota-terms) performs to check either the acceptance of a transaction or the confirmation of a transaction. Given a transaction and a list of tip transactions, the inclusion state is true if the tip transactions reference that transaction.</dd></dl>

<dl><dt>invalid</dt><dd>State of a transaction when it's either non-solid, inconsistent, or it references a transaction that's too old.</dd></dl>

<a name="milestone"></a><dl><dt>milestone</dt><dd>Valid transaction that is created by either the Coordinator in a permissionless IOTA network or [Compass](root://compass/0.1/introduction/overview.md) in a permissioned IOTA network. [IRI nodes](#iota-terms) use milestones to determine if other transactions are in a confirmed state.</dd></dl>

<dl><dt>minimum weight magnitude (MWM)</dt><dd>Integer that sets the amount of work that will be carried out during [PoW](#general-terms). The solution to the computational puzzle is a number that contains the same number of trailing nines as the MWM. Each increment of MWM makes it three times harder to complete the PoW (on average).</dd></dl>

<dl><dt>pending</dt><dd>State of a transaction when it's been seen by the network, but not yet confirmed.</dd></dl>

<dl><dt>reattach</dt><dd>Request new tip transactions, do the proof of work again, and send the transaction to an IRI node</dd></dl>

<dl><dt>rebroadcast</dt><dd>Send a transaction to an IRI node again</dd></dl>

<dl><dt>solid</dt><dd>State of a transaction when an IRI node has its entire history (all directly and indirectly referenced transactions) in its ledger</dd></dl>

<dl><dt>tail transaction</dt><dd>Transaction 0 in a bundle. [IRI nodes](#iota-terms) recontruct and validate bundles by traversing the trunk transaction of each tail transaction.</dd></dl>

<dl><dt>tip selection</dt><dd>Process whereby an [IRI node](#iota-terms) selects two [tip transactions](#tip-transaction) and returns them to a client for use as a new transaction's [branch transaction](#branch) and [trunk transaction](#trunk)</dd></dl>

<a name="tip-transaction"></a><dl><dt>tip transaction</dt><dd>Transaction with no approvers</dd></dl>

<dl><dt>transaction</dt><dd>Instruction sent to an [IRI node](#iota-terms) to transfer value or data. Transactions must be structured in a way that conforms to the IOTA protocol.</dd></dl>

<a name="trunk"></a><dl><dt>trunk transaction</dt><dd>Transaction that is referenced by another transaction. Transactions in a bundle are connected to each other through the trunk transaction. This connection makes it faster for IRI nodes to validate transactions in a bundle.</dd></dl> 

<dl><dt>weighted random walk</dt><dd>Algorithm that an [IRI node](#iota-terms) uses during tip selection to find a path to a tip transaction in the ledger. To increase the probability of new transactions being selected and appended to the [ledger](#ledger), the algorithm favors a path through transactions that have a larger cumulative weight.</dd></dl>

## Trinary

<dl><dt>trinary</dt><dd>Base-3 numeral system</dd></dl>

<dl><dt>trit</dt><dd>Digits in a trinary number system. Trits are often represented by 1, 0, -1</dd></dl>

<dl><dt>tryte</dt><dd>A tryte is 3 trits which can represent 27 values. Thus, 27 characters are needed: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9'
</dd></dl>
