# Checksums

**A checksum is the name given to the [trytes](../introduction/ternary.md) that are appended to the end of an address or a seed. Checksums are often appended to addresses and seeds in user interfaces to help you to detect typos.**

## Checksum format

The length of a checksum depends on whether it's for an address or a seed. Address checksums are 9 trytes long, whereas seed checksums are 3 trytes long. The reason for this difference is that mistyping an address can lead to sending IOTA tokens to the wrong address, so the checksum must be more resistant to [collisions](https://en.wikipedia.org/wiki/Collision_(computer_science)).

||**Without checksum**|**With checksum**|
|:--|:---|:---|
|**Seed**|PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX|PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX**XTY**|
|**Address**|GWQQYWCUFLDR9LIWDITVHTPYYO9BAMOADFLNBIHYLIFDTORUCFCOGRQFK9IXEHVEMDVZH9RYOXAFIVUOA|GWQQYWCUFLDR9LIWDITVHTPYYO9BAMOADFLNBIHYLIFDTORUCFCOGRQFK9IXEHVEMDVZH9RYOXAFIVUOA**DAYDSMFZW**| 

:::info:
As a security precaution, some applications such as [Trinity](root://wallets/0.1/trinity/introduction/overview.md) allow you to enter only addresses that include a checksum.
:::

## How checksums are generated

First, the address or the seed is converted to trits and hashed, using the [Kerl](https://github.com/iotaledger/kerl) [hash function](https://en.wikipedia.org/wiki/Hash_function).

Then, the last 9 or 3 trytes of the resulting hash are appended to the end of the address or seed.

## Related guides

[Generate an address in JavaScript](root://core/1.0/tutorials/js/generate-an-address.md).
