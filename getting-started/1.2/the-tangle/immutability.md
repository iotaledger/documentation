# Immutability in the Tangle

**This topic explains what makes transactions immutable when they are attached to the Tangle.**

One of the most fundamental properties of the Tangle is that it is immutable. After a message is attached to the Tangle, it cannot be changed.

This immutability is thanks to the unique properties of hashing algorithms.

## Understanding hashing algorithms

A hashing algorithm is a mathematical function that converts an input value of any length into another compressed value of a fixed length. Values returned by a hashing algorithm are called message digests or simply hashes.

In IOTA, the hashing algorithm methods that are used are called the BLAKE2b-256 hash and the Curl-P-81.

- BLAKE2b-256 is used to create a short, fixed length digest of the message
- Curl-P-81, with the Blake digest and the nonce, is hashed

Since the digest only needs to be computed once whilte iterating over different nonce values, this preserves Curl as the PoW-relevant hash.

It is much faster as BLAKE2b-256 has a performance of about 1 GB/s and Curl then only needs to be executed for one single 243-trit block of input. However, the hashing algorithm still needs a permanode.

:::info:
Previously, IOTA used [Curl](../references/glossary.md#Curl), which took [ternary](../the-tangle/ternary.md) input values called trits and always output a 243-trit hash. For reference, see Version 1.1 of this content.
:::

## Next steps

Find out what [type of data you should store in the Tangle](../the-tangle/storing-data.md).
