import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Inbox from "./InboxScreen";
import Chat from "./ChatScreen";

const MessageNav = createStackNavigator();
const noHeader = { headerShown: false };
const showHeader = { headerShown: true };

const MessageNavigator = () => {
  return (
    <MessageNav.Navigator
      screenOptions={{
        // headerShown: true
        headerStyle: {
          backgroundColor: "rgb(138,18,20)",
        },
      }}
      initialRouteName="My Inbox"
    >
      <MessageNav.Screen name="My Inbox" component={Inbox} options={showHeader} />
      <MessageNav.Screen
        name="Chat"
        component={Chat}
        options={({ route }) => ({ title: route.params.recipient, ...showHeader })}
      />
    </MessageNav.Navigator>
  );
};

export default MessageNavigator;
