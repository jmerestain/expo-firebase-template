import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import VendorScreen from './VendorScreen';
import NewItemScreen from './NewItemScreen';
import FavoritesScreen from './FavoritesScreen';
import SettingsScreen from './SettingsScreen';
import MyAccountScreen from './MyAccountScreen';
import OrderStatusScreen from './OrderStatusScreen';

const Vendor = createStackNavigator();
const noHeader = {headerShown: false};
const showHeader = {headerShown: true};

const VendorNavigator = () => {
    return (
        <Vendor.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: 'rgb(138,18,20)',
            }
        }}>
            <Vendor.Screen name="Menu" component={VendorScreen} 
            options={showHeader} />
            <Vendor.Screen name="New Item" component={NewItemScreen} 
            options={showHeader}  />
            <Vendor.Screen name="Favorites" component={FavoritesScreen} 
            options={showHeader}  />
            <Vendor.Screen name="Settings" component={SettingsScreen} 
            options={showHeader}  />
            <Vendor.Screen name="My Account" component={MyAccountScreen} 
            options={showHeader}  />
            <Vendor.Screen name="Order Status" component={OrderStatusScreen} 
            options={showHeader}  />
        </Vendor.Navigator>        
    )
}

export default VendorNavigator;
