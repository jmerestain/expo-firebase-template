import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MyShopMenu from './MyShopMenuScreen';
import OrderProcess from './OrderProcessScreen';
import CompletedOrder from './CompletedOrderScreen';
import MyShopPreview from './MyShopPreviewScreen';

const MyShopNav = createStackNavigator();
const noHeader = {headerShown: false};
const showHeader = {headerShown: true};

const MyShopNavigator = () => {
    return (
        <MyShopNav.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: 'rgb(138,18,20)',
            }
        }}>
            <MyShopNav.Screen name="My Shop Account" component={MyShopMenu} 
            options={showHeader} />
            <MyShopNav.Screen name="Pending Orders" component={OrderProcess} 
            options={showHeader} />
            <MyShopNav.Screen name="Completed Orders" component={CompletedOrder}
            options={showHeader} />
            <MyShopNav.Screen name="Preview Shop" component={MyShopPreview} 
            options={showHeader} />
        </MyShopNav.Navigator>        
    )
}

export default MyShopNavigator;
