import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import VendorScreen from "./VendorScreen";
import FavoritesScreen from "./FavoritesScreen";
import SettingsScreen from "../SettingsScreens";
import MyAccountScreen from "./MyAccountScreen";
import OrderStatusScreen from "./OrderStatusScreen";
import ManageProductsScreen from "../ManageProductScreens";
import MyShopScreen from "../MyShopScreens/MyShopMenuScreen";
import OrderProcess from "../MyShopScreens/OrderProcessScreen";
import CompletedOrder from "../MyShopScreens/CompletedOrderScreen";
import RegisterShopScreen from "../CreateShopScreens/RegisterShopScreen";
import VendorApplication from "../VendorScreens/VendorApplication";
import CreateShopNavigation from "../CreateShopScreens";
import MyShopPreview from "../MyShopScreens/MyShopPreviewScreen";
import ShopSettings from "../MyShopScreens/ShopSettingsScreen";

import { vendorApplyStatus } from "../../services/vendor";
import NewItemScreen from "./NewItemScreen";

const Vendor = createStackNavigator();
const noHeader = { headerShown: false };
const showHeader = { headerShown: true };

const VendorNavigator = () => {
  const [vendorStatus, setVendorStatus] = useState("");

  useEffect(() => {
    vendorApplyStatus(setVendorStatus);
  }, []);

  return (
    <Vendor.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "rgb(138,18,20)",
        },
      }}
    >
      <Vendor.Screen name="Menu" options={showHeader}>
        {(props) => <VendorScreen {...props} vendorStatus={vendorStatus} />}
      </Vendor.Screen>
      <Vendor.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={showHeader}
      />
      <Vendor.Screen
        name="Settings"
        component={SettingsScreen}
        options={noHeader}
      />
      <Vendor.Screen
        name="My Account"
        component={MyAccountScreen}
        options={showHeader}
      />
      <Vendor.Screen
        name="Order Status"
        component={OrderStatusScreen}
        options={showHeader}
      />
      <Vendor.Screen
        name="Manage Products"
        component={ManageProductsScreen}
        options={noHeader}
      />
      <Vendor.Screen
        name="My Shop"
        component={MyShopScreen}
        options={showHeader}
      />
      <Vendor.Screen
        name="Pending Orders"
        component={OrderProcess}
        options={showHeader}
      />
      <Vendor.Screen
        name="Build My Shop"
        component={CreateShopNavigation}
        options={noHeader}
      />
      <Vendor.Screen
        name="Completed Orders"
        component={CompletedOrder}
        options={showHeader}
      />
      <Vendor.Screen
        name="Register Shop"
        component={RegisterShopScreen}
        options={showHeader}
      />
      <Vendor.Screen
        name="Vendor Application"
        component={VendorApplication}
        options={showHeader}
      />
      <Vendor.Screen
        name="Preview Shop"
        component={MyShopPreview}
        options={showHeader}
      />
      <Vendor.Screen
        name="Shop Settings"
        component={ShopSettings}
        options={showHeader}
      />
      <Vendor.Screen
        name="Add New Item"
        component={NewItemScreen}
        options={showHeader}
      />
    </Vendor.Navigator>
  );
};

export default VendorNavigator;
