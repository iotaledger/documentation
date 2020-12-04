# Weighted Uniform Random Tip Selection

**Tip selection is an algorithm that nodes use to select two tip messages from the Tangle to maximize the confirmation rate and mitigate some attacks. This topic describes why tip selection is important and how nodes select tip messages.**

All messages in the Tangle must be attached to two previous ones. This is [what makes messages immutable](../the-tangle/immutability.md) and how new messages are approved and [confirmed](../the-tangle/the-coordinator.md).

To make sure that the Tangle continues to grow, new messages need to be attached to those that are not yet referenced by any others. These messages are called tip selections.

![Tip transactions](../images/tip-transactions.svg)

Users are free to choose any tip messages to attach theirs to.

However, the tip selection algorithm selects tip messages that are non-lazy.

## Types of tip transactions

In the Tangle, new messages are confirmed if they are directly or indirectly referenced by a [milestone](../the-tangle/the-coordinator.md), using the White Flag confirmation algorithm.

As a result, the algorithm needs to return tips that are non-lazy so the confirmation rate is higher.

For example, if tip 1 in this image below were referenced by a milestone, lots of non-lazy transactions would be confirmed.

If tip 2 were referenced by a milestone, no other transactions would be confirmed because its [past cone](../references/glossary.md#past-cone) includes transactions that are already confirmed by an old milestone.

![Lazy tip transaction](../images/confirmation-rate.svg)

Therefore, nodes categorize tip messages into types and select only those that would lead to better confirmation rates and mitigate attacks:

|**Type**|**Can be selected**|**Description**|
|:-------|:----------|:----------|
|Non-lazy|:heavy_check_mark:|Tip transactions that are attached to a subtangle in which the latest confirmed transactions were confirmed by a recent milestone
|Semi-lazy|:heavy_check_mark:|Tip transactions that have one parent that is attached to a subtangle in which the latest confirmed transactions were confirmed by a recent milestone
|Lazy|:negative_squared_cross_mark:|Tip transactions that are attached to a subtangle in which the latest confirmed transactions were confirmed by an old milestone

### The difference between an old and a recent milestone

Milestones are like a clock. The more milestone "ticks" that happen after a transaction, the older it is.

As a result, nodes uses milestones to decide the age of a message.

However, what makes a message old is subjective. In fact, depending on the [messages per second](../references/glossary.md#transactions-per-second) at the time you send a message, it may be considered old very quickly.

Therefore, all nodes in an IOTA network define old tip message, depending on the following:

- **Youngest message root snapshot index (YMRSI):** The highest [confirmation milestone index](../references/glossary.md#confirmation-milestone-index) of a message's [confirmed root message](../references/glossary.md#confirmed-root-transaction)
- **Oldest message root snapshot index(OMRSI):** The lowest confirmation milestone index of a message's confirmed root message

In the image below, the OMRSI of the tip message is milestone 1 and its YMRSI is milestone 2.

If a transaction's YMRSI is too high it is lazy; if a transaction's OMRSI is too high, it is semi-lazy. Otherwise, it is non-lazy.

![Types of tip transaction](../images/tip-selection.svg)

Nodes can define the highest YMRSI and OMRSI that they accept in their node software settings.

## Next steps

[Learn about IOTA networks](../networks/overview.md).

For details about the tip selection algorithm, see [RFC - 0008](https://github.com/iotaledger/protocol-rfcs/blob/master/text/0008-weighted-uniform-random-tip-selection/0008-weighted-uniform-random-tip-selection.md).