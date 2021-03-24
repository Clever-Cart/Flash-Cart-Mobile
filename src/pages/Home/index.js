import React from 'react';
import {View} from 'react-native';
import {HomeContainer} from '../../components/Container/index';
import {SecondaryButton, SmallWhiteButton} from '../../components/Button/index';
import {Text, MainText, SecondaryText} from '../../components/Text/index';
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
        setCartId(data && data.cartId);
      });
  }, []);

  return (
    <HomeContainer modifiers="around">
      <View>
        <MainText modifiers="title">Bem vinde ao</MainText>
        <MainText modifiers="title">FLASH CART</MainText>
        <MainText modifiers="subTitle">Para começar, leia o QRCode</MainText>
        <MainText modifiers="subTitle">Aperte no botão abaixo</MainText>
        <SecondaryButton
          modifiers="commonButton"
          onPress={() => handleReadQRButton()}
          >
          <SecondaryText modifiers="buttonText">LER QRCODE</SecondaryText>
        </SecondaryButton>
        <SmallWhiteButton
          modifiers="commonButton"
          onPress={() => handleLogoutButton()}
          >
          <SecondaryText modifiers="buttonText">DESLOGAR</SecondaryText>
        </SmallWhiteButton>
        {cartId ? <Text>{`Carrinho conectado: ${ cartId }`}</Text> : null}
      </View>
    </HomeContainer>
  );
};

export default Home;
