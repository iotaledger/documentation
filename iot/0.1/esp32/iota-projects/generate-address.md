# Run an address monitor on an ESP32

**In this tutorial, you set up a cashier application that allows you to display the QR code for an address on an LCD screen. This application can also monitor the balance of the address and generate a new one if IOTA tokens are ever withdrawn from it.**

## Hardware

To complete this guide, you need the following:

- [An ESP32 and a PC with the required toolchain](../introduction/get-started.md)
- An LCD screen connected to your ESP32, using one of the following options:

    - **Connected to VSPI**
    ![](https://github.com/oopsmonk/esp32_lib_st7735/raw/master/image/ESP32-ST7735-Wiring-VSPI.jpg)

    - **Connected to HVSPI**  
    ![](https://github.com/oopsmonk/esp32_lib_st7735/raw/master/image/ESP32-ST7735-Wiring-HSPI.jpg)

## Architecture

This application uses the C client library to interact with the an IOTA network.

## Run the application

To run this application on Windows, enter the following commands in Git Bash.

1. Clone the GitHub repository  

    ```shell
    git clone --recursive https://github.com/oopsmonk/iota_esp32_cashier.git
    ```

2. Generate the project dependencies for each component

    ```shell
    cd iota_esp32_cashier
    bash ./init.sh
    ```  

3. Open the configuration menu

    ```bash
    idf.py menuconfig
    ```

4. Go to **IOTA Cashier** and configure the following options:

    |**Configuration option**|**Description**|**Notes**
    |:----|:-----|:-----|
    |`WiFi`|Set your WiFi credentials to allow the application to connect to the Internet |If you don't connect to a local IRI node, you must configure the WiFi settings to allow the application to connect to the remote node over the Internet |
    |`SNTP` |Set the `Timezone` option to the [timezone](https://github.com/nayarsystems/posix_tz_db/blob/master/zones.json) that you want the application to use|By default, this application uses China Standard Time|
    |`IRI Node`|Set the options to the IRI node to which you want the application to connect| By default, this application connects to a Devnet node over HTTPS|
    |`Monitor interval(s)`| Set the number of seconds for which the application should wait between each check of the address| By default, this application checks the address every 30 seconds|

    :::info:
    You can also see your ESP32 configuration in the `sdkconfig` file.
    :::
    
5. If you want to monitor the balance of a single fixed address and display it in a QR code, set the `Receiver address` option to a valid address with or without a [checksum](root://getting-started/0.1/clients/checksums.md)
    
6. If you want the application to monitor the address for withdrawals and be able to update the QR code to a new unspent one, set the following configuration options:
    
    |**Configuration option**|**Description**|**Notes**|
    |:----|:-----|:-----|
    |`Auto refresh address`|Set this option to `y` to allow the application to generate a new address from your seed and security level whenever you withdraw from the displayed address|
    |`Seed`|Set this option to the [seed](root://getting-started/0.1/clients/seeds.md) that you want the application to use to generate addresses|This option is displayed only when you set the `Auto refresh address` to `y`. The seed you enter must be a valid 81-tryte seed.|
    |`Security Level`| Set this option to the [security level](root://getting-started/0.1/clients/security-levels.md) that you want the application to use to generate addresses from your seed| This option is displayed only when you set the `Auto refresh address` to `y`. You must enter a valid security level (1, 2, or 3).|

5. Flash the application to your ESP32. Replace the `$USB_PORT` placeholder with the port that the ESP32 is connected to.

    ```shell
    idf.py -p $USB_PORT flash && idf.py -p $USB_PORT monitor
    ```

    You should see something like the following:
    
    ```shell
    I (4310) main: WiFi Connected
    I (4310) main: IRI Node: nodes.thetangle.org, port: 443, HTTPS:True
    I (4380) main: Initializing SNTP: pool.ntp.org, Timezone: CST-8
    I (4390) main: Waiting for system time to be set... (1/10)
    I (6390) main: The current date/time is: Wed Oct  2 17:06:29 2019
    I (6450) cashier: Get unspent address from 5
    E (11380) task_wdt: Task watchdog got triggered. The following tasks did not reset the watchdog in time:
    E (11380) task_wdt:  - IDLE0 (CPU 0)
    E (11380) task_wdt: Tasks currently running:
    E (11380) task_wdt: CPU 0: main
    E (11380) task_wdt: CPU 1: IDLE1
    E (21940) task_wdt: Task watchdog got triggered. The following tasks did not reset the watchdog in time:
    E (21940) task_wdt:  - IDLE0 (CPU 0)
    E (21940) task_wdt: Tasks currently running:
    E (21940) task_wdt: CPU 0: main
    E (21940) task_wdt: CPU 1: IDLE1
    Get balance [6]RECEIVER9ADDRESS9RECEIVER9ADDRESS9RECEIVER9ADDRESS9RECEIVER9ADDRESS9RECEIVER9ADDR
    I (29960) main: Initial balance: 4800i, interval 30
    Get balance [6]RECEIVER9ADDRESS9RECEIVER9ADDRESS9RECEIVER9ADDRESS9RECEIVER9ADDRESS9RECEIVER9ADDR
    = 4800i
    ```

:::success: Congratulations :tada:
You've set up your own address generator.

Use the `help` command for more details, or press `Ctrl` + `]` to exit.
:::

## See the application in action

The application monitors the Tangle for confirmed transactions that deposit IOTA tokens into the dispayed address and updates the balance when if it finds any.

<iframe width="560" height="315" src="https://www.youtube.com/embed/Vp9J2ntikcc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

If you configured the `Auto refresh address` options, when you withdraw from the displayed address, the application uses the configured seed and security level to generate a new address and displays it in a QR code.

<iframe width="560" height="315" src="https://www.youtube.com/embed/a_qEPlbzrig" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Troubleshooting

You may find some of these common issues while setting up or using this application on the ESP32.

### Please set a valid seed

If you see the following error message, make sure that you configured the wallet with an 81-tryte seed or address:

```shell
I (0) cpu_start: Starting scheduler on APP CPU.
E (3443) main: please set a valid hash(CONFIG_IOTA_RECEIVER or CONFIG_IOTA_SEED) in sdkconfig!
I (3443) main: Restarting in 5 seconds...
I (4443) main: Restarting in 4 seconds...
I (5443) main: Restarting in 3 seconds...
```

### Stack overflow

If you see the following error message, try increasing the value of the `CONFIG_MAIN_TASK_STACK_SIZE` configuration option:

```shell
***ERROR*** A stack overflow in task main has been detected.
abort() was called at PC 0x4008af7c on core 0
```

### Trailing whitespace

You may see the following error message after running the `init.sh` file:

```shell
init /c/MYESP/iota_esp32_cashier/components/keccak
../keccak_58b20ec99f8a891913d8cf0ea350d05b6fb3ae41.patch:10: trailing whitespace.
        return KECCAK_FAIL;
../keccak_58b20ec99f8a891913d8cf0ea350d05b6fb3ae41.patch:19: trailing whitespace.
        return KECCAK_FAIL;
../keccak_58b20ec99f8a891913d8cf0ea350d05b6fb3ae41.patch:31: trailing whitespace.
typedef enum { SUCCESS = 0, KECCAK_FAIL = 1, KECCAK_BAD_HASHLEN = 2 } HashReturn;
error: patch failed: lib/high/Keccak/FIPS202/KeccakHash.c:21
error: lib/high/Keccak/FIPS202/KeccakHash.c: patch does not apply
error: patch failed: lib/high/Keccak/FIPS202/KeccakHash.h:26
error: lib/high/Keccak/FIPS202/KeccakHash.h: patch does not apply
```

If you see this error message, do the following:

1. Change into the `components/keccak` directory

    ```bash
    cd components/keccak
    ```

2. Fix the whitespace

    ```bash
    git apply --whitespace=fix ../keccak_58b20ec99f8a891913d8cf0ea350d05b6fb3ae41.patch
    ```

3. Run the init.sh file again

    ```bash
    cd ../../
    ```

You should no longer see the error message about whitespace.

Now, you can continue to configure, build, and flash the application.

## Next steps

Try running an [wallet](../iota-projects/create-a-wallet.md) on the ESP32.

