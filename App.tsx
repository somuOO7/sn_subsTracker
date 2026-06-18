import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CircleAlert, LayoutGrid, List, PlusCircle } from 'lucide-react-native';
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import Dashboard from './src/screens/Dashboard';
import Details from './src/screens/Details';
import Login from './src/screens/Login';
import { Colors } from './src/constants';
import AddSubscription from './src/screens/AddSubscription';

const MainStack = createBottomTabNavigator({
  screens: {
    Dashboard: Dashboard,
    AddSubscription: AddSubscription,
    Details: Details,
  },
  screenOptions: ({ route }) => ({
    headerShown: false,
    tabBarLabel: ({ focused, color }) => {
      switch (route.name) {
        case 'Dashboard':
          return (
            <Text
              style={{
                color: focused ? Colors.primaryColor : color,
                fontWeight: 'bold',
              }}
            >
              Home
            </Text>
          );
        case 'AddSubscription':
          return (
            <Text style={{ color: Colors.primaryColor, fontWeight: 'bold' }}>
              Add
            </Text>
          );
        case 'Details':
          return (
            <Text
              style={{
                color: focused ? Colors.primaryColor : color,
                fontWeight: 'bold',
              }}
            >
              Details
            </Text>
          );
        default:
          return '';
      }
    },
    tabBarIcon: ({ focused, color, size }) => {
      switch (route.name) {
        case 'Dashboard':
          return (
            <LayoutGrid
              color={focused ? Colors.primaryColor : color}
              size={size}
            />
          );
        case 'AddSubscription':
          return (
            <PlusCircle
              fill={Colors.primaryColor}
              color="white"
              size={size + 5}
            />
          );
        case 'Details':
          return (
            <List color={focused ? Colors.primaryColor : color} size={size} />
          );
        default:
          return (
            <CircleAlert
              color={focused ? Colors.primaryColor : color}
              size={size}
            />
          );
      }
    },
  }),
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
