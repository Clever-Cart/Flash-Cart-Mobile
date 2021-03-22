import React from 'react'
import firebase from 'firebase/app'
import AppNavigator from './src/navigator/appNavigator'
import env from './env'

firebase.initializeApp(env) 

export default function App() {
  return (
    <AppNavigator/>
  )
}
