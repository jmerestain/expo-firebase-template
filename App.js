// React
import React from 'react';
// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// UI Kitten
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
// Screens
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import SampleAuthenticated from './screens/SampleAuthenticated'; // Sample screen
// Firebase
import { initFirebase } from './services/firebase';

const Stack = createStackNavigator();

const UiKitten = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavComponent />
    </ApplicationProvider>
  )
}

const NavComponent = () => (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Sample" component={SampleAuthenticated} />
      </Stack.Navigator>
    </NavigationContainer>
)

export default function App() {
  // Initialize Firebase first
  initFirebase();
  return (
    <UiKitten />
  );

}
