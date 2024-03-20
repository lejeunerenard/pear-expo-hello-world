require('./runtime')

const RPC = require('tiny-buffer-rpc')
const ce = require('compact-encoding')
const { serverSetupEnc } = require('../lib/messages.js')

class HolesailClient {
  constructor (publicKey) {
    this.publicKey = publicKey
  }

  connect (port, address, cb) {
    console.log('got port', port, 'address', address)
    cb()
  }

  destroy () {
    console.log('boom')
  }
}

const rpc = new RPC(HelloBare.sendMessage)
HelloBare.onMessage = rpc.recv.bind(rpc)

rpc.register(0, {
  request: ce.string,
  response: ce.string,
  onrequest: message => message.split('').reverse().join('')
})

// connect methods
rpc.register(1, {
  request: serverSetupEnc,
  response: ce.bool,
  onrequest: (message) => {
    const { publicKey, address } = message
    const client = new HolesailClient(publicKey)
    console.log('connecting')
    client.connect(address.port, address.host, () => {
      console.log('connected')
    })
    return true
  }
})

// keep the event loop alive
setInterval(() => {}, 2000)

// tell app we're ready
HelloBare.onReady()
