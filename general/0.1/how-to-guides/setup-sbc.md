# Setting up an SBC (Single-board computer) for IOTA

## Requirements

### Host-system

- Linux based host system. (Ubuntu is used in this guide) MacOS should also work.
Note: If you use Windows, you should use [a Linux VM.](https://www.windowscentral.com/how-run-linux-distros-windows-10-using-hyper-v)
Windows 10 also supports the [Linux Subsystem.](https://docs.microsoft.com/en-us/windows/wsl/install-win10) 
With it you are able to run Linux without the overhead of a VM.
If you are an advanced user, you can also replace the Linux tools with the Windows equivalent.

### SBC

- Ubuntu (or other Linux based OS, BSD might also work) with enabled SSH & configured network
*_Note:_* You might want to check our "Setting up an SBC for IOTA guide"

- Memory: This depends on your use-case. Recommendation: At least 256 MB.

- Ubuntu (Other Linux distribution should also work. BSD based OS might also work.)
*_Note:_* The guide uses Ubuntu. We recommend to stick to Ubuntu if you consider yourself as beginner

- Storage: This also depends on your use-case. Recommendation: At least 16 GB.


## Before you start using this guide:

- If possible you should use a display & keyboard to setup your device.

- If your device has Ethernet and you have access to your router, connect your SBC to it.

- For worst case scenarios: Use a USB-to-UART adapter. (Wi-Fi only SBC)

*_Note:_* The [CP2102](https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers) 
is a well-known and inexpensive chip. Ready to use USB-to-UART adapters are available for 1-$2.
Your SBC might have an integrated adapter. You should take a look into the documentation of your SBC.


## 1. Install/Flash an Operation System to a SD-Card.

*_Note:_* This process is similar for other SBCs like the Orange Pi. 
If there is a special guide for your SBC, you should stick to that guide. 
[Armbian](https://www.armbian.com/download/) supports different development boards. 
If Armbian is available for your SBC, you should use it.

Just follow [this guide](https://www.raspberrypi.org/documentation/installation/installing-images/) 
to flash an OS to the SD Card.

## 2. Plugin your SD card and start your SBC.

## 3. Setup your network for your SBC & get the IP address

*_Note:_* IPv6 is the preferred IP version. 
(If you consider yourself as beginner, you should use IPv4. IPv6 is a bit more complicated to understand.)


### 3.1 Use keyboard & display to find the SBCs IP address
				
#### 3.1.1. Connect keyboard & display to your SBC. Login with the default user & password. 

*_Note:_* If you do not know the username & password, just take a look onto the distributions' website.
		
#### 3.1.2. Get the IP address (Skip if your SBC does not have Ethernet or if it is not connected)

Execute the command ```ifconfig```. The program returns all network interfaces and the given IP addresses.
The interfaces starting with eth are Ethernet network interfaces. 
The ones starting with wl are the Wi-Fi network interfaces.

#### 3.1.4. Setup Wi-Fi

If you want to use Wi-Fi or your SBC has only Wi-Fi, continue with 3.4. 
After configuring the Wi-Fi network interface you are able
to get your IP address with ```ifconfig```.


### 3.2 Find your SBCs IP address via network-scans (IPv4 only, Ethernet connected)

You must execute these commands on your host-system.

#### 3.2.1 Find IP addresses in your local network

The subnet bytes to be set to zero and the netmask must be set in nmap.
So, in my case:
Internal IP address: 10.197.0.57
Netmask: 255.255.255.0

The netmask is 24, because every place in the IP address takes 8 bits (256 states) and the netmask is set on 3 bytes. 3x8=24.

```bash
nmap -sn 10.197.0.0/24
```

Another example:
Internal IP address: 10.197.3.57
Netmask: 255.255.0.0

So, now it is just 2x8=16. So, you need to use 16 instead of 24.

```bash
nmap -sn 10.197.0.0/16
```

Depending on the subnet, this process can take some time, since nmap needs to scan all IP addresses within the network. 
For a small subnet (netmask=24) is just takes some seconds, since nmap just need to scan 256 addresses.
In a bigger network that can take more time. For example netmask=16: nmap needs to scan 256*256 addresses. 
In my test-case this took 2944.17 seconds. If you are in a huge local network, you should consider using another variant.

#### 3.2.2. Continue with 3.5. (Even if you found more than one IP address)

	
### 3.3. Setup of an USB-to-UART adapter (No Ethernet, No HDMI/VGA)

You must execute these commands on your host-system.

#### 3.3.1. Install PlatformIO
You need additional software to connect to the serial port. 
We recommend [PlatformIO](https://docs.platformio.org/en/latest/userguide/cmd_device.html?highlight=monitor#platformio-device-monitor).
PlatformIO provides a simple command tool to interact with your SBC.

#### 3.3.2. Plugin your USB-to-UART adapter

#### 3.3.3. Find the right USB port

USB ports are available at /dev/ttyUSBX. X stands for the number (0 - AMOUNT_OF_PORTS).
The simplest way to find the right USB port is to plug out the USB-Adapter, check for the USB SBCs with
```ls /dev/ttyUSB*```, plugin the USB-Adapter and check again. The new added USB-port is the one you are looking for.

#### 3.3.4. Change rights on connected USB SBC. 

Some adapters have an unexpected behavior with their access rights. Just in case, change it with:
```sudo chmod 777 /dev/ttyUSBX```

#### 3.3.5. Connect to your USB port

Take a look into the documentation of your SBC to find the baud rate. In case of the Orange Pi Zero it is 115200.
```bash
platformio SBC monitor -b BAUD_RATE -p /dev/ttyUSBX
```

#### 3.3.6. Power up your SBC or restart your SBC 

#### 3.3.7 Login to your SBC

When the system asks for it: Login with the default username & password.
You should change the roots password. You should also create a new user.
Most systems require this after the first login. If your OS does this: Just follow the process.

### 3.4. Optional: Configure the Wi-Fi network interface

```bash
nmcli dev wifi connect <mySSID> password <myPassword>
```

Check if your SBC is connected to the Internet
```bash
ping iota.org
```

You can now get your IP address with  ```ifconfig```.

### 3.5. Connect via SSH to your SBC

At this point you only need to use your host-system. It is not necessary to interact with the SBC.

##### IPv4

If you found your IP address, you should connect to your SBC via SSH. 
Use the following command on your host-system:
```bash
ssh USERNAME@IP_ADRESS
```

##### IPv6

If you use IPv6, you must add the command line argument -6 to the ssh program. 
You must also add the network interface name.
Without the name the client cannot find the SBC.

My case:
Host-system Wi-Fi interface name: wlp3s0
The SBCs' local IPv6 address: fe80::c0a2:76c6:4ed5:a44

My host-system & the SBC are both connected via Wi-Fi to my router. 
You must use the interface which is connected to the right router. 
Otherwise there is no route to your SBC.


This is the command I need to execute:
```bash
ssh -6 USERNAME@fe80::c0a2:76c6:4ed5:a442%wlp3s0
```

If you found more than one IP address, you should every IP address, until you find the right one.
If you are able to login with the your username & password, this is probably your SBC.
If you want to make sure if this your SBC, just check it with ```cat /proc/cpuinfo```. 
	