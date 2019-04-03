# Trinary

**Trinary is a numeric system that's used to represent data in IOTA. Compared to binary, trinary computing is more efficient as it can represent data in three states rather then just two.**

In binary, data can be represented as either 1 or 0. These values are called bits. Eight bits is equal to one byte, which can have 256 (2^8) possible values.

In balanced trinary, data can be represented as 1, 0, or -1. These values are called trits. Three trits is equal to one tryte, which can have 27 (3^3) possible values.

IOTA represents data as tryte-encoded characters, according to the [tryte alphabet](../references/tryte-alphabet.md) where each of the 27 characters consists of one tryte.

Luckily, you don't have to convert data from bytes to trytes yourself. The [IOTA client libraries](root://client-libraries/0.1/introduction/overview.md) have built-in functions for converting data. Or, you can use a service such as [IOTA tools](https://laurencetennant.com/iota-tools/index.html).

