# Storing data in the Tangle

**This topic discusses the types of data that the Tangle is designed to store.**

Although you can store anything in the Tangle, you should consider doing so only for the following use cases:

**Tamper-Evidence:** You want to be able to prove that a dataset has or has not changed. For an example of this use case, see the blueprint for [Tangle Data Storage](root://blueprints/0.1/tangle-data-storage/overview.md).

**Decentralization:** You cannot trust the parties involved to keep data in a centralized, proprietary database. For an example of this use case, see the blueprint for [Track and Trace](root://blueprints/0.1/track-and-trace/overview.md).

**Transparency:** You want your data to be visible to everyone to establish trust. For an example of this use case, see the blueprint for the [Data Marketplace](root://blueprints/0.1/tangle-data-storage/overview.md).

## Data persistence

Data in the Tangle is not guaranteed to be stored forever because nodes have the ability to prune messages from their local databases.

If you want to be able to store data for long periods of time, you need a permanode. See [Chronicle](root://chronicle/1.1/overview.md).

## Next steps

[Learn how the IOTA token was created in the Tangle](../the-tangle/genesis.md).