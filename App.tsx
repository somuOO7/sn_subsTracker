import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import Dashboard from './src/screens/Dashboard';
import Details from './src/screens/Details';
import Login from './src/screens/Login';

const MainStack = createBottomTabNavigator({
  screens: {
    Dashboard: Dashboard,
    Details: Details,
  },
  screenOptions: {
    headerShown: false,
  },
});

const AuthStack = createNativeStackNavigator({
  screens: {
    Login: Login,
    MainStack: MainStack,
  },
  screenOptions: {
    headerShown: false,
  },
});

const Navigation = createStaticNavigation(AuthStack);

type RootStackParamList = StaticParamList<typeof AuthStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

function App() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <Navigation />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default App;
