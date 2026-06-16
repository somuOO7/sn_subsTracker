import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Dashboard from './src/screens/Dashboard';
import Details from './src/screens/Details';
import { createStaticNavigation } from '@react-navigation/native';

const RootStack = createNativeStackNavigator({
  screens: {
    Dashboard: Dashboard,
    Details: Details,
  },
});

const Navigation = createStaticNavigation(RootStack);

function App() {
  return <Navigation />;
}

export default App;
