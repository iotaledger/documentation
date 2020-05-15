# Document immutability

**Documents are an important means of transporting information and contracts between parties. Being able to reliably prove that a document has not been changed from an established state helps ensure trust between parties. As well as protect the parties. This blueprint describes a solution that automatically checks the signature of a previously signed document using the IOTA Tangle.**

## Business case

Files on the Internet can be intercepted and changed while you're downloading them. To help you to make sure the file you downloaded to complete and correct, websites display a hash of the file for you to compare against the hash of the one you downloaded.

For example, in 2016, hackers [successfully put a backdoor](https://blog.linuxmint.com/?p=2994) into an ISO file for a Linux distribution called Mint, they also changed the website to link to these tampered files. Additionally, they managed to publish newly generated hashes of the files on the website.

### Challenges

Most people either don't know how to hash a file or don't have time to do it.

Database owners or third-party services such as Google Drive may want to allow users to easily check that their document hasn’t been changed by human or a virus.

### Solution

In this blueprint, we use IOTA technology to automatically check downloaded files from a trusted source (the Tangle) and alert the user if the files are different.

## Demo

See this website for a [demonstration of a proof of existence application](https://iota-poex.dag.sh/).

Unfortuntely, you can't deploy your own local version of this demo. However, you can test the [proof of existence JavaScript library](root://proof-of-existence/1.0/overview.md) that we built, using this blueprint.

## Additional resources

---------------
#### GitHub repository ####
[Link](https://github.com/iotaledger/poc-document-immutable-blueprint)

Read the code and some quickstart instructions to test this blueprint.
---
#### Proof of existence library ####
[Link](https://www.npmjs.com/package/@iota/poex-tool)

A library that can be used for proof of existence scenarios. Used for the proof of existence application.
---
---------------
