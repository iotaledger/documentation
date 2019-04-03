# Cryptocurrency exchange implementations

**Hub can be integrated into an exchange in many ways, depending on how you manage your users' balances.**

In this guide, we discuss two possible scenarios:

- **Scenario A:** Multiple user accounts for generating deposit addresses, but funds are manually moved out of these upon deposit into a central hot or Hub account.
- **Scenario B:** Multiple user accounts with individual balances.

---

## Scenario A

It might not be desired to rely on Hub's internal accounting setup. One such reason might simply be that forwarding netted trades is too cumbersome.
Therefore, after a successful deposit, all funds might be transferred to a central hot wallet. This will also allow you to deal with cold storage of funds easily by withdrawing from this hot wallet to a cold wallet address and depositing back into the account as necessary. User withdrawals are then also processed from this hot wallet.

**Note:** Hub does not track individual user balances. All user balances have to be tracked on the exchange side.

### Initial setup

Exchange creates a hot wallet

#### User signup

Exchange creates new Hub user, passing in a userid.

### User deposit

1. User requests deposit address (`GetDepositAddress`)
2. User deposits funds
3. Exchange polls for new updates, using the `BalanceSubscription` gRPC
4. Upon successful deposit (& sweep), exchange calls the `ProcessTransfers` gRPC, transferring all new user deposits to the hot wallet

### User withdrawal

1. User requests withdrawal on the exchange's frontend
2. Exchange issues withdrawal from hot to user address (`UserWithdraw`)
3. Hub processes this withdrawal as part of a sweep

### Cold wallet topup

Exchange issues withdrawal from hot to cold wallet address that wasn't withdrawn from (`UserWithdraw`)

  **Note:** Hub doesn't check whether an address was already withdrawn from! This has to happen on the exchange side.*

### Hot wallet topup

1. Exchange requests deposit address for hot user (`GetDepositAddress`)

   **Note:** These addresses are single use! Never send deposits to such a deposit address twice!

2. Exchange sends funds from cold wallet to this deposit address
3. Hub receives deposit and moves to internal address as part of a sweep

### User B buys IOTA tokens from user A on the exchange

No action happens on Hub, all accounting is done internally on the Exchange side.

### Discussion of the pros and cons

- (+) Easy management of cold / hot funds
- (+) Likely to be easier to integrate on exchange side.
- (-) Reduced security guarantees because balances are not tracked on a per-user level inside Hub.
- (-) Exchange needs to keep track of total amount of IOTA tokens independently of Hub.
---

## Scenario B

As Hub supports independent user accounts with individual balances, it arguably makes sense to rely on this as an added security measure. Balances are tracked per user, and therefore a user can only use as many funds as the user is tracking for them. However, this approach currently complicates the cold/hot wallet flow. 

### Cold/hot wallets

As opposed to Scenario A, it is not so easy to move funds from multiple users to a cold wallet. However, it is possible to have Hub ignore certain internal addresses. For this, the `is_cold_storage` column on the `hub_address` table row needs to be set to 1. This will cause the `SweepService` to ignore this address for any sweeps.

For increased security, the `seed_uuid` of this hub address should also be deleted from the database and stored externally.

At the moment, the only way that this can be achieved is through manual database updates. It is recommended to stop Hub while marking such hub addresses as cold storage. There is no negative effect on operations if Hub is stopped.

Using the `salt` that's passed at startup and the `seed_uuid` it is always possible to recompute Hub address's seed outside of Hub.

Should sufficient interest exist for this integration scenario, it is possible to provide specialized endpoints for this.

### Initial setup

None. Start Hub.

### User sign up

Exchange creates new Hub user, passing in a per-user userid.

### User deposit

1. User requests deposit address (`GetDepositAddress`)
2. User deposits funds
3. Hub moves the new deposit to an internal address
3. Exchange polls for new updates via `BalanceSubscription` and notifies user on their frontend once the deposit has been registered or once it has been swept successfully

### User withdrawal

1. User requests withdrawal on exchange frontend.
2. Exchange issues withdrawal from user's Hub account to payout address (`UserWithdraw`)
3. Hub processes this withdrawal as part of a sweep.

### Cold wallet topup

1. Exchange stops Hub
2. Exchange decides which Hub addresses it wants to mark as cold storage
3. Exchange sets `is_cold_storage` to `1` on these `hub_address` rows and stores the `seed_uuid` externally.
   There are multiple scenarios for achieving this:
   - Use a vault service
   - Use paper backups
   - Some RDBMS support partitioning the table into multiple storage locations.
4. Exchange restarts Hub
   
### Hot wallet topup

1. Exchange decides which cold storage addresses it wants to reactivate
2. Exchange stops Hub
3. Exchange sets `is_cold_storage` to `0` on these `hub_address` rows and restores the `seed_uuid` values
4. Exchange restarts hub

### User B buys tokens from user A on the exchange

1. If not already exists, User B is created on Hub (`CreateUser`)
2. As part of next batch, exchange issues a transfer between the two users (`ProcessTransfers`)

### Discussion of the pros and cons

- (+) Balances are tracked on a per-user level and thus Hub can do a sanity check on the requests the exchange sends.
- (+) Exchange can easily do a sanity check that its backend is tracking the same `(user, balance)` values as Hub.
- (-) More complicated cold wallet setup