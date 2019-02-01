## Build your own AstroPiOTA

![Photo of Sense Hat that looks like a slightly smaller circuit board with LED light panel](images/RasSenseHat.png)

[Sense HAT version 1.0](https://thepihut.com/products/raspberry-pi-sense-hat-astro-pi)

![Photo of Raspberry Pi 3 B computer that looks like a ~4x3 circuit board](images/RasPi.png)

**Raspberry Pi 3 B**

RasPi can be purchased alone or in the [Raspberry Pi 3 Model B Starter Pack](https://www.digikey.com/catalog/en/partgroup/raspberry-pi-3-model-b-starter-pack-includes-a-raspberry-pi-3/70316?utm_adgroup=Kits&slid=&gclid=CjwKCAiAl7PgBRBWEiwAzFhmml25rcO7V-oO0hwQ4RdoVFCj-Sj2AnGcsFBi8ArlMDn74owwLJaywBoCBhUQAvD_BwE).  This starter pack includes the SD Memory Card with Raspbian pre-installed plus some additional components for other experiments.

> Raspberry Pi 3 B+ (B plus) has pins that prevent attaching Sense HAT version 1.0. 

There are two ways to interact with RasPi, directly and over SSH.  In order to interact directly, get a USB keyboard and mouse plus an HDMI-ready monitor or TV.  Interact over SSH using [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)

You may power RasPi with a wall plug or a USB battery capable of powering mobile phones.
 
### Operating System

For this example, I purchased the pre-installed card that comes with the Starter Pack.  If you are starting from scratch, follow the [Raspberry Pi getting started guide](https://projects.raspberrypi.org/en/projects/raspberry-pi-getting-started/2).  W3Schools also has a [getting started guide](https://www.w3schools.com/nodejs/nodejs_raspberrypi.asp).  Download the Starter Pack version at:  [Raspbian GNU/Linux 8 "Jessie" (2016-11-25-raspbian-jessie.img)](http://downloads.raspberrypi.org/raspbian/images/)

### Connect Components

- [Carefully attach SenseHat to RasPi](https://docs-emea.rs-online.com/webdocs/1436/0900766b81436bef.pdf)

![Screen capture of crontab file update described in text](images/RasSen2Ras.png)

Permission to use diagram requested from Raspberry Pi

- Connect keyboard and mouse to USB ports on RasPi
- Connect monitor or TV to HDMI port on RasPi
- Connect power cord on RasPi

>When you plug in the power cord, RasPi will power on

[Install AstroPiOTA Software](InstallIT.md)
