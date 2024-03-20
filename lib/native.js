import ce from 'compact-encoding';
import { requireNativeModule } from 'expo-modules-core';
import RPC from 'tiny-buffer-rpc';
import { serverSetupEnc } from './messages'

requireNativeModule('HelloBare').install();

// forward bare's logs to console
HelloBare.onLog = console.log

// RPC
const rpc = new RPC(HelloBare.sendMessage)
HelloBare.onMessage = rpc.recv.bind(rpc)

const reverseStringMethod = rpc.register(0, {
  request: ce.string,
  response: ce.string
})

const connectToHolesailMethod = rpc.register(1, {
  request: serverSetupEnc,
  response: ce.bool
})

export const reverseString = async (message) => await reverseStringMethod.request(message)
export const connectToHolesail = async (message) => await connectToHolesailMethod.request(message)
