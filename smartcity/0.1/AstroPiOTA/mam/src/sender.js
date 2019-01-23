const Mam = require('../external/mam.client.js')
const { asciiToTrytes } = require('@iota/converter')
const sense = require("sense-hat-led");
const imu = require("node-sense-hat").Imu;
const IMU = new imu.IMU();

let mamState = Mam.init('https://nodes.devnet.iota.org:443')
const mamType = 'public'
const mamSecret = 'DONTSHARETHIS'
mamState = Mam.changeMode(mamState, mamType, mamSecret)

async function publish (data) {

  sense.showMessage("AstroPi Temp " + String(Math.round(data.temperature)) +
        "C " + String(Math.round(data.temperature*1.8 + 32.00)) + "F  Humidity " +
        String(Math.round(data.humidity)) + " IOTA     " ,
        scrollSpeed=0.2, backColour=[100,100,0], textColour=[0,0,100]);

  let toSend = JSON.stringify({ 'AstroPiData': data, 'location': 'Los Angeles,CA,USA', 'ts': new Date() })
  console.log('Data to send to tangle:', toSend)

  const trytes = asciiToTrytes(toSend)
  const message = Mam.create(mamState, trytes)

  mamState = message.state

  try {
    await Mam.attach(message.payload, message.address)
    console.log('Attached to tangle!')
  } catch (e) {
    console.log(e)
  }

  if (mamState.channel.start === 1) {
    console.log('\r\nListen to this stream with\n\r\n\r   >  npm run receiver', message.root, '\r\n\r\n')
  } else {
    console.log('\r\nUpdated root: ', message.root, '\r\n')
  }
}

async function updateLocation () {

        IMU.getValue((err, data) => {
                if (err !== null) {
                        console.error("Hmmm...Sensehat data: ", err);
                        return;
                }
                try {
                    publish(data)
                } catch (e) {
                console.log('IMU Error', e)
                }
        });
}

console.log('\r\n\r\nUpdating MAM stream with SenseHat data\r\n')

// Run our updater service and let it check for a new sensor data about every 30 seconds = 30000)
updateLocation()
setInterval(updateLocation, 30000)
sense.clear(0,100,0)
