# Run a cIRI node on Linux

#### Warning: cIRI is still under development. You should not use cIRI in a production environment.

## Requirements:

- Ubuntu (or another Linux based OS. MacOS or an BSD based OS should also work)

*_Note:_* This guide uses Ubuntu. If you are a beginner, you should stick to Ubuntu.

- At least 512 MB memory
- At least 50 GB of free storage
- [A public IP address](root://general/0.1/how-to-guides/expose-your-local-device.md)
## Install Bazel

Follow the [installation guide](https://docs.bazel.build/versions/master/install.html) for your OS in the Bazel documentation.

## Clone the repository

```bash
git clone https://github.com/iotaledger/entangled.git && cd entangled
```

## Install sqlite3

```bash
sudo apt-get install sqlite3
```

## Initialize the database

```bash
sqlite3 ciri/db/ciri-mainnet.db < common/storage/sql/schema.sql
```

## Create a configuration file

Take a look into the [IRI guide](root://iri/0.1/how-to-guide/find-neighbor-iri-node.md) to find neighbors.
Create the configuration file in ``ciri/conf.yml`` with at least the following content:

```yaml
log-level: info
neighbors: "udp://148.148.148.148:14265"
port: 14265
```

## Run cIRI with Bazel

You should read more about [trit encoding](root://ciri/0.1/references/trit-encoding.md), if you want to optimize ciri.
We also provide an overview of all [cIRI configuration flags](root://ciri/0.1/references/ciri-configuration-options.md).

```bash
bazel run --define trit_encoding=5 --define network=mainnet|testnet -- ciri <configuration flags>
```