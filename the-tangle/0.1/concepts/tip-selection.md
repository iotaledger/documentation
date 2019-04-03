# Tip selection

**Each transaction in the Tangle must reference two previous transactions. Tip selection is the process whereby an IRI node selects two random tip transactions from a subgraph of its ledger.**

In general, the tip selection algorithm selects tip transactions that have no parents.

Although the tip selection algorithm is embedded in the [IOTA node software](root://iri/0.1/introduction/overview.md) (IRI), it isn't enforced by the network. Instead, IRI nodes are given an [incentive to use the tip selection algorithm](../concepts/incentives-in-the-tangle.md).

## The tip selection process

The IRI selects a subgraph (also known as a subtangle) of the ledger and does two weighted random walks through it. Each weighted random walk returns a tip transaction hash.

### Subgraph selection

A subgraph is a section of the ledger that contains all transactions between a milestone transaction and tip transactions.

The tip selection is done on a subgraph of the ledger to save computational power. The more transactions that the IRI node includes in the weighted random walk, the longer the tip selection process takes.

For the tip selection process, the milestone transaction for the subgraph is defined by the client, and is calculated by doing the following:

`latestMilestoneIndex` - `depth`

The result of this calculation is equal to the index of the milestone transaction that is used to form the subgraph.

**Note:** The higher the value of the `depth` parameter, the more computations the IRI node must do. To restrict the value of the `depth` parameter, IRI nodes can change the [`MAX-DEPTH`](root://iri/0.1/references/iri-configuration-options.md#max-depth) configuration option.

### Weighted random walk

A weighted random walk is an algorithm that the IRI uses to find a path to a tip transaction in a subgraph.

To increase the probability of selecting a path to new transactions, the algorithm favors a path through transactions that have a higher rating. This rating is called a cumulative weight.

The cumulative weight of a transaction is calculated using the following variables:
* **Future set:** Transactions that approves the transaction
* **[`ALPHA` configuration parameter](root://iri/0.1/references/iri-configuration-options.md#alpha):** A number that affects the randomness of the tip selection process

The IRI gives a high rating to a transaction with a large future set because it has a higher probability of being confirmed than one with a small future set. However, if the IRI were to rate transactions based only on this variable, the ledger would become a long, narrow chain of transactions, which are referenced by many other transactions. This would slow the rate of new transactions being appended to the ledger because new transactions would have to wait until they had a large enough future set before other transactions would reference them. So, to increase the speed at which new transactions are appended to the ledger, the IRI also uses the `ALPHA` configuration parameter to calculate the cumulative weight.

The `ALPHA` configuration parameter makes sure that the cumulative weight of each transaction is calculated with an element of randomness. This parameter allows the IRI to select some transactions that have a small future set and by doing so, increase the speed at which new transactions are appended to the ledger.  

For more information about the weighted random walk, and for an in-depth explanation about the theories surrounding the best value for the `ALPHA` configuration parameter, read our [blog post](https://blog.iota.org/confirmation-rates-in-the-tangle-186ef02878bb).

## In-depth explanation of the tip selection algorithm

The following information describes what the IRI node does when a client calls the [getTransactionsToApprove](root://iri/0.1/references/api-reference.md#getTransactionsToApprove) endpoint.

Clients call this endpoint when they want to send a transaction. The endpoint results in two tip transaction hashes, which are used in the `trunkTransaction` and `branchTransaction` fields of the new transaction.

**Tip** Find out more about the [structure of a transaction](root://iota-basics/0.1/references/structure-of-a-transaction.md).

When this endpoint is called, the IRI node starts the tip selection algorithm, which is separated into the following stages:

1. Preparation
2. Rating calculation
3. Weighted random walk

---

### Preparation

The algorithm's goal is to return two non-conflicting tip transactions as a successful result of the API call.

The algorithm selects a subgraph of the ledger and does two weighted random walks through it. Each weighted random walk returns a tip transaction hash.

Both [weighted random walks](#weighted-random-walk) start from the same milestone transaction (`latestSolidMilestone - depth`).

If the client specifies a `reference` argument to the API call, the `branchTransaction` walk will start from the transaction in the `reference` argument only if that transaction is in the subgraph.

If the transaction in the `reference` argument is older than the `depth` milestone index, the API call fails with the following error message: Reference transaction is too old.

## Rating calculation

The algorithm computes the rating of every transaction in the subgraph. These ratings will be subsequently transformed into weights during the weighted random walk to bias the walker's path.

The rating calculation is performed only once, and used to select both tip transactions.

#### Interface

To allow you to create different rating algorithms, we created a generic interface to which every rating calculator should adhere.

```java
Map<TxId -> Integer> calculate(TxId entryPoint)
```

Every rating calculator, being invoked with an `entryPoint` transaction, should return a mapping of transaction IDs with their corresponding rating value expressed as integers.

#### Future set creation

For every transaction included in our sorted subgraph, a future set is created, containing direct and indirect approvers. The rating of each transaction is the size of its future set + 1 (the transaction's own weight).

```java
entryPoint = latestSolidMilestone - depth

entryPointTrunk = entryPoint

entryPointBranch = reference or entryPoint 

ratings = CumulativeWeightCalculator.calculate(entryPointTrunk)

class CumulativeWeightCalculator(RatingCalculator):

    def calculate(startTx):

        rating = dict()

        subgraph = Tangle(startTx)

        topologicalSubgraph = sortTopologically(subgraph)

        for tx in topologicalSubgraph:

            rating[tx] = len(futureSet(tx)) + 1

        return rating

```

#### Optimizations

* In order to preserve space while storing transaction's identifiers, we only store a portion of the transaction's hash bytes, truncating it to the `PREFIX_LENGTH` length. Currently, this value has been hardcoded to 44 bytes, corresponding to 220 trits.

* In order to cap the memory consumption of the algorithm, we allow to store up to `MAX_FUTURE_SET_SIZE` number of approvers for the transaction we are considering, under the assumption that a higher rating score won't contribute significantly to bias the walker. This value has been heuristically hardcoded to 5000. Please note that this optimization, while capping memory usage during runtime, makes the walk to behave more randomly closer the beginning of the considered subgraph since the future sets of those transactions are more likely to have been capped to `MAX_FUTURE_SET_SIZE`. The desired behavior is instead the contrary: we would like the beginning of the walk to be strongly biased towards the main branch while being more random closer to the tips, spreading the chance for any of them to get selected. 

### Weighted random walk

After the transactions' ratings have been computed, the weighted random walk starts. 

#### Interface

To allow you to create different weighted random walk algorithms, we created a generic interface to which every implementation should adhere.

```java
TxId walk(TxId entryPoint, Map<TxId -> Integer> ratings, WalkValidator validator)
```

This function should return the selected tip transaction.

#### WalkerAlpha Implementation

Ratings are normalized and transformed into `weights` with the help of the `alpha` configuration option. Finally, a `random` value between 0 and the sum of all the weights is generated and subtracted by the approvers' weights until reaching the value of 0. The approver that turned the `random` value to 0 is selected as the next step in the walk.

```python
class WalkerAlpha(Walker):

    def walk(entryPoint, ratings, validator):

        step = entryPoint

        prevStep = None

        while step:

            approvers = getApprovers(step)

            prevStep = step

            step = nextStep(ratings, approvers, validator)

        # When there are no more steps, this transaction is a tip

        return prevStep

        

    def nextStep(ratings, approvers, validator):

        approversWithRating = approvers.filter(a => ratings.contains(a))

        # There is no valid approver, this transaction is a tip

        if len(approversWithRating) == 0:

            return None

        approversRatings = approverswithRating.map(a => ratings.get(a))

        weights = ratingsToWeights(approversRatings)

        approver = weightedChoice(approversWithRating, weights)

        if approver is not None:

            tail = validator.findTail(approver)

            # If the selected approver is invalid, step back and try again

            if validator.isInvalid(tail):

                approvers = approvers.remove(approver)

                return nextStep(ratings, approvers, validator)

            return tail

        return None

    

    def weightedChoice(approvers, weights):

        randomNumber = random(0, sum(weights))

        for approver in approvers:

            randomNumber = randomNumber - weights.get(approver)

            if randomNumber <= 0:

                return approver

    def ratingsToWeights(ratings):

        highestRating = max(ratings)

        normalizedRatings = ratings.map(r => r - highestRating)

        weights = normalizedRatings.map(r => math.exp(r * alpha))

        return weights

```

#### Validator conditions

A transaction is considered invalid if any of the following occur:

* It is not solid and we cannot reconstruct its state, since a portion of the Tangle that this transaction references is unknown.

* It references a transaction that's too far in the past, namely beyond `latestSolidMilestone - maxDepth`.

* The ledger state is not consistent, such as trying to withdraw or deposit missing funds or double-spending.

* The validator maintains a list of transactions that have been checked for validity. Every time a new transaction is validated, it is also checked against these.

```python
class WalkValidator:

    previousTransactions = []

    def isInvalid(transaction):

        previousTransactions.append(transaction)

        if notSolid(transaction):

            return True

        if belowMaxDepth(transaction):

            return True 

        if inconsistent(transaction):

            return True

        if inconsistentWithPreviousTransactions(transaction):

            return True

        return False

```

**Note:** The same validator object is passed for both walks, resulting in two tip transactions that are consistent with each other.

#### Bundles and consistency

Transactions in IOTA are sent in bundles. Therefore, when the walker traverses an approver, that approver may be in the middle of a bundle. To validate the bundle, the walker finds the tail transaction by traversing the trunk transactions. 

The two tip transactions are checked for consistency between each other to make sure that neither one is invalid. Therefore, the clients transaction references two valid transactions that have a better chance of being approved by another transaction, thus increasing its cumulative weight.
