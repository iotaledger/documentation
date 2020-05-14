# Chronicle

**Chronicle is a permanode solution that allows you to store all transactions that reach an [IRI node](root://node-software/0.1/iri/introduction/overview.md) in a distributed database that's secure and that scales well.**

:::info:
Chronicle will be ported to Rust to align with the future strategy of the IOTA technology stack.
:::

Chronicle receives transactions from IRI nodes through the `tx_trytes` [ZMQ event](root://node-software/0.1/iri/references/zmq-events.md). When Chronicle receives transactions, it processes them through an [Elixir](https://elixir-lang.org/) umbrella project, then it stores them in [ScyllaDB](https://www.scylladb.com/).

ScyllaDB takes care of the big data concerns such as partitioning, replication, in-memory processing, and consistency.

Elixir provides web development tools and embedded software development tools plus a network that can be extended by building microservices.

When you send a data request to a Chronicle node, it requests the data from the ScyllaDB, then formats and returns you the response.

![Chronicle architecture](../images/architecture.png)

## How ScyllaDB works

[ScyllaDB](https://docs.scylladb.com/using-scylla/) is a real-time, big data database featuring high throughput and low latency.

Data is organized into rows and columns in a table, using the [primary key, the partition key, and the clustering key](http://sudotutorials.com/how-to-guides/cassandra/cassandra-primary-key-cluster-key-partition-key.html).

The primary key is a unique identifier for each row in a table. A partition key indicates which nodes store a row of data. Clustering keys sort data into a partition and affect how columns are ordered.

Storing and retrieving data is faster when the data is organized into distinct collections called shards. A Scylla partition is a logical storage unit that holds the rows identified by a partition key. A shard is a group of data with the same partition key. 

To ensure reliability and fault tolerance, Scylla stores data replicas on multiple nodes. These nodes are called replica nodes. Partitions are repeated on replica nodes. You can set the number of replicas by setting the replication factor (RF).

:::info:
[Learn more about fault tolerance in Scylla](https://docs.scylladb.com/architecture/architecture-fault-tolerance/).
:::

![Data flow in Chronicle](../images/dataflow.png)

## Limitations

At the moment, it's not possible to filter transactions and store only a subset of them. When you run Chronicle, you must store all transactions that your node receives.

## Blog posts

Read the following blog posts about Chronicle:

- [Introducing Chronicle - A Permanode Solution](https://blog.iota.org/introducing-chronicle-a-permanode-solution-8e506a2e0813)

## Repository

Go to the Chronicle source code on [Github](https://github.com/iotaledger/chronicle).

## Discord channels

[Join our Discord channel](https://discord.iota.org) where you can:

- Take part in discussions with IOTA developers and the community
- Ask for help
- Share your knowledge to help others

We have the following channels for Chronicle:

- **#chronicle-dev:** A read-only channel where developers discuss topics and where any GitHub updates are displayed

- **#chronicle-discussion:** An open channel where anyone is free to discuss Chronicle

## Next steps

[Run Chronicle](../how-to-guides/get-started.md) to get started with storing transactions.
