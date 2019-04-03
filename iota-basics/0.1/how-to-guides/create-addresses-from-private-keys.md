# Create addresses from private keys

**Seeds are used to create private keys, and in turn, a private key is used to create addresses and sign bundles. By using the cryptography library to create addresses from private keys, you can gain a better understanding of the relationship among addresses, private keys, and security levels.**

If you're unfamiliar with the terms private key, subseed, and key digest, we recommend [reading about addresses and signatures](../concepts/addresses-and-signatures.md).

Any code that uses a seed is executed on the client side. Your seed is never sent anywhere.

## Prerequisites

To complete this guide, you need the following:

* [Node JS (8+)](https://nodejs.org/en/)
* A code editor such as [Visual Studio Code](https://code.visualstudio.com/Download)
* Access to a command prompt
* An Internet connection

---

1. Create a new directory called `iota-basics`

2. Change into the `iota-basics` directory, and install the [IOTA core library](https://github.com/iotaledger/iota.js/tree/next/packages/core), the [IOTA converter library](https://github.com/iotaledger/iota.js/tree/next/packages/converter), and the [IOTA signing library](https://github.com/iotaledger/iota.js/tree/next/packages/signing)

    ```bash
    cd iota-basics
    npm install --save @iota/core
    npm install --save @iota/converter
    npm install --save @iota/signing
    ```

3. In the `iota-basics` directory, create a new file called create-private-key-address.js

4. In the create-private-key-address.js file, require the IOTA libraries

    ```js
    const Iota = require('@iota/core');
    const Sign = require('@iota/signing');
    const Converter = require('@iota/converter');
    ```

5. Create a subseed by passing a seed in trits and an index to the `subseed()` method

    ```js
    const seed = "PUETTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX";

    var subseed = Sign.subseed(Converter.trytesToTrits(seed), 0 /*index*/);
    ```

6. Create one private key for each of the three [security levels](../references/security-levels.md) by passing the same subseed and a different security level to the `key()` method

    ```js
    var privateKey1 = Sign.key(subseed, 1 /*security level*/);

    console.log('Private key length for security level 1: ' + Converter.tritsToTrytes(privateKey1).length);

    var privateKey2 = Sign.key(subseed, 2 /*security level*/);

    console.log('Private key length for security level 2: ' + Converter.tritsToTrytes(privateKey2).length);

    var privateKey3 = Sign.key(subseed, 3 /*security level*/);

    console.log('Private key length for security level 3: ' + Converter.tritsToTrytes(privateKey3).length);
    ```

    When you execute the file, you should see the length of each private key in trytes:

        ```console
        Private key length for security level 1: 2187

        Private key length for security level 2: 4374

        Private key length for security level 3: 6561
        ```

7. Create the key digests for each private key by passing each one to the `digests()` method

    ```js
    var privateKey1Digests = Sign.digests(privateKey1);

    console.log(`Total key digests for security level 1: ` + Converter.tritsToTrytes(privateKey1Digests).length/81);

    var privateKey2Digests = Sign.digests(privateKey2);

    console.log(`Total key digests for security level 2: ` + Converter.tritsToTrytes(privateKey2Digests).length/81);

    var privateKey3Digests = Sign.digests(privateKey3);

    console.log(`Total key digests for security level 3: ` + Converter.tritsToTrytes(privateKey3Digests).length/81);
    ```

    When you execute the file, you should see the amount of key digests for each private key:

    ```console
    Total key digests for security level 1: 1

    Total key digests for security level 2: 2

    Total key digests for security level 3: 3
    ```

8. Create an address for each private key by passing the digests to the `address()` method

    ```js
    var privateKey1Address = Sign.address(privateKey1Digests);

    console.log('Address with security level 1: ' + Converter.tritsToTrytes(privateKey1Address));

    var privateKey2Address = Sign.address(privateKey2Digests);

    console.log('Address with security level 2: ' + Converter.tritsToTrytes(privateKey2Address));

    var privateKey3Address = Sign.address(privateKey3Digests);

    console.log('Address with security level 3: ' + Converter.tritsToTrytes(privateKey3Address));
    ```

    When you execute the file, you should see the addresses for each security level:

        ```console
        Address with security level 1: ZWENNY9JOIQRJIRHV9PCQMCHKBXVZTTKMVRSZSKQNQCQCTZMTMUPEWE9DPCVBVZOVGFFI9JYLTIFXGJAX
        Address with security level 2: ECMHBSFPVUWHSUXZBXTWSKNMBGNTW9GAFVJUUSSJYFBOKHNFJBPEKJNMQMCSAIBXVUJNQKUBFUXPEIY9B
        Address with security level 3: LJGSYD9N9JEAQ9AVN9BJCAOW9LFVZGFHOXFVFVLQEBKVZFGBIDJJIRK9FBJUKRS9VMUXTCXBRIOOEMQJ9
        ```

9. To check that the same addresses would be created from the IOTA core library, do the following:

    ```js
    console.log(Iota.generateAddress(seed, 0 /*index*/, 1 /*security level*/));
    console.log(Iota.generateAddress(seed, 0 /*index*/, 2 /*security level*/));
    console.log(Iota.generateAddress(seed, 0 /*index*/, 3 /*security level*/));
    ```

    You should see the same addresses in the output as those from step 8.
    
Congratulations :tada: You've proven that, under the hood of the IOTA core library, addresses are created from private keys with a certain index and security level.

## Final code

```js
// Require the IOTA libraries
const Iota = require('@iota/core');
const Sign = require('@iota/signing');
const Converter = require('@iota/converter');

//=========================================================
// Create a subseed by passing a seed in trits and an index to the `subseed()` method

const seed = "PUETTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX";

var subseed = Sign.subseed(Converter.trytesToTrits(seed), 0 /*index*/);

//===========================================================
// Create one private key for each of the three security levels by passing the same subseed and a different security level to the `key()` method

var privateKey1 = Sign.key(subseed, 1 /*security level*/);

console.log('Private key length for security level 1: ' + Converter.tritsToTrytes(privateKey1).length);

var privateKey2 = Sign.key(subseed, 2 /*security level*/);

console.log('Private key length for security level 2: ' + Converter.tritsToTrytes(privateKey2).length);

var privateKey3 = Sign.key(subseed, 3 /*security level*/);

console.log('Private key length for security level 3: ' + Converter.tritsToTrytes(privateKey3).length);

//===========================================================
// Create the key digests for each private key by passing each private key to the `digests()` method

var privateKey1Digests = Sign.digests(privateKey1);

console.log(`Total key digests for security level 1: ` + Converter.tritsToTrytes(privateKey1Digests).length/81);

var privateKey2Digests = Sign.digests(privateKey2);

console.log(`Total key digests for security level 2: ` + Converter.tritsToTrytes(privateKey2Digests).length/81);

var privateKey3Digests = Sign.digests(privateKey3);

console.log(`Total key digests for security level 3: ` + Converter.tritsToTrytes(privateKey3Digests).length/81);

//=================================================================
// Create an address for each private key by passing the digests to the `address()` method

var privateKey1Address = Sign.address(privateKey1Digests);

// Convert the returned trits to trytes
console.log('Address with security level 1: ' + Converter.tritsToTrytes(privateKey1Address));

// Check the address by creating it with the same index and security level using the Core JS library
console.log(Iota.generateAddress(seed, 0, 1));

var privateKey2Address = Sign.address(privateKey2Digests);

// Convert the returned trits to trytes
console.log('Address with security level 2: ' + Converter.tritsToTrytes(privateKey2Address));

// Check the address by creating it with the same index and security level using the Core JS library
console.log(Iota.generateAddress(seed, 0, 2));

var privateKey3Address = Sign.address(privateKey3Digests);

// Convert the returned trits to trytes
console.log('Address with security level 3: ' + Converter.tritsToTrytes(privateKey3Address));

// Check the address by creating it with the same index and security level using the Core JS library
console.log(Iota.generateAddress(seed, 0, 3));

//===========================================================
```

