import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
// Components

import RegisterShopScreen from "./RegisterShopScreen";
import ConfirmRegisterShopScreen from "./ConfirmRegisterShopScreen";
import DTIRegistrationInfoScreen from "./DTIRegistrationInfoScreen";
import DTIRegistrationNext from "./DTIRegistrationNextScreen";
import EmptyState from "./EmptyStateScreen";

const CreateShopNav = createStackNavigator();
const noHeader = { headerShown: false };
const showHeader = { headerShown: true };

const CreateShopScreens = ({ route }) => {
  return (
    <CreateShopNav.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "rgb(138,18,20)",
        },
      }}
      initialRouteName={
        route.params.vendorStatus == "pending"
          ? "Confirm Register Shop"
          : "Build My Shop"
      }
    >
      <CreateShopNav.Screen
        name="Build My Shop"
        component={EmptyState}
        options={showHeader}
      />
      <CreateShopNav.Screen
        name="Register Shop"
        component={RegisterShopScreen}
        options={showHeader}
      />
      <CreateShopNav.Screen
        name="Confirm Register Shop"
        component={ConfirmRegisterShopScreen}
        options={showHeader}
      />
      <CreateShopNav.Screen
        name="About DTI Registration"
        component={DTIRegistrationInfoScreen}
        options={showHeader}
      />
      <CreateShopNav.Screen
        name="How to File Registration"
        component={DTIRegistrationNext}
        options={showHeader}
      />
    </CreateShopNav.Navigator>
  );
};

export default CreateShopScreens;
