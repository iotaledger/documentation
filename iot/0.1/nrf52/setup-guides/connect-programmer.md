# Connect to an external programmer

**To transfer machine code onto a microcontroller, you need a [programmer](https://www.engineersgarage.com/how-to-guides/microcontroller-programmer-burner), and not all microcontrollers have an integrated one. In this tutorial, you connect an external programmer to an nRF52-series microcontroller.**

## Hardware

To complete this guide, you need the following:

- Linux-based PC to which to connect the programmer
- An nRF52-series microcontroller

## Step 1. Choose an external programmer

You can use any of the following external programmers with an nRF52-series microcontroller:

- J-Link
- J-Link OB clone

:::info:
The standard J-link programmers are more expensive than the J-Link OB clones because they can also be used on microprocessors. Therefore, we recommend the J-Link OB clone.
:::

## Step 2. Wire the external programmer to your microcontroller

To use your programmer, you need to wire it to your microcontroller.
    
### J-Link

1. Connect the following pins from the nRF52 to the J-Link

    |    **nRF52**    |    **J-Link (pin number)**   |
    |-------------|-------------------|
    |    VCC      |    VCC (1)        |
    |    GND      |    GND (4)        |
    |    SWD      |    SWDIO (7)      |
    |    SCLK     |    SWDCLK (9)     |

2. Plug the J-Link into the USB port of your PC

If the connections are correct, your PC should detect that the J-Link is connected.
    
### J-Link OB

1. Connect the following pins from the nRF52 to the J-Link OB clone

|    **nRF52**    |    **J-Link OB clone**   |
|-------------|----------------|
|    VCC      |    VCC         |
|    GND      |    GND         |
|    SWD      |    SWDIO       |
|    SCLK     |    SWDCLK      |

2. Plug the J-Link into the USB port of your PC

If the connections are correct, your PC should detect that the J-Link is connected.

## Next steps

[Continue setting up your microcontroller](../introduction/get-started.md#step-2-set-up-).



