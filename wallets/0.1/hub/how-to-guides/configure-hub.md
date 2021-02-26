# Plan your Hub configuration

**Before you run Hub, you should consider whether you need to override some of its default settings to meet your needs. This guide gives you some advice about what to consider when configuring Hub.**

## What should you consider before running Hub?

If you start Hub and have data in the database, you must delete that data before changing any of these options:

- [`--apiAddress`](../references/command-line-options.md#apiAddress): Nodes in an IOTA network keep a record of the balances of addresses. If you connect to a node in a different [IOTA network](root://getting-started/1.1/networks/overview.md), that node will not have the same record, so any balances in Hub will be invalid.

- [`--salt`](../references/command-line-options.md#salt): If you change the salt, Hub won't be able to generate the seed for any deposit addresses that are already in the database. As a result, Hub won't be able to generate the correct private keys to be able to sign sweeps that withdraw from those deposit addresses.

- [`--keySecLevel`](../references/command-line-options.md#keySecLevel): If you change the security level, the signatures that Hub creates will be invalid for any deposit address that are already in the database.

- [Any Argon2 options](../references/command-line-options.md#argon2-hash-function): These options affect the [Argon2](https://www.argon2.com/) hash function, which is used to generate seeds. Any changes to these options will result in seeds that do not match the deposit addresses.

## Which IOTA network do you want to use?

When choosing an IOTA network, you need to consider the following options:

- [`--apiAddress`](../references/command-line-options.md#apiAddress)

- [`--minWeightMagnitude`](../references/command-line-options.md#minWeightMagnitude)

- [`--powMode`](../references/command-line-options.md#powMode)

- [`--useHttpsIRI`](../references/command-line-options.md#useHttpsIRI)

### --apiAddress

Hub needs to connect to a node's API to be able to interact with the Tangle. To avoid connecting to a malicious node, we recommend connecting Hub to a local node that you control. If you don't have a local node, see the [Hornet node software](root://hornet/1.1/overview.md) for guides on setting one up.

#### Development environment

When testing Hub in a development environment, you should consider connecting to a node in the [Devnet](root://getting-started/1.1/networks/overview.md). This IOTA network requires less proof of work, which reduces the time it takes to create sweeps, and it uses free test IOTA tokens.

#### Production environment

When deploying Hub in a production environment, you should connect to a node in the [Mainnet](root://getting-started/1.1/networks/overview.md#mainnet). 

### --minWeightMagnitude

Depending on the IOTA network of the IOTA node, set the correct [minimum weight magnitude](root://getting-started/1.1/references/glossary.md#minimum-weight-magnitude).

### --powMode

Some nodes do not support remote [proof of work](root://getting-started/1.1/references/glossary.md#proof-of-work). In this case, configure Hub to use local proof of work. This option uses computational power on the device that is running Hub.

### --useHttpsIRI

Some nodes use the SSL protocol to encrypt their API connection. In this case,  configure Hub to use the SSL protocol.

## What rate of withdrawals and deposits do you expect?

The length of time it takes to process withdrawals depends on the following options:

- [`--sweepInterval`](../references/command-line-options.md#sweepInterval)

- [`--sweep_max_deposit`, `--sweep_max_withdrawal`](../references/command-line-options.md#sweepLimits), and [`--keySecLevel`](../references/command-line-options.md#keySecLevel)

- [`--attachmentInterval`](../references/command-line-options.md#attachmentInterval)

### --sweepInterval

Hub processes withdrawals in sweeps, which are done at regular intervals.

The sweep interval that you choose should depend on the rate of withdrawals and deposits that you expect.

If the sweep interval is frequent, Hub will create small sweeps that process fewer withdrawals more often. 

If the sweep interval is infrequent, Hub will create large sweeps that process more withdrawals less often.

Large sweeps are not recommended because they contain more transactions, which each require a proof of work. Therefore, a larger sweep will take longer to create, and may take longer to be confirmed.

As a result, you should also consider the maximum amount of withdrawals and deposits you want to include in a single sweep.

#### Maximum number of withdrawals and deposits

In a sweep, each deposit consists of an output transaction, and each withdrawal consists of at least one input transaction, depending on the security level of addresses in Hub.

To limit the amount of time it takes to create a sweep and for the transactions in it to be confirmed, you should consider the maximum amount of deposits and withdrawals that should be included in a sweep.

For example, if you use security level 3 in the [--keySecLevel](../references/command-line-options.md#iota-protocol) setting, each withdrawal will consist of three transactions. So, if the maxmimum number of withdrawals is 7 in the [--sweep_max_deposit](../references/command-line-options.md#sweeps) setting, a sweep could include 21 transactions just for withdrawals.

### --attachmentInterval

When Hub sends a sweep to a node, it monitors it to check for confirmation. If the sweep takes longer than the attachment interval to become confirmed, Hub [promotes and reattaches](root://getting-started/1.1/transfer-tokens/helping-a-transaction-confirm.md) its tail transaction.

The attachment interval you choose should depend on the current rate of confirmed transactions per second (CTPS) in the Tangle. To check the current rate, see [tanglebeat.com](http://tanglebeat.com/).

For example, if the current CTPS rate is between 3 and 4 minutes, you should wait at least 4 minutes before reattaching or promoting transactions in a sweep.

If the attachment interval is too frequent, you will create unnecessary bundles to promote and reattach the sweep.

If the attachment interval is too infrequent, sweeps may take longer than necessary to be confirmed.

## Next steps

[Install and run Hub](../how-to-guides/install-hub.md).