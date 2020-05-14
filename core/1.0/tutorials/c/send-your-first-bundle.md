# Send a "hello world" transaction in C

**In this tutorial, you send a "hello world" message in a zero-value transaction. These transactions are useful for storing messages on the [Tangle](root://getting-started/0.1/network/the-tangle.md) without having to send any [IOTA tokens](root://getting-started/0.1/clients/token.md).**

## IOTA network

In this tutorial, we connect to a [node](root://getting-started/0.1/network/nodes.md) on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet) with the following network settings:

- **[Minimum weight magnitude](root://getting-started/0.1/network/minimum-weight-magnitude.md)**: 9

- **[Depth](root://getting-started/0.1/transactions/depth.md)**: 3

These settings are defined in a `config.h` file, which we create in the [getting started guide](../../getting-started/c-quickstart.md).

## Code walkthrough

1. Import the packages

    ```cpp
    #include "cclient/api/core/core_api.h"
    #include "cclient/api/extended/extended_api.h"

    #include "common/trinary/tryte_ascii.h"
    #include <inttypes.h>
    #include "iota_client_service/config.h"
    #include "iota_client_service/client_service.h"
    ```
    
2. Define an [address](root://getting-started/0.1/clients/addresses.md) to which you want to send a message

    ```cpp
    static tryte_t const *const ADDRESS =
    (tryte_t *)"ZLGVEQ9JUZZWCZXLWVNTHBDX9G9KZTJP9VEERIIFHY9SIQKYBVAHIMLHXPQVE9IXFDDXNHQINXJDRPFDXNYVAPLZAW";
    ```

    :::info:
    This address does not have to belong to anyone. To be valid, the address just needs to consist of 81 [trytes](root://getting-started/0.1/introduction/ternary.md).
    :::

3. Create a message that you want to send to the address

    ```cpp
    char message[] = "Hello world";
    ```

    :::info:
    The library supports only [basic ASCII characters](https://en.wikipedia.org/wiki/ASCII#Printable_characters). As a result, diacritical marks such as accents and umlauts aren't supported and result in an error.
    :::

4. In a `transfers` array, define a zero-value transaction that sends the message to the address

    ```cpp
    bundle_transactions_t *bundle = NULL;
    bundle_transactions_new(&bundle);
    // Create a transfers array to which you can add transaction data
    transfer_array_t *transfers = transfer_array_new();

    transfer_t tf = {};

    // Convert the address from trytes to trits
    flex_trits_from_trytes(tf.address, NUM_TRITS_ADDRESS, ADDRESS, NUM_TRYTES_ADDRESS, NUM_TRYTES_ADDRESS);

    // Convert the ASCII message to trits and add it to the transfer object
    transfer_message_set_string(&tf, message);

    // Add the transfer object to the transfers array
    transfer_array_add(transfers, &tf);
    ```

    The library expects the values of the transaction fields in trits, so we convert the trytes to trits before adding them to the `transfer` object.

5. To create a bundle from your `transfers` array, pass it to the [`iota_client_send_transfer()`](https://github.com/iotaledger/entangled/blob/develop/cclient/api/extended/send_transfer.h) method, which handles [tip selection](root://node-software/0.1/iri/concepts/tip-selection.md), [remote proof of work](root://getting-started/0.1/transactions/proof-of-work.md), and sending the bundle to the node

    ```cpp
    // Create a bundle from the transfers array and send it to the node
    ret_code = iota_client_send_transfer(
            service, NULL, SECURITY_LEVEL, DEPTH,
            MINIMUM_WEIGHT_MAGNITUDE, false, transfers, NULL, NULL, NULL, bundle);

    printf("Send \'hello world\' %s\n", error_2_string(ret_code));
    if (ret_code == RC_OK) {
        flex_trit_t const *bundle_hash = bundle_transactions_bundle_hash(bundle);
        printf("Bundle hash: ");
        // Print the bundle hash to the console
        flex_trit_print(bundle_hash, NUM_TRITS_HASH);
        printf("\n");
    }

    // Free the objects
    bundle_transactions_free(&bundle);
    transfer_message_free(&tf);
    transfer_array_free(transfers);
    ```

    In the console, you should see the bundle hash of the transaction you just sent.

    ```
    Send 'hello world' OK
    Bundle hash: BIBGYLIABG9KZRJVBPZOTIHKDFXABHUSDWXLYQGFJNZDGNVHWFXABHRNXQBDHNRWNFNSKEKKIUJJH9PWC
    Transaction was sent.

    ```

:::success:Congratulations :tada:
You've just sent your first zero-value transaction. Your transaction is attached to the Tangle, and will be forwarded to the rest of the network. This transaction is now immutable.
:::

## Run the code

These code samples are hosted on [GitHub](https://github.com/iota-community/c-iota-workshop).

To get started you need [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed on your device.

You also need a C development environment. If this is your first time using the C client library, complete our [getting started guide](../../getting-started/c-quickstart.md).

In the command-line, do the following:

```bash
git clone https://github.com/iota-community/c-iota-workshop.git
cd c-iota-workshop
bazel run -c opt examples:send_hello
```

In the console, you should see the bundle hash of the transaction you just sent.

## Next steps

Make a note of the address to which you sent the transaction so you can [read the transaction from the Tangle](../c/read-transactions.md).

You can also read your transaction, using a utility such as the [Tangle explorer](https://utils.iota.org).
