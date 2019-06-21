# Document immutability overview

**Documents are an important means of transporting information and contracts between parties. Being able to reliably prove that a document has not been changed from an established state helps ensure trust between parties. As well as protect the parties. This blueprint describes a solution that automatically checks the signature of a previously signed document using the IOTA Tangle.**

## Business case

Downloading a binary file from the internet is a dangerous thing, that is why most websites show an MD5/SHA1 string of that document. That is the hash of the document for the user to check before running the program on his machine, most people don’t check the hash of the documents because it’s a tedious task. Also, people tend to think that downloading from official websites is enough. That is not the case.

### Challenge

For example, in 2016, hackers [successfully put a backdoor](https://blog.linuxmint.com/?p=2994) into an ISO file for a Linux distribution called Mint, they also changed the website to link to these tampered files. Additionally, they managed to publish newly generated hashes of the files on the website.

### Solution

In this use case we are looking at building a tool that automatically checks the downloaded files from a trusted source (the Tangle) and alerts the user if the files have been tampered with. This provides value and incentive for the end user to use a software that makes it easy to test the document signature.

The solution to the above is to provide a trusted and transparent way to verify document immutability.
If you have a document stored in your private database or in third party services like Google Drive, you want to provide tools/proofs for your users that the document they are going to download hasn’t been changed by human or a virus.

An easy way to do this is to provide the users a tool that automatically checks the signature of the document using IOTA tangle where all the documents have been signed previously.

This signature information is publicly exposed to everyone without permission, basically, anyone with an internet connection can actually use it.

Here is an illustration of the system components:

![Document immutability architecture](../images/document-immutability-architecture.png)

## Demo

See this website for a [demonstration of a proof of existence application](https://iota-poex.dag.sh/).

## Additional Resources

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
