import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Inbox from './InboxScreen';

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
            <MessageNav.Screen name="Inbox" component={Inbox} 
            options={showHeader} />
        </MessageNav.Navigator>        
    )
}

export default MessageNavigator;
