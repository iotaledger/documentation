# About Hub

**Hub has many functions, such as seed generation, that facilitate the integration of IOTA into existing applications.**

Each of these functions is exposed through [gRPC](../references/api-reference.md).

## Seed generation

Hub can securely generate and store a seed for each user. Seeds must be securely generated and stored because they're used to generate the private keys that are used to sign transactions.
 
## Deposit address generation

Deposit addresses are generated using a user's seed. Hub keeps track of the address indices, which are essential because addresses are deterministic: A seed is used to generate the same addresses, depending on the index.
 
## Deposit address management

IOTA uses the Winternitz one-time signature scheme to create signatures. As a result, addresses can be withdrawn from only once because each signature exposes some of the private key.

To prevent address reuse, Hub ensures that each user is assigned a unique address for every deposit. To do so, Hub tracks whether address indices were already withdrawn from and increments the index to generate a new deposit address.

## Transaction monitoring
 
Hub monitors transactions until they're confirmed.

IOTA works differently than a traditional ledger. Traditional ledgers are generally managed by a trusted third party, such as a bank or credit card company. IOTA is trustless: No third parties are necessary. IRI nodes reach a consensus on valid transactions and consider those transactions “confirmed”.

## Withdrawal management

 To prevent address reuse, Hub makes sure that no deposit transactions are pending before sending a withdrawal transaction. Hub also makes sure that all previous desposit transactions are confirmed before sending a withdrawal transaction. Hub monitors withdrawal transactions and notifies users when they've been confirmed.
 
## Address sweeps

Behind the scenes, Hub is performing sweeps because the exchange only secures funds in unspent addresses. Otherwise, it is the user’s responsibility to secure their funds.
 
Sweeps are crucial to securely crediting users after moving funds from their deposit addresses. Suppose, a user deposits to an already swept address, an adversary might try to forge a signature and move the funds out of this address; therefore, funds should be swept to your hot wallet periodically.
 
Crediting should only be performed after confirming sweep transactions to make sure funds are in your possession.  You should absolutely inform the user of the risk of total loss should he send to a deposit address provided by the exchange more than once.

### How sweeps work

To perform a sweep, first, Hub scans deposit addresses for balances filtering out any addresses with zero value. Next, Hub checks whether deposit addresses are in any unresolved sweeps. To speed up the process, Hub keeps track of the indexes of deposit addresses.
 
One seed many contain many deposit addresses that have already been processed. A sweep transfer will move balances from selected deposit addresses to unspent exchange-owned addresses.
 
Hub checks the inclusion states of the sweep transactions to determine which transactions have been confirmed and accepted by the Tangle network. Finally, Hub credits the user.
 
Hub checks whether deposit addresses were used in unresolved sweeps.  If any addresses have been previously swept, Hub does not sweep them again, unless the previous sweep transfers have been confirmed.
 
After each successful deposit, Hub sends the tokens to hot wallets.  After storing the tokens, Hub generates a new address available for the user to make a new deposit.  
 
Hub confirms sweep transactions were accepted by Tangle. To ensure secure deposit of funds to exchange addresses, check the inclusion states of the sweep transactions. Finally, Hub credits the user.