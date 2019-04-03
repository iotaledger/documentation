# Create an address

**Addresses must not be withdrawn from more than once. If you withdraw IOTA tokens from an address, you must create a new one by incrementing the index or using a different security level.**

Any code that uses a seed is executed on the client side. Your seed is never sent anywhere.

## Prerequisites

To complete this guide, you need the following:

* [Node JS (8+)](https://nodejs.org/en/)
* A code editor such as [Visual Studio Code](https://code.visualstudio.com/Download)
* Access to a command prompt
* An Internet connection

---

1. Create a new directory called `iota-basics`

2. In the command line, change into the `iota-basics` directory, and install the [IOTA core library](https://github.com/iotaledger/iota.js/tree/next/packages/core)

    ```bash
    cd iota-basics
    npm install --save @iota/core
    ```

3. In the `iota-basics` directory, create a new file called create-address.js

4. In the create-address.js file, require the IOTA libraries

    ```js
    const Iota = require('@iota/core');
    ```

5. Create an instance of the IOTA object and use the `provider` field to connect to a node

    ```js
    const iota = Iota.composeAPI({
    provider: 'https://nodes.thetangle.org:443'
    });
    ```

6. Create a variable to store a seed

    ```js
    const seed =
    'PUETTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';
    ```

7. Pass the `seed` variable to the `getNewAddress()` method to create an address

    ```js
    iota.getNewAddress(seed, {index: 0, security: 2})
    .then(address => console.log(address));
    ```

    When you execute the file, you should see an address. If you execute the script again, you'll see the same address.

Try changing the index and security level arguments in the `getNewAddress()` method to create a different address.

## Final code

```js
// Require the IOTA library
const Iota = require('@iota/core');

// Create a new instance of the IOTA object
// Use the `provider` field to specify which IRI node to connect to
const iota = Iota.composeAPI({
provider: 'https://nodes.thetangle.org:443'
});

const seed =
'PUETTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';

// Create an address with index 0 and security level 2
iota.getNewAddress(seed, {index: 0, security: 2})
.then(address => console.log(address));
```