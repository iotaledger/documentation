# Import/export an existing seed state in Java

**When you use your account to make payments, your account updates your seed state. In this tutorial, you learn how to export your account's seed state so that you can import it on another device or simply back it up.**

## IOTA network

In this tutorial, we connect to a node on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet).

## Code walkthrough

1. Export your seed state by passing your account's ID to the `exportAccount()` method

    ```java
    ExportedAccountState state = store.exportAccount(account.getId());
    ```

2. Create a JSON file to which to save your seed state

    ```java
    BufferedWriter writer = new BufferedWriter(new FileWriter("exported-seed-state-database.json"));
    ```

3. Serialize your seed state and save it to a file

    ```java
    ObjectMapper mapper = new ObjectMapper();
        try {
        String json = mapper.writeValueAsString(state);
        System.out.println("ResultingJSONstring = " + json);
        writer.write(json);
        writer.close();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            account.shutdown();
    }
    ```

    :::info:
    It's best practice to back up your seed state at regular intervals.
    :::

4. Read your exported seed state, deserialize it, and import it into your account

    ```java
    mapper = new ObjectMapper();
    // Ignore new fields
    mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    
    try {

        FileReader readState = new FileReader("exported-seed-state-database.json");

        state = mapper.readValue(readState, ExportedAccountState.class);

        store.importAccount(state);

        System.out.println("Seed state imported");
    } catch (JsonProcessingException e) {
        e.printStackTrace();
    }
    ```

    :::warning:
    When you import a seed state, you overwrite any existing seed state in your account's database.
    :::

:::success:Congratulations! :tada:
You've learned how to export and import your seed state.
:::

## Run the code

These code samples are hosted on [GitHub](https://github.com/iota-community/account-module).

To get started you need [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed on your device.

You also need a Java development environment that uses the [Maven](https://maven.apache.org/download.cgi) build tool.

In the command-line, do the following:

--------------------
### Linux and macOS
```bash
git clone https://github.com/iota-community/account-module.git
cd account-module/java/account-module
mvn clean install
mvn exec:java -Dexec.mainClass="com.iota.ExportAccount"
```
---
### Windows
```bash
git clone https://github.com/iota-community/account-module.git
cd account-module/java/account-module
mvn clean install
mvn exec:java -D"exec.mainClass"="com.iota.ExportAccount"
```
--------------------

You should have an `exported-seed-state.json` file that contains your seed state. You can use this file to import your seed state on another device.

## Next steps

Take a look at the [source code](https://github.com/iotaledger/iota-java/tree/dev/jota/src/main/java/org/iota/jota) to continue learning about the account module.