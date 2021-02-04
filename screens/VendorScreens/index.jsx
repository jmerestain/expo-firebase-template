import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import VendorScreen from './VendorScreen';
import NewItemScreen from './NewItemScreen';
import FavoritesScreen from './FavoritesScreen';
import SettingsScreen from './SettingsScreen';

const Vendor = createStackNavigator();
const noHeader = {headerShown: false}

const VendorNavigator = () => {
    return (
        <Vendor.Navigator>
            <Vendor.Screen name="VendorMain" component={VendorScreen} 
            options={noHeader} />
            <Vendor.Screen name="VendorNew" component={NewItemScreen} 
            options={noHeader}  />
            <Vendor.Screen name="Favorites" component={FavoritesScreen} 
            options={noHeader}  />
            <Vendor.Screen name="Settings" component={SettingsScreen} 
            options={noHeader}  />
        </Vendor.Navigator>        
    )
}

export default VendorNavigator;
