# Raspberry Pi sensor data publisher

**Devices often need to share data so they can process and act on it. In this tutorial, you use a Raspberry Pi to send real-time temperature data (the current temperature in Celsius) to the Devnet Tangle every minute. Then, you subscribe to the event stream (ZMQ) on a Devnet node so know when it receives the data.**

:::info:Go to GitHub
For quickstart instructions or to read the source code, [go to the GitHub repository](https://github.com/iota-community/raspberrypi-pubsub).
:::

:::warning:
This application uses the [core JavaScript client library](root://core/1.0/overview.md), which is still in beta development. Do not use this code in production environments.
:::

This application uses the following files:

- `index.js`: Collects data, constructs the bundle, and sends the transaction.
- `temp.py`: Uses the [`envirophat` library](https://learn.pimoroni.com/tutorial/sandyj/getting-started-with-enviro-phat) to read the current temperature from the sensor.
- `fetchTemp.js`: Executes the `tempy.py` file to get the current temperature.
- `zmqWatcher.js`: Subscribes to a Devnet node's [ZMQ `address` event](root://node-software/0.1/iri/references/zmq-events.md#address) to monitor the address for confirmation.

The `fetchTemp.js` and `zmqWatcher.js` files are exported as modules and called from the `index.js` file.

## Prerequisites

To use this application, you need the following:

- [An Enviro Phat sensor board](https://shop.pimoroni.com/products/enviro-phat) connected to a Raspberry Pi

- [An LTS version or the latest version of Node.js and NPM](https://nodejs.org/en/download/)

- [Git](https://git-scm.com/download/linux)

For help setting up a Raspberry Pi, you can follow [these instructions](https://medium.com/@lambtho/raspberry-setup-dcb23e8ba88).

For help setting up the Enviro Phat, you can follow [this soldering guide](https://learn.pimoroni.com/tutorial/sandyj/soldering-phats) and [this getting started guide](https://learn.pimoroni.com/tutorial/sandyj/getting-started-with-enviro-phat).

## Run the application

Before we start looking at the details, run the application so you can see how quickly you can start sending data.

1. Clone this repository

  ```
  git clone https://github.com/iota-community/raspberrypi-pubsub
  ```

2. Change into the `raspberrypi-pubsub` directory

  ```bash
  cd raspberrypi-pubsub
  ```

3. Install the dependencies

  ```bash
  npm install
  ```

4. Run the code

  ```bash
  node index.js
  ```

:::success:Congratulations! :tada:
In the console, you should see that the current temperature in Celcius is sent as a transaction to a node on the Devnet.

If you wait for around a minute, you should see the ZMQ event trigger when the transaction is confirmed.
:::

![Response data](../images/raspberrypi-pubsub.gif)

## Check your data

One of the most important benefits of IOTA is that transactions on the Tangle are immutable (can't be changed).

If you want to check that your transaction is on the Devnet Tangle, you can copy the value of the `hash` field and paste it into the search bar of the [Tangle Explorer](https://utils.iota.org/).

On this page, you can check that your data is unchanged by checking the Contents section and comparing the JSON message to the value that your sensor returned in the console.

## Next steps

After going through this tutorial, you know enough to adapt this application to send any kind of data from any kind of device that you want.

[Start encrypting your data and sending it through a MAM (masked authenticated messaging) channel](../mam-watcher/overview.md).

[Get to know the IOTA client libraries](root://client-libraries/1.0/overview.md) and find out what else you can do.

