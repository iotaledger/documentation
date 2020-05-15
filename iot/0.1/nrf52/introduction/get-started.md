# Get started with the nRF52

**The nRF52-series of microcontrollers are an ideal solution for wearables, toys, smart home devices and appliances, and wireless charging. We use this series of microcontrollers because they include Bluetooth and are usually cheap. In this tutorial, you learn how to get started with the nRF52-series of microcontrollers. When you've completed this guide, you'll be able to follow our series of tutorials for using IOTA on the Internet of Things.**

## Hardware

To complete this guide, you need a Linux PC.

We recommend that you buy the following useful components for building circuits:

- **Breadboard:** Allows you to make temporary circuits for connecting hardware components without needing to solder them.

- **DuPont cables (female-to-female, male-to-female, and male-to-male connectors)** Allow you to connect devices through pin headers or a breadboard.

**Pin headers (male-to-male and male-to-female connectors):** Allow you to connect your different hardware components to the microcontroller

## Step 1. Choose a microcontroller

Many companies manufacture and distribute nRF52-series microcontrollers. For example, the following options are available:

- nRF52832 module and an nRF52832 minimum test board (tested with these tutorials)
- nRF52832 breakout board by SparkFun
- nRF52832 development kit (DK)
- nRF52832 micro development kit (MDK)

Development kits are often the most expensive option because they include useful features such as a labelled pins, a programmer, and a USB-to-UART connector.

The modules alone are often the cheapest option, but they are difficult to set up because they require more knowledge of circuits. As a result, in these guides, we assume that you have a board.

When choosing a microcontroller, you should consider the following questions:

### Is the programmer integrated on the board?

A programmer (sometimes called a debugger) is a device that is used to transfer the machine code from a PC to a microcontroller's flash memory.

If your microcontroller does not have an integrated [programmer](https://www.engineersgarage.com/how-to-guides/microcontroller-programmer-burner), you'll need to [choose one to buy and wire it to the microcontroller](../setup-guides/connect-programmer.md).

### Is the USB-to-UART integrated on the board?

To read the output of your microcontroller, you need to be able to receive and transmit data through its serial interface. To access the serial interface on a microcontroller, you need a USB-to-UART connector (sometimes called a USB to TTL serial connector). Some development boards include an integrated USB-to-UART connector, but others do not.

If your microcontroller does not have an integrated USB-to-UART connector (sometimes called a USB to TTL serial connector), [choose one to buy and wire it to the microcontroller](../setup-guides/connect-to-serial-interface.md).

### Are the pins soldered onto the board?

To connect components to your microcontroller, your board needs pins, which may come connected or disconnected.

If the pins aren't connected to the board, you'll need to solder them on. Pimoroni has a [useful soldering guide](https://learn.pimoroni.com/tutorial/sandyj/the-ultimate-guide-to-soldering).

## Step 2. Set up your development environment

Before you can start using your microcontroller, you need to install the necessary tools on your Linux PC so that you can flash code onto it.

1. Install Git

    ```bash
    sudo apt install git-all
    ```

2. [Install the ARM toolchain](../setup-guides/install-arm-gcc-toolchain.md)

3. [Install OpenOCD](https://github.com/RIOT-OS/RIOT/wiki/OpenOCD)

    OpenOCD includes scripts to make it easy to flash the binary onto your microcontroller

4. Install Python 3 and the package manager

    ```bash
    sudo apt-get install -y python3-all
    sudo apt-get install -y python-pip3
    ```

5. If your Linux distribution has Python 2 pre-installed, make sure that it uses Python 3 by default

    ```bash
    echo "alias python=python3" >> ~/.bashrc
    ```

6. Install one of these programmer toolchains, depending on the programmer that you're using
 
   **Option 1:** [Install the J-Link or J-Link OB toolchain](https://gnu-mcu-eclipse.github.io/debug/jlink/install/)
    
   **Option 2:** [Install the DAPLink toolchain](https://github.com/mbedmicro/pyOCD#installing). Make sure that you install this toolchain using the `pip3` command.

## Step 3. Test your microcontroller

After setting up your microcontroller with all the necessary software, you can test it by running the 'hello world' program that comes with the [RIOT operating system](https://www.riot-os.org/) (RIOT OS).

1. Clone our forked RIOT OS repository and change into the `BLE-environment-sensor/examples/hello-world` directory

    ```bash
    git clone https://github.com/iota-community/BLE-environment-sensor.git
    cd BLE-environment-sensor/examples/hello-world
    ```

2. Find the path to your USB-to-UART connector by removing it, executing the `ls /dev/ttyUSB*` command, plugging the USB-to-UART connector back into your PC, then executing the `ls /dev/ttyUSB*` command again. The new entry is your connector.

3. Change the permissions for your USB-to-UART connector. Replace the `$USB_PORT` placeholder with the path to your USB-to-UART connector such as `/dev/ttyUSB0`.

    ```bash
    sudo chmod 777 $USB_PORT
    ```

4. Flash the 'hello world' program onto your microcontroller. Replace the `$BOARD` AND `$USB_PORT` placeholders with the name of your board and the path to your USB-to-UART connector such as `/dev/ttyUSB0`

    ```bash
    BOARD=BOARD PORT=/dev/ttyUSB0 make flash term
    ```

    :::info:
    To [find the name of your board](https://api.riot-os.org/group__boards.html), see the RIOT documentation.
    :::

    You should see something like the following in the shell:

    ```
    2019-08-27 09:17:09,359 - INFO # main(): This is RIOT! (Version: 2019.10-devel-488-g1b1c9)
    2019-08-27 09:17:09,359 - INFO # Hello World!
    2019-08-27 09:17:09,361 - INFO # You are running RIOT on a(n) nrf52832-mdk board.
    ```

:::success: Congratulations :tada:
You just compiled code and flashed it onto your microcontroller. Now, you're ready to build some real applications.
:::

## Troubleshooting

These are known issues that you may find while following this guide and some suggested steps to resolve them.

### Permission denied

If you're using a DAPLink programmer, create a udev rule by doing the following:

1. Clone the pyOCD repository

  ```bash
  git clone https://github.com/mbedmicro/pyOCD.git
  ```

2. Change into the `pyOCD/udev` directory

  ```bash
  cd pyOCD/udev
  ```

3. [Follow the pyOCD instructions](https://github.com/mbedmicro/pyOCD/tree/master/udev) for creating a udev rule

Now, try and flash your microcontroller again.

### arm-none-eabi-gcc version not supported

Install the latest version of the toolchain by doing the following:

1. Uninstall the old toolchain packages

  ```bash
  sudo apt remove binutils-arm-none-eabi gcc-arm-none-eabi libnewlib-arm-none-eabi
  ```

2. [Download the latest toolchain from developer.arm.com](https://developer.arm.com/tools-and-software/open-source-software/developer-tools/gnu-toolchain/gnu-rm/downloads)

3. Untar the toolchain in your `home` directory. Replace the `$FILENAME` placeholder with the name of the file that you downloaded

  ```bash
  tar -xjvf $FILENAME
  ```

4. Add the toolchain to your path. Replace the `$PATHTOFILE` placeholder with the path to your untarred toolchain

  ```bash
  echo "export PATH=$PATH:/home/$PATHTOFILE/bin/" >> ~/.bashrc
  ```

5. Close the terminal window, and open a new one

Now, you have a supported version of the toolchain

### Recipe for target 'flash' failed

When you use a J-Link OB clone for the first time, you may see the following message:

```bash
recipe for target 'flash' failed
make: *** [flash] Error 1
```

This error is caused because the first time you use a J-Link OB clone, it upgrades itself and fails to flash. 

Try and flash a second time and it should succeed.

### No connected debug probes

If you're using an external programmer, make sure that it is connected.

## Next steps

Follow one of the our guides:

- [Read data from a sensor on your microcontroller](../how-to-guides/read-sensor-data.md)
- [Set up a Bluetooth star network](../how-to-guides/set-up-a-bluetooth-star-network.md)
- [Attach sensor data to the Tangle](../iota-projects/run-an-environment-to-tangle-app.md)
    
    