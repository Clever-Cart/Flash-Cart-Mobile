import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#F97D7D',
    justifyContent: 'center',
    marginBottom: 16
  },
  name: {
    color: 'white'
  },
  number: {
    color: 'white'
  }
})

const Card = ({ card }) => (
  <View style={styles.card}>
    <Text style={styles.name}>Cartão de Crédito</Text>
    <Text style={styles.name}>{card.name}</Text>
    <Text style={styles.number}>{card.number}</Text>
  </View>
)

export default Card
