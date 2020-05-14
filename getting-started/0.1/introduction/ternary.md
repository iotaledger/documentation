# Ternary

**All transactions contain characters called trytes. These trytes are part of the [ternary numeral system](https://en.wikipedia.org/wiki/Ternary_numeral_system). IOTA uses this system because, compared to [binary](https://en.wikipedia.org/wiki/Binary_number), ternary computing is considered to be more efficient as it can represent data in three states rather then just two.**

In IOTA, data is represented in balanced ternary, which consists of 1, 0, or -1. These values are called trits, and three of them are equal to one tryte, which can have 27 (3<sup>3</sup>) possible values.

## Tryte encoding

To make trytes easier to read, they are represented as one of 27 possible tryte-encoded characters, which consist of only the number 9 and the uppercase letters A-Z.

|**Tryte-encoded character**| **Trits**| **Decimal number**|
|:----------------------|:-----|:--------------|
|                                  9|  0,  0,  0 |     0|
|                                  A|  1,  0,  0 |     1|
|                                  B| -1,  1,  0 |     2|
|                                  C|  0,  1,  0 |     3|
|                                  D|  1,  1,  0 |     4|
|                                  E| -1, -1,  1 |     5|
|                                  F|  0, -1,  1 |     6|
|                                  G|  1, -1,  1 |     7|
|                                  H| -1,  0,  1 |     8|
|                                  I|  0,  0,  1 |     9|
|                                  J|  1,  0,  1 |    10|
|                                  K| -1,  1,  1 |    11|
|                                  L|  0,  1,  1 |    12|
|                                  M|  1,  1,  1 |    13|
|                                  N| -1, -1, -1 |   -13|
|                                  O|  0, -1, -1 |   -12|
|                                  P|  1, -1, -1 |   -11|
|                                  Q| -1,  0, -1 |   -10|
|                                  R|  0,  0, -1 |    -9|
|                                  S|  1,  0, -1 |    -8|
|                                  T| -1,  1, -1 |    -7|
|                                  U|  0,  1, -1 |    -6|
|                                  V|  1,  1, -1 |    -5|
|                                  W| -1, -1,  0 |    -4|
|                                  X|  0, -1,  0 |    -3|
|                                  Y|  1, -1,  0 |    -2|
|                                  Z| -1,  0,  0 |    -1|

## How ASCII characters are converted to trytes

In the IOTA client libraries, you can convert [ASCII characters](https://en.wikipedia.org/wiki/ASCII) to and from trytes.

This feature is useful for converting an ASCII message such as `Your coffee is ready` to trytes, which you can add to a transaction and attach to the Tangle.

Each ASCII character is represented as 2 trytes by doing the following:

1. Find the decimal Unicode value of an ASCII character

    For example, the decimal Unicode value of `Z` is 90.

2. Use the decimal Unicode value in the following equations:

    ```
    decimal % 27
    (decimal - 9) / 27
    ```

    For example, for `Z`, the result would be

    ```
    90 % 27 = 9
    (90 - 9) / 27 = 3
    ```

3. Use the results of the equations as indices to find the character's tryte value

    |**Index** |**Trytes**|
    |--|--|
    |0|9|
    |1|A|
    |2|B|
    |**__3__**|**__C__**|
    |4|D|
    |5|E|
    |6|F|
    |7|G|
    |8|H|
    |**__9__**|**__I__**|
    |10|J|
    |11|K|
    |12|L|
    |13|M|
    |14|N|
    |15|O|
    |16|P|
    |17|Q|
    |18|R|
    |19|S|
    |20|T|
    |21|U|
    |22|V|
    |23|W|
    |24|X|
    |25|Y|
    |26|Z|

    For example, the ASCII character `Z` is represented as `IC` in trytes.

## Utilities

You can use the following IOTA Tangle Utilities with ternary data:

- [Convert data to/from trytes](https://utils.iota.org/text-conversion)

- [Compress trytes for storage](https://utils.iota.org/compress)

## Related guides

[Convert data to/from trytes in JavaScript](root://core/1.0/tutorials/js/convert-data-to-trytes.md)