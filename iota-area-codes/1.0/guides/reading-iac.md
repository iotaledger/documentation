# Reading IACs

**This topic explains how to read IOTA Area Codes to find their level of precision.**

An IAC consists of three parts (excluding the `9` separator).

For example, the latitude and longitude coordinates of the address of the IOTA Foundation are 52.529510, 13.413018. The IAC for these coordinates is : `NPHTQORL9XK`.

- The first four trytes are the area code, describing a region of roughly 100 km x 100 km. For example, `NPHT` represents an area that includes Berlin and parts of Potsdam
- The next six trytes are the local code, describing an area as small as 14 m x 14 m
- The final two trytes are for extra precision

| **IAC length (trytes)**   | **Approximate area**|
|:--------------|:---------------------|
|2       |2200 km |
|4      | 110 km |
|6          | 5.5 km     |
|8            | 275 m        |
|10  | 14 m              |
|11    |3.5 m |
|12 |Less than 3 m|

## Querying large areas

The original [Open Location Codes](https://en.wikipedia.org/wiki/Open_Location_Code) (OLC) protocol is able to accurately represent areas on the globe by using 5 pairs of characters. Each pair of characters representS a 400 times increase in accuracy. A side effect of the code being determined by a set of pairs, rather than a unique code, is you can vary the accuracy by removing pairs from right to left.

For example, by querying for all tags that start with `NPHT`, you can find all transactions in a 100 km by 100 km area, covering Berlin and parts of Potsdam. Then, by adding an extra pair of trytes, `NPHTQO`, you can find all transactions within a few suburbs in central/north Berlin.