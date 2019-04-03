# cIRI configuration options

**This table contains the configuration options for the cIRI.**

You can choose to configure cIRI by specifying the configuration options in the following ways:
* As flags in the command line
* As parameters in the conf.yaml (cIRI configuration file)

### Command line flags

| **Configuration options** |   **Description**| **Accepted values** | **Default values**|**Notes** |
| :------------------------ | :--------------- | :--------- | :--------| :------------|
|<a name="--db-path"></a>`--db-path`| Path to the database file. | string  | ciri/db/ciri-mainnet.db | |
|<a name="--help"></a>`--help`| Displays the usage. | none  | | |
|<a name="--log-level"></a>`--log-level`| Valid log levels: "debug", "info", "notice", "warning", "error", "critical", "alert" and "emergency". | string  | info | |
|<a name="--mwm"></a>`--mwm`| Number of trailing ternary 0s that must appear at the end of a transaction hash. Difficulty can be described as 3^mwm. | number  | 14 | |
|<a name="--neighbors"></a>`--neighbors`| URIs of neighbouring nodes, separated by a space. | string  | | |
|<a name="--p-propagate-request"></a>`--p-propagate-request`| Probability of propagating the request of a transaction to a neighbor node if it can't be found. This should be low since we don't want to propagate non-existing transactions that spam the network. | float, must be in [0,1].  | 0.01 | |
|<a name="--p-remove-request"></a>`--p-remove-request`| Probability of removing a transaction from the request queue without requesting it. | float, must be in [0,1] | 0.01 | |
|<a name="--p-reply-random-tip"></a>`--p-reply-random-tip`| Probability of replying to a random transaction request, even though your node doesn't have anything to request. | float, must be in [0,1].  | 0.66 | |
|<a name="--p-select-milestone"></a>`--p-select-milestone`| Probability of sending a current milestone request to a neighbour. | float, must be in [0,1].  | 0.7 | |
|<a name="--p-send-milestone"></a>`--p-send-milestone`| Probability of sending a milestone transaction when the node looks for a random transaction to send to a neighbor. | float, must be in [0,1]. | 0.02 | |
|<a name="--requester-queue-size"></a>`--requester-queue-size`| Size of the transaction requester queue. | number | 10000 | |
|<a name="--tcp-receiver-port"></a>`--tcp-receiver-port`| Displays the usage. | number  | 15600 | |
|<a name="--tips-cache-size"></a>`--tips-cache-size`| Size of the tips cache. Also bounds the number of tips returned by getTips API call. | number | 5000 | |
|<a name="--udp-receiver-port"></a>`--udp-receiver-port`| UDP listen port. | none  | 14600 | |
|<a name="--max-find-transactions"></a>`--max-find-transactions`| The maximal number of transactions that may be returned by the 'findTransactions' API call. If the number of transactions found exceeds this number an error will be returned | number  | 100000 | |
|<a name="--max-get-trytes"></a>`--max-get-trytes`| Maximum number of transactions that will be returned by the 'getTrytes' API call. | number  | 10000 | |
|<a name="--port"></a>`--port`| HTTP API listen port. | number | 14265 | |
|<a name="--alpha"></a>`--alpha`| Randomness of the tip selection. 0 is most random and inf is most deterministic. | float, must be in [0, inf] | 0.001 | |
|<a name="--below-max-depth"></a>`--below-max-depth`| Maximum number of unconfirmed transactions that may be analysed to find the latest referenced milestone by the currently visited transaction during the random walk. | number | 20000 | |
|<a name="--coordinator"></a>`--port`| The address of the coordinator. | string | | |
|<a name="--last-milestone"></a>`--last-milestone`| The index of the last milestone issued by the corrdinator before the last snapshot. | string | | |
|<a name="--max-depth"></a>`--max-depth`| Limits how many milestones behind the current one the random walk can start. | number | 15 | |
|<a name="--num-keys-in-milestone"></a>`--num-keys-in-milestone`| The depth of the Merkle tree which in turn determines the number of leaves (private keys) that the coordinator can use to sign a message. | number | | |
|<a name="--snapshot-file"></a>`--snapshot-file`| Path to the file that contains the state of the ledger at the last snapshot. | string | external/snapshot_mainnet/file/snapshot.txt | |
|<a name="--snapshot-signature-depth"></a>`--snapshot-signature-depth`| Depth of the snapshot signature. | number | | |
|<a name="--snapshot-signature-file"></a>`--snapshot-signature-file`| Path to the file that contains a signature for the snapshot file. | string | external/snapshot_sig_mainnet/file/snapshot.sig | |
|<a name="--snapshot-signature-index"></a>`--snapshot-signature-index`| Index of the snapshot signature. | number | | |
|<a name="--snapshot-signature-pubkey"></a>`--snapshot-signature-pubkey`| Public key of the snapshot signature. | string | | |
|<a name="--snapshot-timestamp"></a>`--snapshot-timestamp`| Epoch time of the last snapshot | number | | |


### cIRI Configuration file
| **Configuration options** |   **Description**| **Accepted values** | **Default values**|**Notes** |
| :------------------------ | :--------------- | :--------- | :--------| :------------|
|<a name="db-path"></a>`db-path`| Path to the database file. | string  | ciri/db/ciri-mainnet.db | |
|<a name="log-level"></a>`log-level`| Valid log levels: "debug", "info", "notice", "warning", "error", "critical", "alert" and "emergency". | string | info | |
|<a name="mwm"></a>`mwm`| Number of trailing ternary 0s that must appear at the end of a transaction hash. Difficulty can be described as 3^mwm. | number  | 14 | |
|<a name="neighbors"></a>`neighbors`| URIs of neighbouring nodes, separated by a space. | string  | | |
|<a name="p-propagate-request"></a>`p-propagate-request`| Probability of propagating the request of a transaction to a neighbor node if it can't be found. This should be low since we don't want to propagate non-existing transactions that spam the network. | float, must be in [0,1].  | 0.01 | |
|<a name="p-remove-request"></a>`p-remove-request`| Probability of removing a transaction from the request queue without requesting it. | float, must be in [0,1] | 0.01 | |
|<a name="p-reply-random-tip"></a>`p-reply-random-tip`| Probability of replying to a random transaction request, even though your node doesn't have anything to request. | float, must be in [0,1].  | 0.66 | |
|<a name="p-select-milestone"></a>`p-select-milestone`| Probability of sending a current milestone request to a neighbour. | float, must be in [0,1].  | 0.7 | |
|<a name="p-send-milestone"></a>`p-send-milestone`| Probability of sending a milestone transaction when the node looks for a random transaction to send to a neighbor. | float, must be in [0,1]. | 0.02 | |
|<a name="requester-queue-size"></a>`requester-queue-size`| Size of the transaction requester queue. | number | 10000 | |
|<a name="tcp-receiver-port"></a>`tcp-receiver-port`| Displays the usage. | number  | 15600 | |
|<a name="tips-cache-size"></a>`tips-cache-size`| Size of the tips cache. Also bounds the number of tips returned by getTips API call. | number | 5000 | |
|<a name="udp-receiver-port"></a>`udp-receiver-port`| UDP listen port. | none  | 14600 | |
|<a name="max-find-transactions"></a>`max-find-transactions`| The maximal number of transactions that may be returned by the 'findTransactions' API call. If the number of transactions found exceeds this number an error will be returned | number  | 100000 | |
|<a name="max-get-trytes"></a>`max-get-trytes`| Maximum number of transactions that will be returned by the 'getTrytes' API call. | number  | 10000 | |
|<a name="port"></a>`port`| HTTP API listen port. | number | 14265 | |
|<a name="alpha"></a>`alpha`| Randomness of the tip selection. 0 is most random and inf is most deterministic. | float, must be in [0, inf] | 0.001 | |
|<a name="below-max-depth"></a>`below-max-depth`| Maximum number of unconfirmed transactions that may be analysed to find the latest referenced milestone by the currently visited transaction during the random walk. | number | 20000 | |
|<a name="coordinator"></a>`port`| The address of the coordinator. | string | | |
|<a name="last-milestone"></a>`last-milestone`| The index of the last milestone issued by the corrdinator before the last snapshot. | string | | |
|<a name="max-depth"></a>`max-depth`| Limits how many milestones behind the current one the random walk can start. | number | 15 | |
|<a name="num-keys-in-milestone"></a>`num-keys-in-milestone`| The depth of the Merkle tree which in turn determines the number of leaves (private keys) that the coordinator can use to sign a message. | number | | |
|<a name="snapshot-file"></a>`snapshot-file`| Path to the file that contains the state of the ledger at the last snapshot. | string | external/snapshot_mainnet/file/snapshot.txt | |
|<a name="snapshot-signature-depth"></a>`snapshot-signature-depth`| Depth of the snapshot signature. | number | | |
|<a name="snapshot-signature-file"></a>`snapshot-signature-file`| Path to the file that contains a signature for the snapshot file. | string | external/snapshot_sig_mainnet/file/snapshot.sig | |
|<a name="snapshot-signature-index"></a>`snapshot-signature-index`| Index of the snapshot signature. | number | | |
|<a name="snapshot-signature-pubkey"></a>`snapshot-signature-pubkey`| Public key of the snapshot signature. | string | | |
|<a name="snapshot-timestamp"></a>`snapshot-timestamp`| Epoch time of the last snapshot | number | | |
