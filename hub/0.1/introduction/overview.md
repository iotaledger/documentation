# Hub overview

**Hub is a multi-user-wallet that offers you an easy way to manage deposits and withdrawals of IOTA tokens.**

It can be time consuming to create an application that manages IOTA tokens for multiple users. To make the process quicker and easier, we created Hub as a standalone module that can be integrated into existing software environments.

For security, Hub includes a number of options to protect IOTA tokens, including test coverage, a signing server, and secure gRPC connections.

Hub is beneficial for the following use cases:
* **Cryptocurrency exchange:** Use Hub to facilitate the deposit and withdrawal of IOTA tokens
* **Custodial service:** Use Hub to manage clients' IOTA tokens
* **Settlement layer in an existing application:** Use Hub to integrate IOTA payments in an existing application

## Limitations

Hub prevents the re-use of deposit addresses, **but** doesn't prevent users from sending IOTA tokens to deposit addresses after a sweep. Users **must** take responsibility for not using addresses that have been withdrawn from.

However, if a user fails to follow instructions correctly, you can [move funds from an address that's been withdrawn from](https://github.com/iotaledger/rpchub/blob/master/docs/hip/001-sign_bundle.md).

## Repository
Jump directly to the Hub source code on [Github](https://github.com/iotaledger/rpchub)
