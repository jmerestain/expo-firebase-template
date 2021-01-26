// React
import React from 'react';
import { StyleSheet, LogBox } from 'react-native';
// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// UI Kitten
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Icon } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
// Screens
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import CatalogueScreen from './screens/CatalogueScreen';
import VendorNavigator from './screens/VendorScreens';
import OrdersScreen from './screens/OrdersScreen';
// Firebase
import { initFirebase } from './services/firebase';
// Header
import DashHeader from './components/headers/DashHeader';
import _ from 'lodash';

LogBox.ignoreLogs(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const UiKitten = () => {
  return (
    <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavComponent />
    </ApplicationProvider>
    </>
  )
}


const DashNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Dashboard" component={CatalogueScreen} options={{
      tabBarIcon: () => (
        <Icon
          style={styles.icon}
          fill='#8F9BB3'
          name='home-outline'
        />
      ),
    }} />
    <Tab.Screen name="Orders" component={OrdersScreen} options={{
      tabBarIcon: () => (
        <Icon
          style={styles.icon}
          fill='#8F9BB3'
          name='shopping-bag-outline'
        />
      ),
    }} />
    <Tab.Screen name="Vendor" component={VendorNavigator} options={{
      tabBarIcon: () => (
        <Icon
          style={styles.icon}
          fill='#8F9BB3'
          name='briefcase-outline'
        />
      ),
    }} />
  </Tab.Navigator>
)

const NavComponent = () => (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="DashNav" component={DashNavigator}
          options={{
            header: (props) => {return(<DashHeader />)}
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
)

const styles = StyleSheet.create({
  icon: {
    height: 32,
    width: 32,
  }
})

export default function App() {
  // Initialize Firebase first
  initFirebase();
  return (
    <UiKitten />
  );

}
