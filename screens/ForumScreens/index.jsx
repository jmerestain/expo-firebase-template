import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// Components

import GroupScreen from "./GroupScreen";
import PostsScreen from "./PostsScreen";
import AddNewPostScreen from "./AddNewPostScreen";

const Forum = createStackNavigator();
const noHeader = { headerShown: false };
const showHeader = { headerShown: true };

const ForumScreens = () => {
  return (
    <Forum.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "rgb(138,18,20)",
        },
      }}
    >
      <Forum.Screen
        name="Forums"
        component={GroupScreen}
        options={showHeader}
      />
      <Forum.Screen
        name="Group"
        component={PostsScreen}
        options={({ route }) => ({ ...showHeader, title: route.params.title })}
      />
      <Forum.Screen
        name="Add New Post"
        component={AddNewPostScreen}
        options={showHeader}
      />
    </Forum.Navigator>
  );
};

export default ForumScreens;
