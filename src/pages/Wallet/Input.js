import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  input: {
    margin: 8,
    padding: 12,
    borderRadius: 24,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: '#F97D7D',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.84,
    elevation: 5,
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.5)'
  }
})

const Input = (props) => (
  <TextInput
    {...props}
    style={styles.input}
  />
)

export default Input
