# Create a seed

**You need a [seed](root://getting-started/0.1/clients/seeds.md) to prove your ownership of either messages and/or any [IOTA tokens](root://getting-started/0.1/clients/token.md) on your [addresses](root://getting-started/0.1/clients/addresses.md). In this tutorial, you create your own unique seed.**

To create a seed, you can either [create an account in Trinity](root://wallets/0.1/trinity/how-to-guides/create-an-account.md), or you can use one of the following options:

- Use the command line
- Use KeePass

## Use the command line

Command-line interfaces, such as [PowerShell in Windows](https://docs.microsoft.com/en-us/powershell/scripting/getting-started/getting-started-with-windows-powershell?view=powershell-6), the [Linux Terminal](https://www.howtogeek.com/140679/beginner-geek-how-to-start-using-the-linux-terminal/) or [Terminal for macOS](https://macpaw.com/how-to/use-terminal-on-mac), offer tools for generating random characters for seeds.

--------------------
### Linux
1\. Do the following in a command-line interface:

```bash
cat /dev/urandom |tr -dc A-Z9|head -c${1:-81}
```

2\. Copy and paste your seed into a file and store it in a safe place
---
### macOS
1\. Do the following in a command-line interface:

```bash
cat /dev/urandom |LC_ALL=C tr -dc 'A-Z9' | fold -w 81 | head -n 1
```

2\. Copy and paste your seed into a file and store it in a safe place
---
### Windows
1\. Do the following in Powershell:

```bash
$b=[byte[]] (1..81);(new-object Security.Cryptography.RNGCryptoServiceProvider).GetBytes($b);-join($b|%{[char[]] (65..90+57..57)[$_%27]})
```

2\. Copy and paste your seed into a file and store it in a safe place
--------------------

## Use KeePass

KeePass is a password manager that stores passwords in encrypted databases, which can be unlocked with one master password or key file.

These instructions are for Windows, but you can also use KeePass on Linux or macOS.

1. [Download the KeePass installer](https://keepass.info/)

2. Open the installer and follow the on-screen instructions

3. Open KeePass and click **New**

    ![Creating a new KeePass database](../images/keypass-new.png)

4. After you've followed the instructions and saved the KeePass file on your computer, right click the empty space and click **Add entry**

    ![Adding a new KeePass entry](../images/keepass-add-entry.png)

5. Click **Generate a password**

    ![Selecting the KeePass password generator](../images/keypass-password-generator.png)

6. Select only the following options and click **OK**:

- Length of generated password: 81
- Upper-case (A, B, C, ...)
- Also include the following characters: 9
    
7\. Click **OK** to save your seed

## Advice for storing seeds

You can store your seed in many ways, such as on paper or in a file. But, no storage option is 100% safe, so you should consider the risks and mitigate them as much as possible.

### What should you do?

This list offers you some advice for storing your seed:

- Make sure that the physical location in which you store your seed is protected from fires, floods, theft, and other physical risks.

- Keep a copy of your seed in a bank vault or safe deposit box

- Use a password manager (such as KeePass) or virtual vault that is protected by a passphrase and/or a key file

- Use an encrypted disk or NAS to store your seed or password database

### What should you not do?

This list offers you some ways to avoid losing your seed:

- Do not print your seed with a public printer

- Do not leave your seed on unprotected devices such as USB drives or external hard disks

- Do not store your seed on a public cloud service

- Do not share your seed with anyone

## Next steps

Use the JavaScript client library to [generate an unspent address for your seed](root://core/1.0/tutorials/js/generate-an-address.md).