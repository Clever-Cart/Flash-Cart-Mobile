import React from 'react';
import { View, StyleSheet, Text, ImageBackground  } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import * as firebase from 'firebase'
import 'firebase/firestore'
import { ActivityIndicator } from 'react-native';

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
    height: 160,
    borderRadius: 25
  },
  cardBottom: {
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F97D7D',
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
  const [products, setProducts] = React.useState([])
  const [cartId, setCartId] = React.useState();
  const [finalPrice, setFinalPrice] = React.useState(0);

  React.useEffect(() => {
    const db = firebase.firestore()
    const user = firebase.auth().currentUser
    db.collection('Users')
      .doc(user.uid)
      .onSnapshot(documentSnapshot => {
        const data = documentSnapshot.data();
        setCartId(data && data.cartId);
      });
  }, [])

  const getProducts = async () => {
    const db = firebase.firestore()
    await db.collection('Carts')
      .doc(cartId)
      .collection('Products').onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map(doc => {
          return doc.data();
        })
        setProducts(data);
      })
  }

  const sumPrice = () => {
    let price = 0;
    products.map((item) => {
      price += item.price;
      return item;
    })
    setFinalPrice(price);
  }

  React.useEffect(() => {
    if (cartId) {
      getProducts();
    }
  }, [cartId])

  React.useEffect(() => {
    if (products) {
      sumPrice();
    }
  }, [cartId])
   
  return (
    <View style={styles.container}>
      <Text style={styles.info}>Meu carrinho</Text>
      {products.length > 0 ? (
        <FlatList
          data={products}
          numColumns={2}
          contentContainerStyle={{alignItems:'center'}}
          renderItem={({ item }) =>
            <ImageBackground style={styles.card} source={{uri: item.thumbnail}}
            >
              <View style={styles.cardBottom}>
                <View style={{width: '55%', marginLeft: 5}}>
                  <Text style={styles.price}>{item.name.length < 13
                    ? `${item.name}`
                    : `${item.name.substring(0, 13)}...`}</Text>
                </View>
                <Text style={styles.price}>R${item.price.toFixed(2)}</Text>
              </View>
            </ImageBackground>
          }
          keyExtractor={ (item, index)=> index.toString()}
          style={styles.list}
        />
      ) : <ActivityIndicator color="#F97D7D" size="large"/>}
        <View style={styles.bottom}>
          <View style={styles.bottomContainer}>
            <Text style={styles.price}>Preco total: R${finalPrice.toFixed(2)}</Text>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <Text style={styles.finishShopping}>Fechar compra</Text>
            </TouchableOpacity>
          </View>
      </View>
    </View>
  )
}

export default CartScreen;