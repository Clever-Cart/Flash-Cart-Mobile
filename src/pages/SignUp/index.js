import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, Alert, LogBox } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/auth';
import { Container } from '../../components/Container/index';
import { Button } from '../../components/Button/index';
import { InputComponent } from '../../components/Input/index';
import { Text } from '../../components/Text/index';
import pattern from '../../utils/emailRegex';

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureEntry, setSecureEntry] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  useEffect(() => {
    if (pattern.test(String(email).toLowerCase()) || !email.length) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [email]);

  useEffect(() => {
    if (passwordConfirmation === password || !passwordConfirmation.length) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
  }, [passwordConfirmation, password]);

  const handleRegisterButton = () => {
    if (setIsValid && setIsValidPassword) {
      console.log('email', email, 'pass', password);
      firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => { 
          Alert.alert('Cadastro feito com sucesso');
          navigation.navigate('Login');
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('Esse email já está em uso');
          }
          if (error.code === 'auth/invalid-email') {
            Alert.alert('Email inválido');
          }
        });
    }
  };

  return (
    <Container modifiers="around">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <InputComponent
          modifiers={isValid ? '' : 'danger'}
          onChangeText={(txt) => setEmail(txt)}
          value={email}
          label="Email"
          testID="signUpEmail"
          autoCapitalize="none"
          autoCorrect={false}
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
          textContentType={'oneTimeCode'}
          testID="signUpPassword"
          autoCorrect={false}
          value={password}
          onChangeText={(txt) => setPassword(txt)}
        />
        <InputComponent
          label="Confirmação de senha"
          testID="confirmPassword"
          secureTextEntry
          autoCorrect={false}
          value={passwordConfirmation}
          onChangeText={(txt) => setPasswordConfirmation(txt)}
        />
        {!isValidPassword && (
          <Text modifiers="danger">As senhas não conferem</Text>
        )}
        <Button
          onPress={() => navigation.navigate('Login')}
          modifiers="noBorderButton">
          <Text modifiers="underline" testID="hasAccount">
            Já tem uma conta?
          </Text>
        </Button>
        <Button
          modifiers="commonButton"
          onPress={() => handleRegisterButton()}
          testID="signUpButton">
          <Text modifiers="buttonText">Cadastrar</Text>
        </Button>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default SignUp;
