import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import VendorScreen from './VendorScreen';
import FavoritesScreen from './FavoritesScreen';
import SettingsScreen from './SettingsScreen';
import MyAccountScreen from './MyAccountScreen';
import OrderStatusScreen from './OrderStatusScreen';
import ManageProductsScreen from '../ManageProductScreens';
import MyShopScreen from '../MyShopScreens/MyShopMenuScreen';
import OrderProcess from '../MyShopScreens/OrderProcessScreen';
import CompletedOrder from '../MyShopScreens/CompletedOrderScreen';
import EmptyState from './EmptyStateScreen';
import RegisterShopScreen from '../CreateShopScreens/RegisterShopScreen';

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
            <Vendor.Screen name="Order Status" component={OrderStatusScreen} 
            options={showHeader}  />
            <Vendor.Screen name="Manage Products Screen" component={ManageProductsScreen} 
            options={noHeader}  />
            <Vendor.Screen name="MyShopScreen" component={MyShopScreen} 
            options={showHeader}  />
            <Vendor.Screen name="OrderProcess" component={OrderProcess} 
            options={showHeader}  />
            <Vendor.Screen name="CompletedOrder" component={CompletedOrder} 
            options={showHeader}  />
            <Vendor.Screen name="Vendor Application" component={EmptyState} 
            options={showHeader} />
            <Vendor.Screen name="Register Shop" component={RegisterShopScreen} 
            options={showHeader} />
        </Vendor.Navigator>        
    )
}

export default VendorNavigator;
