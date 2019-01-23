const unhandledRejection = require('unhandled-rejection')

let rejectionEmitter = unhandledRejection({
  timeout: 20
})

rejectionEmitter.on('unhandledRejection', (error, promise) => {
  console.log('[REJECTION]', error)
})

rejectionEmitter.on('rejectionHandled', (error, promise) => {
  console.log('[HANDLED]', error)
})
