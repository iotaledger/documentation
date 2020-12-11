# Signatures

**Signatures are digital proof of ownership. This topic introduces you to signatures and how they work.**

![Signature](../images/signature.png)

To prove ownership of an [address](../accounts/addresses.md), you sign a unspent transaction output with the corresponding private key of the address so that others can verify that you own it.

Depending on how the address is generated, a signature may be too large to fit in a single message. As a result, signatures are sometimes fragments across the `signatureMessageFragment` fields of one or more transactions in a bundle. See [How signatures are created and verified](../cryptography/signatures.md).

The way in which a signature is generated differs depending on the signature scheme that's used.

## Signature scheme

Previously, IOTA used the Winternitz [one-time signature scheme](https://en.wikipedia.org/wiki/Hash-based_cryptography#One-time_signature_schemes) (W-OTS) to generate [digital signatures](https://en.wikipedia.org/wiki/Digital_signature). Currently, we use the Ed25519 scheme in coordination with the UTXO model.

## Next steps

Learn how to make it easy to manage your IOTA account with [wallets](../accounts/wallets.md).