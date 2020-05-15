# Proof of work

**A proof of work (PoW) is a piece of data that is calculated using trial and error to meet certain requirements. As a spam prevention measure such as [hashcash](https://en.wikipedia.org/wiki/Hashcash), each [transaction](../transactions/transactions.md) must include a proof of work to be valid. This proof of work is difficult to do, but easy for [nodes](../network/nodes.md) to validate.**

## How proof of work is calculated

To calculate the PoW for a [transaction](../transactions/transactions.md), the values of all the transaction fields are converted to [trits](../introduction/ternary.md) and hashed, using the [Curl](https://github.com/iotaledger?utf8=%E2%9C%93&q=curl&type=&language=) [hash function](https://en.wikipedia.org/wiki/Hash_function).

This process continues until the transaction hash ends in the same number of 0 trits as the ([minimum weight magnitude](root://getting-started/0.1/transactions/proof-of-work.md#minimum-weight-magnitude)).

Whenever the transaction hash doesn't end in the correct number of 0 trits, the value of the transaction's `nonce` field is incremented and the transaction hash is hashed again.

## Options for doing proof of work

You have the following options for doing PoW.

|**Option**|**Advantages**|**Disadvantages**|
|:-------|:---------|:------------|
|Choose remote PoW on a node|Remote PoW is when you ask a node to do PoW for a transaction. You do this by calling the [`attachToTangle` endpoint](root://node-software/0.1/iri/references/api-reference.md#attachToTangle). This way, you can avoid using the computational power needed to do PoW.|Depending on how powerful the node is and how many requests it receives, it may time out and not complete the PoW |
|Do local PoW|Local PoW is when you do PoW for each transaction that you want to attach to the Tangle. This way, you aren't reliant on unreliable nodes to do PoW.|Your device may not be powerful enough to complete PoW in a satisfactory amount of time|
|Outsource PoW to a paid service|A paid PoW service is a third-party server that accepts IOTA transactions, completes PoW and returns it to you. PoW is done faster more more reliably by a dedicated third-party server. An example of such a service is [powsrv.io](https://powsrv.io/#quickstart)|It costs money to use the service and you don't have control over it|
|[Install a PoW proxy server](root://proof-of-work-proxy/1.0/overview.md)|PoW is done faster and more reliably by your own dedicated server|You need to maintain the PoW proxy server|
