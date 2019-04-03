# Application architecture

**The track-and-trace application uses the IOTA MAM protocol to give returnable assets an ID and to track those assets in streams of transactions called MAM channels.**

:::info:
Running an open source project, like any human endeavor, involves uncertainty and trade-offs. We hope the architecture described below helps you to deploy similar systems, but it may include mistakes, and can’t address every situation. If you have any questions about your project, we encourage you to do your own research, seek out experts, and discuss them with the IOTA community.
:::

This application uses the IOTA MAM [JavaScript libraries](https://github.com/iotaledger/mam.client.js) to give a returnable asset an ID, and track that asset through every custodian.

## Prerequisites

To test, edit, and deploy this application, you need some level of knowledge in JavaScript, React, NodeJS, and database management systems.

## Masked authenticated messaging

The track and trace of a given returnable asset consists of a series of events. Because of this, registering the change of custody of a given asset, through the use of MAM channels, makes it easy to store the different custodian information onto the IOTA Tangle and associate it as a message in the same channel. Using MAM allows for encryption and protection of the shared information. Without using MAM, this could alternatively be done by issuing independent transactions to the IOTA Tangle, storing the required information for each change of custody related to a given asset. However, the architecture complexity of reconciling and linking all the information associated to a given asset would increase. That's why MAM was chosen as preferred solution design.

![Track and Trace](../track-and-trace-architecture.png)

A tracker interacts with the architecture to report asset ownership and change of custody. Authorized tracers 
connects to the architecture to fetch information about a given asset, e.g. its last custodian. 

A new IOTA MAM channel is created once a new returnable asset is first registered by its owner. A digital twin for the returnable asset is created with the following information: `<assetUniqueID, assetOwnerID, assetCustodianID, location, time, status>`. 

Required information is captured through a mobile app:

- `assetUniqueID` is captured through QR-code scanning and matched against an `assetUniqueID` server (e.g., GS1 SSCC), accessed through Registration APIs;  
- information about the `assetOwnerID` is either inserted through the app or fetched from an external source 
(e.g., a registration server for the use of the app; company VAT registration number is used in this case); 
- `assetCustodianID` initially match the `assetOwnerID`; 
- location can be acquired by the mobile phone GPS (optional); 
- time it is acquired by the device initiating the transaction (mobile phone or webapp);
- status can be either in-use, returned	or lost. Initially it is set to in-use. However, any different custom list of statuses can be defined.

The information is stored on the IOTA Tangle using the javascript MAM client library. This can either be embedded into the app or implemented through an external server (MAM Server), to which the app can exchange information using secure HTTPS REST APIs. For this blueprint MAM libraries are integrated directly into the developed app.

**Tip 1:** An asset ownership is created and registered only once. While the asset custody changes over time, it is meaningful to use a MAM channel for aggregating the information related to the change of custody of a given asset. This allows to easily link all the different change of custody to the right asset by limiting complexity of the implementation. Moreover use of MAM also protects access to the relevant information related to each change of custody.

After creation of each MAM channel, a central back-end Object Repository is populated. The Object Repository is implemented as Firebase NoSQL database and deployed using port 3000. Storage REST APIs are provided to populate and update the Firebase DB with information related to the MAM channel associated to a given asset ID. Information stored in the Object Repository includes the root address of the channel, e.g., where this can be accessed on the IOTA Tangle and the cryptographic key needed for decrypting the information stored in the channel (named side keys), in case restricted MAM channels are created. The following tuple is created and stored in the 
Object Repository: `<assetUniqueID, channelRoot, channelSideKey>`.  

The Object repository is either populated by the app or the MAM Server, according to the implemented model. Access to the Object Repository is managed by the given returnable assets owner, thus guaranteeing control on who can access and modify the information chain associated to a given returnable asset. 

**Tip 2:** Ideally every asset owner will extend the existing assets repository as part of their management system with capability to store the required information for access to the IOTA Tangle and MAM channel, instead of creating an external Object Repository. In the case of IBCS Group this was integrated into [IBCS Tracker system](https://www.ibcstracker.com)

When the given returnable asset changes custodian, information about the new custodian is appended to the existing MAM channel. For that, a new MAM message is attached to the existing channel and the following information updated and stored on the Tangle: `<assetCustodianID, location, time, status>`.

In order to achieve this, the mobile app or the MAM Server of the new custodian needs to first retrieve the information related to the root of the MAM channel associated to the given asset from the Object Repository. This is done by using the `assetUniqueID`, as the primary key, which is obtained from the QR-code scanning or manually inserted. Information is then attached to the respective MAM channel and stored immutably onto the IOTA Tangle. For this, the two functions:

```javascript
createItem( eventBody, channel, secretKey, userId);
updateItem( eventBody, mam, newItemData, user);
```

have been implemented in order to respectively access and update existing MAM channel information (e.g. adding	 new messages to update the stored digital twin). 
A Web UI (WUI) written in React implements APIs to access to the MAM explorer and to retrieve information, e.g. current custodian and location for a given returnable asset. Information on the Tangle are retrieved by accessing the required channel root address obtained from the Object Repository. A missing asset can be declared from the same 
GUI. How to handle missing assets is out of the scope of this blueprint.	 
 
The sequence diagram below recaps all the steps needed to track a given returnable asset.

![Track and Trace](../track-and-trace-architecture_actors.png)

The communication diagram below shows the different messages exchanged across the architecture components presented above.

![Track and Trace](../track-and-trace-architecture-message-exchange.png)

Details on the different components implementation is provided below, alongside with code snippets. 

## Data model of a digital twin 

A returnable asset digital twin contains the following fields: 

```javascript
{ 
    "data": [{ 
        "assetUniqueID": "string", 
        "assetOwnerID": "string", 
        "assetUserID": "string", 
        "location": ["latitude", "longitude"], 
            "time": "date",	 
        "status": "string" 
    }] 
} 
```

## IOTA building blocks

The tracker app will be responsible of creating and updating assets digital twins as MAM Channels and messages in order to allow tracking.

```javascript
import Mam from 'mam.client.js'; 
import { isEmpty, uniqBy, pick, find, last } from 'lodash'; import { asciiToTrytes, trytesToAscii } from '@iota/converter' 
import { createItem, updateItem } from './firebase'; 
import config from '../config.json'; 
```

First, we need to import the `mam.client.js` library.  
 
Then before creating a MAM channels, we need to select the current IOTA network where transactions will be stored 
(provider). This could be the main IOTA Network or any dev network, such as: 
`https://nodes.devnet.thetangle.org:443`

```javascript
// Initialise MAM State with IOTA provider 
let mamState = Mam.init(config.provider); 
```

For each new assets acquired, we need first to create the returnable asset digital twin `(createItemChannel)`.

```javascript
// create a new Item (Asset) 
export const createItemChannel = (project, itemId, request, userId) => { 
… 
 
const messageBody = { 
        ...request,         
        ...eventBody,         
        time: null,         
        location: null,         
        assetUniqueID: null,         
        assetOwnerID: null,         
        assetUserID: null 
    };
```

Before setting up the channel, it is recommended to set the channel mode to ‘restricted’. This allows to encrypt the payload (e.g., the information contained in the digital twin) of each MAM message associated to that channel and to guarantee access only to selected parties `(Mam.changeMode())`.

```javascript
// create a new restricted channel 
const createNewChannel = async (payload, secretKey) => {
// Set channel mode for default state 
  const defaultMamState = Mam.changeMode(mamState, 'restricted', secretKey);   
  updateMamState(defaultMamState); 
  const mamData = await publish(payload); 
  return mamData; 
};
```

We can then publish the information to the IOTA Tangle `(Mam.attach())`. Remember that IOTA uses Trytes so our MAM payload needs to be converted before sending it to the Tangle `(asciiToTrytes(JSON.stringify(data)))` and to create a MAM message `(Mam.create())`.

```javascript
// store new messages for each new asset and for each change of custody 
// Publish to tangle 
const publish = async data => { 
  try { 
    // Create MAM Payload - STRING OF TRYTES 
    const trytes = asciiToTrytes(JSON.stringify(data)); 
    const message = Mam.create(mamState, trytes); 
 
    // Save new mamState 
    updateMamState(message.state); 
 
    // Attach the payload. 
    await Mam.attach(message.payload, message.address);  
    return { root: message.root, state: message.state }; 
  } catch (error) { 
    console.log('MAM publish error', error); 
    return null; 
  } 
}; 
```

Once a new MAM channel is created or an existing one is updated, we need to update the object repository. This can be done through the `createItem()` and `updateItem()` functions introduced above and described below.

```javascript
export const createItem = (eventBody, channel, secretKey, userId) => { 
  // Create item reference 
  const itemsRef = getItemReference(eventBody.itemId);   
  appendItemToNewUser(userId, eventBody.itemId);    
  
  itemsRef.set({     
      ...eventBody,     
      mam: {       
          root: channel.root,       
          seed: channel.state.seed,       
          next: channel.state.channel.next_root,       
          start: channel.state.channel.start,
          secretKey, 
    },
  });
};
```

```javascript
export const updateItem = (eventBody, mam, newItemData, user) => { 
  // Create reference 
  const itemsRef = getItemReference(eventBody.itemId); 
   
   itemsRef.update({     
       ...eventBody,     
       mam: {       
           root: mam.root,       
           secretKey: mam.secretKey,       
           seed: newItemData.state.seed,       
           next: newItemData.state.channel.next_root,       
           start: newItemData.state.channel.start, 
    }, 
  }); 
};
```

In the `updateItem()` function above, first the Firebase Object Repository is searched for an existing asset, through its itemId and subsequently information are updated with the new MAM channel or message details.