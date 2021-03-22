import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Image, SectionList } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  Layout,
  Text,
  Button,
  Icon,
  Divider,
  Avatar,
  Tab,
  TabBar,
  List,
} from "@ui-kitten/components";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import OrdersScreen from "../OrdersScreen";
import { getCurrentUserFromUID } from "../../services/users";

const AccountStack = createStackNavigator();
const AccountTopTab1 = createMaterialTopTabNavigator();

const MyAccountStackNavigation = () => (
  <AccountStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: "rgb(138,18,20)" },
    }}
  >
    <AccountStack.Screen name="Payment Options" component={OrdersScreen} />
    <AccountStack.Screen name="Contact Support" component={OrdersScreen} />
  </AccountStack.Navigator>
);

function MyAccountScreen({ navigation }) {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    getCurrentUserFromUID(setProfile);
  }, []);

  return (
    <Layout style={styles.container}>
      <Layout style={styles.inner}>
        <Layout style={{ alignSelf: "center", alignContent: "center" }}>
          <Avatar
            rounded
            size="giant"
            shape="round"
            source={
              profile.photoURL
                ? { uri: profile.photoURL }
                : require("../../screens/avatar-icon.png")
            }
            style={{
              marginHorizontal: 50,
              marginTop: 24,
              marginBottom: 8,
              alignItems: "center",
              alignSelf: "center",
              alignContent: "center",
            }}
          />
          <Text
            category="h6"
            style={{
              alignSelf: "center",
              alignContent: "center",
              marginVertical: 12,
            }}
          >
            {profile.firstName} {profile.lastName}
          </Text>
          {profile.description && (
            <Text
              category="s1"
              style={{
                alignSelf: "center",
                alignContent: "center",
                marginBottom: 12,
              }}
            >
              {profile.description}
            </Text>
          )}
        </Layout>
      </Layout>
      <AccountTabNavigation />
    </Layout>
  );
}

export const AccountTabNavigation = () => {
  return (
    <AccountTopTab1.Navigator tabBar={(props) => <TopTabBar {...props} />}>
      <AccountTopTab1.Screen
        name="Pending Orders"
        component={PendingOrdersNav}
      />
      <AccountTopTab1.Screen name="Past Orders" component={PastOrdersNav} />
    </AccountTopTab1.Navigator>
  );
};

const PastOrdersNav = () => {
  return <Layout style={[styles.settingsCard]}></Layout>;
};

const TopTabBar = ({ navigation, state }) => (
  <TabBar
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <Tab title="Pending Orders" />
    <Tab title="Past Orders" />
  </TabBar>
);

const PendingOrdersNav = ({ navigation }) => {
  return (
    <Layout style={styles.container}>
      <Layout style={[styles.settingsCard]}>
        <Layout style={styles.daInner}>
          <Layout style={styles.buttonContain}>
            <Layout>
              <Button appearance="ghost">
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate("Order Status", {
                      initialScreen: "To Process",
                    });
                  }}
                >
                  <Icon
                    name="flip-2"
                    fill="#8A1214"
                    style={{ height: 26, width: 26 }}
                  />
                </TouchableOpacity>
              </Button>
              <Text
                category="s2"
                style={{
                  fontWeight: "bold",
                  color: "rgb(138,18,20)",
                  alignSelf: "center",
                  fontSize: 11,
                }}
              >
                To Process
              </Text>
            </Layout>
            <Layout>
              <Button appearance="ghost">
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate("Order Status", { initialScreen: "To Deliver" });
                  }}
                >
                  <Icon
                    name="car-outline"
                    fill="#8A1214"
                    style={{ height: 26, width: 26 }}
                  />
                </TouchableOpacity>
              </Button>
              <Text
                category="s2"
                style={{
                  fontWeight: "bold",
                  color: "rgb(138,18,20)",
                  alignSelf: "center",
                  fontSize: 11,
                }}
              >
                To Deliver
              </Text>
            </Layout>
            <Layout>
              <Button appearance="ghost">
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate("Order Status", {
                      initialScreen: "To Receive",
                    });
                  }}
                >
                  <Icon
                    name="archive-outline"
                    fill="#8A1214"
                    style={{ height: 26, width: 26 }}
                  />
                </TouchableOpacity>
              </Button>
              <Text
                category="s2"
                style={{
                  fontWeight: "bold",
                  color: "rgb(138,18,20)",
                  alignSelf: "center",
                  fontSize: 11,
                }}
              >
                To Receive
              </Text>
            </Layout>
            <Layout>
              <Button appearance="ghost">
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate("Order Status", {
                      initialScreen: "To Review",
                    });
                  }}
                >
                  <Icon
                    name="checkmark-square-outline"
                    fill="#8A1214"
                    style={{ height: 26, width: 26 }}
                  />
                </TouchableOpacity>
              </Button>
              <Text
                category="s2"
                style={{
                  fontWeight: "bold",
                  color: "rgb(138,18,20)",
                  alignSelf: "center",
                  fontSize: 11,
                }}
              >
                To Review
              </Text>
            </Layout>
          </Layout>
          <Divider />
          <TouchableOpacity>
            <Layout
              style={{
                flexDirection: "row",
                backgroundColor: "transparent",
                justifyContent: "space-between",
                marginVertical: 8,
              }}
            >
              <Text style={{ paddingTop: 2 }}>Payment Options</Text>
              <Icon
                name="chevron-right"
                fill="#8A1214"
                style={{ height: 26, width: 26 }}
              />
            </Layout>
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity>
            <Layout
              style={{
                flexDirection: "row",
                backgroundColor: "transparent",
                justifyContent: "space-between",
                marginVertical: 8,
              }}
            >
              <Text style={{ paddingTop: 2 }}>Contact Support</Text>
              <Icon
                name="chevron-right"
                fill="#8A1214"
                style={{ height: 26, width: 26 }}
              />
            </Layout>
          </TouchableOpacity>
          <Divider />
        </Layout>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  buttonContain: {
    flex: 1,
    flexDirection: "row",
    minHeight: 80,
    justifyContent: "space-around",
    marginTop: 8,
    marginBottom: 40,
  },
  settingsCard: {
    flexDirection: "column",
    justifyContent: "flex-start",
    marginVertical: 8,
  },
  daInner: {
    marginHorizontal: 20,
    backgroundColor: "transparent",
  },
  inner: {
    padding: 20,
  },
  field: {
    marginVertical: 10,
  },
  buttonGroup: {
    alignSelf: "center",
  },
  button: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
  },
});

export default MyAccountScreen;
