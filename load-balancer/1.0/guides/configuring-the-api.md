# Configuring the API

**This topic explains how you can configure the client load balancer API with custom settings.**

Each instance of the client load balancer can include the following options:

- [attachToTangle](https://github.com/iotaledger/client-load-balancer/blob/master/docs/classes/loadbalancersettings.md#optional-attachtotangle): A function that you want to use instead of the default [`attachToTangle()`](https://github.com/iotaledger/iota.js/tree/next/packages/core#module_core.attachToTangle) method. 
- [nodeWalkStrategy](https://github.com/iotaledger/client-load-balancer/blob/master/docs/classes/loadbalancersettings.md#nodewalkstrategy) (required): How and when you want the API to select new nodes to connect to
- [successMode](https://github.com/iotaledger/client-load-balancer/blob/master/docs/classes/loadbalancersettings.md#optional-successmode): Whether you want stay connected to the current node after a successful request or try to connect to the next node in the list
- [failMode](https://github.com/iotaledger/client-load-balancer/blob/master/docs/classes/loadbalancersettings.md#optional-failmode): Whether you want to throw an exception after a single request failure or try to connect to all nodes before throwing an exception
- [failNodeCallback](https://github.com/iotaledger/client-load-balancer/blob/master/docs/classes/loadbalancersettings.md#optional-failnodecallback): A callback which is called when a node fails
- [tryNodeCallback](https://github.com/iotaledger/client-load-balancer/blob/master/docs/classes/loadbalancersettings.md#optional-trynodecallback): A callback which is called when a new node is about to be sent a request
- [timeoutMs](https://github.com/iotaledger/client-load-balancer/blob/master/docs/classes/loadbalancersettings.md#optional-timeoutms): The amount of time in milliseconds that you want to wait for a response from a node before using the fail mode
- [snapshotAware](https://github.com/iotaledger/client-load-balancer/blob/master/docs/classes/loadbalancersettings.md#optional-snapshotaware): Whether to log a message to the console if the requested transactions have been deleted by the node during a snapshot