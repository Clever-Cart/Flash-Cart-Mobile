import React from 'react';
import { Provider } from 'react-redux';
import { Text } from 'react-native';
import firebase from 'firebase/app';
import AppNavigator from './src/navigator/appNavigator';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import env from './env'
firebase.initializeApp(env) 

export default function App() {
  return (
    <AppNavigator/>
  );
}
