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
import {
  getOrdersUnderCurrentVendor,
  updateMultipleOrderStatus,
  updateOrderStatus,
} from "../../services/orders";
import {
  ORDER_PENDING,
  ORDER_TO_PAY,
  ORDER_TO_SHIP,
  ORDER_TO_RECEIVE,
} from "../orderStatuses";
import _ from "lodash";

const MyShopStatusTab = createMaterialTopTabNavigator();

const SearchIcon = (props) => <Icon name="search-outline" {...props} />;

const dateToString = (date) => {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  return month + "/" + day + "/" + year;
};

const renderItem = ({ item, index, isPending }) => (
  <Layout style={styles.container}>
    <Layout style={styles.inner}>
      <Layout style={styles.containerList}>
        <Layout style={styles.innerList}>
          <Avatar
            rounded
            size="giant"
            source={require("../../screens/avatar-icon.png")}
            style={{ marginHorizontal: 20, alignSelf: "center" }}
          />
          <Layout style={styles.textList}>
            <Text
              category="h6"
              style={{ alignContent: "center", marginVertical: 6 }}
            >
              {item.userName}
            </Text>
            <Text
              category="s2"
              style={{
                alignContent: "center",
                marginVertical: 1,
                color: "rgb(128, 128, 128)",
              }}
            >
              {item.orders && item.orders.length} order(s)
            </Text>
          </Layout>
        </Layout>
        <Layout style={{ alignContent: "flex-end", alignItems: "flex-end" }}>
          <Icon
            name="more-horizontal"
            fill="rgb(160,160,160)"
            style={{
              height: 26,
              width: 26,
              marginHorizontal: 16,
              marginVertical: 4,
            }}
          />
          <Button
            size="small"
            style={{
              alignSelf: "flex-end",
              marginVertical: 8,
              marginRight: 16,
            }}
            onPress={() => {
              const orderIds = item.orders.map((order) => order.id);
              updateMultipleOrderStatus(
                orderIds,
                { status: isPending ? ORDER_TO_PAY : ORDER_TO_SHIP },
                () => {}
              );
            }}
          >
            {isPending ? "Confirm Order" : "Mark as Paid"}
          </Button>
        </Layout>
      </Layout>
    </Layout>
    <Divider />
  </Layout>
);

const renderItem2 = ({ item, index }) => (
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
                    x{item.quantity} item(s)
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
                    {item.modeOfPayment || "Cash on Delivery"}
                  </Text>
                  <Text
                    category="s2"
                    style={{
                      alignContent: "center",
                      marginVertical: 3,
                      color: "rgb(128, 128, 128)",
                    }}
                  >
                    P{item.product.price}
                  </Text>
                </Layout>
              </Layout>
            </Layout>
          </Layout>
        </Layout>
        <Layout style={{ alignContent: "flex-end", alignItems: "flex-end" }}>
          <Icon
            name="more-horizontal"
            fill="rgb(160,160,160)"
            style={{
              height: 26,
              width: 26,
              marginHorizontal: 16,
              marginVertical: 4,
            }}
          />
          <Button
            size="small"
            style={{
              alignSelf: "flex-end",
              marginVertical: 8,
              marginRight: 16,
            }}
            onPress={() => {
              updateOrderStatus(item.id, ORDER_TO_RECEIVE, () => {});
            }}
          >
            Mark as Delivered
          </Button>
        </Layout>
      </Layout>
    </Layout>
    <Divider />
  </Layout>
);

const renderItem3 = ({ item, index }) => (
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
                    {item.modeOfPayment || "Cash on Delivery"}
                  </Text>
                  <Text
                    category="s2"
                    style={{
                      alignContent: "center",
                      marginVertical: 3,
                      color: "rgb(128, 128, 128)",
                    }}
                  >
                    {item.product.price}
                  </Text>
                </Layout>
              </Layout>
            </Layout>
          </Layout>
        </Layout>
        <Layout style={{ alignContent: "flex-end", alignItems: "flex-end" }}>
          <Icon
            name="more-horizontal"
            fill="rgb(160,160,160)"
            style={{
              height: 26,
              width: 26,
              marginHorizontal: 16,
              marginVertical: 4,
            }}
          />
          <Button
            size="small"
            style={{
              alignSelf: "flex-end",
              marginVertical: 8,
              marginRight: 16,
            }}
          >
            Mark as Completed
          </Button>
        </Layout>
      </Layout>
    </Layout>
    <Divider />
  </Layout>
);

function OrderStatusScreen({ navigation }) {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [toPayOrders, setToPayOrders] = useState([]);
  const [toDeliverOrders, setToDeliverOrders] = useState([]);
  const [toReceiveOrders, setToReceiveOrders] = useState([]);

  const groupOrdersByUser = (orders, callback) => {
    let groupedOrders = _.groupBy(orders, (order) => order.user);
    groupedOrders = Object.entries(groupedOrders).map(([key, val]) => ({
      orders: val,
      user: key,
      userName: val[0].userName,
    }));
    callback(groupedOrders);
  };

  useEffect(() => {
    var unsubscribePending = getOrdersUnderCurrentVendor(ORDER_PENDING, (orders) =>
      groupOrdersByUser(orders, setPendingOrders)
    );
    var unsubscribeToPay = getOrdersUnderCurrentVendor(ORDER_TO_PAY, (orders) =>
      groupOrdersByUser(orders, setToPayOrders)
    );
    var unsubscribeToShip = getOrdersUnderCurrentVendor(ORDER_TO_SHIP, setToDeliverOrders);
    var unsubscribeToReceive = getOrdersUnderCurrentVendor(ORDER_TO_RECEIVE, setToReceiveOrders);

    return function cleanup() {
      unsubscribePending();
      unsubscribeToPay();
      unsubscribeToShip();
      unsubscribeToReceive();
    }
  }, []);

  return (
    <Layout style={styles.container}>
      <Input
        onChangeText={(value) => setSearch(value)}
        placeholder="Search here"
        style={{ paddingHorizontal: 16, paddingVertical: 12 }}
        accessoryLeft={SearchIcon}
      />
      <NavigationContainer independent="true">
        <MyShopStatusTabNavigation
          pendingOrders={pendingOrders}
          toPayOrders={toPayOrders}
          toDeliverOrders={toDeliverOrders}
          toReceiveOrders={toReceiveOrders}
        />
      </NavigationContainer>
    </Layout>
  );
}

const MyShopStatusTabNavigation = ({
  pendingOrders,
  toPayOrders,
  toDeliverOrders,
  toReceiveOrders,
}) => {
  return (
    <MyShopStatusTab.Navigator tabBar={(props) => <TopTabBar {...props} />}>
      <MyShopStatusTab.Screen name="Pending">
        {(props) => <ToProcessNav {...props} data={pendingOrders} isPending />}
      </MyShopStatusTab.Screen>
      <MyShopStatusTab.Screen name="To Pay">
        {(props) => <ToProcessNav {...props} data={toPayOrders} />}
      </MyShopStatusTab.Screen>
      <MyShopStatusTab.Screen name="To Deliver">
        {(props) => <ToDeliverNav {...props} data={toDeliverOrders} />}
      </MyShopStatusTab.Screen>
      <MyShopStatusTab.Screen name="Shipping">
        {(props) => <ShippingNav {...props} data={toReceiveOrders} />}
      </MyShopStatusTab.Screen>
    </MyShopStatusTab.Navigator>
  );
};

const ToProcessNav = ({ data, isPending }) => {
  return (
    <Layout style={[styles.settingsCard]}>
      <Layout style={styles.inner}>
        <Layout style={{ justifyContent: "flex-start" }}>
          <List
            data={data}
            renderItem={(props) => renderItem({ ...props, isPending })}
          />
        </Layout>
      </Layout>
    </Layout>
  );
};

const ToDeliverNav = ({ data }) => {
  return (
    <Layout style={[styles.settingsCard]}>
      <Layout style={styles.inner}>
        <Layout style={{ justifyContent: "flex-start" }}>
          <List data={data} renderItem={renderItem2} />
        </Layout>
      </Layout>
    </Layout>
  );
};

const ShippingNav = ({ data }) => {
  return (
    <Layout style={[styles.settingsCard]}>
      <Layout style={styles.inner}>
        <Layout style={{ justifyContent: "flex-start" }}>
          <List data={data} renderItem={renderItem3} />
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
    <Tab title="Pending" />
    <Tab title="To Pay" />
    <Tab title="To Deliver" />
    <Tab title="Shipping" />
  </TabBar>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  containerList: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  innerList: {
    flexDirection: "row",
  },
  textList: {
    flexDirection: "column",
    marginBottom: 12,
  },
  buttonContain: {
    flex: 1,
    flexDirection: "row",
    minHeight: 80,
    justifyContent: "space-around",
    marginBottom: 32,
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
    paddingVertical: 12,
  },
  field: {
    marginVertical: 10,
  },
  buttonGroup: {
    alignSelf: "center",
  },
  button: {
    margin: 2,
    elevation: 5,
    shadowColor: "rgb(255,255,255)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    borderColor: "rgb(220,220,220)",
  },
});

export default OrderStatusScreen;
