// React
import React, { useState, useEffect } from 'react';
import { StyleSheet, LogBox, ActivityIndicator } from 'react-native';
// React Navigation
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// UI Kitten
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Icon, Layout, Button } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as theme } from './theme.json';
import { default as mapping } from './mapping.json';
import * as Font from 'expo-font';
// Screens
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import RegisterScreenNext from './screens/RegisterScreenNext';
import CatalogueNavigator from './screens/CatalogueScreen';
import VendorNavigator from './screens/VendorScreens';
import OrdersScreenNavigator from './screens/OrdersScreen';
// Firebase
import { initFirebase } from './services/firebase';
// Header
import DashHeader from './components/headers/DashHeader';
import _ from 'lodash';
// Navigator
import BottomTabBar from './components/BottomTabBar';

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
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }} customMapping={mapping}>
      <NavComponent />
    </ApplicationProvider>
    </>
  )
}


const DashNavigator = () => (
  <Tab.Navigator 
    tabBarOptions={{
      activeTintColor: '#8A1214',
      inactiveTintColor: '#8F9BB3',
    }}
    tabBar={props => <BottomTabBar {...props} /> }
  >
    <Tab.Screen name="Dashboard" component={CatalogueNavigator} options={{
    }} />
    <Tab.Screen name="Orders" component={OrdersScreenNavigator} options={{
    }} />
    <Tab.Screen name="Vendor" component={VendorNavigator} options={{
    }} />
  </Tab.Navigator>
)

const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgb(255,255,255)',
      border: 'rgb(138,18,20)',
      text: 'rgb(255,255,255)',
      notification: 'rgb(255,255,255)',
      card: 'rgb(255, 255, 255)',
    },
  };

const NavComponent = () => (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options= {{headerStyle: {backgroundColor: 'rgb(138,18,20)'},  headerTitleStyle: { fontFamily: 'Quicksand-Regular', fontWeight:'bold'}}}/>
        <Stack.Screen name="Login" component={LoginScreen} options= {{headerStyle: {backgroundColor: 'rgb(138,18,20)'},  headerTitleStyle: { fontFamily: 'Quicksand-Regular', fontWeight:'bold'}}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options= {{headerStyle: {backgroundColor: 'rgb(138,18,20)'},  headerTitleStyle: { fontFamily: 'Quicksand-Regular', fontWeight:'bold'}}}/>
        <Stack.Screen name="Registration Details" component={RegisterScreenNext} options= {{headerStyle: {backgroundColor: 'rgb(138,18,20)'},  headerTitleStyle: { fontFamily: 'Quicksand-Regular', fontWeight:'bold'}}}/>
        <Stack.Screen name="DashNav" component={DashNavigator}
          options={{
            //header: (props) => {return(<DashHeader />)},
            headerStyle: {backgroundColor: 'rgb(138,18,20)'},
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
)

const styles = StyleSheet.create({
  icon: {
    height: 30,
    width: 30,
    margin: 5,
  }
})

const fetchFonts = async () => {
  return Font.loadAsync({
  'Quicksand-Regular': require('./assets/fonts/Quicksand-Medium.ttf'),
  'NunitoSans-Regular': require('./assets/fonts/NunitoSans-Regular.ttf'),
  });
};



const App = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  initFirebase();
  
  useEffect(() => {
    const loadBeforeApp = async () => {
      await fetchFonts();
      setDataLoaded(true);
    }
    loadBeforeApp();
  }, []);

  if(!dataLoaded) {
    return (
      <ActivityIndicator />
    );
  }
  return (
    <UiKitten />
  );
}

export default App;
