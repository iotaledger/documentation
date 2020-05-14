# Create an immutable certificate

**In this tutorial, you use the [Tangle certificate library](https://certification-api.iota.org/docs/#iota-certification-api) to create a certificate and attach it to the Tangle, using the development environment.**

## Prerequisites

To complete this guide, you need the following:

- Node.js 8, or Node.js 10 or higher. We recommend the [latest LTS](https://nodejs.org/en/download/).
- A code editor such as [Visual Studio Code](https://code.visualstudio.com/Download)
- Access to a command-line interface

## Packages

To complete this guide, you need to install the following package:

--------------------
### npm
```bash
npm install axios
```
---
### Yarn
```bash
yarn add axios
```
--------------------

## Step 1. Get API credentials

To use the Tangle certificate API, you need access to the IOTA Foundation server.

All backgrounds, templates, issuers, and certificates are stored on the server under a unique organization ID.

To create, read, update, or delete any of an organization's certificate data, you need the administrator ID and the administrator passphrase.

Contact us to receive your own organization ID, administrator ID, and administrator passphrase

```
integrations@iota.org
```

## Step 2. Create a background

Before you can create a certificate, you need a background SVG image.

This SVG image can include placeholders that are wrapped in double percentage signs (%%). When you come to create a certificate, you can specify the content to replace the placeholders.

Create a file called `background.svg` in your working directory and copy in the following code

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 842 596" version="1.1" xmlns="http://www.w3.org/2000/svg">
<rect x="0" y="0" width="842" height="596" style="fill:white;"/>
<rect x="30.81" y="30.82" width="779.66" height="533.38" style="fill:none;stroke:rgb(189,190,192);stroke-width:12px;"/>
<text x="100" y="100"> %%TEMPLATE-ADDITIONAL%%</text>
<text x="100" y="480" class="signature"> %%ISSUER-SIGNATURE%%</text>
<text x="50%" y="165" class="caption" text-anchor="middle">Certificate Of Attendance</text>
<text x="50%" y="220" class="training-title" text-anchor="middle">%%TRAINING-TITLE%%</text>
<text x="50%" y="295" class="participant" text-anchor="middle">%%PARTICIPANT%%</text>
<text x="50%" y="352" class="participation-date" text-anchor="middle">%%PARTICIPATION-DATE%%</text>
<text x="50%" y="390" class="info" text-anchor="middle">This certificate confirms that the training specified was attended and completed by the person on the date shown.</text>
<text x="50%" y="410" class="info" text-anchor="middle">You can validate the authenticity of this certificate by scanning the QR code, or by visiting %%AUTH-DOMAIN%%</text>
<text x="50%" y="420" class="info" text-anchor="middle">and entering the hash shown at the bottom of this certificate.</text>
<text x="17%" y="545" class="hash" text-anchor="start">Hash: %%HASH%%</text>
<text x="83%" y="545" class="hash" text-anchor="end">Issued On: %%ISSUED-DATE%%</text>
<svg x="44%" y="430">%%QR-CODE%%</svg>
<style>
.signature {
    font-family:"FreestyleScript-Regular", "Freestyle Script", cursive;
    font-size:33.333px;
}
.caption {
    font-family: "Nunito Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-weight: 300;
    font-size: 26px;
}
.training-title {
    font-family: "Nunito Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-weight: 600;
    font-size: 32px;
}
.participant {
    font-family: "Nunito Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-weight: 600;
    font-size: 25px;
}
.participation-date {
    font-family: "Nunito Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-weight: normal;
    font-size: 18px;
}
.info {
    font-family: "Nunito Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-weight: 300;
    font-size: 10px;
}
.hash {
    font-family: "Nunito Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-weight: normal;
    font-size: 8px;
}
</svg>
```

## Step 3. Set up the sample

1. Create a new file called `index.js` in the same directory as the `background.svg` file, then copy in the following code. Replace the `$ORG_ID`, `$ADMIN_USER_ID`, and `$ADMIN_PASS_PHRASE` placeholders with your own credentials.

    ```js
    const fs = require('fs');
    const axios = require('axios');

    const API_ENDPOINT = 'https://certification-api.iota.works';
    const ORG_ID = '$ORG_ID'
    const ADMIN_USER_ID = '$ADMIN_USER_ID';
    const ADMIN_PASS_PHRASE = '$ADMIN_PASS_PHRASE';
    const BACKGROUND_PATH = 'background.svg';

    const ax = axios.create({ baseURL: API_ENDPOINT });

    async function createBackground() {
        console.log("Creating background...");

        // Call the background endpoint (https://certification-api.iota.org/docs/?javascript--nodejs#createupdatebackground) with your credentials
        const response = await ax.put(`background`, {
            adminId: ADMIN_USER_ID,
            adminPassPhrase: ADMIN_PASS_PHRASE,
            content: fs.readFileSync(BACKGROUND_PATH).toString()
        });

        if (response.data.success) {
            console.log("Created background", response.data.backgroundId);
            return response.data.backgroundId;
        } else {
            console.error("Failed creating background", response.data.message);
        }
    }

    async function createTemplate(backgroundId) {
        console.log("Creating template...");
        // // Call the template endpoint (https://certification-api.iota.org/docs/?javascript--nodejs#createupdatetemplate) with your credentials
        const response = await ax.put(`template`, {
            adminId: ADMIN_USER_ID,
            adminPassPhrase: ADMIN_PASS_PHRASE,
            name: `My test certificate`,
            backgroundId,
            additionalContent: `Test Certificate`,
            caption: "Template Caption",
            qrColor: "#0000FF",
            canIssue: true
        });

        if (response.data.success) {
            console.log("Created template", response.data.templateId);
            return response.data.templateId;
        } else {
            console.error("Failed creating template", response.data.message);
        }
    }

    async function createIssuer(templateId) {
        console.log("Creating issuer...");
        // Call the issuer endpoint (https://certification-api.iota.org/docs/?javascript--nodejs#createupdateissuer) with your credentials
        const response = await ax.put(`issuer`, {
            adminId: ADMIN_USER_ID,
            adminPassPhrase: ADMIN_PASS_PHRASE,
            name: `test`,
            newPassPhrase: `testPassPhrase`,
            canIssue: true,
            isAdministrator: false,
            allowedTemplates: [templateId],
            signature: `My example signature`
        });

        if (response.data.success) {
            console.log("Created issuer", response.data.issuerId);
            return response.data.issuerId;
        } else {
            console.error("Failed creating issuer", response.data.message);
        }
    }

    async function createCertificate(issuerId, templateId) {
        console.log("Creating certificate...");
        // Call the issuer endpoint (https://certification-api.iota.org/docs/?javascript--nodejs#createcertificate) with your credentials
        const response = await ax.post(`certificate`, {
            issuerId,
            // Specify the text to use to replace the %%%% placeholders in the template
            issuerPassPhrase: `testPassPhrase`,
            participant: `Mr Smith`,
            participationDate: "07/01/2019 - 08/18/2019",
            trainingTitle: `My Course Title`,
            issuedDate: "08/18/2019",
            templateId
        });

        if (response.data.success) {
            console.log("Created certificate", response.data.hash, response.data.validationUrl);
        } else {
            console.error("Failed creating certificate", response.data.message);
        }
    }

    // Create the background, template, issuer, and certificate
    (async function () {
        try {
            const backgroundId = await createBackground();
            if (backgroundId) {
                const templateId = await createTemplate(backgroundId);

                if (templateId) {
                    const issuerId = await createIssuer(templateId);

                    if (issuerId) {
                        await createCertificate(issuerId, templateId);
                    }
                }
            }
        } catch (err) {
            console.error('Request failed', err.message);
        }
    })();
    ```

## Run the code

You can run the sample code by using the following command

```bash
node index.js
```

You should see something like the following:

```
Creating background...
Created background JQHNXOTAT9CBTYGHKANMG9WNCIZ
Creating template...
Created template 9YSCXMHF9TJNYLRSNYZRP9ARVYH
Creating issuer...
Created issuer RAQSQWHEAANVOGWD9RVJI9ZPMHI
Creating certificate...
Created certificate FAZLSJRLEPPBRVITOPBZNTIVEJWPEQARIOEHNMHBEOJDGABLKPYIHWPMAJWVZTJXFIAFGSVXPGOCBQ999 https://certification.iota.works/FAZLSJRLEPPBRVITOPBZNTIVEJWPEQARIOEHNMHBEOJDGABLKPYIHWPMAJWVZTJXFIAFGSVXPGOCBQ999
```

## Next steps

To verify your certificate, open a web browser and go to the URL that was printed to the console: https://certification.iota.works/FAZLSJRLEPPBRVITOPBZNTIVEJWPEQARIOEHNMHBEOJDGABLKPYIHWPMAJWVZTJXFIAFGSVXPGOCBQ999

![Test certificate](../images/test-certificate.png)

Use the [administration portal](https://certification-admin.iota.org/) to create new certificates or check for existing ones.

Use the [API](https://certification-api.iota.org/docs/#iota-certification-api) to manage your certificates. For example, if you make a mistake on a certificate and want to invalidate it, use the [`setBlacklist` endpoint](https://certification-api.iota.org/docs/#setblacklist).










