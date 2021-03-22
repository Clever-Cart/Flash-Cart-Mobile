import React from 'react'
import Modal from 'react-native-modal'
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native'

import * as firebase from 'firebase'
import 'firebase/firestore'

import Input from './Input'

const styles = StyleSheet.create({
  container: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16
  },
  button: {
    marginTop: 16,
    padding: 12,
    borderRadius: 24,
    alignItems: 'center',
    backgroundColor: '#F97D7D',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.84,
    elevation: 5
  },
  add: {
    color: 'white',
    fontWeight: 'bold'
  },
  row: {
    width: '100%',
    flexDirection: 'row'
  }
})

const Add = ({
  isVisible, setIsVisible
}) => {
  const [data, setData] = React.useState({})

  const onAdd = async() => {
    const db = firebase.firestore()
    const user = firebase.auth().currentUser

    try {
      await db.collection('Users')
        .doc(user.uid)
        .collection('Cards')
        .doc(data.number)
        .set(data)
    } catch (e) {
      console.error(e)
    } 

    setIsVisible(false)
  }

  const onChangeData = (key, value) => {
    setData({ ...data, [key]: value });
  }

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.container}>
        <Input
          placeholder='Nome do titular'
          onChangeText={text => onChangeData('name', text)}
        />
        <Input
          placeholder='CPF do titular'
          onChangeText={text => onChangeData('cpf', text)}
        />
        <Input
          placeholder='Nº do cartão'
          onChangeText={text => onChangeData('number', text)}
        />
        <View style={styles.row}>
          <Input
            placeholder='Validade'
            onChangeText={text => onChangeData('valid', text)}
          />
          <Input
            placeholder='CVV'
            onChangeText={text => onChangeData('cvv', text)}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={onAdd}>
          <Text style={styles.add}>CADASTRAR</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

export default Add
