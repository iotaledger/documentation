# Proof of work

**Proof of work is the answer to a mathematical problem that's difficult to calculate, but easy to verify. In IOTA, proof of work protects the network from spam transactions. Each transaction in a bundle must include a proof of work to be valid.**

Proof of work (PoW) is calculated using trial and error, therefore it requires the use of computational power.

Originally, PoW was introduced as a concept to reduce large amounts of email spam. This concept is known as [hashcash](https://en.wikipedia.org/wiki/Hashcash), and is a method of preventing email spam by requiring a proof of work for the contents of every email.

## Proof of work in IOTA

Similar to hashcash, each transaction must include a PoW before it can be validated. This PoW provides spam protection for an IOTA network by increasing the time and computational power it takes to create a valid transaction. Furthermore, to reduce the effect that spam transactions have on the network, IRI nodes ignore transactions that don't contain a valid PoW.

PoW can be done by clients or it can be outsourced to an IRI node (known as remote proof of work) by calling the [`attachToTangle` endpoint](root://iri/0.1/references/api-reference.md#attachToTangle).

Clients may want to use remote PoW if the device they're using to create transactions doesn't have the necessary computational power to calculate PoW in a reasonable amount of time.

## How proof of work is calculated

To calculate the PoW for a transaction, the following contents of the transaction are converted from trytes to trits, then those trits are hashed to form a transaction hash:

* **Bundle hash:** Hash that's calculated using the `address`, `obsoleteTag`, `timestamp`, `value`, `currentIndex`, and `lastindex` fields of all transactions in a bundle
* **Signature:** Signature of the transaction (if it withdraws IOTA tokens)
* **Trunk transaction and branch transaction:** Two transactions that the transaction references and approves

If the hash ends in the correct amount of 9s ([minimum weight magnitude](#minimum-weight-magnitude)), it's considered valid.

**Note:** A 0 is represented as a 9 in trytes.

If the hash doesn't end in the correct amount of 9s, the value of the transaction's `nonce` field is incremented and the hash is hashed again.

This process continues until a hash is found that ends in the correct amount of 9s.

The `nonce` field of a transaction contains a string of 27 trytes that IRI nodes use to validate the PoW, for example:

```javascript
{
...
nonce: "POWSRVIO9GW99999FMGEGVMMMMM"
...
}

```

Because the hash is created using the contents of the transaction, if any of the contents change, the hash will change and make the proof of work invalid.

**Note:** The function that calculates PoW is called the [PearlDiver](https://github.com/iotaledger/iri/blob/fcf2d105851ee891b093e2857592fa05258ec5be/src/main/java/com/iota/iri/crypto/PearlDiver.java).

### Minimum weight magnitude

The minimum weight magnitude (MWM) is a variable that defines the number of 9s that a transaction hash must end in.

Although the MWM is set in the node software (IRI) of each IRI node in an IOTA network, clients and IRI nodes can choose to change the MWM. However, if each IRI node used a different MWM, transactions would be valid only for those with the same MWM. This situation would decrease the rate of transaction confirmations.

**Note:** Every increment of the MWM increases the difficulty of the PoW by 3 times.
