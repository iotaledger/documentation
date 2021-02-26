# Publish and display public messages on a webpage

**In the `mam` package is a minified JavaScript file that you can use in webpages. This way, you can build web applications that publish MAM messages and display them.**

## IOTA network

In this tutorial, we connect to a node in the [Devnet](root://getting-started/1.1/networks/overview.md).

## Code walkthrough

1. Set up your HTML document, and create a `<div></div>` element with an `id` attribute set to `"output"` so your script knows where to send the MAM messages.

    ```html
    <html>
    <meta charset="utf-8" />

    <head>
        <title>MAM Example Publish and Fetch</title>
    </head>

    <body>
        <div id="output"></div>
    ```

2. Put the path to your downloaded` mam.web.min.js`code in a `<script>` tag

    ```html
        <script src="../lib/mam.web.min.js"></script>
    ```

3. At the bottom of your document, before the closing </body> tag, add a `<script></script>` element

4. Inside the `<script></script>` element, create polyfill functions to convert ASCII characters to and from trytes

    ```html
    <script>
    const TRYTE_ALPHABET = '9ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const asciiToTrytes = (input) => {
        let trytes = '';
        for (let i = 0; i < input.length; i++) {
            var dec = input[i].charCodeAt(0);
            trytes += TRYTE_ALPHABET[dec % 27];
            trytes += TRYTE_ALPHABET[(dec - dec % 27) / 27];
        }
        return trytes;
    };

    const trytesToAscii = (trytes) => {
        let ascii = '';
        for (let i = 0; i < trytes.length; i += 2) {
            ascii += String.fromCharCode(TRYTE_ALPHABET.indexOf(trytes[i]) + TRYTE_ALPHABET.indexOf(trytes[i + 1]) * 27);
        }
        return ascii;
    };
    ```

5. Add the code that publishes messages to a public MAM channel and displays it in the `<div></div>` element

    ```js
        (async function () {
            const mode = 'public'
            const provider = 'https://nodes.devnet.iota.org'

            const mamExplorerLink = `https://mam-explorer.firebaseapp.com/?provider=${encodeURIComponent(provider)}&mode=${mode}&root=`

            const outputHtml = document.querySelector("#output");

            // Initialize MAM State
            let mamState = Mam.init(provider);

            // Publish to tangle
            const publish = async packet => {
                // Create MAM Payload - STRING OF TRYTES
                const trytes = asciiToTrytes(JSON.stringify(packet))
                const message = Mam.create(mamState, trytes)

                // Save new mamState
                mamState = message.state

                // Attach the payload
                await Mam.attach(message.payload, message.address, 3, 9)

                outputHtml.innerHTML += `Published: ${packet}<br/>`;
                return message.root
            }

            const publishAll = async () => {
                    const root = await publish('ALICE')

                    await publish('BOB')

                    await publish('CHARLIE')

                    return root
            }

            // Callback used to pass data out of the fetch
            const logData = data => outputHtml.innerHTML += `Fetched and parsed ${JSON.parse(trytesToAscii(data))}<br/>`;

            const root = await publishAll();

            // Output asyncronously using "logData" callback function
            await Mam.fetch(root, mode, null, logData)

            // Output synchronously once fetch is completed
            const result = await Mam.fetch(root, mode)
            result.messages.forEach(message => {
                outputHtml.innerHTML += `Fetched and parsed ${JSON.parse(trytesToAscii(message))}<br/>`
            });

            outputHtml.innerHTML += `Verify with MAM Explorer:<br/><a target="_blank" href="${mamExplorerLink}${root}">${mamExplorerLink}${root}</a>`;
            })();
            </script>
        </body>
    </html>
    ```

When you load the webpage, you should see the following:

```
Published: ALICE
Published: BOB
Published: CHARLIE

Fetched and parsed ALICE
Fetched and parsed BOB
Fetched and parsed CHARLIE
```

## Run the code

Click the green button to run the sample code in this guide and see the results in the web browser. 

<iframe height="600px" width="100%" src="https://repl.it/@jake91/MAM-webpage?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Next steps

Take a look at the [MAM API reference](../api-reference/mam-api-reference.md) to learn more.
