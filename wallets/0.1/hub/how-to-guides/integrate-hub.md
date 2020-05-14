# Integration options

**You can integrate Hub into an exchange in many ways, depending on how you want to manage your users' balances.**

In this workflow topic, we discuss two integration options:

- **Option 1: Manage user balances in Hub (default):** Easiest way to manage trades and user balances
- **Option 2. Manage user balances outside of Hub:** Easiest way to store all users' IOTA tokens outside of Hub

## Integration option 1. Manage user balances in Hub

By default, Hub keeps a record of all users' balances in a database, and allows users to trade with each other through their Hub accounts. This way, users can trade and withdraw only as many tokens as they own.

|**User action**|**Exchange action**|**Hub API call**|
|:----------|:--------------|:-----------|
|Signs up for an IOTA account on the exchange|Creates a new user in Hub| `CreateUser`|
|Requests a deposit address in which to deposit IOTA tokens|Creates a new deposit address for the user|`getDepositAddress`|
|Deposits IOTA tokens into the address|Notifies the user on the exchange frontend after the deposit has been included in a [sweep](../concepts/sweeps.md)| `balanceSubscription`|
|Requests a withdrawal to an address outside of Hub|Actions the withdrawal|`userWithdraw`|
|Buys tokens from another user|Actions the trade between the two users by updating their balances in the Hub database|`processTransfers`|

### Store IOTA tokens outside of Hub

To make sure that the Hub owner's addresses always have enough IOTA tokens to process all user withdrawals, the `userWithdraw` API call allows you to withdraw only from a user's address and not the Hub owner's addresses.

To transfer IOTA tokens outside of Hub, you need to mark the Hub owner's address as cold storage so that Hub cannot use it in a sweep.

:::warning:Warning
When you transfer tokens outside of Hub, you're at risk of not being able to process withdrawal requests.
:::

1. Stop Hub

2. Set the [`is_cold_storage`](../references/database-tables.md#hub_address) field to 1 for any Hub addresses in the `hub_address` table row that you want to use as cold storage.

3. Save the seed UUIDs of your chosen Hub addresses, then delete them from Hub

4. Use the seed UUID (and the salt if you set one) to recreate the seed for your chosen Hub addresses outside of Hub

5. Use the seed to transfer the IOTA tokens from the Hub addresses to the new address outside of Hub

6. Restart Hub

:::info:
If enough interest exists for storing tokens outside of Hub, we can create a specialized API call that makes this task easier. Please reach out to us on [Discord](https://discord.iota.org).
:::

### Send IOTA tokens back to Hub

If you store IOTA tokens outside of Hub, you may need to transfer them back into Hub to be able to process a user's withdrawal.

1. Stop Hub

2. Set the `is_cold_storage` field to 0 for any Hub addresses in the `hub_address` table row to which you want to send IOTA tokens

3. Save the seed UUIDs for the Hub addresses in the Hub database

4. Restart Hub

## Integration option 2. Manage user balances outside of Hub

By managing user balances outside of Hub, it's easier to store tokens outside of Hub. But, by doing so, you need to keep track of users' balances in your own system.

### Prerequisites

1. Create a cold wallet address outside of Hub
2. Create a new user to use as a hot wallet

|**User action**|**Exchange action**|**Hub API call**|
|:----------|:--------------|:-----------|
|Signs up for an IOTA account on the exchange|Creates a new user in Hub| `CreateUser`|
|Requests a deposit address in which to deposit IOTA tokens|Creates a new deposit address for the user|`GetDepositAddress`|
|Deposits IOTA tokens into the address|Notifies the user on the exchange frontend after the deposit has been swept to one of the Hub owner's new addresses. Then, updates the user's balance on the exchange backend.|`BalanceSubscription`|
| |Updates the Hub database so that the hot wallet owns all the IOTA tokens|`ProcessTransfers`|
|Requests a withdrawal to an address outside of Hub|Actions the withdrawal from the hot wallet to the user's chosen address|`UserWithdraw`|
|Buys tokens from another user|When users buy and sell cryptocurrencies on the exchange, nothing is recorded in Hub because as far as Hub is aware, the hot wallet owns all the tokens. As a result, the exchange must handle all the accounting outside of Hub.|None|

### Store IOTA tokens outside of Hub

To store IOTA tokens outside of Hub, you need to transfer them from the hot wallet addresses to a cold wallet address.

:::warning:Warning
When you transfer tokens outside of Hub addresses, you're at risk of not being able to process withdrawal requests.
:::

1. Action a withdrawal from the hot wallet to a new address, using the `userWithdraw` API call

  :::warning:Warning
  In this scenario, Hub cannot check whether the new address was already withdrawn from.
  :::

### Send IOTA tokens back to Hub

If you store IOTA tokens outside of Hub, you may need to transfer them back into Hub to be able to process a user's withdrawal.

1. Create a new deposit address for the hot wallet, using the `getDepositAddress` API call

2. Send tokens from the external address to this deposit address

Hub receives the deposit and transfers them to a Hub owner's address as part of a [sweep](../concepts/sweeps.md). The tokens in the Hub owner's addresses can be used to fulfill withdrawal requests if the total balance of deposits is not enough.