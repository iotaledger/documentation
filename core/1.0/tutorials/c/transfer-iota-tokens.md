# Send a micropayment in C

**In this tutorial, you send a micropayment of 1 IOTA by sending a [transfer bundle](root://getting-started/0.1/transactions/bundles.md) to a [node](root://getting-started/0.1/network/nodes.md).**

## IOTA network

In this tutorial, we connect to a [node](root://getting-started/0.1/network/nodes.md) on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet) with the following network settings:

- **[Minimum weight magnitude](root://getting-started/0.1/network/minimum-weight-magnitude.md)**: 9

- **[Depth](root://getting-started/0.1/transactions/depth.md)**: 3

These settings are defined in a `config.h` file, which we create in the [getting started guide](../../getting-started/c-quickstart.md).

## Step 1. Get test IOTA tokens

To send test IOTA tokens on the Devnet, the nodes must have a record of a greater than 0 balance for one of the addresses that belongs to your seed. To get test IOTA tokens to use on the Devnet, you can use the Devnet faucet.

1\. Create a new seed and back it up

--------------------
### Linux
```bash
cat /dev/urandom |tr -dc A-Z9|head -c${1:-81}
```
---
### macOS
```bash
cat /dev/urandom |LC_ALL=C tr -dc 'A-Z9' | fold -w 81 | head -n 1
```
---
### Windows PowerShell
```bash
$b=[byte[]] (1..81);(new-object Security.Cryptography.RNGCryptoServiceProvider).GetBytes($b);-join($b|%{[char[]] (65..90+57..57)[$_%27]})
```
--------------------

2\. [Generate a new address for your seed](../c/generate-an-address.md)

3\. Copy and paste your address into the [Devnet faucet](https://faucet.devnet.iota.org), then wait for the tokens to be transferred to your address

## Step 2. Create and send a transfer bundle

To transfer your test tokens from one address to another, you need to create and send a transfer bundle. This bundle needs an input transaction to withdraw the IOTA tokens from your address and an output transaction to deposit them into another address.

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

2. Define your seed. Replace this seed with one that owns an address with test IOTA tokens

    ```cpp
    static tryte_t const *const MY_SEED =
    (tryte_t *)"HFYPTJZIVDJ9TQTQPIJXRXVJVOBOXAHZYZMVQBMFQYEAITJZKPHKUKERFQNAXNVTJRAHBGFJJIZTOTGJC";
    ```

    :::info:
    Because this bundle transfers IOTA tokens, the seed is used to sign it. Therefore, this seed's addresses must contain at least 1 IOTA token.
    :::

3. Define the address to which you want to send your IOTA token

    ```cpp
    static tryte_t const *const RECEIVER_ADDR =
    (tryte_t *)"ZLGVEQ9JUZZWCZXLWVNTHBDX9G9KZTJP9VEERIIFHY9SIQKYBVAHIMLHXPQVE9IXFDDXNHQINXJDRPFDX";
    ```

4. Create a `transfers` array that specifies the amount of IOTA tokens you want to transfer and the address to send the tokens to

    ```cpp
    // Define an input transaction object
    // that sends 1 i to the address
    transfer_t tf = {};
    // Convert the seed from trytes to trits
    flex_trit_t seed[NUM_FLEX_TRITS_ADDRESS];
    flex_trits_from_trytes(seed, NUM_TRITS_ADDRESS, MY_SEED, NUM_TRYTES_ADDRESS, NUM_TRYTES_ADDRESS);

    // Convert the receiver's address from trytes to trits
    flex_trits_from_trytes(tf.address, NUM_TRITS_ADDRESS, RECEIVER_ADDR, NUM_TRYTES_ADDRESS, NUM_TRYTES_ADDRESS);

    // Convert the transaction tag from trytes to trits
    flex_trits_from_trytes(tf.tag, NUM_TRITS_TAG, (const tryte_t *)"CCLIENT99999999999999999999", NUM_TRYTES_TAG,
                            NUM_TRYTES_TAG);

    // The amount of IOTA tokens to send to the receiver's address
    tf.value = 1;

    transfer_array_add(transfers, &tf);
    ```

5. To create a bundle from your `transfers` array, pass it to the [`iota_client_send_transfer()`](https://github.com/iotaledger/entangled/blob/develop/cclient/api/extended/send_transfer.h) method, which handles [tip selection](root://node-software/0.1/iri/concepts/tip-selection.md), [remote proof of work](root://getting-started/0.1/transactions/proof-of-work.md), and sending the bundle to the node

    ```go
    // Create a bundle from the transfers array and send it to the node
    ret_code = iota_client_send_transfer(s, seed, SECURITY_LEVEL, TIP_SELECTION_DEPTH, MINIMUM_WEIGHT_MAGNITUDE, false, transfers, NULL, NULL, NULL, bundle);

    printf("Sending 1 i to %s\n", RECEIVER_ADDR);
    printf("Send transfer function %s\n", error_2_string(ret_code));
    if (ret_code == RC_OK) {
        flex_trit_t const *bundle_hash = bundle_transactions_bundle_hash(bundle);
        printf("Bundle hash: ");
        flex_trit_print(bundle_hash, NUM_TRITS_HASH);
        printf("\n");
    }

    // Free the objects
    bundle_transactions_free(&bundle);
    transfer_message_free(&tf);
    transfer_array_free(transfers);
    ```

    This method asks the node to check the balance of your seed's addresses. If your addresses have enough IOTA tokens to complete the transfer, the method creates input transactions to withdraw the full balance from enough of your addresses to fulfill the transfer. Then, the method adds those transactions to the transfer bundle and signs the bundle with the private keys of any withdrawn addresses.

    :::info:
    Your seed never leaves your device. The library generates addresses and sends them to the node.
    :::

    If the amount you want to transfer is less than the balance of your withdrawn addresses, the method creates another output transaction to transfer the remainder to an unspent address that belongs to your seed.

    In the console, you should see information about the bundle that you just sent:

    ```
    Sending 1 i to RJBYLCIOUKWJVCUKZQZCPIKNBUOGRGVXHRTTE9ZFSCGTFRKELMJBDDAKEYYCLHLJDNSHQ9RTIUIDLMUOB
    Send transfer function OK
    Bundle hash: OLEIHCDXBBQNU9TAAKQGRPTJFAH9RDXIGYIKKGXVUHNLGJLARH9RGISYEHNNIWGWYNKDRUZELOGRAIILD
    Sent IOTA tokens
    ```

:::success:Congratulations :tada:
You've just sent your first transfer bundle. Your transactions are attached to the Tangle and will be forwarded to the rest of the network. Now, you just need to wait until the transaction is confirmed for your balance to be updated.
:::

## Run the code

These code samples are hosted on [GitHub](https://github.com/iota-community/c-iota-workshop).

To get started you need [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed on your device.

You also need a C development environment. If this is your first time using the C client library, complete our [getting started guide](../../getting-started/c-quickstart.md).

In the command-line, do the following:

```bash
git clone https://github.com/iota-community/c-iota-workshop.git
cd c-iota-workshop
bazel run -c opt examples:send_tokens
```

In the console, you should see information about the bundle that you just sent:

```
Sending 1 i to RJBYLCIOUKWJVCUKZQZCPIKNBUOGRGVXHRTTE9ZFSCGTFRKELMJBDDAKEYYCLHLJDNSHQ9RTIUIDLMUOB
Send transfer function OK
Bundle hash: OLEIHCDXBBQNU9TAAKQGRPTJFAH9RDXIGYIKKGXVUHNLGJLARH9RGISYEHNNIWGWYNKDRUZELOGRAIILD
Sent IOTA tokens
```

## Next steps

[Check the balance of your address](../c/check-balance.md).

In this scenario, you wouldn't know in advance whether the address is spent during the time it takes to create and send your bundle.

For example, you are online shopping and the checkout has a QR code that gives you the option to pay in IOTA tokens. This QR code contains an address that is auto-populated in Trinity.

During the time it takes you to complete the checkout and send your transfer bundle, the website owner withdraws IOTA tokens from the address in the QR code. Now that address is spent, and you have just sent IOTA tokens to it.

To help stop this from happening, we recommend using the [account module](../../account-module/introduction/overview.md) to create conditional deposit addresses that specify whether they are active or expired.

At the moment, the account module is available in the following languages:

- Go
- Java
- JavaScript