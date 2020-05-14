# Connect to custom nodes

**Trinity interacts with the [Tangle](root://getting-started/0.1/network/the-tangle.md) through a [quorum](../concepts/node-quorum.md) of default nodes. In this tutorial, you learn how to add one of your own nodes to the quorum, connect to a quorum of custom nodes such as those on the [Devnet](root://getting-started/0.1/network/iota-networks.md), or connect to a specific node to use for outsourced proof of work.**

:::danger:
On 11 February 2020, the IOTA Foundation became aware of an attack on the Trinity wallet, during which some users’ seeds and Trinity passwords were compromised. Please check our advice for [protecting your Trinity account](../how-to-guides/protect-trinity-account.md).
:::

![Node management in Trinity](../images/node-management.png)

## Connect Trinity to custom nodes

As well as connecting to a single custom node, you can also add multiple custom nodes and use them as a node quorum. This way, you aren't restricted to using the built-in remote list of Trinity nodes.

--------------------
### Desktop

1. Go to **Trinity** > **Settings** > **Node** > **Add custom nodes**,  and enter the URL or IP address of the nodes you want to add

    All nodes in Trinity must communicate over HTTPS.

2. If you want to outsource [proof of work](root://getting-started/0.1/transactions/proof-of-work.md), enable the **Outsource proof of work** option

    By default proof of work is done on the device that is running Trinity.

3. Disable the **Automatic node management** option to be able to connect to a specific node

4. Disable the **Primary node autoswitching** option to make sure that Trinity always tries to connect to your chosen node

    When enabled, this option allows Trinity to connect to one of its default nodes if the primary one goes offline. By disabling this option, Trinity won't be able to connect to any nodes if the primary node goes offline.

5. Select your node from the dropdown menu

    If your custom node is a Devnet node, you must also disable the **Use remote list** option. The nodes in that list are Mainnet nodes, so they're incompatible with the Devnet.

6. If you added more than one custom node, choose the size of your node quorum

7. Click **Save**
---
### Mobile

1. Go to **Settings** > **Node** > **Add custom nodes**,  and enter the URL or IP address of the nodes you want to add

    All nodes in Trinity must communicate over HTTPS.

2. If you want to outsource [proof of work](root://getting-started/0.1/transactions/proof-of-work.md), enable the **Outsource proof of work** option

    By default proof of work is done on the device that is running Trinity.

3. Disable the **Automatic node management** option to be able to connect to a specific node

4. Disable the **Primary node autoswitching** option to make sure that Trinity always tries to connect to your chosen node

    When enabled, this option allows Trinity to connect to one of its default nodes if the primary one goes offline. By disabling this option, Trinity won't be able to connect to any nodes if the primary node goes offline.

5. Select your node from the dropdown menu

    If your custom node is a Devnet node, you must also disable the **Use remote list** option. The nodes in that list are Mainnet nodes, so they're incompatible with the Devnet.

6. If you added more than one custom node, choose the size of your node quorum

7. Click **Save**
--------------------

:::success:
All the information that Trinity displays about the Tangle is now sent from your custom nodes.
:::

## Next steps

[Send a transaction](../how-to-guides/send-a-transaction.md) to your new nodes.





