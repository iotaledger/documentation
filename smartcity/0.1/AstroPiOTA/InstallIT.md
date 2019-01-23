## Install AstroPiOTA

The following instructions assume the operating system is configured.  Because this installation has several components, scripts are included to make sure that each component works individually before combining them.  

### Software

Pre-installed with Raspbian Jessie:

- Python3

- Pip3.2

- Node.js v8.14.0

- npm v6.4.1

- [AstroPiOTA package](https://github.com/NelsonPython/AstroPiOTA.git)

- [Sense HAT NodeJS package](https://www.npmjs.com/package/node-sense-hat)

- [IOTA Javascript Library](https://github.com/iotaledger/iota.lib.js)


### Configure RasPi

The easiest way to configure RasPi is by directly interacting with it.  Plug-in monitor, keyboard and mouse.  Power on.  RasPi will automatically boot with the default user and password:

```
Default username:  pi
Default password:  raspberry
```

Connect to WiFi.  

Set the keyboard mapping to USA English.  Otherwise, you will be surprised when installation commands fail because the pipe symbol ```|``` is mapped to ```~```.  Click the cute red Raspberry on the menu, select ```Preferences```, select ```Raspberry Pi Configuration```.  

![RasPi configuration window as described in text](images/Localisation.png)

Click on the ```Localisation``` tab and the ```Set Keyboard...``` button.  Select ```United States -> English (US)```.  You can also set your locale, timezone, and WiFi country.  

![Window for setting localisation as described in text](images/localisation2.png)

Click the ```Interfaces``` tab and enable ```SSH``` so you can connect remotely using PuTTY. 

![Window for enabling SSH as described in text](images/SSH.png)


### Install Node.js

Raspbian Jessie comes with NodeRed installed.  Check your version:

```node -v```

The pre-installed version is:  v0.10.29

Remove NodeRed and legacy nodejs modules

```
sudo apt-get remove nodered -y
sudo apt-get remove nodejs nodejs-legacy -y
```
You may want to reboot here before installing Node Version 8 and npm

```
curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -
sudo apt-get install nodejs -y
node -v
npm -v
```

### Install IOTA Javascript Library

Download and install the IOTA Javascript library

```
git clone https://github.com/iotaledger/iota.lib.js
cd iota.lib.js
sudo npm install iota.lib.js
```

Check your installation by retrieving Node information from the IOTA Developer's Tangle.  Open a text file and copy this script:

```
var request = require('request');

var command = {
    'command': 'getNodeInfo'
}

var options = {
  url: 'https://nodes.devnet.iota.org:443
',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
		'X-IOTA-API-Version': '1',
    'Content-Length': Buffer.byteLength(JSON.stringify(command))
  },
  json: command
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
    console.log(data);
  }
});
```

Save the file in the iota.lib.js folder as ```getNode.js``` then run it

``` node getNode.js```

You should see statistics about the node including, appName, appVersion, latestMilestone, neighbors, tips, and more

### Install Sense HAT

Install Sense Hat in the AstroPiOTA package.  Sense HAT requires that python drivers be installed manually:

```
sudo apt-get update
sudo apt-get install sense-hat
sudo pip-3.2 install pillow
```
See the [Driver documentation](https://pythonhosted.org/sense-hat/) for more information

For quick check to make sure Sense Hat is working, open python3 and try these commands:

```
python3
>>>from sense_hat import SenseHat
>>>sense = SenseHat()
>>>sense.show_message("Hello Sense Hat")
```

The message, "Hello Sense Hat", will scroll across the Sense Hat led panel

Now, install node-sense-hat in your user folder

```
sudo npm install --unsafe-perm --verbose node-sense-hat
```

For more information see:

[Sense HAT node library](https://github.com/balena-io-playground/node-sense-hat)

[sense-hat npm](https://www.npmjs.com/package/sense-hat)


### Install AstroPiOTA

Download and install AstroPiOTA

```
git clone https://github.com/NelsonPython/AstroPiOTA.git
sudo npm install
```
Only run npm install once to install the dependencies

### Run AstroPiOTA

Open a terminal window and run ```npm run sender```

You will see a command on the console output similar to this:

```npm run receiver ADDRESSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX``` 

Copy this command to another terminal window then run it in order to monitor the MAM Stream

Example output from sender.js

![Screen shot of output from sender.js](images/AstroPiOTASender.png)

Example output from receiver.js

![Screen shot of output from receiver.js](images/AstroPiOTAReceiver.png)
