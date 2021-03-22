import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { Provider, useSelector } from 'react-redux'
import { store, persistor } from '../redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import SignUp from '../pages/SignUp'
import SignIn from '../pages/SignIn'

import Home from '../pages/Home'
import QRCode from '../pages/QRCode'
import WalletScreen from '../pages/Wallet'

const defaultScreenOptions = {
  headerStyle: {
    backgroundColor: '#F97D7D'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontSize: 20
  }
}

const OutsideStack = createStackNavigator()
const Outside = () => (
  <OutsideStack.Navigator screenOptions={{ headerShown: false }}>
    <OutsideStack.Screen
      name='Login'
      component={SignIn}
    />
    <OutsideStack.Screen
      name='SignUp'
      component={SignUp}
    />
  </OutsideStack.Navigator>
)

const WalletStack = createStackNavigator()
const Wallet = () => (
  <WalletStack.Navigator screenOptions={defaultScreenOptions}>
    <WalletStack.Screen
      name='Wallet'
      component={WalletScreen}
      options={{ title: 'Cartões' }}
    />
  </WalletStack.Navigator>
)

const InsideDrawer = createDrawerNavigator()
const Inside = () => (
  <InsideDrawer.Navigator initialRouteName='Home'>
    <InsideDrawer.Screen
      name='Home'
      component={Home}
    />
    <InsideDrawer.Screen
      name='QRCode'
      component={QRCode}
    />
    <InsideDrawer.Screen
      name='Wallet'
      component={Wallet}
    />
  </InsideDrawer.Navigator>
)

const AppStack = createStackNavigator()
const App = () => {
  const token = useSelector((item) => item.tokenId.tokenId)

  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      {
        token
          ? <AppStack.Screen name='Inside' component={Inside} />
          : <AppStack.Screen name='Outside' component={Outside} />
      }
    </AppStack.Navigator>
  )
}

const AppNavigator = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default AppNavigator
