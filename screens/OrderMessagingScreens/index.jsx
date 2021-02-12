import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MyShopMenu from './MyShopMenuScreen';
import OrderProcess from './OrderProcessScreen';
import CompletedOrder from './CompletedOrderScreen';
import MyShopPreview from './MyShopPreviewScreen';
import ShopSettings from './ShopSettingsScreen';

const MessageNav = createStackNavigator();
const noHeader = {headerShown: false};
const showHeader = {headerShown: true};

const MessageNavigator = () => {
    return (
        <MessageNav.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: 'rgb(138,18,20)',
            }
        }}>
            <MessageNav.Screen name="My Shop Account" component={MyShopMenu} 
            options={showHeader} />
            <MessageNav.Screen name="Pending Orders" component={OrderProcess} 
            options={showHeader} />
            <MessageNav.Screen name="Completed Orders" component={CompletedOrder}
            options={showHeader} />
            <MessageNav.Screen name="Preview Shop" component={MyShopPreview} 
            options={showHeader} />
            <MessageNav.Screen name="Shop Settings" component={ShopSettings} 
            options={showHeader} />
        </MessageNav.Navigator>        
    )
}

export default MessageNavigator;
