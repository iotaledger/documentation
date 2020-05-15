# Security levels

**When generating a new [address](../clients/addresses.md), you can specify a security level for it. The security level of an address affects how long the private key is, how secure a spent address is against brute-force attacks, and how many [transactions](../transactions/transactions.md) are needed to contain the signature.**

Addresses can have a security level of 1, 2, or 3, and each one generates a different address for each index.

The greater the security level, the longer the address's private key, which results in a longer and more secure signature of the same length.

| **Security Level** | **Private key and signature length in trytes** |
| :-------------- | :-------------------------- |
| 1              | 2,187 (not recommended)|
| 2              | 4,374 (used by Trinity)         |
| 3              | 6,561 (most secure)           |

The security level of an address corresponds to the same number of transactions that are needed to contain the signature.

For example, when an address has a security level of 3, its signature is 6,561 trytes long, but the [`signatureMessageFragment` field](../transactions/transactions.md#structure-of-a-transaction) of a single transaction can contain only 2,187 trytes. As a result, you would need fragment the other 4,374 trytes of the signature over 2 additional zero-value transactions in the [bundle](../transactions/bundles.md).

## Advice for choosing a security level

When choosing a security level, you should consider the following questions.

### What is the probability that the address will be spent and still receive IOTA tokens?

If you're building an application where your users aren't familiar with IOTA and you are concerned about them depositing into spent addresses, you may want to use security level 3 as a precaution.

### How fast do you need to be able to sign transactions?

If you're building an application that relies on fast transactions, you may want to use security level 2. This way, you can benefit from smaller bundles, less proof of work, and faster transaction signing.

### How powerful is the device that is doing proof of work and/or signing transactions?

Devices such as those on the Internet of Things are often power-constrained. If your application is running on one of these devices and the addresses contain only small amounts of IOTA tokens, you may want to use security level 2 to reduce the amount of energy needed to do proof of work and to sign transactions.

## Related guides

[Generate an address in JavaScript](root://core/1.0/tutorials/js/generate-an-address.md).