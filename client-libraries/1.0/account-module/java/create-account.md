# Create an account

**In this tutorial, you create an account to keep track of your seed state in a local database.**

## IOTA network

In this tutorial, we connect to a node in the [Devnet](root://getting-started/1.1/networks/overview.md).

## Code walkthrough

1\. Create a new seed and back it up

:::info:
Existing seeds are not safe to use because their state is unknown. As such, these seeds may have spent addresses that the account is not aware of.
:::

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

2\. Define the seed that your account will use

```java
String mySeed = "PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX";
```

3\. Connect to a node
   
```java
IotaAPI api = new IotaAPI.Builder()
                    
    .host("nodes.devnet.iota.org")
    
    .port(443)
    
    .protocol("https")
    
    .timeout(500)
    .build();
```

4\. Create a storage object to which the account can save the seed state. In this example, the seed state is stored in a JSON file.

```java
File file = new File("seed-state-database.json");
AccountStore store = new AccountFileStore(file);
```

5\. Build your account. If you don't specify any custom settings, the account uses the [defaults](https://github.com/iotaledger/iota-java/blob/dev/jota/src/main/java/org/iota/jota/config/types/IotaDefaultConfig.java).

```java
IotaAccount account = new IotaAccount.Builder(mySeed)
    // Connect to a node
    .api(api)
    // Connect to the database
    .store(store)
    // Set the minimum weight magnitude for the Devnet (default is 14)
    .mwm(9)
    // Set a security level for CDAs (default is 3)
    .securityLevel(2)
    .build();
```

6\. Start the account

```java
account.start();
```

When you start the account, you also start any of your account's plugins. The default plugins include the following:

- `IncomingTransferChecker`: Every 30 seconds, this plugin checks whether withdrawals from your account have been confirmed

- `OutgoingTransferChecker`: Every 10 seconds, this plugin checks whether deposits into your account have been confirmed

- `PromoterReattacher`: Every 10 seconds, this plugin [promotes or reattaches](root://getting-started/1.1/transfer-tokens/helping-a-transaction-confirm.md) any pending withdrawal or deposit transactions that the `TransferChecker` plugins find 

:::info:
You can customize the behavior of these plugins or build your own.
:::

7\. Check your account's balance

```java
long balance = account.availableBalance();

System.out.print("Your balance is: " + toIntExact(balance));

account.shutdown();
```

:::success:Congratulations! :tada:
You've created an account that will automatically promote and reattach transactions as well as manage the state of your seed.
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
mvn exec:java -Dexec.mainClass="com.iota.CreateAccount"
```
---
### Windows
```bash
git clone https://github.com/iota-community/account-module.git
cd account-module/java/account-module
mvn clean install
mvn exec:java -D"exec.mainClass"="com.iota.CreateAccount"
```
--------------------

You should see the balance of your new account.

You'll also have a JSON file that keeps track of your seed state.

## Next steps

After certain events happen in your account, it emits them, and allows you to listen for them. For example, you may want to monitor your account for new payments. To do so, you need to [create an event listener](../java/listen-to-events.md).

Or, you can [create a plugin](../java/create-plugin.md) that also emits events.
