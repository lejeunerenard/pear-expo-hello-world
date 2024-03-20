import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { reverseString, connectToHolesail } from './lib/native';

export default function App() {
  const [value, setValue] = useState('')
  const [reversed, setReversed]  = useState(null)

  const [publicKey, setPublicKey] = useState('')
  const [host, setHost] = useState('')
  const [port, setPort] = useState('')
  const [connected, setConnected] = useState(false)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Reverse string in bare:</Text>
      <TextInput style={styles.input} value={value} onChangeText={setValue}/>
      <Button
        onPress={() => {
          reverseString(value).then(result => {
            setReversed(result)
          })
          setValue("")
        }}
        title="Send"
      />
      {reversed !== null && <><Text style={styles.text}>Result: {reversed}</Text></>}

      <Text style={styles.text}>Public Key:</Text>
      <TextInput style={styles.input} value={publicKey} onChangeText={setPublicKey}/>
      <Text style={styles.text}>Host:</Text>
      <TextInput style={styles.input} value={host} onChangeText={setHost}/>
      <Text style={styles.text}>Port:</Text>
      <TextInput style={styles.input} value={port} onChangeText={setPort}/>
      {connected && <><Text style={styles.text}>Connected</Text></>}

      <Button
        onPress={() => {
          connectToHolesail({
            publicKey,
            address: {
              host,
              port: Number(port)
            }
          }).then(result => {
            setConnected(result)
          })
          setConnected(false)
        }}
        title="Connect to Server"
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16
  },
  text: {
    fontSize: 16
  },
  input: {
    width: 300,
    padding: 10,
    backgroundColor: '#fff'
  }
});
