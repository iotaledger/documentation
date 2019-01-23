## Sense HAT Specifications

**I²C Sensors**

Inertial measurement sensor: ST LSM9DS1 [data sheet](http://www.st.com/web/en/resource/technical/document/datasheet/DM00103319.pdf).  This is a 3D accelerometer, 3D gyroscope and 3D magnetometer combined in one chip.   It provides the pitch, roll and yaw orientation of Sense HAT.
  
Barometric pressure and temperature sensor: ST LPS25H [data sheet](http://www.st.com/web/en/resource/technical/document/datasheet/DM00066332.pdf).  This provides a measurement of air pressure in Pascals or Millibars, plus, temperature in centigrade.

Relative humidity and temperature sensor: ST HTS221 [data sheet](http://www.farnell.com/datasheets/1836732.pdf).  This provides the percentage of relative humidity, as well as, the temperature in centigrade. 

**Outputs**

8×8 RGB LED matrix with ~60fps refresh rate and 15-bit colour resolution (RGB 5 5 5): Cree CLU6AFKW/CLX6AFKB [data sheet](http://www.cree.com/sitecore%20modules/web/~/media/Files/Cree/LED%20Components%20and%20Modules/HB/Data%20Sheets/CLX6AFKB.pdf)

Accessible via frame buffer driver /dev/fb1 where each pixel is 16 bit (RGB 5 6 5). This is the only real form of visual output that the Sense HAT has unless plugged into an HDMI monitor

**Micro controller**
A small MCU drives the LED matrix and scans for joystick input: Atmel ATTINY88 [data sheet](http://www.atmel.com/Images/doc8008.pdf)


#### References:

https://projects.raspberrypi.org/en/projects/getting-started-with-the-sense-hat/9

https://github.com/richardstechnotes/RTIMULib2
