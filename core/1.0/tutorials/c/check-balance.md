# Check the balance of an address in C

**In this tutorial, you request the balance of [IOTA tokens](root://getting-started/0.1/clients/token.md) on [addresses](root://getting-started/0.1/clients/addresses.md) from a [node](root://getting-started/0.1/network/nodes.md).**

## IOTA network

In this tutorial, we connect to a node on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet).

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
    ```

2. Define the address whose balance you want to check and convert it to trits

    ```cpp
    static tryte_t const *const ADDRESS =
        (tryte_t *)"TOKLOARHKXQCVPPVVIPIJGLUTLTKFHYGMBBLOXJFYGSARLOTYFFSDZNYCOBOCNPGRMJWZCQBNOROUCE9G";

    flex_trit_t hash[FLEX_TRIT_SIZE_243];

    // Convert the trytes to trits
    if (flex_trits_from_trytes(hash, NUM_TRITS_HASH, ADDRESS, NUM_TRYTES_HASH, NUM_TRYTES_HASH) == 0) {
        printf("Error: converting flex_trit failed\n");
        goto done;
    }
    ```

3. Use the [`get_balances()`](https://github.com/iotaledger/entangled/blob/develop/cclient/api/core/get_balances.h) method to ask the node for the current balance of the address

    ```cpp
    // Set the threshold (this is not used but we must set it)
    balance_req->threshold = 100;

    if ((ret_code = iota_client_get_balances(service, balance_req, balance_res)) == RC_OK) {
        hash243_queue_entry_t *q_iter = NULL;
        size_t balance_cnt = get_balances_res_balances_num(balance_res);
        printf("balances: [");
        for (size_t i = 0; i < balance_cnt; i++) {
            printf(" %" PRIu64 " ", get_balances_res_balances_at(balance_res, i));
        }
        printf("]\n");

        CDL_FOREACH(balance_res->references, q_iter) {
            printf("Milestone tail transaction hash: ");
            flex_trit_print(q_iter->hash, NUM_TRITS_HASH);
            printf("\n");
        }
    }

    done:

    // Free the objects
    get_balances_req_free(&balance_req);
    get_balances_res_free(&balance_res);

    return ret_code;
    ```

    In the console, you should see a balance of IOTA tokens as well as the transaction hash of the latest milestone that confirmed your balance:

    ```
    balances: [ 0 ]
    Milestone tail transaction hash: MY9BYZKEPBBKBKNIJZSHVTRDVFLCJWVPQPTYUJ9FZ9XG9YRYMSERPBOK9OGOEEYIWLOCHOJNLRKIXW999
    Check balances done
    ```

:::success:Congratulations :tada:
You've just checked the balance of an address.
:::

## Run the code

These code samples are hosted on [GitHub](https://github.com/iota-community/c-iota-workshop).

To get started you need [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed on your device.

You also need a C development environment. If this is your first time using the C client library, complete our [getting started guide](../../getting-started/c-quickstart.md).

In the command-line, do the following:

```bash
git clone https://github.com/iota-community/c-iota-workshop.git
cd c-iota-workshop
bazel run -c opt examples:check_balances
```

In the console, you should see a balance of IOTA tokens as well as the transaction hash of the latest milestone that confirmed your balance:

```
balances: [ 0 ]
Milestone tail transaction hash: MY9BYZKEPBBKBKNIJZSHVTRDVFLCJWVPQPTYUJ9FZ9XG9YRYMSERPBOK9OGOEEYIWLOCHOJNLRKIXW999
Check balances done
```

## Next steps

You can also check the balance of an address, using a utility such as the [Tangle explorer](https://utils.iota.org).

Take a look at our [app blueprints](root://blueprints/0.1/introduction/overview.md) for inspiration.