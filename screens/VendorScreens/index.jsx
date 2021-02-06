import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import VendorScreen from './VendorScreen';
import FavoritesScreen from './FavoritesScreen';
import SettingsScreen from './SettingsScreen';
import MyAccountScreen from './MyAccountScreen';
import OrderStatusScreen from './OrderStatusScreen';
import ManageProductsScreen from '../ManageProductScreens/ManageProductsScreen';
import MyShopScreen from '../MyShopScreens/MyShopMenuScreen';
import OrderProcess from '../MyShopScreens/OrderProcessScreen';

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
            <Vendor.Screen name="Favorites" component={FavoritesScreen} 
            options={showHeader}  />
            <Vendor.Screen name="Settings" component={SettingsScreen} 
            options={showHeader}  />
            <Vendor.Screen name="My Account" component={MyAccountScreen} 
            options={showHeader}  />
            <Vendor.Screen name="OrderStatus" component={OrderStatusScreen} 
            options={showHeader}  />
            <Vendor.Screen name="ManageProductsScreen" component={ManageProductsScreen} 
            options={showHeader}  />
            <Vendor.Screen name="MyShopScreen" component={MyShopScreen} 
            options={showHeader}  />
            <Vendor.Screen name="OrderProcess" component={OrderProcess} 
            options={showHeader}  />
        </Vendor.Navigator>        
    )
}

export default VendorNavigator;
