# Deploy and test the Data Marketplace demo

**To start buying and selling data streams on the Data Marketplace, deploy your own application, or test it in our demo app.**

## Prerequisites

To submit sensor data to the Data Marketplace, you must have the following:

### Hardware

- A sensor or device that generates data such as the following:
    * [Netatmo Weather Station](https://www.netatmo.com/en-us/weather)
    * [Bosch XDK](https://xdk.bosch-connectivity.com/) 
    * [Nordic Semiconductor Thingy:52](https://www.nordicsemi.com/Software-and-Tools/Development-Tools/Nordic-Thingy-52-App)
    * [Raspberry Pi with a sensor kit](https://www.adafruit.com/product/2733) 

### Software

- [Data Marketplace](https://github.com/iotaledger/data-marketplace)

- [Node.js](https://nodejs.org/)

- [MAM (masked authenticated messaging)](https://github.com/iotaledger/mam.client.js)

Choose from one of the following cloud services:

- Google Cloud
    * [Web server](https://firebase.google.com/docs/hosting/)
    * [Authentication service](https://firebase.google.com/docs/auth/)
    * [NoSQL database](https://firebase.google.com/docs/firestore/)
    * [Background tasks and API server](https://firebase.google.com/docs/functions)

- Amazon
    * [Web server](https://aws.amazon.com/s3/)
    * [API server](https://aws.amazon.com/api-gateway/)
    * [NoSQL database](https://aws.amazon.com/dynamodb/)
    * [Background tasks](https://aws.amazon.com/lambda/)

- Azure
    * [Web server](https://azure.microsoft.com/en-us/services/storage/)
    * [API server](https://azure.microsoft.com/en-us/services/app-service/)
    * [NoSQL database](https://azure.microsoft.com/en-us/services/cosmos-db/)
    * [Background tasks](https://azure.microsoft.com/en-us/services/functions/)

### Programming knowledge

- JavaScript/TypeScript
- HTML/CSS
- [React framework](https://github.com/facebook/create-react-app)
- Required third-party licenses
- Cloud service

### IOTA knowledge

An understanding of [MAM channels](root://mam/1.0/overview.md).

## Deploy the Data Marketplace app

To deploy your own data marketplace, follow the instructions in these blog posts:

1. https://medium.com/@lexerr/47b608c527c9
2. https://medium.com/@lexerr/b33d9856c852

## Test the Data Marketplace app

Instead of deploying your own data marketplace, you can test our demo app by adding your own device to it.

1. Go to the [Dashboard ​page](https://data.iota.org/#/dashboard) to log in. Here, you will see a Google OAuth login screen. Click **Sign in with Google**

2. Create a new device

    :::info:
    You can create up to 5 devices per account with the default settings. This number can be adjusted upon request.
    :::

3. Enter some information about your device. Make sure you complete the fields relating to the data streams you would like to collect.

    * **Device ID**: This ID should be unique among all existing sensors and will serve as access key when purchasing a data stream. Please note that the ID must begin with a letter ([a-z]) and may be followed by any number of letters, digits ([0–9]), hyphens (“-”), and underscores (“_”). Max allowed length is set to 40 characters. 
    * **Device Type**: Plain text type description, that helps other Data Marketplace participants identify potential usage of the sensors’ data stream. Typical examples: “weather station”, “tracking device”, “charging station”. 
    * **Company**: Provide the name of the company that owns and maintains the sensor. This information creates more trust between sensor owners and Data Marketplace users who are interested in purchasing the data stream. 
    * **Location (city / country)**: This information helps to identify if the sensor data is relevant for purchasing. For example, some users might be interested in purchasing data streams from weather or environmental sensors located in a specific region. 
    * **GPS Coordinates (latitude / longitude)**: You can use a service like https://www.gps-coordinates.net/ to get the right GPS data for your sensor. We accept coordinates as a number of digits ([0–9]), that could be prepended by a hyphen (“-”) for negative value, and a decimal separator (“.”). Please do not enter any letters or special characters. 
    * **Price of the data stream**: Here you can define the cost of the sensor data. We do not restrict you with defining the value, but please keep in mind that without a preview and refund options, only a few customers will be ready to pay a fortune for a data stream. On the other hand, setting a very low price might result in a total collected payment under 1/1000 of a cent. We encourage you to check the [current price](https://coinmarketcap.com/currencies/iota/) of 1 Mi, which is 1000000 (one million) IOTA tokens. We suggest that you set the price within the range of 1000 i to 50000 i, depending on the cost and maintenance efforts of the sensor. 
    * **Data Fields**: The most essential part of the sensor configuration. Please provide information for every parameter that will be captured by the sensor and stored on the Tangle. You can add or remove fields by pressing the **+** and **X** buttons on the right.

    Parameter information consist of 3 fields:
    
    * **Field ID**: This ID should be unique among all other parameters for the specific sensor. Please note that the ID must begin with a letter ([a-z]) and may be followed by any number of letters, digits ([0–9]), hyphens (“-”), and underscores (“_”). Max allowed length is set to 40 characters. 
    * **Field Name**: Plain text parameter description that indicates the purpose of the field. Max allowed length is set to 40 characters. 
    * **Field Unit**: [Physical quantities](https://en.wikipedia.org/wiki/List_of_physical_quantities) and [units](https://whatis.techtarget.com/reference/Table-of-Physical-Units) ​abbreviation, primarily in the International [System of Units](https://whatis.techtarget.com/reference/Table-of-Physical-Units) ​(SI). It can also be a unit of [environmental measurements](https://www.fondriest.com/environmental-measurements/parameters/), like humidity, air quality, precipitation, wind speed or direction. Please keep the length of this field within 20 characters.

4. Click **Download Publish Script** to download of a preconfigured `.zip` archive that contains examples and documentation on how to store data in the Tangle for your device

5. Extract the content of the archive, and open the folder in a code editor such as [Visual Studio Code](https://code.visualstudio.com/Download) to start working with the script

    :::info:
    Read the` README.md` file before you start using the script.
    :::

    The script is pre-configured to publish data for the selected device. You’ll find the sensor ID and its secret key in the `config.json` file.

    If you decide to use the same script for multiple sensors, please note that the secret key should be changed as well. Otherwise you won’t be able to decrypt your published data.

    By default the script runs in debug mode, which means that no data is published. All captured data is printed out in the console, so you can verify and adjust it. Once the payload looks good, you can disable debug mode by setting the debug variable to false in the `config.json` file (see screenshot below), and let data be published.

    Please note that proof of work is done for every data package, which might take up to 60 seconds depending on your hardware. Please take this into account and do not interrupt the script while running this operation.

6. See the [blog post]​(https://blog.iota.org/the-iota-data-marketplace-a-tech-intro-part-3-eea5cbcd1eb7) to learn more about publishing sensor data to IOTA Tangle

### Create and fund a new wallet

You can fund a device's wallet with free IOTA tokens. We usually transfer between [100 Ki and 1 Mi](root://getting-started/0.1/clients/token.md) of Devnet tokens for free to your new device's wallet.

:::info:
Devnet tokens can't be used on the Mainnet or exchanged on any cryptocurrency exchange.
:::

1. Select a sensor or device for which you want to purchase a data stream

2. Go to the Sensor ​page, in the top right corner you will find a button to fund your wallet

Do not interrupt this operation by refreshing the page or navigating to another page of the application. After the transfer is complete, the balance of the wallet is automatically updated.

Alternatively, you can [use the API to fund a wallet](https://data.iota.org/static/docs#create-and-fund-wallet).

### Fund an existing wallet

If your wallet balance is low, you can fund it with more Devnet tokens by using the [IOTA faucet](root://getting-started/0.1/tutorials/get-test-tokens.md).

:::info:
You can a new address to which to send the tokens by calling the [`getUser`](https://data.iota.org/static/docs#get-user) endpoint.
:::

### Query a data stream

When you buy a data stream you can query the data that's published to the MAM channel on the Tangle.

1. Go to the Sensor page

    If you've already purchased the stream, data will be automatically loaded in chunks (20 packets per request). 
    
2. Scroll to the bottom of the page to automatically query the following 20 packets.

Alternatively, you can [use the API to query a data stream](https://data.iota.org/static/docs#query-stream).

### Buy a data stream

You can buy a device's data stream using the balance of the wallet. When you buy a data stream, you're given access to the MAM channel's root so that you can find the data on the Tangle.

1. Go to the Sensor ​page

    If you have not purchased the stream, a message appears asking whether you would like to purchase the data stream for an amount, that was set by the device owner. When you purchase device data stream from the web portal, your wallet balance is automatically updated.

Alternatively, you can [use the API to buy a data stream](https://data.iota.org/static/docs#purchase-stream).

### Remove a device

If you no longer want your device to be visible on the Data Marketplace, you can remove it.

1. Go to the [Dashboard](https://data.iota.org/#/dashboard) page

2. Press **X** in the top-right corner of the device card

    Be aware that the seed associated with the device is also removed. That means that you can no longer withdraw funds that were transferred to the device's seed.

Alternatively, you can [use the API to remove a device](https://data.iota.org/static/docs#remove-device).