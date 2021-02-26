# Send a "hello world" transaction in Java

**In this tutorial, you send a "hello world" message in a zero-value transaction. These transactions are useful for storing messages in the Tanglewithout having to send any IOTA tokens.**

## IOTA network

In this tutorial, we connect to a node in the [Devnet](root://getting-started/1.1/networks/overview.md).

## Code walkthrough

1. Import the classes

    ```java
    package com.iota;

    import java.util.ArrayList;

    import org.iota.jota.IotaAPI;
    import org.iota.jota.dto.response.SendTransferResponse;
    import org.iota.jota.error.ArgumentException;
    import org.iota.jota.model.Transfer;
    import org.iota.jota.utils.SeedRandomGenerator;
    import org.iota.jota.utils.TrytesConverter;
    ```
    
2. Connect to a node

    ```java
   IOTAAPI api = new IotaAPI.Builder()
            .protocol("https")
            .host("nodes.devnet.iota.org")
            .port(443)
            .build();
    ```

3. Define the depth and the minimum weight magnitude

    ```java
    int depth = 3;
    int minimumWeightMagnitude = 9;
    ```

4. Define an address to which you want to send a message

    ```java
    String address = "ZLGVEQ9JUZZWCZXLWVNTHBDX9G9KZTJP9VEERIIFHY9SIQKYBVAHIMLHXPQVE9IXFDDXNHQINXJDRPFDXNYVAPLZAW";
    ```

    :::info:
    This address does not have to belong to anyone. To be valid, the address just needs to consist of 81 trytes. For more information about trytes, see [Ternary](root://getting-started/1.1/the-tangle/ternary.md).
    :::

5. Define a seed and a security level

    ```java
    String myRandomSeed = SeedRandomGenerator.generateNewSeed();

    int securityLevel = 2;
    ```

    :::info:
    Because this is a zero-value transaction, the seed and the security level are not used. However, the library expects a valid seed, so we use a random string of 81 characters. If you enter a seed that consists of less than 81 characters, the library will append 9s to the end of it to make 81 characters.
    :::

6. Create a message that you want to send to the address and convert it to trytes

    ```java
    String message = TrytesConverter.asciiToTrytes("Hello world");
    String tag = "HELLOWORLD";
    ```

    :::info:
    The `AsciiToTrytes()` method supports only [basic ASCII characters](https://en.wikipedia.org/wiki/ASCII#Printable_characters). As a result, diacritical marks such as accents and umlauts aren't supported and result in an `INVALID_ASCII_CHARS` error.
    :::

7. Define a zero-value transaction that sends the message to the address

    ```java
    int value = 0;

    Transfer zeroValueTransaction = new Transfer(address, value, message, tag);
        
    ArrayList<Transfer> transfers = new ArrayList<Transfer>();

    transfers.add(zeroValueTransaction);
    ```

8. To create a bundle from your `Transfers` object, pass it to the [`sendTransfer()`](https://github.com/iotaledger/iota-java/blob/dev/docs/iota-java/sendTransfer.md) method, which handles tip selection, remote proof of work, and sending the bundle to the node. For details about this process, see [Sending transactions](root://getting-started/1.1/first-steps/sending-transactions.md).

    ```java
    try { 
        SendTransferResponse response = api.sendTransfer(myRandomSeed, securityLevel, depth, minimumWeightMagnitude, transfers, null, null, false, false, null);
        System.out.println(response.getTransactions());
    } catch (ArgumentException e) { 
        // Handle error
        e.printStackTrace(); 
     }
    ```

    In the console, you should see the tail transaction that you just sent.

:::success:Congratulations :tada:
You've just sent your first zero-value transaction. Your transaction is attached to the Tangle, and will be forwarded to the rest of the network.

You can use this tail transaction hash to read the transaction from the Tangle.
:::

:::warning:
Nodes can delete old transactions from their local copies of the Tangle. Therefore, a time may come where you request your transaction from a node, but the IOTA node doesn't have it anymore.

If you want to store data in the Tangle for extended periods of time, we recommend [running your own node](root://node-software/1.0/overview.md).
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
mvn exec:java -Dexec.mainClass="com.iota.SendData"
```
---
### Windows
```bash
git clone https://github.com/iota-community/java-iota-workshop.git
cd java-iota-workshop
mvn clean install
mvn exec:java -D"exec.mainClass"="com.iota.SendData"
```
--------------------

In the console, you should see the tail transaction hash of the bundle you just sent.

## Next steps

Make a note of the transaction's hash so you can [read the transaction from the Tangle](../java/read-transactions.md) to see your message.

You can also read your transaction, using a utility such as the [Tangle explorer](https://utils.iota.org).
