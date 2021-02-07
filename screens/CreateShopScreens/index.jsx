import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// Components

import RegisterShopScreen from './RegisterShopScreen';
import ConfirmRegisterShopScreen from './ConfirmRegisterShopScreen';

const CreateShopNav = createStackNavigator();
const noHeader = {headerShown: false};
const showHeader = {headerShown: true};

const CreateShopScreens = () => (
    <CreateShopNav.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: 'rgb(138,18,20)',
        }
    }}>
        <CreateShopNav.Screen name="Register Shop" component={RegisterShopScreen} 
        options={showHeader} />
        <CreateShopNav.Screen name="Confirm Register Shop" component={ConfirmRegisterShopScreen} 
        options={showHeader} />
    </CreateShopNav.Navigator>
)

export default CreateShopScreens;