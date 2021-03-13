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
        headerStyle: {
          backgroundColor: "rgb(138,18,20)",
        },
      }}
      initialRouteName="Chat"
    >
      <MessageNav.Screen name="Inbox" component={Inbox} options={noHeader} />
      <MessageNav.Screen name="Chat" component={Chat} options={noHeader} />
    </MessageNav.Navigator>
  );
};

export default MessageNavigator;
