# Read sensor data from a microcontroller

**In this tutorial, you create a low-budget application that allows you to read data from a sensor that's connected to an nRF52-series microcontroller.**

## Hardware

To complete this guide, you need the following:

- [A prepared nRF52 microcontroller](../introduction/get-started.md)
- [A connected BME/BMP 280 sensor](../setup-guides/connect-bosch-sensor.md)

## Step 1. Configure the sensor drivers

To be able to read data from a sensor, you need to configure the code so that the sensor's drivers are compiled and flashed onto the microcontroller.

1. Change into the `BLE-environment-sensor/examples/saul` directory

    ```bash
    cd BLE-environment-sensor/examples/saul
    ```

2. In the `Makefile` file, add `USEMODULE += bmx280` under `USEMODULE += ps` so that the driver for the BME/BMP 280 sensor can be compiled into your application

## Step 2. Compile and flash the application

After configuring the code to use the correct sensor drivers, you can compile it and flash it onto your microcontroller.
    
1. Compile and flash the operating system and the application. Replace the `$BOARD` AND `$USB_PORT` placeholders with the name of your board and the path to your USB-to-UART connector such as `/dev/ttyUSB0`.
    
    ```bash
    BOARD=BOARD PORT=USB_PORT make flash term
    ```

    :::info:
    Search the RIOT documentation to [find the name of your board](https://api.riot-os.org/group__boards.html).
    :::

2. Use the RIOT OS [hardware abstraction layer](https://en.wikipedia.org/wiki/Hardware_abstraction) ([SAUL](https://riot-os.org/api/group__drivers__saul.html)) to find a list of all available sensors

    :::info:
    You can also access the sensor by its [SAUL device class](https://riot-os.org/api/group__drivers__saul.html#ga425be5f49e9c31d8d13d53190a3e7bc2)
    :::
    
    ```bash
    saul
    ```
    
    You should see a list of all available sensors. For example:

    ```bash
    2019-09-02 16:54:12,881 - INFO #  saul
    2019-09-02 16:54:12,883 - INFO # ID     Class           Name
    2019-09-02 16:54:12,887 - INFO # #0     ACT_SWITCH      Led Red
    2019-09-02 16:54:12,888 - INFO # #1     ACT_SWITCH      Led Green
    2019-09-02 16:54:12,891 - INFO # #2     ACT_SWITCH      Led Blue
    2019-09-02 16:54:12,893 - INFO # #3     SENSE_TEMP      NRF_TEMP
    2019-09-02 16:54:12,894 - INFO # #4     SENSE_TEMP      bme280
    2019-09-02 16:54:12,896 - INFO # #5     SENSE_PRESS     bme280
    2019-09-02 16:54:12,897 - INFO # #6     SENSE_HUM       bme280
    ```
    
3. To read the data from a particular sensor, execute the `saul read` command followed by an ID. To read the data from all sensors, execute the `saul read all` command.

    ```bash
    saul read 5
    ```

    You should see something like the following:
    
    ```
    2019-09-02 16:54:30,904 - INFO #  saul read 5
    2019-09-02 16:54:30,907 - INFO # Reading from #5 (bme280|SENSE_PRESS)
    2019-09-02 16:54:30,909 - INFO # Data:         1631 hPa
    ```

## Next steps

Reading sensor data from a shell session like this is useful only while you debug an application.

For a production application, you can [set up a Bluetooth star network](../how-to-guides/set-up-a-bluetooth-star-network.md) that allows clients on the same local network to connect to the sensor and read its data.
