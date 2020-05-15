# How IOTA Area Codes work

**IOTA Area Codes (IACs) IACs are short, tryte-encoded, location codes that can be used to tag and retrieve IOTA transactions related to specific locations. The IACs are typically 11 trytes long and will represent a 13.5 m by 13.5 m area, at the equator. However IACs can also be 12 trytes long and represent a more precise area of 2.8 m by 3.5 m. This topic explains how IOTA Area Codes work.**

IACs are a copy of the [Open Location Codes](https://en.wikipedia.org/wiki/Open_Location_Code) (OLC), also known as [Plus Codes](https://plus.codes/), proposed by Google Zurich in 2014. There are a few minor changes to make it compatible with IOTA's encoding. Compare the differences below which are as follows:

|               | **OLC**                    | **IAC**                    |
| ------------- | ---------------------- | ---------------------- |
| **Example**   | `9F4MGCH7+R6F`         | `NPHTQORL9XK`          |
| **Alphabet**  | `23456789CFGHJMPQRVWX` | `FGHJKLMNOPQRSTUVXWYZ` |
| **Separator** | `+`                    | `9`                    |
| **Padding**   | `0`                    | `A`                    |


Plus codes are based on latitude and longitude – the grid that can be used to describe every point on the planet. By using a simpler code system, they end up much shorter and easier to use than traditional global coordinates.

A plus code in its full length is 10 characters long, with a plus sign before the last two. It consists of two parts:

- The first four characters are the area code, describing a region of roughly 100 x 100 kilometers
- The last six characters are the local code, describing the neighborhood and the building, an area of roughly 14 x 14 meters

Each code uses these two parts to locate a larger region and then find the precise location within that region.

For those needing more precision, an additional character can be used to improve accuracy to roughly 3 x 3 meters – about the size of a small car. The code length excludes the separator.

| **Code length**   | 2       | 4      | 6          | 8            | + | 10                | 11    |
| ------------- | ------- | ------ | ---------- | ------------ | - | ----------------- | ----- |
| **Block size**    | 20°     | 1°     | 0.05° (3′) | 0.0025° (9″) |   | 0.000125° (0.45″) |       |
| **Approximate area** | 2200 km | 110 km | 5.5 km     | 275 m        |   | 14 m              | 3.5 m |