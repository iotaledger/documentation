# Set up a Bluetooth star network

**Star networks are useful for setting up sensor server networks that communicate through a border router. In this tutorial, you set up a [6LoWPAN](https://en.wikipedia.org/wiki/6LoWPAN) over Bluetooth Low-Energy star network, using state-of-the-art IoT industry standards.**

## Hardware

To complete this guide, you need the following:

- [A prepared nRF52832 microcontroller](../introduction/get-started.md)
- [A BME/BMP 280 sensor](../setup-guides/connect-bosch-sensor.md)
- A Linux PC or SBC (to use as a border router) that supports Bluetooth version 4.0 or less (USB dongle or integrated) and that is connected to a keyboard and a monitor

## Architecture

In the star topology, all devices directly communicate with the border router, which acts as a switch to pass on their messages through the Internet.

You could connect more than one sensor server node to the border router, but in this example we connect only one.

![Star network topology](../../images/star_topology.png)

## Step 1. Set up a sensor server node

By setting up your microcontroller as a sensor server node, you can allow other devices to request data from it over the Internet. This is useful for applications that need remote access to this data to perform calculations on it.

:::info:
Due to a bug in RIOT OS, the nRF52832 is the only supported microcontroller at the moment.
:::

1. Change into the `BLE-environment-sensor/examples/env_sensor_network` directory

    ```bash
    cd BLE-environment-sensor/examples/env_sensor_network/
    ```
    
2. Flash the example onto the microcontroller. Replace the `$BOARD` AND `$USB_PORT` placeholders with the name of your board and the path to your USB-to-UART connector such as `/dev/ttyUSB0` 
    
    ```bash
    BOARD=BOARD PORT=/dev/ttyUSB0 make flash term
    ```

    :::info:
    Search the RIOT documentation to [find the name of your board](https://api.riot-os.org/group__boards.html).
    :::

If everything went well, you should see no errors, and if you enter `help`, you should see a list of available commands.

To see a list of all running processes, do `ps`.

This is an example application. To support sensors other than the BME/BMP 280, you can edit the `BLE-environment-sensor/examples/env_sensor_network/server.c` and `BLE-environment-sensor/examples/env_sensor_network/sensor.c` files.

## Step 2. Set up a border router

To allow the sensor servers in a star network to access the Internet, you need a border router that can pass on their data. In this tutorial, you set up a border router on a Linux device.

## Step 2.1. Install a compatible Linux kernel

Due to [a bug in RIOT OS](https://github.com/RIOT-OS/RIOT/issues/11147), you need to use an older Linux kernel (maximum version 4.12) to set up a border router.

1. Check which version of the Linux kernel your device has

    ```bash
    uname -a
    ```

    If you see a version number that's greater than 4.12, continue to step 2. Otherwise, skip the rest of these steps and [install the 6LoWPAN dependencies](#step-2-install-the-6lowpan-dependencies).

2. Select your architecture and download version 4.11.12 of the generic kernel image from the [Ubuntu Linux mainline kernel builds](https://kernel.ubuntu.com/~kernel-ppa/mainline/v4.11.12/)


3. Install the kernel

    ```bash
    sudo dpkg -i linux-image*.deb
    ```

4. Restart your system while holding the `SHIFT` key until you see the option to select a kernel 
    
5. Select version 4.11.12

## Step 2.2. Install the 6LoWPAN dependencies

To allow the border router to use 6LoWPAN over BLE, you need to install the software dependencies.

:::info:
If you close your session, for example after a reboot, you have to reinstall these dependencies.
:::

1. Install bluez

    ```bash
    sudo apt-get install -y bluez
    ```

2. Log in as the root user

    ```bash
    sudo su
    ```

3. Mount the `debugfs` file system

    ```bash
    mount -t debugfs none /sys/kernel/debug
    ```

4. Load the Bluetooth 6LoWPAN Linux module

    ```bash
    modprobe bluetooth_6lowpan
    ```

5. Enable the 6LoWPAN module

    ```bash
    echo 1 > /sys/kernel/debug/bluetooth/6lowpan_enable
    ```

6. Find any available Bluetooth devices

    ```bash
    hciconfig
    ```

    You should see something like the following:

    ```bash
    hci0:   Type: Primary  Bus: UART
        BD Address: B8:27:EB:57:16:51  ACL MTU: 1021:8  SCO MTU: 64:1
        UP RUNNING
        RX bytes:1528 acl:0 sco:0 events:92 errors:0
        TX bytes:2558 acl:0 sco:0 commands:92 errors:0
    ```

7. To test your connection to a device, reset one. Replace the `YOUR_DEVICE_ID` placeholder with the ID of your device.

    ```bash
    hciconfig YOUR_DEVICE_ID reset
    ```

    For example:

    ```bash
    hciconfig hci0 reset
    ```

The Bluetooth device should reset.

## Step 3. Connect the border router to the sensor server node

To allow the sensor server node to send and receive data over the Internet, it needs to be connected to a border router.

1. In the serial console of your sensor server node, find the Bluetooth MAC address

    ```bash
    ifconfig
    ```

    :::info:
    The Long HWaddr is the Bluetooth MAC address.
    :::

2. On your border router, scan for BLE devices 

    ```bash
    hcitool lescan
    ```

    You should see the Bluetooth MAC address of the sensor server node.

3. Connect your border router to the sensor server node. Replace the `00:AA:BB:XX:YY:ZZ` placeholder with the address of your sensor server node.
    
    ```bash
    echo "connect 00:AA:BB:XX:YY:ZZ 1" >> /sys/kernel/debug/bluetooth/6lowpan_control
    ```

    :::info:
    You can connect more than one sensor server node to your border router by adding other addresses.
    :::

## Step 4. Request data from the sensor servers

When you have a border router and a connected sensor server node, you can request data from the sensor over the Internet, using its IPv6 address.

1. Install the Go programming language on a Linux device such as an [SBC](../../sbc/how-to-guides/install-go-on-sbc.md)

2. Start the server on your microcontroller
    
    :::info:
    You need to execute the following command in the serial console of your microcontroller.

    The serial terminal of your microcontroller is opened in the terminal where you executed the `make flash term` command.
    :::
    
    ```bash
    server start
    ```

    The sensor server node is now running a server application that waits for incoming UDP requests from a client.

    Responses are sent back to the client on the same port from which the request was sent. For example, if the client (the SBC or the PC) sends a UDP packet on port 90 (outgoing-port at the SBC) to port 51037 (incoming-port on the sensor), the sensor server node sends the response to port 90 on the SBC or PC.
    
3. Clone the client code onto your Linux device

    ```bash
    git clone https://github.com/iota-community/BLE-environment-sensor-client.git $GOPATH/src/github.com/citrullin/udp_client
    ```

4. In the `client.go` file, replace the `"fe80::2ca:46ff:fed3:1967"` IPv6 address with the IPv6 address of your sensor server node to allow the client to connect to it

    ```cpp
    var seedSensorConfig = SensorNode{
        Config: SensorConfig{
            Address: net.UDPAddr{
                IP: net.ParseIP("fe80::2ca:46ff:fed3:1967"), Port: 51037, Zone: interfaceName,
            },
        },
    }
    ```

    :::info:
    To find out the IPv6 address of your sensor server, execute the `ifconfig` command in the serial interface of the microcontroller.
    :::
    
5. Run the client application

    ```bash
    cd $GOPATH/src/github.com/citrullin/udp_client && go run client.go
    ```

    You should receive sensor data from the sensor server node.

:::success:Congratulations :tada:
You have a Bluetooth star network with a single sensor server node that you can access over the Internet.
:::

## Troubleshooting

These are known issues that you may find while following this guide and some suggested steps to resolve them.

### None already mounted or mount point busy

If you see this response, ignore it. The file system is probably already mounted.

```bash
mount: /sys/kernel/debug: none already mounted or mount point busy.
```

### Could not import Google protobuf

If you see the following error, install python-protobuf for your Linux distribution:

```bash
*************************************************************
*** Could not import the Google protobuf Python libraries ***
*** Try installing package 'python-protobuf' or similar.  ***
*************************************************************
```

For example, for Ubuntu, do the following:

```bash
sudo apt-get install python-protobuf
```

## Next steps

[Attach your sensor data to the Tangle](../iota-projects/run-an-environment-to-tangle-app.md).