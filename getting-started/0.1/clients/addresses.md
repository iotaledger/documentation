# Addresses

**An address is like an account that belongs to a [seed](../clients/seeds.md) and that has a 0 or greater balance of [IOTA tokens](../clients/token.md). Addresses are the public half of a [public/private key pair](https://en.wikipedia.org/wiki/Public-key_cryptography). To transfer IOTA tokens from one address to another, you sign a transaction with the private key to prove to [nodes](../network/nodes.md) that you own it. As such you can share addresses with anyone because only the seed owner knows the private key.**

## Address format

An address is a unique string of 81 [trytes](../introduction/ternary.md) (or 90 trytes with a [checksum](../clients/checksums.md)).

```
OGMMQJUDMNNYSOAXMJWAMNAJPHWMGVAY9UWBXRGTXXVEDIEWSNYRNDQY99NDJQB9QQBPCRRNFAIUPGPLZ
```

## Maximum number of addresses

A seed can have an almost unlimited number of addresses (9<sup>57</sup>), which each have a unique index and a [security level](../clients/security-levels.md):

* **Index:** Number between 0 and 9,007,199,254,740,991
* **Security level:** Number between 1 and 3

The same seed, index, and security level, will always result in the same address.

Likewise, the same seed with a different index and/or a different security level will result in a different address.

For example, when you generate addresses for index 0 and index 1 of all security levels, they are all unique:

|**Index**|**Security level**|**Address**|
|:-----|:-----|:-----|
|0|1|OGMMQJUDMNNYSOAXMJWAMNAJPHWMGVAY9UWBXRGTXXVEDIEWSNYRNDQY99NDJQB9QQBPCRRNFAIUPGPLZ|
|0|2 |BYNZSDZTNJOUMWLILVKUIWAFTCWTNYCDEI9ZNSRSAMLKURUWYANEGLVHUKWMZQCAMBTDSXKEFVOUYLDSW|
|0|3|CACHUSACNWAFFIGUAXVBUMZNSAGFPCFXVMYOBQ9IMD9ELZMOYOJAHWPFMOTRJMPISXIF9JEKNDZMQMZEY|
|1|1|CAZURLTWLREHEPODAQGFEKCVFJMUB9BFGBVWBGRSCWSKYD9UJIARRTPZJH9VUGQIQNJRBKIOATOJCSYJY|
|1|2|XIUPEDJXBADNCMWAZEGY9HPEASAMLFMIAAXIMLHVRDSADOORPPBFAQDCXGGZQQZLKCERW9J9CKVLASMTZ|
|1|3|FLXGZSXUJJLQFYYPTKYJRLWOCQSEXTTKVQMGOFPPYYZCLTAIEPKFXDNHHFGNJOASALAD9MJHNCCX9OUVZ|

## Spent addresses

Because the IOTA protocol uses [one-time signatures](../clients/signatures.md), after IOTA tokens have been withdrawn from an address, it is spent and must never be used again.

If more IOTA tokens are later deposited into a spent address, they are at risk of being stolen in a [brute-force attack](https://en.wikipedia.org/wiki/Brute-force_attack) on the private key.

## How addresses are generated

All addresses are generated using the [Kerl](https://github.com/iotaledger/kerl) [hash function](https://en.wikipedia.org/wiki/Hash_function), which starts by generating a private key from a seed, an index, and a security level.

First, the seed and index are converted to trits, then they're combined and hashed to generate a 243-trit subseed:

```
Kerl(seed + index)
```

The subseed is then absorbed and squeezed in a [sponge function](https://keccak.team/sponge_duplex.html) 27 times for each security level.

The result of the sponge function is a private key whose length varies, depending on the security level.

To generate an address, the private key is split into 81-tryte segments. Then, each segment is hashed 26 times. 

:::info:
A group of 27 hashed segments is called a key fragment, and a private key has one key fragment for each security level. For example, a private key with security level 1 consists of 2,187 trytes, which is 27 x 81-tryte segments or one key fragment.
:::

Each key fragment is hashed once to generate one key digest for each security level. Then, the key digests are combined and hashed once to generate an 81-tryte address.

![Address creation](../images/address-generation.png)

## Utilities

You can use the following IOTA Tangle Utilities with addresses:

* [Convert an address into a QR code](https://utils.iota.org/qr-create)

* [Read an address from a QR code](https://utils.iota.org/qr-scan)

* [Search for transactions that include an address](https://utils.iota.org/)

## Related guides

[Generate an address in JavaScript](root://core/1.0/tutorials/js/generate-an-address.md).

[Generate an address in Trinity](root://wallets/0.1/trinity/how-to-guides/receive-a-transaction.md).

[Derive addresses from private keys in JavaScript](root://core/1.0/tutorials/js/derive-addresses-from-private-keys.md)


