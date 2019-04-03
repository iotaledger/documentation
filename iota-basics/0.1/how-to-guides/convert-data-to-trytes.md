# Convert data to trytes

**The values of transaction fields must be represented in trytes. To facilitate data conversion, the IOTA client libraries have built-in converters to convert data to/from trytes, trits, and ASCII characters.**

## Prerequisites

To complete this guide, you need the following:

* [Node JS (8+)](https://nodejs.org/en/)
* A code editor such as [Visual Studio Code](https://code.visualstudio.com/Download)
* Access to a command prompt
* An Internet connection

---

1. Create a new directory called `iota-basics`

2. In the command prompt, change into the `iota-basics` directory, and install the [IOTA converter library](https://github.com/iotaledger/iota.js/tree/next/packages/converter)

    ```bash
    cd iota-basics
    npm install --save @iota/converter
    ```

3. In the `iota-basics` directory, create a new file called convert-to-trytes.js

4. In the convert-to-trytes.js file, require the IOTA libraries

    ```js
    const Iota = require('@iota/converter');
    ```

5. Create a variable to hold a message

    ```js
    var data = "Hello World!";
    ```

6. Pass the `data` variable to the `asciiToTrytes()` method to convert the message to trytes

    ```js
    var trytes = Converter.asciiToTrytes(data);

    console.log(`${data} converted to trytes: ${trytes}`);
    ```

7. Pass the returned trytes to the `trytesToAscii()` method to convert them to ASCII characters

    ```js
    var message = Converter.trytesToAscii(trytes);

    console.log(`${trytes} converted back to ASCII: ${message}`);
    ```
    
    When you execute the file, you should see the converted strings in the output:

    ```console
    Hello World! converted to trytes: RBTC9D9DCDEAFCCDFD9DSCFA
    RBTC9D9DCDEAFCCDFD9DSCFA converted back to ASCII: Hello World!
    ```

**Note:** The `asciiToTrytes()` method supports only [basic ASCII characters](https://en.wikipedia.org/wiki/ASCII#Printable_characters). As a result, diacritical marks such as accents and umlauts aren't supported and result in an `INVALID_ASCII_CHARS` error.

## Final code

```js
// Require the IOTA library
var Converter = require('@iota/converter');

var data = "Hello World!";

// Convert the data to trytes
var trytes = Converter.asciiToTrytes(data);

console.log(`${data} converted to trytes: ${trytes}`);

// Convert the trytes back to the original ASCII characters
var message = Converter.trytesToAscii(trytes);

console.log(`${trytes} converted back to data: ${message}`);
```
