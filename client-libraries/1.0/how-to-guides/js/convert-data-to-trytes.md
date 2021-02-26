# Convert data to/from ternary

**The values of transaction fields must be represented in trytes. For more information about trytes, see [Ternary](root://getting-started/1.1/the-tangle/ternary.md). To facilitate data conversion, the IOTA client libraries have built-in functions to convert data to/from trytes, trits, and ASCII characters.**

## Packages

To complete this tutorial, you need to install the following package:

--------------------
### npm
```bash
npm install @iota/converter
```
---
### Yarn
```bash
yarn add @iota/converter
```
--------------------

## Code walkthrough

1. Define a message in ASCII characters

    ```js
    var data = "Hello World!";
    ```

2. Convert the message to trytes

    ```js
    var trytes = Converter.asciiToTrytes(data);

    console.log(`${data} converted to trytes: ${trytes}`);
    ```

    :::info:
    The `asciiToTrytes()` method supports only [basic ASCII characters](https://en.wikipedia.org/wiki/ASCII#Printable_characters). As a result, diacritical marks such as accents and umlauts aren't supported and result in an `INVALID_ASCII_CHARS` error.
    :::

3. Convert the trytes back to ASCII characters

    ```js
    var message = Converter.trytesToAscii(trytes);

    console.log(`${trytes} converted back to ASCII: ${message}`);
    ```
    
    When you execute the file, you should see the converted strings in the output:

    ```console
    Hello World! converted to trytes: RBTC9D9DCDEAFCCDFD9DSCFA
    RBTC9D9DCDEAFCCDFD9DSCFA converted back to ASCII: Hello World!
    ```

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code from the JavaScript client library in the browser.

Click the green button to run the sample code in this guide and see the results in the window.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Convert-data-to-trytes?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
