# Generate an address in Java

**In this tutorial, you learn how to generate a new address for a seed with a given security level.**

## IOTA network

In this tutorial, we connect to a node in the [Devnet](root://getting-started/1.1/networks/overview.md).

## Code walkthrough

1. Import the classes

    ```java
    package com.iota;

    import org.iota.jota.IotaAPI;
    import org.iota.jota.builder.AddressRequest;
    import org.iota.jota.dto.response.GetNewAddressResponse;
    import org.iota.jota.error.ArgumentException;
    ```
2. Connect to a node

    ```java
   IOTAAPI api = new IotaAPI.Builder()
            .protocol("https")
            .host("nodes.devnet.iota.org")
            .port(443)
            .build();
    ```

3. Define the security level that you want to use for your address

    ```java
    int securityLevel = 2;
    ```

4. Define a seed for which to generate an address

    ```java
    String mySeed = "PUPTTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX";
    ```

5. Use the [`generateNewAddresses()`](https://github.com/iotaledger/iota-java/blob/dev/docs/iota-java/generateNewAddresses.md) method to generate an unspent address

    ```java
    try { 
        GetNewAddressResponse response = api.generateNewAddresses(new AddressRequest.Builder(mySeed, securityLevel).amount(1).checksum(true).build());
        System.out.printf("Your address is %s", response.getAddresses());
    } catch (ArgumentException e) { 
        // Handle error
        e.printStackTrace(); 
    }
    ```

Starting from the given index, the connected node checks if the address is spent by doing the following:

- Search its view of the Tangle for input transactions that withdraw from the address
- Search for the address in the list of spent addresses

If an address with the given index is spent, the index is incremented until the IOTA node finds one that isn't spent.

:::warning:
This way of generating addresses replies on the IOTA node to return valid data about your addresses. To have more control over your addresses, we recommend using the [account module](../../account-module/introduction/overview.md) to keep track of spent addresses in your own local database.
:::

In the console, you should see an address.

```
Your address is: WKJDF9LVQCVKEIVHFAOMHISHXJSGXWBJFYEQPOQKSVGZZFLTUUPBACNQZTAKXR9TFVKBGYSNSPHRNKKHA
```

:::success:Congratulations :tada:
You've just generated a new unspent address. You can share this address with anyone who wants to send you a transaction.
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
mvn exec:java -Dexec.mainClass="com.iota.GenerateAddress"
```
---
### Windows
```bash
git clone https://github.com/iota-community/java-iota-workshop.git
cd java-iota-workshop
mvn clean install
mvn exec:java -D"exec.mainClass"="com.iota.GenerateAddress"
```
--------------------

In the console, you should see an address.

```
Your address is: WKJDF9LVQCVKEIVHFAOMHISHXJSGXWBJFYEQPOQKSVGZZFLTUUPBACNQZTAKXR9TFVKBGYSNSPHRNKKHA
```

## Next steps

[Send test IOTA tokens to your new address](../java/transfer-iota-tokens.md).
