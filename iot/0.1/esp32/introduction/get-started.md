# Get started with the ESP32

**ESP32 microcontrollers are an ideal solution for applications that need to connect to WiFi or Bluetooth. In this tutorial, you learn how to get started with the ESP32 microcontrollers. When you've completed this guide, you'll be able to follow our series of tutorials for using IOTA on the Internet of Things.**

## Hardware

To complete this guide, you need a Linux PC and an [ESP32 DevKitC](https://www.espressif.com/en/products/hardware/esp32-devkitc/overview).

## Step 1. Set up your development environment

Before you can start using your microcontroller, you need to install the necessary tools on your PC so that you can flash code onto it.

1. Install Git

    ```bash
    sudo apt install git-all
    ```

2. [Install the extensa-esp32 toolchain](https://docs.espressif.com/projects/esp-idf/en/v3.2.2/get-started-cmake/index.html#setup-toolchain)

3. [Install the ESP32 libraries](https://docs.espressif.com/projects/esp-idf/en/v3.2.2/get-started-cmake/index.html#get-esp-idf)

## Step 2. Test your microcontroller

After setting up your microcontroller with all the necessary software, you can test it by running the 'hello world' program that comes in the [ESP32 GitHub repository](https://github.com/espressif/esp-idf).

1. Clone the [ESP32 GitHub repository](https://github.com/espressif/esp-idf)

  ```bash
  git clone -b v3.2.2 --recursive https://github.com/espressif/esp-idf.git
  cd esp-idf/examples/get-started/hello_world
  ```

2. Find the path to your [ESP32's port](https://docs.espressif.com/projects/esp-idf/en/v3.2.2/get-started-cmake/establish-serial-connection.html)

3. Flash the 'hello world' program onto your ESP32. Replace the `$USB_PORT` placeholder with the port that the ESP32 is connected to.

  ```bash
  idf.py -p $USB_PORT flash
  ```

  You should see something like the following in the shell:

  ```
  Hello world!
  Restarting in 10 seconds...
  I (211) cpu_start: Starting scheduler on APP CPU.
  Restarting in 9 seconds...
  Restarting in 8 seconds...
  Restarting in 7 seconds...
  ```

:::success: Congratulations :tada:
You just compiled code and flashed it onto your microcontroller. Now, you're ready to build some real applications.
:::

## Troubleshooting

These are known issues that you may find while following this guide and some suggested steps to resolve them.

### Can't flash programs

If the `flash` command isn't working, check the Espressif documentation for the following:

- Make sure you can [connect to the serial port](https://docs.espressif.com/projects/esp-idf/en/v3.2.2/get-started-cmake/establish-serial-connection.html)
- Make sure that your system is set up with the correct [environment variables](https://docs.espressif.com/projects/esp-idf/en/v3.2.2/get-started-cmake/index.html#get-started-setup-path-cmake)

## Next steps

Follow one of the our guides:

- [Run a command-line wallet](../iota-projects/create-a-wallet.md)

- [Run an address monitor](../iota-projects/generate-address.md)

