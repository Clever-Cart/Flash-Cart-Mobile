import React, {useState} from 'react';
import {View, TouchableOpacity, FlatList, TextInput} from 'react-native';
import {Container} from '../../components/Container/index';
import {Button} from '../../components/Button/index';
import {Text} from '../../components/Text/index';
import {Logout} from '../../redux/actions/auth';
import {useDispatch} from 'react-redux';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const handleLogoutButton = () => {
    dispatch(Logout());
  };

  const handleReadQRButton = () => {
    navigation.navigate('QRCode');
  }

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
      </View>
    </Container>
  );
};

export default Home;
