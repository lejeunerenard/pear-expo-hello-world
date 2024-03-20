const ce = require('compact-encoding')
const ceNet = require('compact-encoding-net')
const serverSetupEnc = {
  preencode (state, m) {
    ce.string.preencode(state, m.publicKey)
    ceNet.ipAddress.preencode(state, m.address)
  },
  encode (state, m) {
    ce.string.encode(state, m.publicKey)
    ceNet.ipAddress.encode(state, m.address)
  },
  decode (state, m) {
    return {
      publicKey: ce.string.decode(state),
      address: ceNet.ipAddress.decode(state)
    }
  }
}

module.exports = { serverSetupEnc }
