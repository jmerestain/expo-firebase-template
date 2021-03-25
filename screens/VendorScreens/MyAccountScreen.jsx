import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Image, SectionList } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  Layout,
  Text,
  Button,
  Icon,
  Divider,
  Input,
  Avatar,
  Tab,
  TabBar,
  List,
} from "@ui-kitten/components";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import OrdersScreen from "../OrdersScreen";
import { getCurrentUserFromUID } from "../../services/users";
import { getOrdersCurrentUser } from "../../services/orders";
import { ORDER_COMPLETED } from "../orderStatuses";

const AccountStack = createStackNavigator();
const AccountTopTab1 = createMaterialTopTabNavigator();

const SearchIcon = (props) => <Icon name="search-outline" {...props} />;

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

const dateToString = (date) => {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  return month + "/" + day + "/" + year;
};

const renderCompletedItems = ({ item, index }) => (
  <Layout style={styles.container}>
    <Layout style={styles.inner}>
      <Layout style={styles.containerList}>
        <Layout style={styles.innerList}>
          <Layout style={styles.textList}>
            <Layout
              style={{
                paddingHorizontal: 20,
                shadowRadius: 1,
                borderColor: "rgb(220,220,220)",
              }}
            >
              <Text
                category="h6"
                style={{ alignContent: "center", marginVertical: 6 }}
              >
                {item.userName}
              </Text>
              <Layout style={{ flex: 1, flexDirection: "row" }}>
                <Layout
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    minWidth: 60,
                    marginRight: 32,
                  }}
                >
                  <Text
                    category="s2"
                    style={{
                      alignContent: "center",
                      marginVertical: 3,
                      color: "rgb(128, 128, 128)",
                    }}
                  >
                    {item.deliveryDate &&
                      dateToString(item.deliveryDate.toDate())}
                  </Text>
                  <Text
                    category="s2"
                    style={{
                      alignContent: "center",
                      marginVertical: 3,
                      color: "rgb(128, 128, 128)",
                    }}
                  >
                    {item.quantity} item(s)
                  </Text>
                </Layout>
                <Layout
                  style={{ flex: 1, flexDirection: "column", minWidth: 60 }}
                >
                  <Text
                    category="s2"
                    style={{
                      alignContent: "center",
                      marginVertical: 3,
                      color: "rgb(128, 128, 128)",
                    }}
                  >
                    {item.modeOfPayment || "COD"}
                  </Text>
                  <Text
                    category="s2"
                    style={{
                      alignContent: "center",
                      marginVertical: 3,
                      color: "rgb(128, 128, 128)",
                    }}
                  >
                    {item.price}
                  </Text>
                </Layout>
              </Layout>
            </Layout>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
    <Divider />
  </Layout>
);

function MyAccountScreen({ navigation }) {
  const [profile, setProfile] = useState({});
  const [pastOrders, setPastOrders] = useState([]);
  const [filteredPastOrders, setFilteredPastOrders] = useState([]);
  const [query, setSearch] = useState("");

  useEffect(() => {
    getCurrentUserFromUID(setProfile);
  }, []);

  useEffect(() => {
    const unsubscribeCompleted = getOrdersCurrentUser(
      ORDER_COMPLETED,
      setPastOrders
    );

    return function cleanup() {
      unsubscribeCompleted();
    };
  }, []);

  useEffect(() => {
    setFilteredPastOrders(pastOrders);
  }, [pastOrders]);

  useEffect(() => {
    const lowercaseQuery = query.toLowerCase();
    setFilteredPastOrders(
      pastOrders.filter(
        (order) =>
          order.product &&
          (order.product.title.toLowerCase().includes(lowercaseQuery) ||
            order.product.vendor.toLowerCase().includes(lowercaseQuery))
      )
    );
  }, [query]);

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
      <AccountTabNavigation orders={filteredPastOrders} setSearch={setSearch} />
    </Layout>
  );
}

export const AccountTabNavigation = ({ orders, setSearch }) => {
  return (
    <AccountTopTab1.Navigator tabBar={(props) => <TopTabBar {...props} />}>
      <AccountTopTab1.Screen
        name="Pending Orders"
        component={PendingOrdersNav}
      />
      <AccountTopTab1.Screen name="Past Orders">
        {(props) => (
          <PastOrdersNav {...props} orders={orders} setSearch={setSearch} />
        )}
      </AccountTopTab1.Screen>
    </AccountTopTab1.Navigator>
  );
};

const PastOrdersNav = ({ orders, setSearch }) => {
  return (
    <Layout style={styles.container}>
      <Input
        onChangeText={(value) => setSearch(value)}
        placeholder="Search here"
        style={{ paddingHorizontal: 16, paddingVertical: 12 }}
        accessoryLeft={SearchIcon}
      />
      <Layout style={[styles.settingsCard]}>
        <Layout style={styles.innerPast}>
          <Layout style={{ justifyContent: "flex-start" }}>
            <List data={orders} renderItem={renderCompletedItems} />
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
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
                    navigation.navigate("Order Status", {
                      initialScreen: "To Deliver",
                    });
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
                    navigation.navigate("Rate Order")
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
  innerPast: {
    paddingVertical: 12,
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
