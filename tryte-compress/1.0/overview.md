# Trytes compressor

**When you send a bundle of transactions to a node, sometimes those transactions don't reach the rest of the network, so they will never be confirmed. For example, a node may go offline before it can forward your transactions to its neighbors. As a result, we recommend that you store the transaction trytes so that you can later rebroadcast or reattach them. The trytes compressor library allows you to compress the trytes into bytes to save memory space.**

The algorithm that compresses the trytes uses a combination of run-length encoding and huffman encoding based on a static huffman tree to reduce the amount of memory space that they occupy by up to 75%.

This algorithm is also lightweight enough to be used by embedded devices.

With the trytes compressor, you can:

- Compress trytes into bytes
- Decompress bytes into tryes

## Supported languages

### **Official support** ###

---------------

#### **JavaScript** ####
[Link](/getting-started/compress-transaction.md)
---

---------------

## Next steps

[Get started](/getting-started/compress-transaction.md).