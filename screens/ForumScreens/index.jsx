import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const ForumNav = createStackNavigator();
const noHeader = {headerShown: false};
const showHeader = {headerShown: true};

const ForumNavScreens = () => (
    <ForumNav.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: 'rgb(138,18,20)',
        }
    }}>
        <ForumNav.Screen component={ForumNav} />
    </ForumNav.Navigator>
)

export default CreateShopScreens;