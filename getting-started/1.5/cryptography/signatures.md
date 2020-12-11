# How signatures are created and verified

**This topic describes how signatures in transactions are created and verified.**

## How bundle hashes are signed with a private key

To make sure that it's always safe to sign a bundle hash once, first it is normalized so that only half of the private key is revealed in the signature.

Depending on the number of key fragments that a private key has, 27, 54, or 81 trytes of the normalized bundle hash are selected. For more information about key fragments, see [How addresses are generated](../cryptography/addresses.md).

The selected trytes of the normalized bundle hash are converted to their decimal values. Then, the following calculation is performed on each of them:

```
13 - decimal value
```

The result of this calculation is the number of times that each of the 27 segments in the private key are hashed, using the [Kerl](https://github.com/iotaledger/kerl) hash function.

Each hash of 27 segments is a signature fragment, which contains 2,187 trytes.

Because a transaction's `signatureMessageFragment` field can contain only 2,187 trytes, any address with a security level greater than 1 results in a signature that's too large to fit in one transaction. As a result, the rest of the signature is fragmented across zero-value transactions in the same bundle.

## How a signature is verified

Nodes verify signatures in transactions by using the signature and the bundle hash to find the address of the transaction.

To verify a signature, nodes normalize the bundle hash. Then, depending on the length of the signature, they select 27, 54, or 81 trytes of the normalized bundle hash. These trytes correspond to the number of segments in a signature fragment. The selected trytes of the normalized bundle hash are converted to their decimal values. Then, the following calculation is performed on each of them:

```
13 + decimal value
```

The result of this calculation is the number of times that each of the 27 segments in the signature fragments must be hashed to derive the key fragments.

Each key fragment is hashed once to derive the key digests, which are combined and hashed once to derive an 81-tryte address.

If the address matches the one in the transaction, the signature is valid and the transaction is considered valid.


