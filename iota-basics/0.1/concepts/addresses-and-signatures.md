# Addresses and signatures

**Each client in an IOTA network has a secret password called a seed, which is used to create addresses and to sign bundles. Addresses are the accounts from which transactions are sent and received, and signatures prove ownership of an address.**

A seed is a string of 81 [trytes](../references/tryte-alphabet.md) that gives a client access to addresses. To use an IOTA network, clients must [create a seed and keep it private](root://getting-started/0.1/tutorials/create-a-seed.md) 

Seeds are the master keys to the cryptographic hashing functions in the IOTA protocol that can create an almost unlimited number of unique private keys.

Each private key is unique to a seed, index, and security level, and can be used to create one corresponding address. A private key and an address can be thought of as a pair. The address half of the pair is public and clients can send IOTA tokens and messages to them using the [`address` field](../references/structure-of-a-transaction.md) of a transaction. The private key half is private and is used to sign bundles that withdraw IOTA tokens from the address. Signatures are contained in the [`signatureMessageFragment` field](../references/structure-of-a-transaction.md) of a transaction.

Each pair of private keys and addresses has its own index and [security level](../references/security-levels.md). The security level affects the length of the private key, where the higher the security level, the longer the private key, and the more secure a transaction's signature.

In IOTA, multiple pairs of private keys and addresses are needed because [each addresses can be withdrawn from only once](#address-reuse). Therefore each time you withdraw from an address, you must [create a new address](../how-to-guides/create-an-address.md) by either incrementing the index or changing the security level. The higher the security level of a private key and address pair, the more difficult it is for an attacker to brute force the signature of a reused address.

**Important:** A seed is the key to all your private keys and addresses, whereas a private key is the key to one address. You must keep your seeds and private keys secure.

### How private keys are created

Each private key is created from a cryptographic hashing function that takes a seed, an index, and a security level. 

The seed and index are combined and hashed to create an 81-tryte **subseed**:

    hash(seed + index)

To create a private key, the subseed is passed to a [cryptographic sponge function](https://en.wikipedia.org/wiki/Sponge_function), which absorbs it and squeezes it 27 times per security level.

The result of the sponge function is a private key that consists of 2,187, 4,374, or 6,561 trytes, depending on the [security level](../references/security-levels.md).

### How addresses are created

To create an address, the private key is split into **81-tryte segments**. Then, each segment is hashed 26 times. A group of 27 hashed segments is called a **key fragment**.

Because a private key consists of 2,187, 4,374, or 6,561 trytes, a private key has one key fragments for each security level. For example, a private key with security level 1 consists of 2187 trytes, which is 27 segments, which results in one key fragment.

Each key fragment is hashed once to create one **key digest** for each security level. For example, one key fragment results in one key digest.

Then, the key digests are combined and hashed once to create an 81-tryte address.

![Address generation](../address-generation.png)

### How signatures are created

A signature is created from both the private key of an address and the bundle hash of the transaction that withdraws from the address. 

By using the bundle hash to create a signature, it's impossible for attackers to intercept a bundle and change any transaction without changing the bundle hash and invalidating the signature.

Signatures are created using the Winternitz one-time signature scheme. This signature scheme is quantum resistant, meaning that signatures are resistant to attacks from quantum computers.

To create a signature, the bundle hash of a transaction is normalized to make sure that only half of the private key is revealed in the signature.

<a name="address-reuse"></a>**Note on address reuse:** This step is necessary because of the Winternitz one-time signature scheme. If the bundle hash weren't normalized, the scheme would reveal an unknown amount of the private key. By revealing half of the private key, an address can safely be withdrawn from once. If an address is withdrawn from more than once, more of the private key is revealed, so a sophisticated attacker could brute force its signature and steal the IOTA tokens.

Depending on the number of key fragments that a private key has, 27, 54, or 81 trytes of the normalized bundle hash are selected. These trytes correspond to the number of segments in a key fragment.

The selected trytes of the normalized bundle hash are [converted to their decimal values](../references/tryte-alphabet.md). Then, the following calculation is performed on each of them:

    13 - decimal value

The result of this calculation is the number of times that each of the 27 segments in the key fragment must be hashed to create the signature fragment. Each signature fragment is 2187 trytes.

Because a transaction's [`signatureMessageFragment` field](../references/structure-of-a-transaction.md) can contain only 2187 trytes, any input address with a security level higher than 1 must fragment the rest of the signature over zero-value output transactions.

### How IRI nodes verify signatures

IRI nodes verify a signature in a transaction by using the signature and the bundle hash to find the address of the input transaction.

To verify a signature, the bundle hash of a transaction is normalized.

Depending on the length of the signature, 27, 54, or 81 trytes of the normalized bundle hash are selected. These trytes correspond to the number of 81-tryte segments in a signature fragment.

The selected trytes of the normalized bundle hash are [converted to decimal values](../references/tryte-alphabet.md). Then, the following calculation is performed on each of them:

    13 + decimal value

The result of this calculation is the number of times that each of the 27 segments in the signature fragments must be hashed to create the key fragments.

Each key fragment is hashed once to create the **key digests**, which are combined and hashed once to create an 81-tryte address.

If the address matches the one in the transaction, the signature is valid and the withdrawal is accepted.
