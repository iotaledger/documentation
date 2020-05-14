# Send a micropayment in Java

**In this tutorial, you send a micropayment of 1 IOTA by sending a [transfer bundle](root://getting-started/0.1/transactions/bundles.md) to a [node](root://getting-started/0.1/network/nodes.md).**

## IOTA network

In this tutorial, we connect to a node on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet) with the following network settings:

- **[Minimum weight magnitude](root://getting-started/0.1/network/minimum-weight-magnitude.md)**: 9

- **[Depth](root://getting-started/0.1/transactions/depth.md)**: 3

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

2\. [Generate a new address for your seed](../java/generate-an-address.md)

3\. Copy and paste your address into the [Devnet faucet](https://faucet.devnet.iota.org), then wait for the tokens to be transferred to your address

## Step 2. Create and send a transfer bundle

To transfer your test tokens from one address to another, you need to create and send a transfer bundle. This bundle needs an input transaction to withdraw the IOTA tokens from your address and an output transaction to deposit them into another address.

1. Import the classes

    ```java
    package com.iota;

    import java.util.ArrayList;

    import org.iota.jota.IotaAPI;
    import org.iota.jota.dto.response.SendTransferResponse;
    import org.iota.jota.error.ArgumentException;
    import org.iota.jota.model.Transfer;
    ```

2. Connect to a node

    ```java
    IotaAPI api = new IotaAPI.Builder()
            .protocol("https")
            .host("nodes.devnet.thetangle.org")
            .port(443)
            .build();
    ```

3. Define the depth and the minimum weight magnitude

    ```java
    int depth = 3;
    int minimumWeightMagnitude = 9;
    ```

4. Define your seed and the security level of the address from which you want to withdraw the IOTA token. Replace this seed with one that owns an address with test IOTA tokens

    ```java
    String mySeed = "JBN9ZRCOH9YRUGSWIQNZWAIFEZUBDUGTFPVRKXWPAUCEQQFS9NHPQLXCKZKRHVCCUZNF9CZZWKXRZVCWQ";
    ```

    :::info:
    Because this bundle transfers IOTA tokens, the seed is used to sign it. Therefore, one of this seed's addresses must contain at least 1 IOTA token.
    :::

5. Define the address to which you want to send your IOTA token

    ```java
    String address = "ZLGVEQ9JUZZWCZXLWVNTHBDX9G9KZTJP9VEERIIFHY9SIQKYBVAHIMLHXPQVE9IXFDDXNHQINXJDRPFDXNYVAPLZAW";
    ```

6. Create a `Transfers` object that specifies the amount of IOTA tokens you want to transfer and the address to send the tokens to

    ```java
    int value = 1;

    Transfer Transaction = new Transfer(address, value);
    
    ArrayList<Transfer> transfers = new ArrayList<Transfer>();

    transfers.add(Transaction);
    ```

7. To create a transfer bundle from your `Transfers` object, pass it to the [`sendTransfer()`](https://github.com/iotaledger/iota-java/blob/dev/docs/iota-java/sendTransfer.md) method, which handles [tip selection](root://node-software/0.1/iri/concepts/tip-selection.md), [remote proof of work](root://getting-started/0.1/transactions/proof-of-work.md), and sending the bundle to the node

    ```java
    try {
        System.out.printf("Sending 1 i to %s", address);
        SendTransferResponse response = api.sendTransfer(mySeed, securityLevel, depth, minimumWeightMagnitude, transfers, null, null, false, false, null);
        System.out.println(response.getTransactions());
    } catch (ArgumentException e) { 
        // Handle error
        e.printStackTrace(); 
    }
    ```

    This method asks the node to check the balance of your seed's addresses that have the given security level. If your addresses have enough IOTA tokens to complete the transfer, the method creates input transactions to withdraw the full balance from enough of your addresses to fulfill the transfer. Then, the method adds those transactions to the transfer bundle and signs the bundle with the private keys of any withdrawn addresses.

    :::info:
    Your seed never leaves your device.
    
    The library generates addresses on your local device and sends them to the node.
    :::

    If the amount you want to transfer is less than the balance of your withdrawn addresses, the method creates another output transaction to transfer the remainder to an unspent address that belongs to your seed.

    In the console, you'll see the bundle of transactions that you just sent.

:::success:Congratulations :tada:
You've just sent your first transfer bundle. Your transactions are attached to the Tangle and will be forwarded to the rest of the network. Now, you just need to wait until the transaction is confirmed for your balance to be updated.
:::

## Run the code

These code samples are hosted on [GitHub](https://github.com/iota-community/java-iota-workshop).

To get started you need [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed on your device.

You also need a Java development environment that uses the [Maven](https://maven.apache.org/download.cgi) build tool.

In the command-line, do the following:

--------------------
### Linux and macOS
```bash
git clone https://github.com/iota-community/java-iota-workshop.git
cd java-iota-workshop
mvn clean install
mvn exec:java -Dexec.mainClass="com.iota.SendTokens"
```
---
### Windows
```bash
git clone https://github.com/iota-community/java-iota-workshop.git
cd java-iota-workshop
mvn clean install
mvn exec:java -D"exec.mainClass"="com.iota.SendTokens"
```
--------------------

In the console, you'll see the bundle of transactions that you just sent.

## Next steps

[Check the balance of your address](../java/check-balance.md).

In this scenario, you wouldn't know in advance whether the address is spent during the time it takes to create and send your bundle.

For example, you are online shopping and the checkout has a QR code that gives you the option to pay in IOTA tokens. This QR code contains an address that is auto-populated in Trinity.

During the time it takes you to complete the checkout and send your transfer bundle, the website owner withdraws IOTA tokens from the address in the QR code. Now that address is spent, and you have just sent IOTA tokens to it.

To help stop this from happening, we recommend using the [account module](../../account-module/introduction/overview.md) to create conditional deposit addresses that specify whether they are active or expired.