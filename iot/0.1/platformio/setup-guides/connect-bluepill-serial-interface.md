# Connect to the bluepill board's serial interface

**To read the output of your microcontroller, you need to be able to receive and transmit data on its serial port through a USB-to-UART connector. Some microcontroller development boards include an integrated USB-to-UART connector, but others the bluepill does not. In this tutorial, you connect an external USB-to-UART connector to your bluepill board and plug it into your PC to be able to communicate with the microcontroller.**

## Hardware

To complete this guide, you need DuPont cables, which are used to connect the USB-to-UART connector to your microcontroller

## Step 1. Choose a USB-to-UART connector

Many USB-to-UART connectors are available, and you may find that they are named differently, depending on the vendor. For example, you may see USB-to-TTL and USB-to-serial connectors.

Whichever connector you choose, make sure that it has a [device driver](https://en.wikipedia.org/wiki/Device_driver) that's compatible with your operating system.

## Step 2. Wire the connector to your microcontroller

To use your connector, you need to wire it to your microcontroller.

1. Connect the following pins from the bluepill board to the USB-to-UART connector:
    
    |    **bluepill (pin)**   |    **USB-to-UART**  |
    |------------------|------------------|
    |    TX (A10)       |    RX            |
    |    RX (A9)        |    TX            |
    |    VCC            |    VCC           |
    |    GND            |    GND           |

    **USB-to-UART**

    :::info:
    Use a black DuPont cable for GND and a red one for VCC.
    :::

2. Plug the USB-to-UART connector connector into your PC

If the wiring is correct, your PC should detect the connector.
