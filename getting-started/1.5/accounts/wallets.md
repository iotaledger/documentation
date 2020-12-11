# Wallets

**Wallets are applications that make it easy to use IOTA. This topic explains what wallets are for, the types of wallets that you can use, some example wallets that already exist, and wallet security.**

Wallets are useful for:

- Sending messages
- Checking your balance
- Keeping track of your account

## What is stored in a wallet

Wallets store any information about your IOTA accounts that is needed to interact with an IOTA network.

The exact information that a wallet stores depends on the developers who made it.

For example, a wallet may store the following:

|**Account data**| **Reason**|
|:---|:------|
|The index and security level of the address that you last generated |To keep track of spent addresses |
|The message hashes of pending messages| To help pending messages to become confirmed |
|An encrypted version of your seed|To allow you to log in with a password instead of your seed|

:::info:
IOTA tokens are not stored in a wallet. A wallet is software that interacts IOTA nodes for access to the Tangle.
:::

## Types of wallet

Wallets come in the following top-level types:

|**Type**| **Definiton** | **Use**|
|:---|:----|:-------|
|Hot wallet | A wallet that is connected to the Internet| For quick access to your balance and the ability to transfer tokens|
|Cold wallet |A wallet that is not connected to the Internet |For long-term storage of your account data and for signing  offline|

These wallet types can also come in the following forms:

- **Command-line interface (CLI):** A text-based wallet
- **Graphical user interface (GUI):** A interactive wallet with buttons and images
- **Paper:** A seed or private key that is written on paper or in a QR code
- **Hardware:** A physical electronic device that stores a seed and signs messages

## Official IOTA wallets

The IOTA Foundation maintains the following official wallets:

- **Firefly**: A GUI wallet for managing one or more accounts
    - [Documentation](root://wallets/0.1/trinity/introduction/overview.md)
    - [GitHub](https://github.com/iotaledger/trinity-wallet)

- **Hub**:  A CLI wallet for managing many accounts
    - [Documentation](root://wallets/0.1/trinity/introduction/overview.md)
    - [GitHub](https://github.com/iotaledger/hub)

- **Spark**: A GUI wallet for sending small amount of IOTA tokens
    - [GitHub](https://github.com/iotaledger/spark-wallet)

:::warning:
Be careful where you enter your seed. Some unofficial wallets may not be trustworthy.
:::

## Wallet security

IOTA's wallets are based in Stronghold, a secure software implementation with the sole purpose of isolating digital secrets from exposure to hackers and accidental leaks. It uses versioned, file-based snapshots with double-encryption that can be easily backed up and securely shared between devices. Written in Rust, it has strong guarantees of memory safety and process integrity.

## Next steps

Learn about [checksums](../accounts/checksums.md) and how they are used to help you enter the correct address in applications such as wallets.