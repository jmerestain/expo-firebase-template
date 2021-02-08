import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// Components

import ManageProductsScreen from './ManageProductsScreen';
import NewItemScreen from './NewItemScreen';

const ManageProducts = createStackNavigator();
const noHeader = {headerShown: false};
const showHeader = {headerShown: true};

const ManageProductsScreens = () => (
    <ManageProducts.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: 'rgb(138,18,20)',
        }
    }}>
        <ManageProducts.Screen name="Manage Products" component={ManageProductsScreen} 
        options={showHeader} />
        <ManageProducts.Screen name="Add New Item" component={NewItemScreen} 
        options={showHeader}  />

    </ManageProducts.Navigator>
)

export default ManageProductsScreens;