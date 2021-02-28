import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useSelector } from 'react-redux';
import SignUp from '../pages/SignUp/index';
import SignIn from '../pages/SignIn/index';
import { store, persistor } from '../redux/store';
import Home from '../pages/Home';

const AuthStack = createStackNavigator();

const AuthRoutes = () => {
  //const token = useSelector((item) => item.tokenId.tokenId);
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AuthRoutes />
    </NavigationContainer>
  );
};

export default AppNavigator;
