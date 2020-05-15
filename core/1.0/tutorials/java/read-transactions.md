# Read transactions from the Tangle in Java

**In this tutorial, you read your "hello world" [transaction](root://getting-started/0.1/transactions/transactions.md) from the Tangle by giving a [node](root://getting-started/0.1/network/nodes.md) your tail transaction hash.**

## IOTA network

In this tutorial, we connect to a node on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet).

## Code walkthrough

1. Import the classes

    ```java
    import java.io.IOException;
    import java.util.List;

    import com.fasterxml.jackson.core.JsonParseException;
    import com.fasterxml.jackson.databind.JsonMappingException;

    import org.iota.jota.IotaAPI;
    import org.iota.jota.error.ArgumentException;
    import org.iota.jota.model.Transaction;
    import org.iota.jota.utils.TrytesConverter;
    ```
2. Connect to a node

    ```java
    IotaAPI api = new IotaAPI.Builder()
            .protocol("https")
            .host("nodes.devnet.thetangle.org")
            .port(443)
            .build();
    ```

3. Define the tail transaction hash of the bundle 

    ```java
    String tailTransactionHash = "GUQXLBNYXSEVNAPNJ9L9ADZIHBHRVEH9VZURPUHGQEVAFCWIDKQWTKYPOFALYZNOWGRJQURNQBGFGQDM9";
    ```

    :::info:
    We use the tail transaction hash because the `signatureMessageFragment` field is part of the hash. Therefore, the message in the transaction is immutable.

    If you were to use the bundle hash, you may see a different message because anyone can change the message in the tail transaction and attach a copy of the bundle to the Tangle.
    :::

4. Use the `getBundle()` method to get all transactions in the tail transaction's bundle. Then, get the message in the first transaction's `signatureMessageFragment` field, decode it, and print it to the console

    ```java
    try { 
        GetBundleResponse response = api.getBundle("GUQXLBNYXSEVNAPNJ9L9ADZIHBHRVEH9VZURPUHGQEVAFCWIDKQWTKYPOFALYZNOWGRJQURNQBGFGQDM9");
        System.out.println(TrytesConverter.trytesToAscii(response.get(0).getSignatureFragments().substring(0,2186)));
    } catch (ArgumentException e) { 
        // Handle error
        e.printStackTrace(); 
    }
    ```

    In the console, you should see your message:

    ```json
    "Hello world"
    ```

:::success:Congratulations :tada:
You've just found and read a transaction from the Tangle.
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
mvn exec:java -Dexec.mainClass="com.iota.ReadData"
```
---
### Windows
```bash
git clone https://github.com/iota-community/java-iota-workshop.git
cd java-iota-workshop
mvn clean install
mvn exec:java -D"exec.mainClass"="com.iota.ReadData"
```
--------------------

In the console, you should see your message:

```json
"Hello world"
```

## Next steps

[Generate a new address](../java/generate-an-address.md).

