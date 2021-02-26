# Listen for live transactions in Python

**In this tutorial, you listen to the Tangle for confirmed transactions by subscribing to events on a node.**

## Packages

To complete this tutorial, you need to install the following package:

```bash
pip install zmq
```

## IOTA network

In this tutorial, we connect to a node in the [Devnet](root://getting-started/1.1/networks/overview.md).

## Code walkthrough

1. Import the packages

    ```python
    import zmq
    ```

2. Connect the socket to a node's ZMQ port

    ```python
    context = zmq.Context()
	socket = context.socket(zmq.SUB)
    socket.connect('tcp://zmq.devnet.iota.org:5556')
    ```

3. Subscribe to the [`sn`](root://hornet/1.1/references/events.md) event to see confirmed transactions

    ```python
    socket.subscribe('sn')
    print ("Socket connected")
    ```

4. Process the event data that the IOTA node returns

    ```python
    while True:
        print ("Waiting for events from the IOTA node")
        message = socket.recv()
        data = message.split()
        print ("Transaction confirmed by milestone index: ", data[1])
        print ("Transaction hash: ", data[2])
    ```

    In the console, you should see transaction data.

:::success:Congratulations :tada:
You're listening to transactions
:::

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code in the browser.

Click the green button to run the sample code in this guide and see the results in the window.

:::info:
It may take a minute or two to receive data from the IOTA node.
:::

<iframe height="600px" width="100%" src="https://repl.it/@jake91/ZMQ-example-Python?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Next steps

Take a look at our [app blueprints](root://blueprints/0.1/introduction/overview.md) for inspiration
