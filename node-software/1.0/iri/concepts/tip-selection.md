# The tip selection algorithm

**The following information describes what IRI does when a client calls the [getTransactionsToApprove](root://hornet/1.1/references/api-reference.md#getTransactionsToApprove) endpoint.**

When this endpoint is called, a node starts the tip selection algorithm, which is separated into the following stages:

1. Preparation
2. Rating calculation
3. Weighted random walk

### Preparation

The algorithm's goal is to return two non-conflicting tip transactions as a successful result of the API call.

The algorithm selects a subtangle of the ledger and does two weighted random walks through it. Each weighted random walk returns a tip transaction hash.

Both [weighted random walks](#weighted-random-walk) start from the same milestone transaction (`latestSolidMilestone - depth`).

If the client specifies a `reference` argument to the API call, the `branchTransaction` walk will start from the transaction in the `reference` argument only if that transaction is in the subtangle.

If the transaction in the `reference` argument is older than the `depth` milestone index, the API call fails with the following error message: Reference transaction is too old.

### Rating calculation

The algorithm computes the rating of every transaction in the subtangle. These ratings will be subsequently transformed into weights during the weighted random walk to bias the walker's path.

The rating calculation is performed only once, and used to select both tip transactions.

#### Interface

To allow you to create different rating algorithms, we created a generic interface to which every rating calculator should adhere.

```java
Map<TxId -> Integer> calculate(TxId entryPoint)
```

Every rating calculator, being invoked with an `entryPoint` transaction, should return a mapping of transaction IDs with their corresponding rating value expressed as integers.

#### Future set creation

For every transaction included in our sorted subtangle, a future set is created, containing direct and indirect approvers. The rating of each transaction is the size of its future set + 1 (the transaction's own weight).

```java
entryPoint = latestSolidMilestone - depth

entryPointTrunk = entryPoint

entryPointBranch = reference or entry point 

ratings = CumulativeWeightCalculator.calculate(entryPointTrunk)

class CumulativeWeightCalculator(RatingCalculator):

    def calculate(startTx):

        rating = dict()

        subtangle = Tangle(startTx)

        topologicalSubtangle = sortTopologically(subtangle)

        for tx in topologicalSubtangle:

            rating[tx] = len(futureSet(tx)) + 1

        return rating

```

#### Optimizations

- In order to preserve space while storing transaction's identifiers, we only store a portion of the transaction's hash bytes, truncating it to the `PREFIX_LENGTH` length. Currently, this value has been hardcoded to 44 bytes, corresponding to 220 trits.

- In order to cap the memory consumption of the algorithm, we allow to store up to `MAX_FUTURE_SET_SIZE` number of approvers for the transaction we are considering, under the assumption that a higher rating score won't contribute significantly to bias the walker. This value has been heuristically hardcoded to 5000. Please note that this optimization, while capping memory usage during runtime, makes the walk to behave more randomly closer the beginning of the considered subtangle since the future sets of those transactions are more likely to have been capped to `MAX_FUTURE_SET_SIZE`. The desired behavior is instead the contrary: we would like the beginning of the walk to be strongly biased towards the main branch while being more random closer to the tips, spreading the chance for any of them to get selected. 

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

- It is not solid and we cannot reconstruct its state, since a portion of the Tangle that this transaction references is unknown.

- It references a transaction that's too far in the past, namely beyond `latestSolidMilestone - maxDepth`.

- The ledger state is not consistent, such as trying to withdraw or deposit missing funds or double-spending.

- The validator maintains a list of transactions that have been checked for validity. Every time a new transaction is validated, it is also checked against these.

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

:::info:
The same validator object is passed for both walks, resulting in two tip transactions that are consistent with each other.
:::