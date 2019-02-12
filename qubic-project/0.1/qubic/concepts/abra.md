# Abra

**Smart contracts are written using the Abra dataflow language.  Abra is oriented towards resource-constrained, IoT environments**

### How Abra Works

Suppose a USB camera is plugged into a device and takes a picture every second.  When the camera takes a picture it is transmitted to a virtual environment, such as, dev/tty/camera0   

Abra is listening to this environment.  When the picture arrives, the supervisor processor managing these events looks to see if anyone is listening.  It sees that Abra is listening so it pushes the picture to Abra.  Abra processes the picture and returns a result.  

### Features

Abra is an intermediate language enabling qubics to run the same code on different hardware platforms.  It includes a library of predefined functions.  The Abra architecture is a dataflow programming design built to achieve faster clock rates than conventional systems.

Being trinary-based, Abra promises significant energy savings because a trit can represent 1.58 bits.  Thus, the amount of wiring for a trinary system can be about 64% less that an equivalent binary system.

Abra was built for automated analysis to improve the accuracy of smart contracts.

Abra includes parallelization so different pieces of code can run concurrently.

### Specification

[Abra Specification](https://github.com/paulhandy/iotaledger-docs/blob/f41873c2deb95b6937fe07aa5322cfe0b888cdb7/qubic/abra/Spec.md)
