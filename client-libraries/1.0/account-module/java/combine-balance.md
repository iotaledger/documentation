# Combine your balance into one CDA in Java

**You may want to keep the majority of your balance on as few conditional deposit addresses (CDA) as possible. This way, making payments is faster and requires fewer transactions. In this tutorial, you transfer your entire available balance to a new CDA.**

## IOTA network

In this tutorial, we connect to a node in the [Devnet](root://getting-started/1.1/networks/overview.md).

## Code walkthrough

1. Create a CDA that has your account's total available balance as its expected amount

    ```java
	Date timeoutAt = new Date(System.currentTimeMillis() + 24000 * 60 * 60);

    ConditionalDepositAddress cda = account.newDepositAddress(timeoutAt, true, account.availableBalance()).get();
    ```

    :::info:
    You account's available balance is the total balance of all expired CDAs. This balance is safe to withdraw because no one should transfer IOTA tokens to an expired CDA.

    Your account's total balance includes CDAs that are still active as well as expired.
    :::

2. Transfer your total available balance to the CDA

    ```java
    Bundle bundle = account.send(
        cda.getDepositAddress().getHashCheckSum(), 
        cda.getRequest().getExpectedAmount(), 
        Optional.of("Sweep of all addresses"),
        Optional.of("IOTA9SWEEP")).get();
    System.out.printf("Sent deposit to %s in the bundle with the following tail transaction hash %s\n",
    bundle.getTransactions().get(bundle.getLength() - 1).getAddress(), bundle.getTransactions().get(bundle.getLength() - 1).getHash());
    ```

:::success:
Now your total available balance is in a single address.
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
mvn exec:java -Dexec.mainClass="com.iota.CombineBalance"
```
---
### Windows
```bash
git clone https://github.com/iota-community/account-module.git
cd account-module/java/account-module
mvn clean install
mvn exec:java -D"exec.mainClass"="com.iota.CombineBalance"
```
--------------------

You should see that the deposit was sent.

Your seed state will contain this pending bundle until it is confirmed.

## Next steps

[Try exporting your seed state so you back it up or import it onto another device](../java/export-seed-state.md).