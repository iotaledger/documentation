# Peer-to-peer energy grid

**Although the supply of energy is often automated, the payment system is expensive to integrate and often requires manual intervention. By creating a peer-to-peer (P2P) energy grid with IOTA, you can automate the transfer of power and the automatic payment for that power. This automation makes your infrastructure more dynamic and easier to update.**

## Business case

Peer-to-peer energy (P2P) trading is the buying and selling of energy between two or more grid-connected parties. For example, anyone with excess solar energy can transfer and sell that energy to others, giving consumers more freedom over where they source their energy.

At the moment, excess solar energy is sent back to the grid for a small fixed price. This way of dealing with excess energy gives the energy companies control over how much that energy is worth.

The table below summarizes the different stakeholders and roles considered in this example business case. The table also shows how complex it is to keep track of all the relations involved in the handling of returnable assets.

**Entity** | **Role**|
|:---|:---|
|**Source**|Generate electricity such as solar or wind for a producer|
|**Producer**| Manage several sources and receive payment from the grid|
|**Consumer** |Use the power provided by the grid in return for payment|
|**Grid**| Coordinate the distribution of power from the producers to the consumers, and distribute payments|

![P2P Energy PoC - Use Case Picture](../images/p2p_use_case.png)

## Challenges

To be able to sell energy to others without going through the grid, energy producers need a common network that allows payments.

## Solution

By using IOTA technologies, entities can communicate with the grid in a traceable and immutable way.

## Demo

Neither a demonstration of this application nor deployment instructions are  available at the moment.

## Additional resources

---------------
#### Core JavaScript client library ####
[Link](root://core/1.0/getting-started/get-started-js.md)

Learn how to use the JavaScript client library to create, send, and receive transactions.
---
#### MAM eloquently explained ####
[Link](https://blog.iota.org/introducing-masked-authenticated-messaging-e55c1822d50e)

Masked Authenticated Messaging is a second layer data communication protocol that adds functionality to publish and control access to an encrypted data stream, over the Tangle. Learn more about how MAM works.
---
#### MAM GitHub repository ####
[Link](https://github.com/iotaledger/mam.client.js)

Read the code and some quickstart instructions to test MAM with JavaScript.
---------------


