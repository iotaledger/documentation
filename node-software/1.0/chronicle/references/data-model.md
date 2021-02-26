# Scylla data model

**This section describes the data model of the Scylla database for Chronicle.**

The ScyllaDB data model includes the following tables:

- **Bundle:** Stores transaction bundles

- **Edge:** Provides secondary indexes

- **Tag:** Limits the amount of time you can search by tag

- **Zero-value:** Stores spam and data transactions by month

We use the following abbreviations to describe the data in these tables:

|**Abbreviation**|**Description**|
|:------------|:------------|
|BH|Bundle hash|
|H_hash|Head hash (IX == LX)|
|TS|Timestamp|
|TX_HASH|Transaction hash|
|TTL|Time to live|
|EL|Extra Label|
|EX|Extra Vertex|
|LB|Label|
|V1|Vertex One|
|V2|Vertex Two|
|IX|Current Index|
|LX|Last Index|
|SX|Snapshot Index|

## Bundle table

The bundle tables stores all bundle data in the following fields:

- `bundle_hash`: Main partition key. All bundles with same bundle hash are stored in the same partition and replicated on the same replicas.  

- `outputs`: Address used in a transaction with a value that is equal to or greater than 0

- `inputs`: Address used in a transaction with a value that is less than 0

- `transactions_hashes`: Transaction hashes in the bundle

![bundle table sample](../images/bundle-table.png)

## Edge table

The edge tables stores transaction data, where the partion key can be any of the following fields:

- `address`: Address that was used in a bundle

- `transaction_hash`: Transaction hash

- `tip`: Trunk or branch transactions of the head transaction of the bundle

![edge table sample](../images/edge-table.png)

All the rows with the same partition key are stored in the same partition and replicated across the same replicas. This allows you to look up data by any partition key.

## Tag table

A tag table can be one of two types:

- Full tag (27 trytes)

- Full tag and IOTA area code
	
Any number of transactions can have the same tag. As a result, this table can become too large for any node to store. One solution is to remove transactions after a given period of time. For example, the tag table has a predefined TTL which acts as a real-time index. When the TTL is set to 1000 seconds, the row will be deleted after that time. Searches by tag only work for transactions that were saved before the TTL.

## Zero_value table

This table stores the same data as the edge table, except the partition key is a composite partition key composed of address, year, month. This means only the monthly activities for that address will exist in the same shard. 
