# Create a seed

**A seed is your unique password that gives you access to all your addresses. Seeds can include only the number 9 and the uppercase letters A-Z.**

Your seed proves that you own an address and allows IRI nodes to validate your transactions and append them to their ledgers.

You must keep your seed safe and back it up. If you lose your seed, you can't recover it.

As well as the following ways of creating a seed, you can also [create a seed in Trinity](root://trinity/0.1/how-to-guides/create-an-account.md).

## Create a seed on a Linux operating system

1. Do the following in a command prompt:
    ```bash
    cat /dev/urandom |tr -dc A-Z9|head -c${1:-81}
    ```

2. Copy and paste the 81 character output somewhere. We'll need the seed later. It's a good idea to back up your seed now.

## Create a seed on a Mac operating system

1. Do the following in a command prompt:
    ```bash
    cat /dev/urandom |LC_ALL=C tr -dc 'A-Z9' | fold -w 81 | head -n 1
    ```

2. Copy and paste the 81 character output somewhere. We'll need the seed later. It's a good idea to back up your seed now.

## Create a seed on a Windows operating system

1. [Download the KeePass installer](https://keepass.info/)

    KeePass is a password manager that stores passwords in highly-encrypted databases, which can be unlocked with one master password or key file.

2. Open the installer and follow the on-screen instructions

3. Open KeePass and click **New**

    <img src="../keypass-new.png" alt="A new KeePass database" width="600">

4. After you've followed the instructions and saved the KeePass file on your computer, right click the empty space and click **Add entry**

    <img src="../keepass-add-entry.png" alt="A new KeePass entry" width="600">

5. Click **Generate a password**

    <img src="../keypass-password-generator.png" alt="Keepass password generator" width="600">

6. Select only the following options and click **OK**:

    * Length of generated password: 81
    * Upper-case (A, B, C, ...)
    * Also include the following characters: 9
    
7. Click **OK** to save your seed
