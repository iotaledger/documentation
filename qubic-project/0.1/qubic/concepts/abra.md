# Abra

**Smart contracts are written using the Abra dataflow language.  Abra is oriented towards resource-constrained, IoT environments**

### How Abra Works

Suppose a USB camera is plugged into a device and takes a picture every second.  When the camera takes a picture it is transmitted to a virtual environment, such as, dev/tty/camera0   

Abra is listening to this environment.  When the picture arrives, the supervisor processor managing these events looks to see if anyone is listening.  It sees that Abra is listening so it pushes the picture to Abra.  Abra processes the picture and returns a result.  

### Features

Abra is a dataflow language with a library of predefined functions.  Abra code runs concurrently.  Qubics can run the same code on different hardware platforms.  Abra's automated analysis improves the accuracy of smart contracts.  

### Specification

[Abra Specification](https://github.com/paulhandy/iotaledger-docs/blob/f41873c2deb95b6937fe07aa5322cfe0b888cdb7/qubic/abra/Spec.md)

[Abra Syntax](https://bugfreesoftware.github.io/abrasyntax/)
