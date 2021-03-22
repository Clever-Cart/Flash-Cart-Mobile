import React from 'react'
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import * as firebase from 'firebase'
import 'firebase/firestore'

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#F97D7D',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 16
  },
  name: {
    color: 'white'
  },
  number: {
    color: 'white'
  }
})

const Card = ({ card }) => {

  const handleDelete = async() => {
    const db = firebase.firestore()
    const user = firebase.auth().currentUser

    try {
      await db.collection('Users')
        .doc(user.uid)
        .collection('Cards')
        .doc(card.number)
        .delete()
    } catch (e) {
      console.error(e)
    } 
  }

  const onDelete = () => {
    Alert.alert(
      'Você tem certeza?',
      'Isso irá apagar permanentemente este meio de pagamento da sua carteira Flash Cart.',
      [{
        text: 'Confirmar',
        onPress: handleDelete,
        style: 'destructive'
      }, {
        text: 'Cancelar',
        style: 'cancel'
      }]
    )
  }

  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.name}>Cartão de Crédito</Text>
        <Text style={styles.name}>{card.name}</Text>
        <Text style={styles.number}>{card.number}</Text>
      </View>
      <TouchableOpacity onPress={onDelete}>
        <MaterialIcons
          name='delete-outline'
          size={36}
          color='white'
        />
      </TouchableOpacity>
    </View>
  )
}

export default Card
