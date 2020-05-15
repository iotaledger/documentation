# Generate a seed

**In this tutorial, you use the CryptoCore to generate a random seed and store it in the secure memory.**

:::warning:
For your convenience, all sample code uses the default secret key and the default API key.

If you want to use the CryptoCore in a production environment, you should follow the instructions in the 'Securing the FPGA' section of the [manual](https://gitlab.com/iccfpga-rv/iccfpga-manual/-/blob/master/iccfpga.pdf).
:::

## Prerequisites

To complete this guide, you need to have completed the [CryptoCore getting started guide](../introduction/get-started.md).

## Code walkthrough

To generate a seed, you can use the `generateRandomSeed` API endpoint.

1. Open a serial terminal

2. Enter the following to initialize the secure memory with the secret key

    ```bash
    {"command": "initSecureElement","key":"3780e63d4968ade5d822c013fcc323845d1b569fe705b60006feec145a0db1e3"}
    ```

    You should see the following:

    ```json
    {
    "code": 200,
    "command": "initSecureElement",
    "duration": 1800
    }
    ``` 

    Now that the secure memory is initialized with the secret key, you can use it to generate a seed.

3. Enter the following command to generate a seed and store it in the secure memory

    ```bash
    {"command":"generateRandomSeed","slot": 0}
    ```

    :::info:
    The CryptoCore can store up to eight seeds in the secure memory.
    Here, we store the seed in slot 0. If you want to generate more seeds, you can store them in any slot up to and including 6.
    :::

    You should see the following:

    ```json
    {
        "code": 200,
        "command":"generateRandomSeed",
        "duration":1800
    }
    ```

:::success:
You have a seed in the secure memory of the CryptoCore.
:::

## Next steps

This seed is in secure memory, which is protected and can be read only by using the API.

For example, you can use the seed to [sign transactions](../references/api-reference.md#signTransaction) or [generate addresses](../references/api-reference.md#generateAddress).