import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, Alert, LogBox } from 'react-native';
import { useDispatch } from 'react-redux';
import * as firebase from 'firebase';
import 'firebase/auth';
import { Container } from '../../components/Container/index';
import { Button, ClearButton } from '../../components/Button/index';
import { InputComponent } from '../../components/Input/index';
import { Text, MainText, LinkText, SecondaryText } from '../../components/Text/index';
import { SaveToken } from '../../redux/actions/auth';
import pattern from '../../utils/emailRegex';

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pattern.test(String(email).toLowerCase()) || !email.length) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [email]);

  const handleLoginButton = async () => {
    if (email && password) {
       const authData = await firebase.auth()
         .signInWithEmailAndPassword(email, password)
         .catch(() => {
           Alert.alert('Email', 'Credenciais incorretas, tente novamente', [
             { text: 'Entendido' },
           ]);
         });
       const token = await authData.user.getIdToken();
       await dispatch(SaveToken(token));
    } else {
      Alert.alert('Preencha todos os campos antes de fazer o login');
    }
  };

  return (
    <Container modifiers="around">
      <SecondaryText modifiers="title">LOGIN</SecondaryText>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <InputComponent
          modifiers={isValid ? '' : 'danger'}
          onChangeText={(txt) => setEmail(txt)}
          value={email}
          label="Email"
          autoCapitalize="none"
          autoCorrect={false}
          testID="email"
          keyboardType="email-address"
        />
        {!isValid && (
          <Text modifiers="danger">
            Endereço de email inválido. Deveria ser seu@email.com
          </Text>
        )}
        <InputComponent
          label="Senha"
          secureTextEntry
          testID="password"
          onChangeText={(pwd) => setPassword(pwd)}
          autoCorrect={false}
          value={password}
        />
        <ClearButton
          onPress={() => navigation.navigate('SignUp')}
          modifiers="noBorderButton">
          <Text modifiers="underline" testID="signUp">
            Não tem conta?
          </Text>
          <LinkText modifiers="underline color-blue" testID="signUp">
            Cadastre-se
          </LinkText>
        </ClearButton>
        <Button
          testID="loginButton"
          modifiers="commonButton"
          onPress={() => {
            handleLoginButton();
          }}>
          <MainText modifiers="buttonText">LOGIN</MainText>
        </Button>
      </KeyboardAvoidingView>
    </Container>
  );
}
