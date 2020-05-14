# Check the balance of an address in Python

**In this tutorial, you request the total balance of [IOTA tokens](root://getting-started/0.1/clients/token.md) on a seed's [addresses](root://getting-started/0.1/clients/addresses.md) from a [node](root://getting-started/0.1/network/nodes.md).**

## Packages

To complete this guide, you need to install the following package:

```bash
pip install pyota
```

## IOTA network

In this tutorial, we connect to a node on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet).

## Code walkthrough

1. Import the packages

    ```python
    from iota import Iota
    ```

2. Define your seed. Replace this seed with one that owns an address with test IOTA tokens

    ```python
    seed = 'JBN9ZRCOH9YRUGSWIQNZWAIFEZUBDUGTFPVRKXWPAUCEQQFS9NHPQLXCKZKRHVCCUZNF9CZZWKXRZVCWQ'
    ```

3. Connect to a node

    ```python
    api = Iota('https://nodes.devnet.iota.org:443', seed)
    ```

4. Use the [`get_account_data()`](https://pyota.readthedocs.io/en/latest/api.html#get-account-data) method to ask the node for the current balance of the seed's addresses

    ```python
    balance = api.get_account_data()
    print('The balance for your seed is: ', balance['balance'])
    ```

    :::info:
    This method starts from index 0 and asks the node if it has one or more input transactions that withdraw from the address. If the node has input transactions that withdraw from the address, the index is incremented and this process continues until an unspent address is found.
    :::

    In the console, you should see a balance of IOTA tokens:

    ```
    The balance for your seed is: 500
    ```

:::success:Congratulations :tada:
You've just checked the seed's balance.
:::

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code in the browser.

Click the green button to run the sample code in this guide and see the results in the window.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Check-the-balance-of-an-address-Python?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Next steps

[Listen for live transactions on the Tangle](../python/listen-for-transactions.md).

You can also check the balance of an address, using a utility such as the [Tangle explorer](https://utils.iota.org).
