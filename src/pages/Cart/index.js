import React from 'react';
import { View, StyleSheet, Text } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import * as firebase from 'firebase'
import 'firebase/firestore'

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
    margin: 16,
  },
  info: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
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
  finishShopping: {
    fontWeight: '600',
    color: 'black'
  },
  price: {
    fontWeight: 'bold',
    color: 'white'
  },
  card: {
    width: 160,
    marginHorizontal: 25,
    marginTop: 15,
    backgroundColor: 'red',
    height: 160,
    borderRadius: 25
  },
  cardBottom: {
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'blue',
    width: 160,
    padding: 3,
    height: 40,
    position: 'absolute',
    bottom: 0
  },
  bottomContainer: {
    flex: 1,
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

const CartScreen = () => {
  const [products, setProducts] = React.useState(
    [{ price: 10, name: 'nome', thumbnail: '', id: 1 },
      { price: 10, name: 'nome', thumbnail: '', id: 2 },
    { price: 10, name: 'nome', thumbnail: '', id: 3 },
    { price: 10, name: 'nome', thumbnail: '', id: 4 }]
  )
    
  return (
    <View style={styles.container}>
      <Text style={styles.info}>Meu carrinho</Text>
      <FlatList
        data={products}
        numColumns={2}
        contentContainerStyle={{alignItems:'center'}}
        renderItem={({ item }) =>
          <View style={styles.card}
          >
            <View style={styles.cardBottom}>
              <Text style={styles.price}>Refrigerante</Text>
              <Text style={styles.price}>R${'10,00'}</Text>
            </View>
          </View>
        }
        keyExtractor={ item => item.id.toString()}
        style={styles.list}
      />
        <View style={styles.bottom}>
          <View style={styles.bottomContainer}>
            <Text style={styles.price}>Preco total: R${'40,00'}</Text>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <Text style={styles.finishShopping}>Fechar compra</Text>
            </TouchableOpacity>
          </View>
      </View>
    </View>
  )
}

export default CartScreen;