# Run a command-line wallet on an ESP32

**In this tutorial, you set up an IOTA wallet that allows you to send transactions from the command-line on an ESP32.**

## Hardware

To complete this guide, you need the following:

- [A prepared ESP32 and a Linux PC with the required toolchain](../introduction/get-started.md)

## Architecture

The wallet application uses the C client library to interact with the an IOTA network.

![Application architecture](https://raw.githubusercontent.com/oopsmonk/iota_esp32_wallet/master/images/esp32_wallet_block_diagram.png)

## Run the application

1. Clone the GitHub repository  

    ```shell
    git clone --recursive https://github.com/oopsmonk/iota_esp32_wallet.git
    ```

2. Generate the project dependencies for each component

    ```shell
    cd iota_esp32_wallet
    bash ./init.sh
    ```  

3. Open the configuration menu

    ```bash
    idf.py menuconfig
    ```

4. Go to **IOTA Wallet** and configure the following options:

    |**Configuration option**|**Description**|**Notes**|
    |:----|:-----|:-----|
    |`WiFi`|Set your WiFi credentials to allow the application to connect to the Internet |If you don't connect to a local IRI node, you must configure the WiFi settings to allow the application to connect to the remote node over the Internet |
    |`SNTP` |Set the `Timezone` option to the [timezone](https://github.com/nayarsystems/posix_tz_db/blob/master/zones.json) that you want the application to use|By default, this application uses China Standard Time|
    |`IRI Node`|Set the options to the IRI node to which you want the application to connect| By default, this application connects to a Mainnet node over HTTPS|
    |`Seed` (required)| Set this option to the [seed](root://getting-started/0.1/clients/seeds.md) that you want the application to use to generate addresses and sign transactions|The seed you enter must be a valid 81-tryte seed|

    :::info:
    You can also see your ESP32 configuration in the `sdkconfig` file.
    :::

5. Flash the wallet application to your ESP32. Replace the `$USB_PORT` placeholder with the port that the ESP32 is connected to.

    ```shell
    idf.py -p $USB_PORT flash && idf.py -p $USB_PORT monitor
    ```

    You should see something like the following:
    
    ```shell
    I (2230) event: sta ip: 192.168.11.7, mask: 255.255.255.0, gw: 192.168.11.1
    I (2230) esp32_main: Connected to AP
    I (2240) esp32_main: IRI Node: nodes.devnet.iota.org, port: 443, HTTPS:True

    I (2250) esp32_main: Initializing SNTP: pool.ntp.org, Timezone: CST-8
    I (2250) esp32_main: Waiting for system time to be set... (1/10)
    I (4260) esp32_main: The current date/time is: Tue Aug  6 12:56:39 2019
    IOTA> 
    IOTA> info
    appName IRI Testnet 
    appVersion 1.8.0-RC1 
    latestMilestone: VBKNZNCULYJPHGHSIAVQLNLNRVMV9UBPCHJRSBBFOWPCKYWRMXXZTPUQFKBXPRBQBCTHVMMMZZJTQG999
    latestMilestoneIndex 1307443 
    latestSolidSubtangleMilestone: VBKNZNCULYJPHGHSIAVQLNLNRVMV9UBPCHJRSBBFOWPCKYWRMXXZTPUQFKBXPRBQBCTHVMMMZZJTQG999
    latestSolidSubtangleMilestoneIndex 1307443 
    neighbors 2 
    packetsQueueSize 0 
    time 1565067405641 
    tips 93 
    transactionsToRequest 0 
    IOTA> 
    ```

:::success: Congratulations :tada:
You've set up your own IOTA wallet. Now, you can use your ESP32 to check your balance, generate addresses, and send transactions.

Use the `help` command for more details, or press `Ctrl` + `]` to exit.
:::

## See the application in action

When the application is running, you can pass it simple commands to interact with the wallet's API.

<iframe width="560" height="315" src="https://www.youtube.com/embed/e6pxDTqd5Pw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Troubleshooting

You may find some of these common issues while setting up or using the IOTA wallet on the ESP32.

### Please set a valid seed

If you see the following error message, make sure that you configured the wallet with an 81-tryte seed:

```shell
I (329) esp32_main: iota wallet system starting...
E (329) esp32_main: please set a valid seed in sdkconfig!
I (329) esp32_main: Restarting in 30 seconds...
I (1329) esp32_main: Restarting in 29 seconds...
```

### Stack overflow

If you see the following error message, try increasing the value of the `CONFIG_MAIN_TASK_STACK_SIZE` configuration option:

```shell
***ERROR*** A stack overflow in task main has been detected.
abort() was called at PC 0x4008af7c on core 0
```

## Next steps

Take a look at the [GitHub repository](https://github.com/oopsmonk/iota_esp32_wallet/blob/master/main/wallet_system.c) for a list of commands that the wallet application supports.

Try running an [address monitor](../iota-projects/generate-address.md) on the ESP32.
