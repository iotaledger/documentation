# Seeds

**A seed is a unique master key that gives you the ability to prove your ownership of either messages and/or any IOTA tokens that are held on your addresses.**

![Seed](/Users/charlesthompson/documentation/getting-started/1.2/images/seed.png)

## Seed format

A seed is a string of 81 [trytes](../the-tangle/ternary.md) (or 90 trytes with a [checksum](../accounts/checksums.md)).

```
PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX
```

## Mnemonic seeds

To make seeds easier to manage and more secure, IOTA uses mnonemic sentences derived from the seed.

The used seed is a 384-bit or 243-trit random string and there are several ways to represent this in a human-readable form, but a mnemonic sentence is superior to raw binary or ternary strings

### How mnemonic seeds work

IOTA uses a combination of Ed25519, BIP-39, and SLIP-10 methodologies as the standardized way of producing derivation:

- [Ed25519]([iotaledger/protocol-rfcs#0009](https://github.com/iotaledger/protocol-rfcs/pull/9)) – a signature algorithm key generation where a given random sequence of bytes (or seed) the length of 32 bytes is a valid private key
- [SLIP -10](https://github.com/satoshilabs/slips/blob/master/slip-0010.md) – describes how to derive private keys on a coin/account/index basis from a single master seed 
- [BIP - 39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) – describes how a seed can be represented as human readable mnemonic words 

For further reference on how mneominic seeds work, see [RFC - 0010]([iotaledger/protocol-rfcs#0010](https://github.com/iotaledger/protocol-rfcs/pull/10))

## Maximum number of seeds

The total number of possible seeds is almost unlimited (8.7 x 10<sup>115</sup>). As a result, the chances of two seeds being the same is very unlikely.

## Next steps

Learn about the [addresses](../accounts/addresses.md) that belong to seeds.

To simplify the process of securing your seed, sending transactions, and managing your account, you can use a [wallet](../accounts/wallets.md).



