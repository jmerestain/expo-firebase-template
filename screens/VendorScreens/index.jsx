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
import VendorApplication from '../VendorScreens/VendorApplication';
import DTIRegistrationInfoScreen from '../CreateShopScreens/DTIRegistrationInfoScreen';
import DTIRegistrationNext from '../CreateShopScreens/DTIRegistrationNextScreen';
import MyShopPreview from '../MyShopScreens/MyShopPreviewScreen';
import ShopSettings from '../MyShopScreens/ShopSettingsScreen';




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
            <Vendor.Screen name="Manage Products" component={ManageProductsScreen} 
            options={noHeader}  />
            <Vendor.Screen name="My Shop" component={MyShopScreen} 
            options={showHeader}  />
            <Vendor.Screen name="Pending Orders" component={OrderProcess} 
            options={showHeader}  />
            <Vendor.Screen name="Completed Orders" component={CompletedOrder} 
            options={showHeader}  />
            <Vendor.Screen name="Build My Shop" component={EmptyState} 
            options={showHeader} />
            <Vendor.Screen name="Register Shop" component={RegisterShopScreen} 
            options={showHeader} />
            <Vendor.Screen name="Vendor Application" component={VendorApplication} 
            options={showHeader}  />
            <Vendor.Screen name="About DTI Registration" component={DTIRegistrationInfoScreen} 
            options={showHeader} />
            <Vendor.Screen name="How to File Registration" component={DTIRegistrationNext} 
            options={showHeader} />
            <Vendor.Screen name="Preview Shop" component={MyShopPreview} 
            options={showHeader} />
            <Vendor.Screen name="Shop Settings" component={ShopSettings} 
            options={showHeader} />


        </Vendor.Navigator>        
    )
}

export default VendorNavigator;
