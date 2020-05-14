# Connect to an external programmer to the bluepill board (STM32F1)

**To transfer machine code onto a microcontroller, you need a [programmer](https://www.engineersgarage.com/how-to-guides/microcontroller-programmer-burner), and not all microcontrollers have an integrated one. In this tutorial, you connect an external programmer to an STM32F1-series microcontroller.**

## Hardware

To complete this guide, you need the following:

- A bluepill board (STM32F103C8T6)
- A Linux, macOS, or Windows operating system

## Step 1. Choose an external programmer

You can choose any of the following programmer for the bluepill board.

- J-Link
- ST-Link

:::info:
The J-link programmers are more expensive than the ST-Link. The ST-Link can only be used for STMicro microcontroller.
We recommend the ST-Link, because of its accessibility and price.
:::

## Step 2. Wire the external programmer to your microcontroller

To use your external programmer, you need to wire it to your bluepill

### J-Link

1. Connect the following pins from the bluepill to the J-Link

    |    **bluepill**    |    **J-Link (pin number)**   |
    |-------------|-------------------|
    |    VCC      |    VCC (1)        |
    |    GND      |    GND (4)        |
    |    SWD      |    SWDIO (7)      |
    |    SCLK     |    SWDCLK (9)     |
    
2. Plug the J-Link into the USB port of your PC

If the connections are correct, your PC should detect that the J-Link is connected.

    
### ST-Link

1. Connect the following pins from the bluepill to the J-Link

    |    **bluepill**    |    **ST-Link**   |
    |-------------|-------------------|
    |    VCC      |    VCC            |
    |    GND      |    GND            |
    |    SWD      |    SWDIO          |
    |    SCLK     |    SWDCLK         |
    
2. Plug the ST-Link into the USB port of your PC
    
If the connections are correct, your PC should detect that the ST-Link is connected.
