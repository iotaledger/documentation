# Generate an address in C

**In this tutorial, you learn how to generate a new address for a [seed](root://getting-started/0.1/clients/seeds.md) with a given [security level](root://getting-started/0.1/clients/security-levels.md).**

## IOTA network

In this tutorial, we connect to a [node](root://getting-started/0.1/network/nodes.md) on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet), and we generate an address with security level 2.

The network settings are defined in a `config.h` file, which we create in the [getting started guide](../../getting-started/c-quickstart.md).

## Code walkthrough

1. Import the packages

    ```cpp
    #include "cclient/api/core/core_api.h"
    #include "cclient/api/extended/extended_api.h"

    #include "common/trinary/tryte_ascii.h"
    #include "utils/time.h"
    #include <inttypes.h>
    #include "iota_client_service/config.h"
    #include "iota_client_service/client_service.h"

    #include "iota_client_service/config.h"
    ```

2. Define a seed for which to generate an address

    ```cpp
    static tryte_t const *const SEED =
        (tryte_t *)"G9JEMIRJKUXDKUPPAIMEQSGVADYLSJRSBTEIRDWSCTLCVQOJWBM9XESTWTSONOTDDQUXMYCNVAKZWPPYW";
    ```

3. Use the [`get_new_address()`](https://github.com/iotaledger/entangled/blob/develop/cclient/api/extended/get_new_address.h) method to generate an unspent address

    ```cpp
    flex_trit_t seed[FLEX_TRIT_SIZE_243];

    // Convert the seed from trytes to trits
    // For more information about trits and trytes, see the IOTA documentation portal: https://docs.iota.org/docs/getting-started/0.1/introduction/ternary
    if (flex_trits_from_trytes(seed, NUM_TRITS_ADDRESS, SEED, NUM_TRYTES_ADDRESS, NUM_TRYTES_ADDRESS) == 0) {
        printf("Failed to convert trytes to trits\n");
        return ret;
    }

    // Set the options to get one new address
    address_opt_t opt = {.security = SECURITY_LEVEL, .start = 0, .total = 0};

    // Get the new address and print it to the console
    if ((ret = iota_client_get_new_address(s, seed, opt, &addresses)) == RC_OK) {
        printf("Your new address is: ");
        flex_trit_print(addresses->prev->hash, NUM_TRITS_ADDRESS);
        printf("\n");
    } else {
        printf("Failed to get a new address: Error code %s\n", error_2_string(ret));
    }
    // Free the object
    hash243_queue_free(&addresses);

    return ret;
    ```

Starting from the given `start` index, the connected node checks if the address is spent by doing the following:

- Search its view of the Tangle for input transactions that withdraw from the address
- Search for the address in the list of spent addresses

If an address with the given index is spent, the index is incremented until the node finds one that isn't spent.

:::warning:
This way of generating addresses replies on the node to return valid data about your addresses. To have more control over your addresses, we recommend keeping track of spent addresses in your own local database.
:::

In the console, you should see an address.

```
Your address is: WKJDF9LVQCVKEIVHFAOMHISHXJSGXWBJFYEQPOQKSVGZZFLTUUPBACNQZTAKXR9TFVKBGYSNSPHRNKKHA
```

:::success:Congratulations :tada:
You've just generated a new unspent address. You can share this address with anyone who wants to send you a transaction.
:::

## Run the code

These code samples are hosted on [GitHub](https://github.com/iota-community/c-iota-workshop).

To get started you need [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed on your device.

You also need a C development environment. If this is your first time using the C client library, complete our [getting started guide](../../getting-started/c-quickstart.md).

In the command-line, do the following:

```bash
git clone https://github.com/iota-community/c-iota-workshop.git
cd c-iota-workshop
bazel run -c opt examples:generate_address
```

In the console, you should see an address.

```
Your address is: WKJDF9LVQCVKEIVHFAOMHISHXJSGXWBJFYEQPOQKSVGZZFLTUUPBACNQZTAKXR9TFVKBGYSNSPHRNKKHA
```

## Next steps

[Send test IOTA tokens to your new address](../c/transfer-iota-tokens.md).
