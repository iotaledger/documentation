# Track and trace

**Returnable assets that are used within distribution networks are often not returned to their original owners. This blueprint describes how the IBCS Group implemented a track and trace system for recovery of returnable assets, using the IOTA Tangle and other IOTA technologies.**

We present the integration of this blueprint in [IBCS Group](https://www.ibcsgroup.com/) business processes. This blueprint is a guide for other organizations to replicate and adapt for their own scenarios and business processes.

## Business case

A returnable asset is an asset that's used by many parties in the distribution and logistics chain.

For example, in the glass manufacturing industry, a glass rack is a returnable asset. This asset is used to ship glasses from a glass producer (owner of the asset) to a distributor. Instead of returning the glass rack to the glass producers, the glass distributors might use them to ship other glasses to a window manufacturer. Then, the window manufacturers might use it to deliver windows to their customers.

When many parties use the same returnable asset, it's easy for the owner to lose track of it.

Misplacement of such assets represents an economic loss for asset owners. When assets are missing, it affects the owners ability to fulfill deliveries and wastes their time and resources on recovering them. 

The table below summarizes the different stakeholders and roles considered in this example business case. The table also shows how complex it is to keep track of all the relations involved in the handling of returnable assets.

| **Stakeholder**       | **Role** |
|:---------------|:--------|
| **Glass producers** | Deliver glasses either to distributors (directly) or to Window Manufacturers (through Logistic Provider). Own the returnable assets. |
| **Window manufacturers** | Deliver windows to windows resellers either directly or through logistic providers. Might own their own returnable assets and use for the delivery. Or they might also re-use returnable assets received from glass producers.  |
| **Distributors**   | Receive glasses or windows delivered directly or through logistic providers together with returnable assets used for the delivery. Re-use the returnable assets to deliver glasses or windows further down to the distribution chain.  | 
| **Window resellers**   | Receive windows from distributors and use received returnable assets to arrange their delivery to end-customers. | 
| **Customers**    | Receive windows directly from windows resellers or through logistic providers which use glass producers and windows manufacturers returnable assets. Often dispose returnable assets or do not know to whom and how to return.  | 
| **Logistic providers**   | Move assets and returnable assets along the distribution chain.  | 

### Challenges

So far, tracking and tracing returnable assets has been unsuccessful for the following reasons: 

- Custodians don't see economic value in a returnable asset. Instead, returnable assets are more likely to be seen as disposable
- Custodians are neither incentivized to help track returnable assets nor held accountable for not doing so
- Tracking returnable assets requires access to data that's stored in a number of proprietary systems, all of which belong to different custodians. These different systems increase the complexity to predict, map, and integrate the data, and exceed the perceived benefits in tracking returnable assets.

It's not possible to report the custody of assets using a centralized database because this database will also reveal to third parties, proprietary knowledge about different stakeholders, customers, and distribution chains. Moreover, it will be difficult to create a system that's able to track all the possible interactions envisioned for a number of stakeholders that aren't known up front.

### Solution

IOTA provides a solution to seamlessly collect and share information about returnable assets without the need to integrate any proprietary system. While doing that, IOTA can still guarantee access control of the collected information through the use of the second layer MAM protocol.

Thanks to the permissionless nature of IOTA, no trust is required among those who run the infrastructure because the data is spread across the whole IOTA network. 

In addition, the system does not need knowledge of all parties who write information to the ledger. This simplifies the system so that it can be used by all stakeholders and industry sectors as needed and with minimum integration and onboarding time.

This solution leads to the following benefits: 

- Asset owners can track and request the return of their returnable assets

- Asset owners can save the time and the costs associated with searching for missing assets

- Asset owners can better predict and plan shipments of their production by knowing the exact number and the exact location of any returnable assets that are available to them

- Custodians can track the returnable assets they handle, be rewarded for returning them, and increase their reputation with asset owners

- Custodians can save costs associated with supporting requests for returnable assets that are declared missing

:::info:
Future scenarios the use of the IOTA token (and Qubic smart contracts) could allow you to create incentives to reward custodians who participate in tracking and tracing returnable assets, despite the country and the currency in which the assets are handled.
:::

This image presents a simplified stakeholders map and the different actions each stakeholder should perform when in contact with a returnable asset.

![Returnable assets stakeholder map](../images/track-and-trace-returnable-assets-stakeholders.png)

|**Key**|**Description**|
|:---|:---|
|Dotted arrows| Path of a returnable asset|
|Green circles| Stakeholders such as custodians|
|Purple circles| Owner of the returnable asset| 

## Demo

See this website for a [demonstration of the application](http://tradedemo.iota.org).
 	 	 
## Additional resources

---------------
#### Core JavaScript client library ####
[Link](root://core/1.0/getting-started/get-started-js.md)

Learn how to use the JavaScript client library to create, send, and receive transactions.
---
#### MAM eloquently explained ####
[Link](https://blog.iota.org/introducing-masked-authenticated-messaging-e55c1822d50e)

Masked Authenticated Messaging is a second layer data communication protocol that adds functionality to publish and control access to an encrypted data stream, over the Tangle. Learn more about how MAM works.
---
#### MAM GitHub repository ####
[Link](https://github.com/iotaledger/mam.client.js)

Read the code and some quickstart instructions to test MAM with JavaScript.
---------------
