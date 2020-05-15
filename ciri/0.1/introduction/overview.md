# The C IOTA reference implementation

**The cIRI (C IOTA reference implementation) is open-source C software that fulfills the same functionality as the [IRI](root://node-software/0.1/iri/introduction/overview.md). The cIRI is designed to run on single-board computers, which have limited resources. Therefore, the cIRI is more memory and storage efficient than the [IRI](root://node-software/0.1/iri/introduction/overview.md).**

One example of the differences between the IRI and the cIRI is the database. While the IRI uses [RocksDB](https://rocksdb.org/) as a database, cIRI uses [SQLite](https://sqlite.org/index.html).

## Limitations

At the moment, the cIRI does not have an API layer. Therefore, clients, for example the [Trinity wallet](root://wallets/0.1/trinity/introduction/overview.md), can't connect to cIRI nodes.
