# Read transactions from the Tangle in C

**In this tutorial, you get [transactions](root://getting-started/0.1/transactions/transactions.md) from the Tangle by connecting to a [node](root://getting-started/0.1/network/nodes.md) and asking it to filter them by their addresses. Then, you decode the message in the transaction and print it to the console.**

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

2. Define the address that you want to use to filter transactions and convert it to trits

    ```cpp
    static tryte_t const *const ADDRESS =
        (tryte_t *)"ZLGVEQ9JUZZWCZXLWVNTHBDX9G9KZTJP9VEERIIFHY9SIQKYBVAHIMLHXPQVE9IXFDDXNHQINXJDRPFDXNYVAPLZAW";

    flex_trit_t hash[FLEX_TRIT_SIZE_243];

    // Convert the address from trytes to trits
    if (flex_trits_from_trytes(hash, NUM_TRITS_HASH, address, NUM_TRYTES_HASH, NUM_TRYTES_HASH) == 0) {
        printf("Failed to convert trytes to trits\n");
        goto done;
    }
    ```

    :::info:
    The C library expects all transaction fields to be in trits.
    :::

3. Use the [`find_transaction_objects()`](https://github.com/iotaledger/entangled/blob/develop/cclient/api/extended/find_transaction_objects.h) method to get transactions by the value of their `address` field. Then, decode the message in the `signatureMessageFragment` fields of the transactions and print it to the console

    ```cpp
    // Add the address trits to find_transactions_req_t
    if ((ret_code = hash243_queue_push(&find_tran->addresses, hash)) != RC_OK) {
        printf("Error: push queue %s\n", error_2_string(ret_code));
        goto done;
    }

    // Find any transactions that were sent to the address
    if ((ret_code = iota_client_find_transaction_objects(s, find_tran, out_tx_objs)) == RC_OK) {
        // Print the total number of transactions that the node returned
        printf("find transaction count: %lu\n", transaction_array_len(out_tx_objs));
        iota_transaction_t *tx1 = transaction_array_at(out_tx_objs, TX_INDEX);
        // Print information about the first transaction that was found
        if (tx1) {
            printf("dump first transaction:\n");
            printf("value = %" PRId64 ", current_index in the bundle = %" PRIu64 ", last_index of the bundle = %" PRIu64 "\n", transaction_value(tx1),
                    transaction_current_index(tx1), transaction_last_index(tx1));
            printf("address: ");
            flex_trit_print(transaction_address(tx1), NUM_TRITS_ADDRESS);
            printf("\n");

            // Print the value in the transaction's signatureMessageFragment field
            printf("data: ");
            tryte_t * trytes = transaction_message(tx1);
            size_t tryte_size = strlen((char*)trytes);
            char buffer[tryte_size / 2 + 1];
            trytes_to_ascii(trytes, tryte_size, buffer);

            printf("%s\n", buffer);
        }
    } else {
        printf("Error: %s \n", error_2_string(ret_code));
    }

    done:
    // Free the objects
    find_transactions_req_free(&find_tran);
    transaction_array_free(out_tx_objs);

    return ret_code;
    ```

    In the console, you should see information about the transaction and its message:

    ```
    find transaction count: 84
    dump first transaction:
    value = 0, curr_index = 0, last_index = 0
    addr: ZLGVEQ9JUZZWCZXLWVNTHBDX9G9KZTJP9VEERIIFHY9SIQKYBVAHIMLHXPQVE9IXFDDXNHQINXJDRPFDX
    data: Hello world
    Transaction read
    ```

:::success:Congratulations :tada:
You've just found and read a transaction from the Tangle.
:::

## Run the code

These code samples are hosted on [GitHub](https://github.com/iota-community/c-iota-workshop).

To get started you need [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed on your device.

You also need a C development environment. If this is your first time using the C client library, complete our [getting started guide](../../getting-started/c-quickstart.md).

In the command-line, do the following:

```bash
git clone https://github.com/iota-community/c-iota-workshop.git
cd c-iota-workshop
bazel run -c opt examples:receive_hello
```

In the console, you should see information about the transaction and its message:

```
find transaction count: 84
dump first transaction:
value = 0, curr_index = 0, last_index = 0
addr: ZLGVEQ9JUZZWCZXLWVNTHBDX9G9KZTJP9VEERIIFHY9SIQKYBVAHIMLHXPQVE9IXFDDXNHQINXJDRPFDX
data: Hello world
Transaction read
```

## Next steps

[Generate a new address](../c/generate-an-address.md).

