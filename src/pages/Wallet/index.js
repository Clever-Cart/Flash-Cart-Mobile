import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'

import * as firebase from 'firebase'
import 'firebase/firestore'

import Card from './Card'
import Add from './Add'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  bottom: {
    alignItems: 'center',
    backgroundColor: '#F97D7D',
    position: 'absolute',
    width: '100%',
    height: 90,
    bottom: 0
  },
  list: {
    margin: 16
  },
  info: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 16,
    marginTop: 16
  },
  button: {
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 16,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  add: {
    fontWeight: '600',
    color: 'black'
  }
})

const mock = [{
  name: 'Djorkaeff Pereira',
  number: '0000000000000000',
  cpf: '12365478900',
  valid: '11/10',
  cvv: 123
}]

const Wallet = () => {
  const [cards, setCards] = React.useState([])
  const [isAdding, setIsAdding] = React.useState(false)

  const handleSnapshot = async() => {
    const db = firebase.firestore()
    const user = firebase.auth().currentUser

    const snapshot = await db.collection('Users')
        .doc(user.uid)
        .collection('Cards')
        .get()
    console.log(snapshot.docs.map(doc => doc.data()));
  }
  React.useEffect(() => {
    const db = firebase.firestore()
    const user = firebase.auth().currentUser

    const unsubscribe = db.collection('Users')
      .doc(user.uid)
      .collection('Cards')
      .onSnapshot(querySnapshot => {
        const snapshot = querySnapshot.docs.map(doc => doc.data())
        setCards(snapshot)
      })

    return () => unsubscribe()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.info}>Aqui você pode gerenciar seus cartões, é obrigatório que você tenha pelo menos um.</Text>
      <FlatList
        data={cards}
        renderItem={({ item }) => <Card card={item} />}
        keyExtractor={item => item.number}
        style={styles.list}
      />
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.button} onPress={() => setIsAdding(true)}>
          <Text style={styles.add}>Adicionar cartão</Text>
        </TouchableOpacity>
      </View>
      <Add isVisible={isAdding} setIsVisible={setIsAdding} />
    </View>
  )
}

export default Wallet
