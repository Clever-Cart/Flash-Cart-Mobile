import React, {useState} from 'react';
import {View, TouchableOpacity, FlatList, TextInput} from 'react-native';
import {Container} from '../../components/Container/index';
import {Button} from '../../components/Button/index';
import {Text} from '../../components/Text/index';
import {Logout} from '../../redux/actions/auth';
import {useDispatch} from 'react-redux';
import * as firebase from 'firebase';
import 'firebase/firestore';

const Home = ({ navigation }) => {
  const [cartId, setCartId] = React.useState();

  const dispatch = useDispatch();
  const handleLogoutButton = () => {
    dispatch(Logout());
  };

  const handleReadQRButton = () => {
    navigation.navigate('QRCode');
  }

  React.useEffect(() => {
    const db = firebase.firestore();
    const userId = firebase.auth().currentUser?.uid;

    if (!userId) {
      return;
    }

    return db.collection('Users')
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        const data = documentSnapshot.data();

        if (!data?.cartId) {
          return;
        }
        
        setCartId(data.cartId);
      });
  }, []);

  return (
    <Container modifiers="around">
      <View>
        <Button
          modifiers="commonButton"
          onPress={() => handleReadQRButton()}
        >
          <Text modifiers="buttonText">Read QRCode</Text>
        </Button>
        <Button
          modifiers="commonButton"
          onPress={() => handleLogoutButton()}
          >
          <Text modifiers="buttonText">Logout</Text>
        </Button>
        {cartId ? <Text>{`Carrinho conectado: ${ cartId }`}</Text> : null}
      </View>
    </Container>
  );
};

export default Home;
