# Connect to a Bosch BME/BMP 280 sensor

**The Bosch BME/BMP 280 sensors are developed specifically for mobile applications where size and low power consumption are key design constraints. In this tutorial, you connect a Bosch BME/BMP 280 sensor board to your microcontroller so that they can communicate with each other.**

## Hardware

To complete this guide, you need the following:

- [An nRF52-series microcontroller](../introduction/get-started.md)
- A Bosch BME/BMP 280 sensor

---

1. If the pin headers aren't already soldered onto the sensor, solder them on

2. Connect the sensor's SDA and SCL pins to the microcontroller
        
    | **nRF52** | **Sensor** |
    |-----------------|------------|
    |      P0.26      |     SDA    |
    |      P0.27      |     SCL    |
    
    :::info:
    The nRF52 has a feature called [EasyDMA](https://infocenter.nordicsemi.com/index.jsp?topic=%2Fcom.nordic.infocenter.nrf52832.ps.v1.1%2Feasydma.html&cp=3_1_0_9&anchor=easydma), which allows you to [assign wire protocols to any pin](https://infocenter.nordicsemi.com/index.jsp?topic=%2Fcom.nordic.infocenter.nrf52832.ps.v1.1%2Ftwim.html&cp=3_1_0_32&anchor=concept_scx_f5p_xr).
    :::

3. Connect the SDO pin to the VDDIO pin to give the sensor the I2C device address 0x77

4. If you have a BME/BMP 280 sensor without the board, select the I2C interface by doing the following:

- [Pull up the SCL and SDA lines](https://electronics.stackexchange.com/a/1852/201179)
- Connect the CSB pin to the VDDIO pin

5. If you want to connect more than one sensor to your microcontroller, you need to make sure that each one has a unique 7-bit address. Generally, sensors have a PIN that you need to pull up or down to select the I2C address. See your sensor's datasheet for information about how to do this:

- [BMP 280 datasheet](https://ae-bst.resource.bosch.com/media/_tech/media/datasheets/BST-BMP280-DS001.pdf)
- [BME 280 datasheet](https://ae-bst.resource.bosch.com/media/_tech/media/datasheets/BST-BME280-DS002.pdf)

## Next steps

[Read the data from your sensor](../how-to-guides/read-sensor-data.md).

If you want to use a different I2C sensor, check the [RIOT OS sensor driver list](http://riot-os.org/api/group__drivers__sensors.html) to make sure that it is supported by the RIOT OS operating system, which we use in these guides.
    
