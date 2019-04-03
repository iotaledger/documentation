# Create a QR Code that Trinity can read

**To avoid making senders enter lengthy transaction information such as your address, create a QR code that can auto-populate the transaction fields.**

QR codes speed up the process of sending a transaction in Trinity by auto-populating the Address, Value, and Message fields. By allowing senders to scan a QR code, recipients such as ecommerce websites can reduce the time it takes for customers to complete a purchase.

:::info:
To send to an address in Trinity, it must include the 9-tryte checksum. If you generated a new address in Trinity, that address will already include the checksum.
:::

1. Go to [iota-qr-codes.dag.sh](https://iota-qr-codes.dag.sh/)
2. Complete the fields
3. Save the QR code as a PNG file
4. Send the QR code to your sender, or add it to your website

When the sender scans the QR code in Trinity, the transaction fields will be auto-populated with the ones from the QR code.

![Example QR code](../qr-code.png)
