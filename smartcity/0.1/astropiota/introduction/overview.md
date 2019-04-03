# AstroPiOTA

**AstroPiOTA is a clone of [AstroPi](https://www.nasa.gov/mission_pages/station/research/experiments/2429.html), which is a project that used Raspberry Pis on the International Space Station (ISS) to keep astronauts up to date about their environment.  AstroPi was made with a Raspberry Pi computer and a Sense HAT sensor for sensing temperature, humidity, and other data.**

 AstroPiOTA uses masked authenticated messaging (MAM) for keeping track of local environment data on the Tangle. Here on earth, AstroPiOTA helps us understand and report local weather and may aid in earthquake prediction.
 
 MAM is a subscription service. Subscribe to the AstroPiOTA channel to receive the latest data.

Watch the video:  (Coming soon)

## Environment Data

Sense Hat has an inertial measurement unit (IMU) and includes the following:

- Temperature and humidity sensors
- Barometric pressure sensor
- Accelerometer that measures acceleration forces
- Gyroscope that measures momentum and rotation
- Magnetometer that measures the Earth’s own magnetic field (a bit like a compass)

Some IMU data is measured using [Cartesian coordinates](https://en.wikipedia.org/wiki/Cartesian_coordinate_system) where:

        x is roll or rotation about the x-axis
        y is pitch or rotation about the y-axis
        z is yaw or rotation about the z-axis
        
## Programming Language

AstroPiOTA is written in JavaScript and sends Sense HAT data to the Tangle in this json format:

```json
{"AstroPiData":
{"timestamp":"2018-12 09T01:41:09.752Z",
"accel":{"x":0.01195599976927042,"y":0.0029279999434947968,"z":0.9884439706802368},
"gyro":{"x":0.0393543504178524,"y":0.02155846171081066,"z":-0.02419554442167282},
"compass":{"x":-33.50177764892578,"y":-1.302448034286499,"z":3.9364640712738037},
"fusionPose":{"x":2.86590838432312,"y":1.2279855012893677,"z":-2.3845863342285156},
"tiltHeading":3.102440595626831,
"pressure":1011.86083984375,
"temperature":34.03499984741211,
"humidity":32.178466796875},
"location":"Los Angeles,CA,USA"}
```

## Build Your Own AstroPiOTA

[Build AstroPiOTA](../how-to-guides/BuildIT.md)

[Install software](../how-to-guides/InstallIT.md)

[Run using Headless mode](../how-to-guides/Headless.md)

[Customize AstroPiOTA](../how-to-guides/CustomizeIT.md) - AstroPiOTA sample code was inspired by [Dave de Fijter's High Mobility MAM example](https://github.com/iotaledger/high-mobility-blueprints/tree/master/mam).

[Sense Hat Specifications](../references/SenseHatSpecs.md)
