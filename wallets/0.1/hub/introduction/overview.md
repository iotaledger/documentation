# Hub

**Hub is a wallet management system for cryptocurrency exchanges. Through its application programming interfaces (APIs), Hub offers you an easy way to integrate IOTA into an exchange by managing [seeds](root://getting-started/0.1/clients/seeds.md), [addresses](root://getting-started/0.1/clients/addresses.md), [transactions](root://getting-started/0.1/transactions/transactions.md), and storage of [IOTA tokens](root://getting-started/0.1/clients/token.md).**

To interact with an IOTA network, Hub communicates with the API of a [node](root://getting-started/0.1/network/nodes.md). This connection gives Hub access to the [Tangle](root://getting-started/0.1/clients/token.md).

To allow you to interact with Hub, it has its own gRPC or RESTful API, which includes calls for creating new Hub users in the database, processing trades, and more.

The Hub database has two types of account:

- User accounts: Allows users to deposit IOTA tokens into Hub and to request withdrawals
- Hub owner account: Stores users' deposited IOTA tokens until they request a withdrawal

![IOTA Hub architecture](../images/iota_hub.png)

## Security

Hub comes with the following security features, making it a robust option for securing users' IOTA tokens.

### Transaction monitoring

To avoid delays in transaction confirmation, Hub keeps a database of pending transactions so that it can automatically [promote and reattach](root://getting-started/0.1/transactions/reattach-rebroadcast-promote.md) them.

### Seed management

Each deposit address is derived from a new seed, using the [Argon2](https://www.argon2.com/) hash function, which takes the following values:

- **Seed UUID:** A randomly generated, universally unique identifier
- **Salt:** A 20-character [salt](https://en.wikipedia.org/wiki/Salt_(cryptography))

The same salt is always used, whereas a new seed UUID is randomly generated for every new deposit address.

To mitigate the risk of an attacker gaining access to the Hub database and regenerating the seed, you can store the salt on a separate signing server, which is also responsible for signing bundles and returning the signature to Hub. This way, attackers must gain access to both Hub and the signing server to be able to find the seed UUID and the salt, which are needed to regenerate the seed.

For additional security, the communication between Hub and the signing server can also be encrypted using the SSL protocol. 

### Token protection

To help users not to withdraw from [spent addresses](root://getting-started/0.1/clients/addresses.md#spent-addresses), Hub has the following features:

- **Withdrawal management:** Before withdrawing tokens from a user's address, Hub makes sure that no deposits are pending for that same address, and that all previous deposits have been confirmed. To keep track of which addresses are spent, Hub stores them in the database. When an address is spent, Hub stops users from withdrawing from that same address again.
 
- **Deposit address management:** Hub derives a new address from a new seed for every deposit. To do so, Hub uses the withdrawal management to check whether an address is already spent. If an address is spent, Hub creates a new seed UUID to use to generate a new deposit address.

- **Sweeps:** When issuing a withdrawal, Hub creates a bundle, called a [sweep](../concepts/sweeps.md), which also moves funds from users' deposit addresses to one of the Hub owner's addresses.

## Limitations

Hub helps to stop users from withdrawing from spent addresses, but it doesn't stop users from depositing into them.

If a user deposits tokens into a spent address, you can use the `recoverFunds` API call to try and transfer them to a safe address before an attacker steals them.

## Blog posts

Read the following blog posts about Hub:

- [Introducing IOTA Hub](https://blog.iota.org/introducing-iota-hub-5349bb8a29cd)
- [Hub Update: Easily Integrate IOTA With Your Exchange, Custody Solution, Or Product](https://blog.iota.org/hub-update-easily-integrate-iota-with-your-exchange-custody-solution-or-product-747181b33d37)

## Repository

Go to the Hub source code on [Github](https://github.com/iotaledger/hub).

## Discord channels

[Join our Discord channel](https://discord.iota.org) where you can:

- Take part in discussions with IOTA developers and the community
- Ask for help
- Share your knowledge to help others

We have the following channels for Hub:

- **#hub-dev:** A read-only channel where developers discuss topics and where any GitHub updates are displayed

- **#hub-discussion:** An open channel where anyone is free to discuss Hub