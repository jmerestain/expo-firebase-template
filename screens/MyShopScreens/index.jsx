import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MyShopMenu from './MyShopMenuScreen';
import OrderProcess from './OrderProcessScreen';
import CompletedOrder from './CompletedOrderScreen';

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
            <MyShopNav.Screen name="MyShopMenu" component={MyShopMenu} 
            options={showHeader} />
            <MyShopNav.Screen name="OrderProcess" component={OrderProcess} 
            options={showHeader} />
            <MyShopNav.Screen name="CompletedOrder" component={CompletedOrder} 
            options={showHeader} />
        </MyShopNav.Navigator>        
    )
}

export default MyShopNavigator;
