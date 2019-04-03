# Deploy the P2P energy grid app

**To start using the P2P energy grid app, deploy your own application.**

## Prerequisites

To deploy the P2P energy grid app, you must have the following:

### Hardware

* The sources, producers, and consumers can run on Raspberry Pis (RPi)
* The grid must be run on a server that's capable of web APIs, database storage and background tasks

### Software

* [NodeJS](https://nodejs.org/)

* [MAM (masked authenticated messaging)](https://github.com/iotaledger/mam.client.js)

Choose from one of the following cloud services or a local server:

* Google Cloud
    * [Web server](https://firebase.google.com/docs/hosting/)
    * [Authentication service](https://firebase.google.com/docs/auth/)
    * [NoSQL database](https://firebase.google.com/docs/firestore/)
    * [Background tasks and API server](https://firebase.google.com/docs/functions/)

* Amazon
    * [Web server](https://aws.amazon.com/s3/)
    * [API server](https://aws.amazon.com/api-gateway/)
    * [NoSQL database](https://aws.amazon.com/dynamodb/)
    * [Background tasks](https://aws.amazon.com/lambda/)

* Azure
    * [Web server](https://azure.microsoft.com/en-us/services/storage/)
    * [API server](https://azure.microsoft.com/en-us/services/app-service/)
    * [NoSQL database](https://azure.microsoft.com/en-us/services/cosmos-db/)
    * [Background tasks](https://azure.microsoft.com/en-us/services/functions/)

* Local server
    * Storage: local file system
    * Web server: Nginx
    * API server: NodeJS with Express
    * NoSQL database: MongoDB
    * Background tasks: Task scheduler running NodeJS tasks

### Programming knowledge

* JavaScript/TypeScript
* HTML/CSS
* [React framework](https://github.com/facebook/create-react-app)
* Required third-party licenses
* Cloud services

### IOTA knowledge

An understanding of MAM channels.

## Deploy the P2P energy grid app

The software configuration and deployment for all the entities is documented in the [GitHub repository](https://github.com/iotaledger/poc-p2p-energy).

Sources running on RPi need the following:
* Local area network (LAN) or wide area network (WAN) connection to the grid
* Connection to an IOTA Node
* [NodeJS](https://github.com/audstanley/NodeJs-Raspberry-Pi)

Producers running on RPi need the following:
* Network connection to the grid
* Connection to an IOTA node (can be internal)
* [NodeJS](https://github.com/audstanley/NodeJs-Raspberry-Pi)

Consumers running on RPi need the following:
* LAN or WAN connection to the grid
* Connection to an IOTA node
* [NodeJS](https://github.com/audstanley/NodeJs-Raspberry-Pi)

Grids running in the cloud or on a local server need the following:
* WAN connection
* Connection to the Tangle
* Connection to an IOTA node (optional if other entities have access to WAN)
