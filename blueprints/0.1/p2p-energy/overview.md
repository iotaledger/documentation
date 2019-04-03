# Peer-to-peer energy grid

**Although the supply of energy is often automated, the payment system still requires a high cost to integrate and manual intervention along the way. By creating a peer-to-peer energy grid with IOTA, we can automate the transfer of power and the payment for that power, allowing for more dynamic changes to infrastructure such as distribution and costing.**

The presented PoC demonstrates how the entities of a peer-to-peer (P2P) energy grid can trade energy, by both supplying power and receiving payment for it. The distributed and machine-based nature of the P2P energy grid make this an ideal use case for IOTA. Using IOTA technologies we can develop a solution that creates an infrastructure where even low-powered devices can communicate with the grid in a traceable and immutable fashion.

IOTA is an ideal candidate to implement this PoC because it's feeless, scalable, and designed to work with the M2M economy.

Trading energy on a P2P Energy Grid involves four high-level entities:

**Entity** | **Role**
---|---
Source|Generating electricity such as solar or wind for a producer|
Producer| Managing several sources and receiving payment from the grid
Consumer |Using the power provided by the grid in return for payment|
Grid| Coordinating the distribution of power from the producers to the consumers, and distributing payments|
 

![P2P Energy PoC - Use Case Picture](./p2p_use_case.png)

:::info:
Similar benefits in this PoC can be replicated in any scenario where a resource is distributed to consumers in return for payment, for example for water supply.
:::

## Glossary

* IRI - The IOTA reference implementation is the reference implementation of the IOTA node software
* MAM - Masked Authentication Messaging is a second layer data communication protocol which adds functionality to emit and access an encrypted data stream, like RSS, over the Tangle https://blog.iota.org/introducing-masked-authenticated-messaging-e55c1822d50e
* source - an entity in the PoC that supplied energy
* producer - an entity in the PoC that aggregates information from Sources and supplied that information to the Grid
* consumer - an entity that uses power from the Grid and is charged for its use
* grid - the grid processes information from Producers and Consumers to create payment channels

## Additional resources

* [IRI repository](https://github.com/iotaledger/iri) 
* [MAM repository](https://github.com/iotaledger/mam.client.js)
* [iota.js repository](https://github.com/iotaledger/iota.js)


