import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// Components

import SettingsScreen from './SettingsScreen';
import AddressSettingsScreen from './AddressSettingsScreen';
import PushScreen from './PushScreen';
import AccountSetttingsScreen from './AccountSetttingsScreen';
import PrivacyPolicyScreen from './PrivacyPolicyScreen';
import ToCScreen from './ToCScreen';

const Settings = createStackNavigator();
const noHeader = {headerShown: false};
const showHeader = {headerShown: true};

const SettingsScreens = () => (
    <Settings.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: 'rgb(138,18,20)',
        }
    }}>
        <Settings.Screen name="Settings" options={showHeader}>
        {(props) => <SettingsScreen {...props} />}
        </Settings.Screen>
        <Settings.Screen name="Account Details" component={AccountSetttingsScreen} 
        options={showHeader} />
        <Settings.Screen name="Delivery Information" component={AddressSettingsScreen} 
        options={showHeader} />
        <Settings.Screen name="Push Notifications" component={PushScreen} 
        options={showHeader} />
        <Settings.Screen name="Privacy Policy" component={PrivacyPolicyScreen} 
        options={showHeader} />
        <Settings.Screen name="Terms and Conditions" component={ToCScreen} 
        options={showHeader} />
    </Settings.Navigator>
)
export default SettingsScreens;