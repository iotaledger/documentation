# Create a deep link

**Deep links are customizable links that open Trinity and auto-populate transaction fields. You can add deep links to your website or ecommerce platform to make IOTA payments quicker and easier for customers. In this tutorial, you create a deep link that, when entered in a browser, opens Trinity and auto-populates the amount and message of a transaction.**

:::danger:
On 11 February 2020, the IOTA Foundation became aware of an attack on the Trinity wallet, during which some users’ seeds and Trinity passwords were compromised. Please check our advice for [protecting your Trinity account](../how-to-guides/protect-trinity-account.md).
:::

--------------------
### Desktop

1. Go to **Trinity** > **Settings** > **Advanced settings** and enable deep linking

2. Go back to the home page and click **Receive** to generate a new address

3. Create a deep link, using the new address

    All deep links must start with the `iota://` URI followed by a 90-tryte address (with [checksum](root://getting-started/0.1/clients/checksums.md)).

    If you want to specify an amount or message, you can use the following query parameters after the address:

    - `amount`
    - `message`

    For example (if you have Trinity installed, you can click this link to test it):

    <iota://XNGPUCURQLLJFGXNDCMROGYNWAZP9AFWSVEUAIWIESOSPYDUPWSPSREEBWJPD9ZWZPAJKBHPLG99DJWJCZUHWTQTDD/?amount=1000000&message=shirt>

    Accounts that are linked to hardware wallets can send only IOTA tokens or a message.

4. Embed the deep link on your website or ecommerce platform

    You currently can't add spaces to the message in deep links.

5. To test your deep link, copy and paste the link into a browser's address bar. When Trinity opens, you will see the auto-populated transaction fields.

Beware of phishing scams. Make sure the link opens the official Trinity wallet.
---
### Mobile

1. Go to **Settings** > **Advanced settings** and enable deep linking

2. Go back to the home page and click **Receive** to generate a new address

3. Create a deep link, using the new address

    All deep links must start with the `iota://` URI followed by a 90-tryte address (with [checksum](root://getting-started/0.1/clients/checksums.md)).

    If you want to specify an amount or message, you can use the following query parameters after the address:

    - `amount`
    - `message`

    For example (if you have Trinity installed, you can click this link to test it):

    <iota://XNGPUCURQLLJFGXNDCMROGYNWAZP9AFWSVEUAIWIESOSPYDUPWSPSREEBWJPD9ZWZPAJKBHPLG99DJWJCZUHWTQTDD/?amount=1000000&message=shirt>

    Accounts that are linked to hardware wallets can send only IOTA tokens or a message.

4. Embed the deep link on your website or ecommerce platform

    You currently can't add spaces to the message in deep links.

5. To test your deep link, copy and paste the link into a browser's address bar. When Trinity opens, you will see the auto-populated transaction fields.

Beware of phishing scams. Make sure the link opens the official Trinity wallet.
--------------------

:::success:
Now you can use deep links to automatically open Trinity and populate the transaction fields.
:::

## Next steps

[Create a QR code](../how-to-guides/create-a-qr-code.md)