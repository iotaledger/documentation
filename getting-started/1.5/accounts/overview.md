# Accounts

**IOTA accounts allow you to prove your ownership of IOTA tokens or messages. This section introduces you to accounts.**

Like a bank account, IOTA accounts are a way to prove your ownership of transactions in the Tangle.

Rather than using your name and a password to create an account, you create a seed. This seed is your account's master key.

![Seed](/Users/charlesthompson/documentation/getting-started/1.2/images/seed.png)

And rather than having a sort code or an account number, you have lots of addresses that belong to your seed. Each address can contain any amount of IOTA tokens.

![Addresses](/Users/charlesthompson/documentation/getting-started/1.2/images/addresses.png)

Unlike a bank, your seed is not stored by anyone in an IOTA network apart from you. You are the only owner of your seed. This makes IOTA decentralized and also makes your identity pseudonymous.

:::info: Why pseudonymous?
Due to the public nature of the Tangle, some public data in messages could be used to find out someone's identity.
:::

To prove to nodes that you do indeed own an address, you must use cryptography to create digital signatures that prove that you also own the seed.

![Signature](/Users/charlesthompson/documentation/getting-started/1.2/images/signature.png)

## Next steps

[Learn more about seeds](../accounts/seeds.md).