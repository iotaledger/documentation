
const Mam = require('../external/mam.client.js')
const { trytesToAscii } = require('@iota/converter')
const mamType = 'public'
const mamSecret = 'DONTSHARETHIS'

// We keep track of our current and next root so we know what to listen to and when to output data to the screen
let root = null
let nextRoot = process.argv[2]

function showData (raw) {
  const data = JSON.parse(trytesToAscii(raw))
  console.log(" ")
  console.log(data.ts, '-', data.AstroPiData)
}

async function initMam () {
  console.log('\r\n\r\n')
  console.log('Listening for MAM sensor data from AstroPi...')
  console.log('\r\n')
  await Mam.init('https://nodes.devnet.iota.org:443')
}

// Check the MAM stream every 5 seconds for new data on the current root
// If a new root is returned we'll monitor that one from there on.
async function checkMam () {
  if (root !== nextRoot) {
    root = nextRoot
  }

  // The showData callback will be called in order for each message found
  const data = await Mam.fetch(root, mamType, mamSecret, showData)
  nextRoot = data.nextRoot

  // Check again in 5 seconds
  setTimeout(checkMam, 5000)
}

// Start monitoring!
initMam()
checkMam()
