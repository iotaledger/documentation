# IoT projects

**The Internet of Things (IoT) is an umbrella term for billions of Internet-connected devices that share data with each other. Thanks to this data-sharing network, IoT is becoming the driving force in creating more efficient communication across many aspects of our lives. IOTA allows these devices to use the Tangle as a single source of truth, where they can buy, sell, or simply send data among each other for zero fees.**

## IOTA and the Internet of Things

The goal of IOTA is to allow devices on the Internet of Things (IoT) to transfer data and make payments among each other.

While most IoT devices have enough computational power to sign and send IOTA transactions, some low-end devices are not powerful enough to calculate the necessary proof of work. For these devices, we recommend choosing another option for calculating proof of work.

:::info:
An example of a device that can do proof of work is the [STM X-Cube-IOTA1](https://www.st.com/en/embedded-software/x-cube-iota1.html). This devices uses the IOTA C client library as middleware.
:::

We are also currently working on how best to integrate IOTA into cloud IoT environments (such as AWS IoT and Google Cloud IoT). This integration will allow you to seamlessly transfer IoT data among physical devices through the Tangle.

In this series of articles, we start from the basics to show you how to set up small devices such as microcontrollers on the Internet of Things. Then, as you become more confident, we connect these devices to the Tangle, so that you can attach immutable sensor data to it for other devices to read or even buy.

## Supported boards

---------------
#### **CryptoCore** ####
[CryptoCore](../cryptocore/introduction/get-started.md)

The CryptoCore is IOTA hardware designed for applications that need fast, dedicated proof of work and a secure memory.
---
#### **ESP32** ####
[ESP32](../esp32/introduction/get-started.md)

The ESP32 is a WiFi-compatible microcontroller that also support Bluetooth Low Energy (BLE).
---
#### **nRF52** ####
[nRF52](../nrf52/introduction/get-started.md)

The nRF52 is a power-efficient series of microcontrollers that supports Bluetooth Low Energy (BLE), allowing you to build low-power wireless solutions.
---
#### **STM32 Discovery Kit** ####
[STM32 Discovery Kit](https://www.st.com/content/st_com/en/products/evaluation-tools/product-evaluation-tools/mcu-mpu-eval-tools/stm32-mcu-mpu-eval-tools/stm32-discovery-kits/b-l4s5i-iot01a.html)

The B-L4S5I-IOT01A Discovery Kit is a power-efficient microcontroller based on the ARM Cortex M4 processor. It features a secure element and already supports IOTA 1.5.
---
#### __Single-board computers__ ####
[SBC](../sbc/introduction/get-started.md)

Single-board computers (SBCS) are useful for building applications that require more power than a microcontroller. SBCs are lighter, smaller, and more power efficient than multi-board computers such as desktops.
---------------