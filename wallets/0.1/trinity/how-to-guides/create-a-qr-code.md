# Create a QR Code that Trinity can read

**To avoid making senders enter transaction information such as your address or a message, you can create a QR code that auto-populates the transaction fields in Trinity. In this tutorial, you create a QR code, using the IOTA utility website.**

:::danger:
On 11 February 2020, the IOTA Foundation became aware of an attack on the Trinity wallet, during which some users’ seeds and Trinity passwords were compromised. Please check our advice for [protecting your Trinity account](../how-to-guides/protect-trinity-account.md).
:::

QR codes speed up the process of sending a transaction in Trinity by auto-populating the Address, Value, and Message fields. By allowing senders to scan a QR code, recipients such as ecommerce websites can reduce the time it takes for customers to complete a purchase.

![Example QR code](../images/qr-code.png)

1. Generate a new address in Trinity by clicking **Receive** > **Generate address**

    :::info:
    To send to an address in Trinity, it must include the 9-tryte checksum. If you generated a new address in Trinity, that address will already include the checksum.
    :::

2. Go to the [official IOTA utility website](https://utils.iota.org/qr-create)

3. Complete the fields

4. Save the QR code as a PNG file

5. Send the QR code to your sender, or add it to your website

:::success:
When the sender scans the QR code in Trinity, the transaction fields will be auto-populated with the ones from the QR code.
:::

## Next steps

[Create a deep link](../how-to-guides/create-deep-link.md)
