import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#F97D7D',
    justifyContent: 'center'
  },
  name: {
    color: 'white'
  },
  number: {
    color: 'white'
  }
})

const Card = () => (
  <View style={styles.card}>
    <Text style={styles.name}>Cartão de Crédito</Text>
    <Text style={styles.number}>**** **** **** 4321</Text>
  </View>
)

export default Card
