# Transactions

**A transaction is a single transfer instruction that can either withdraw [IOTA tokens](../clients/token.md) from an [address](../clients/seeds.md), deposit them into an address, or have zero-value (contain data, a message, or a signature). If you want to send anything to an IOTA network, you must send it to a [node](../network/nodes.md) as a transaction.**

## Structure of a transaction

A transaction consists of 2,673 [tryte-encoded](../introduction/ternary.md#tryte-encoding) characters. When decoded, the transaction object contains the following fields.

| **Field**                         | **Type**   | **Description**                                                                                                                                                                                                                   | **Length (trytes)** |
| :----------------------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
|`hash`|string|Transaction hash, which is derived from the values of every transaction field and contains part of the [proof of work](../transactions/proof-of-work.md).|81|
| <a name="signatureMessageFragment"></a>`signatureMessageFragment`      | string | A [signature](../clients/signatures.md) or a message, both of which may be _fragmented_ over many transactions in a [bundle](../transactions/bundles.md). This field contains all 9's where no message is defined. | 2,187   |
|<a name="address"></a> `address`                       | string | Contains either the sender's or recipient's address. This field contains a recipient's address if the transaction is an [output transaction](#output-transactions).   | 81     |
| `value`                    | integer    | Amount of IOTA tokens to either deposit (positive value) into an address or withdraw (negative value) from it                                                                                                                                                                                        | 27     |
| `obsoleteTag`                   | string | User-defined tag (soon to be removed)                                                                                                                                                                                               | 27     |
| `timestamp`                     | integer    | Unix epoch (seconds since Jan 1, 1970). This field is not-enforced and its value can be arbitrary.                                                                                                                                                                                   | 9      |
| `currentIndex`                  | integer  | Index of the current transaction in the bundle                                                                                                                                                                                                   | 9      |
| `lastIndex`                     | integer    | Index of the last transaction in the bundle                                                                                                                                                                                           | 9      |
| `bundle`                        | string | Bundle hash, which is derived from a hash of the values of the following transaction fields: `address`, `value`, `obsoleteTag`, `currentIndex`, `lastIndex`, and `timestamp`. These fields are called the bundle essence.                               | 81     |
| <a name="trunkTransaction"></a> `trunkTransaction`              | string |  Transaction hash of either an existing transaction in the [Tangle](../network/the-tangle.md) or of the transaction with the next index in the bundle.                                                                                                                                 | 81     |
|<a name="branchTransaction"></a> `branchTransaction`             | string | Transaction hash of an existing transaction in the Tangle                                                                                                                                                                | 81     |
| <a name="tag"></a> `attachmentTag`                | string | User-defined tag                                                                                                                                                                                                              | 27     |
| `attachmentTimestamp`          | integer   | Unix epoch (milliseconds since Jan 1, 1970 after [proof of work](../transactions/proof-of-work.md) was done)                                                                                                                                                                                                           | 9      |
| `attachmentTimestampLowerBound` | integer   | Lower limit of the `attachmentTimestamp` field (not currently used)                                                                                                                                                                                                      | 9      |
| `attachmentTimestampUpperBound` | integer   | Upper limit of the `attachmentTimestamp` field (not currently used)                                                                                                                                                                                                         | 9      |
| `nonce`                         | string | Trytes that represent the proof of work                                      | 27     |


## Transaction hash

Along with the bundle hash, the transaction hash is part of what makes the Tangle immutable. If any of the values in the transaction fields were to change, the transaction hash would be invalid, which would also invalidate the transaction's children and whichever transactions directly or indirectly reference them in [the Tangle](../network/the-tangle.md).

## Transaction types

Transactions can be one of the following types:

- Input transaction
- Output transaction
- Zero-value transaction

### Input transactions

Input transactions contain an instruction to withdraw IOTA tokens from an address.

A valid input transaction must always contain the following:

- A negative value in the `value` field
- An address that contains at least the amount in the `value` field
- At least the first fragment of a valid signature in the `signatureMessageFragment` field
- A valid nonce

For example, this input transaction contains an instruction to withdraw 100 Mi from an address: 

```json
{
 "hash": "GOYYXODDTVTHSLMRECBXJROIBHRNJ9ZPDATIUTQAJSWYD9GKVVERXWNHFFDOMQHQYDGRUGWR9W9R99999",
 "signatureMessageFragment": "U9ZRUHALC9WOSNXBQNIDVWAOWTZRYKDXCGYYRWRQJLGIXXIIMDETANIFZMR9XTSLFHXSTVJGIIKUIQQNYKRHSZJIYSQBKHUVZWRTNQMHKWAATRPIFNNEBWJ9XNKLIRKTJOKIJCK9OBQMSUDS9RKBRXLGKYMCPFS9I9POSX9VTGPZHABUFNFLGXB9LJMCLOCMB9NLTCLMTLFWNQRWRGQMCUOUFLLXZHATCLSYMAPFITDDWPOQHE9NPCTWPBSVFMNDHYULXXFSBOFGPVLKDFTSJBTGPDKLYFPRML9BSQQQKEJGIHEZGKTYD9RU9AEIRUWEJ9NXQTAFEMPECESOQFLFWHJJKD9APEEWPYKYAKANQJNRKQFSEOHLR9APVHAAVWWX9LZSEZCVCWGDODVVXTHQZPEZ9XCFJJZIV9DQLNRLZMXWMBOZYXUNDFZOSY9REOGQTQBTBYVE9BQ99UJKUOIWJLXKHHPZBKHXREORRWPHOIBABVMDMWNIODHUOSIXWRVDTBVJBJHXHHXYDGEXSLQVEANTGXFVEDDWIRFEFNOYHSHEGELWZZRJJJXA9PLHH9MKJCSAGYFKNGFCTERQWSVFNITIHEYYCQSETRYEPZQFHYGLIGCMTFCKAULHCQCCLXKGNJTNLK9AEPYSDDQSODSTWR9FFARCYPPFUCYDGKLSJMIRKFUAVIREWJMEJODDCYQWUQP9PMYVSWELO9TRYZZGMG9IBBVSNHXR9TKHQHBXAUNFBEUSJUPFSXDTZI9DBELZXHIQUD9DKIZXWPVJQHH9VHVEVQTRWH9HGWAUKWTIFYLJOJPMSAMBQMDYSYE9ZSREGBYZIYZHMUHKSHBXWJHBZNTWYXGPYQSZBS9USGPIRNNN9QMHLGGEW9UMDTYMBIRTCEALBJPQTWVVMCTNWYMZHWPTMRKFMMZVCIOQH9XKADU9JQGJAKMDGOEOMGTGCBAKIAUKN9KTWTACFDNKXFYJVJMPWITBDDMHUDYESDAI9YQLHJCFVPIYJSXOTHUJCRJ9FZUJ9F9HFSSKNYWOGIK9DSMJGAON9GXSTVCUJCRJCNOPBAMG9IMBLUEYKALPUNIIMNVKIYNMUZPYRABFVBKSPIATZSLZUARXMWOGQEJDBFR9YXUWMNBMOTOT9VJQGHBSGKWXYKFKSBAEKUQYKTKCTMNKSSHIBODQOEJ9YNEGHDXZ9R9MZDLJPDFUZPINIACZCRILKVVXRQUWVHJTTAIJ9DENNKEXQCMDVMPBWKAVQHRXYZVXWJVLV9NULZBDK9MTVGPSAI9ZUIYF9BBXQXQXJW9SDJL9BJQLBQTS9FRRGOLJICRVGCPGGTALQTKBGKJMOQANSKISX9NKYUGOOLHGD9WDDSIIYA9QDUWDEVZEELKKE9ZGERSUFORDIZ9BKJSNTEIKIAZUMGYFHPHVWYVPY9EKEDOTKMKIOHXAJWYAKTEWHMTZ99MSHNOTKB9PIFTRIRZBGXZMAHPZIPKMNDSEHEMDJSUXDGYCBJZWEFNWIEBNBJSFTTF99LS9SDDYWTVAVZZDVLWHRXYEKZXVQPFZUIKCVRTZVOZMVUWXKCH9CCQSUIPNWOUTTPKMYCUEYKZNBBHIYOGZJUJEILJTNCRWHHCZNGWWIDNMBNDSHPDDDMECCHMBEJPGGPHBSQUDVIOUPIXKQMIQRTPRGJXMWCCCQENFTORFAGCYWTMBDGNUQWAEX9IVFINCSSNHPULJWYOEWUEYEWGXBCIEBAKBSCLFCPOCCDMZCQWPWJFFQJTAZXROATTLTOPWQYSZLBMAA9YGDBWCXMOTDCYPJHAMAZBNUXLTLFUKKXCSKXBVMOUKXHSAQWVLEACXRRWCJVKZLKIJALANL9WRKVIETSUYXHVRGJNCDYUUOSDFJRRNWPOEAFA9BPJAMSXASUFKPKFFENTFVRWYTPPHNZSAEAPUUFWKNKKDKQDOJ9MBWVKPDBTQNAZDV9ZMUXFJKJHPIOLWBSMM9SVMMPWZJREYFCWL9HYMQLNIJVNRZZJFSFRZDTSHWXXTUATUGCICWNWUIHTCZOOXXVEGSLFLTOYDHVXABTEFOPJHDVRCSLPNPYHFNCW9KDVCNFTKVJWRP9KWSWKDAMMTQKDCMPRARKSXSLYCB9ZENFYSJIASMJDLXURPRVEBHIFRLPYTICKOKAVZVLJRTIPBZDKNQKPBD9B",
 "address": "LEYNSIMADMXAUYRGXKKEXPHDMZLRISZBSRZXUMCIKP9JQDOXSCIUGKYFFNPPVPGCHEJAWWSDHCKGOORPC",
 "value": -100000000,
 "obsoleteTag": "ANDROID9WALLET9TRANSFER9999",
 "timestamp": 1507558559,
 "currentIndex": 1,
 "lastIndex": 3,
 "bundle": "VAJOHANFEOTRSIPCLG9MIPENDFPLQQUGSBLBHMKZ9XVCUSWIKJOOHSPWJAXVLPTAKMPURYAYD9ONODVOW",
 "trunkTransaction": "BSQTZZSXBAGNCBLEUFMWDOITACAK9DKVRTTVYEDQENTEWWCAAFKXWP9Q9MHRS9ZQPXTSRFGZJNEGZ9999",
 "branchTransaction": "9QEIQDDDMLMTMYDDURPYKJJZ9MOLGYBRI9DSOWGRIEKTKPJKUKZPGOYJDDZOOSZAIJVZWBQGVPJCA9999",
 "tag": "ANDROID9WALLET9TRANSFER9999",
 "attachmentTimestamp": 1572010100517,
 "attachmentTimestampLowerBound": 0,
 "attachmentTimestampUpperBound": 3812798742493,
 "nonce": "9ADKOSMXLFDYTED9NXYMAWABEAS"
}
```

### Output transactions

Output transactions deposit IOTA tokens into an address.

A valid output transaction must always contain the following:

- A positive value in the `value` field
- A valid address
- A valid nonce

For example, this output transaction contains an instruction to deposit 99.999998 Mi into an address:

```json
{
 "hash": "9UNGZBAIGVLRHPLKYTGSPZRQWNLG9DVIZEVJOYLVMJUHLWHMIIF9IAXTYTZHQTBQBUBBSRMBXHEC99999",
 "signatureMessageFragment": "999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999",
 "address": "LEYNSIMADMXAUYRGXKKEXPHDMZLRISZBSRZXUMCIKP9JQDOXSCIUGKYFFNPPVPGCHEJAWWSDHCKGOORPC",
 "value": 99999998,
 "obsoleteTag": "ANDROID9WALLET9TRANSFER9999",
 "timestamp": 1507558559,
 "currentIndex": 3,
 "lastIndex": 3,
 "bundle": "VAJOHANFEOTRSIPCLG9MIPENDFPLQQUGSBLBHMKZ9XVCUSWIKJOOHSPWJAXVLPTAKMPURYAYD9ONODVOW",
 "trunkTransaction": "ZWHYWAXHUGRQMRBCDYJGZMCYFJRQEUX9NAAKCHUKQDGIIJMFDAAWTRZZZXTFCOUANXK9GWTUDKEB99999",
 "branchTransaction": "PRJCVOAEAQXOHSTGLFVUYRKGBCXSKOEYU9DEYGSTMAKPGFNEKVBSAUSKVCFDRGHWCKIHPGSXGHTZZ9999",
 "tag": "ANDROID9WALLET9TRANSFER9999",
 "attachmentTimestamp": 1572076153742,
 "attachmentTimestampLowerBound": 0,
 "attachmentTimestampUpperBound": 3812798742493,
 "nonce": "XOOWILZJ9GWTROWMMWBFWZUCFXL"
}
```

### Zero-value transactions

A zero-value transaction has a value of 0 in the `value` field. These transactions are useful for sending messages without IOTA tokens.

:::info:
The address does not need to belong to anyone because no value is being transferred.
:::

For example, this zero-value transaction contains a `Hello world` message (in trytes):

```json
 {
  "hash": "ZFLRESUHTVAAVUBTTOEY9KGXQAZHDKLYAGEJZ9GPUXVZNPVGEDSNARVMUZYWIJJPFQTMNHOPVZSGK9999",
  "signatureMessageFragment": "RBTC9D9DCDEAFCCDFD9DSCFA999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999",
  "address": "JJRJVMQQAKNRKKHKPKCLHPHACJFJTNHRKJTHJNCJAJVJ9U9KKFJDOIQITDWIHLPRORXCHUOGDUPCIJXMY",
  "value": 0,
  "obsoleteTag": "UA9999999999999999999999999",
  "timestamp": 1572276504,
  "currentIndex": 0,
  "lastIndex": 0,
  "bundle": "VQRKLYGVLLCSEPZFQEZJZJIPPRAUGZDCXTURAKGEXT9LUR9J9BSHCQTZEJPFBEIAHJEYYQ9IBWZUIOW9Y",
  "trunkTransaction": "WCOJRHDCODZAFM9HTTLQNGQFJLDB9SVQXBTAM9XMPUNBSW9BUQWSYAVLQJFHOOZR9UOJXDGSVETGYM999",
  "branchTransaction": "JMCVKXBXPWIEXBIOFCDHIKMMLJKUDWPMPXADSQYXHPYRSNUPK9KROCYFHTETALUBGTDQCLVC9CRVJN999",
  "tag": "UA9999999999999999999999999",
  "attachmentTimestamp": 1572276505684,
  "attachmentTimestampLowerBound": 0,
  "attachmentTimestampUpperBound": 3812798742493,
  "nonce": "OVMNHAVIBLEDUCRUSLKVGGBCVTM"
 }
```

## Utilities

These IOTA Tangle utilities are useful for working with transactions:

- [Decode a transaction](https://utils.iota.org/transaction-decoder)

- [Send a zero-value transaction](https://utils.iota.org/simple-transaction)

- [Search for transactions](https://utils.iota.org/)

## Related guides

[Send a "hello world" transaction in JavaScript](root://core/1.0/tutorials/js/send-your-first-bundle.md).

[Transfer IOTA tokens in JavaScript](root://core/1.0/tutorials/js/transfer-iota-tokens.md).

[Send a transaction in Trinity](root://wallets/0.1/trinity/how-to-guides/send-a-transaction.md).
