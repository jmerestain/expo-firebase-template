import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import VendorScreen from './VendorScreen';
import NewItemScreen from './NewItemScreen';

const Vendor = createStackNavigator();
const noHeader = {headerShown: false}

const VendorNavigator = () => {
    return (
        <Vendor.Navigator>
            <Vendor.Screen name="VendorMain" component={VendorScreen} 
            options={noHeader} />
            <Vendor.Screen name="VendorNew" component={NewItemScreen} 
            options={noHeader}  />
        </Vendor.Navigator>        
    )
}

export default VendorNavigator;
