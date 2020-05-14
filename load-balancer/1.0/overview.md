# Client load balancer

**The [client load balancer](https://github.com/iotaledger/client-load-balancer) allows you to configure the core JavaScript client library with backup nodes in case of request errors. This library is a useful for cases where the connected node goes offline or it has deleted the transactions you are searching for during one of its local snapshots.**

With the client load balancer, you can:

- Send request to backup nodes in case one doesn't have the transactions you are looking for
- Configure strategies for how and when to send requests to backup nodes
- Set timeouts for non-responsive nodes
- Blacklist nodes after failing to respond
- Configure node settings such as the minimum weight magnitude for each individual node or for all nodes

## Repository

Go to the source code on [Github](https://github.com/iotaledger/client-load-balancer).

## Supported languages

### **Official support** ###

---------------

#### **JavaScript** ####
[Link](/getting-started/connect-to-a-backup-node.md)
---

---------------

## Next steps

[Get started](/getting-started/connect-to-a-backup-node.md).