# Monitor your node for incoming transactions

**When your node receives transactions, it publishes them as a transaction event to a service called zero message queue (ZMQ). As a client, you can subscribe to this event to monitor your node for incoming transactions.**

:::info:
The latest version of GoShimmer no longer supports ZMQ.

In the next version, ZMQ will be replaced by MQTT to allow you to monitor a node for transactions.
:::

You can receive this transaction data from a node by doing the following:

1. Install an open-source ZMQ library

2. Create a ZMQ socket and connect it to a node

3. Subscribe to events from the ZMQ

In the following how-to guide we use Node.js and Python, but you could use any [programming language that the ZMQ library supports](http://zguide.zeromq.org/page:all).

## Prerequisites

To use the sample code in this tutorial, you must have the following:

- [Node.js (8+)](https://nodejs.org/en/) or [Python (3+)](https://www.python.org/downloads/) and [PIP](https://pip.pypa.io/en/stable/installing/)
- A code editor such as [Visual Studio Code](https://code.visualstudio.com/Download)
- Access to a command-line interface

## Subscribe to the transaction event

You can subscribe to the `tx` event to monitor a node for recently received transactions.

1\. Install the zeromq package

--------------------
### Node.js

```bash
npm install zeromq --save
```
---
### Python

```bash
pip install pyzmq
```
--------------------

2\. Import the libraries and create a ZMQ subscribe socket

--------------------
### Node.js

```js
const zmq = require('zeromq');
const sock = zmq.socket('sub');
```
---
### Python

```python
import zmq

context = zmq.Context()
socket = context.socket(zmq.SUB)
```
--------------------

3\. Connect the socket to your node's address

--------------------
### Node.js

```js
sock.connect('tcp://localhost:5556');
```
---
### Python

```python
socket.connect('tcp://localhost:5556')
```
--------------------

4\. Subscribe to the `tx` event. This event is for received transactions.

--------------------
### Node.js

```js
sock.subscribe('tx');
console.log("Socket connected");
```
---
### Python
```python
socket.subscribe('tx')
print ("Socket connected")
```
--------------------

5\. Process the event data that the node returns

--------------------
### Node.js

```js
sock.on('message', msg => {
    //Split the data into an array
    const data = msg.toString().split(' ');
    for(var i = 0; i < data.length; i++){
        console.log(data[i]);
    }
});
```
---
### Python
```python
while True:
    print ("Waiting for events from the node")
    message = socket.recv()
    data = message.split()
    print (data)
```
--------------------

The output should display something like the following:
```shell
tx
YMTMRYBLFPTYCLHAWJVDEZNXITKOW9YMOICXPZVHNHMVLPWLDFYLVAO9XFWICBJCUZAHVQPHINBDXD9NE
999999999999999999999999999999999999999999999999999999999999999999999999999999999
125204
999999999999999999999999999
0
0
0
YMTMRYBLFPTYCLHAWJVDEZNXITKOW9YMOICXPZVHNHMVLPWLDFYLVAO9XFWICBJCUZAHVQPHINBDXD9NE
BLFZJUOBAPWCXTGOCSBVJSXIYOGHN9SUGQEMSUOCUPRK9FXDOONJIOCCSKTBZC9LLBLVSC9BOXEDRE9HY
FXTZC9KKRBWSBYKCOGUDZOZUWHTQWDNMZPZ9SCVYTWVBQNYIXHREHCTP9DEJCR9LHUEHMBIXXGSDQJUUW
1562247720
999999999999999999999999999
```

If we take this data as a random example, it corresponds to the following:

| **Data**| **Description**|
|:--------|:---------------|
|tx|Name of the ZMQ event|
|YMTMRYBLFPTYCLHAWJVDE...|Transaction hash|
|999999999999999999999...|Address|
|125204|Value|
|999999999999999999999...|Obsolete tag|
|0|Timestamp|
|0|Current index of this transaction in the bundle|
|0|Index of the head transaction in the bundle|
|YMTMRYBLFPTYCLHAWJVDE...|Bundle hash|
|BLFZJUOBAPWCXTGOCSBVJ...|Trunk transaction hash|
|FXTZC9KKRBWSBYKCOGUDZ...|Branch transaction hash|
|1562247720|Unix epoch of when the node received the transaction|
|99999999999999999999...|Empty tag|

:::info:
The `value` field has a non-zero value so that the transaction hash is unique for each transaction. No IOTA tokens are transferred.
At the moment, the ZMQ endpoint only supports the `tx` event.
::: 

