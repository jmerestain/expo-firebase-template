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
import { getOrdersCurrentUser, updateOrderStatus } from "../../services/orders";
import {
  ORDER_TO_PAY,
  ORDER_TO_SHIP,
  ORDER_TO_RECEIVE,
  ORDER_COMPLETED,
} from "../orderStatuses";

const StatusTab = createMaterialTopTabNavigator();

const SearchIcon = (props) => <Icon name="search-outline" {...props} />;

const renderItem = ({ item, index }) => (
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
              {item.product.title}
            </Text>
            <Text
              category="s2"
              style={{
                alignContent: "center",
                marginVertical: 1,
                color: "rgb(128, 128, 128)",
              }}
            >
              P{item.product.price}
            </Text>
            <Text
              category="s2"
              style={{
                alignContent: "center",
                marginVertical: 1,
                color: "rgb(128, 128, 128)",
              }}
            >
              x{item.quantity}
            </Text>
            <Text
              category="s2"
              style={{
                alignContent: "center",
                marginVertical: 1,
                color: "rgb(128, 128, 128)",
              }}
            >
              {item.product.vendor}
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
        </Layout>
      </Layout>
    </Layout>
    <Divider />
  </Layout>
);

const renderItemDeliver = ({ item, index }) => (
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
              {item.product.title}
            </Text>
            <Text
              category="s2"
              style={{
                alignContent: "center",
                marginVertical: 1,
                color: "rgb(128, 128, 128)",
              }}
            >
              P{item.product.price}
            </Text>
            <Text
              category="s2"
              style={{
                alignContent: "center",
                marginVertical: 1,
                color: "rgb(128, 128, 128)",
              }}
            >
              x{item.quantity}
            </Text>
            <Text
              category="s2"
              style={{
                alignContent: "center",
                marginVertical: 1,
                color: "rgb(128, 128, 128)",
              }}
            >
              {item.product.vendor}
            </Text>
            <Text
              category="s2"
              style={{
                alignContent: "center",
                marginVertical: 1,
                color: "rgb(128, 128, 128)",
              }}
            >
              Expected delivery by {item.deliverDate}
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
        </Layout>
      </Layout>
    </Layout>
    <Divider />
  </Layout>
);

const renderItemReceived = ({ item, index }) => (
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
              style={{
                alignContent: "center",
                marginVertical: 6,
                maxWidth: 200,
              }}
            >
              {item.product.title}
            </Text>
            <Text
              category="s2"
              style={{
                alignContent: "center",
                marginVertical: 1,
                color: "rgb(128, 128, 128)",
              }}
            >
              P{item.product.price}
            </Text>
            <Text
              category="s2"
              style={{
                alignContent: "center",
                marginVertical: 1,
                color: "rgb(128, 128, 128)",
              }}
            >
              x{item.quantity}
            </Text>
            <Text
              category="s2"
              style={{
                alignContent: "center",
                marginVertical: 1,
                color: "rgb(128, 128, 128)",
              }}
            >
              {item.product.vendor}
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
              updateOrderStatus(item.id, ORDER_COMPLETED, () => {});
            }}
          >
            Item Received
          </Button>
        </Layout>
      </Layout>
    </Layout>
    <Divider />
  </Layout>
);

const renderItemRate = ({ item, index }) => (
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
              style={{
                alignContent: "center",
                marginVertical: 6,
                maxWidth: 200,
              }}
            >
              {item.product.title}
            </Text>
            <Text
              category="s2"
              style={{
                alignContent: "center",
                marginVertical: 1,
                color: "rgb(128, 128, 128)",
              }}
            >
              P{item.product.price}
            </Text>
            <Text
              category="s2"
              style={{
                alignContent: "center",
                marginVertical: 1,
                color: "rgb(128, 128, 128)",
              }}
            >
              x{item.quantity}
            </Text>
            <Text
              category="s2"
              style={{
                alignContent: "center",
                marginVertical: 1,
                color: "rgb(128, 128, 128)",
              }}
            >
              {item.product.vendor}
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
          {/* <Button
            size="small"
            style={{
              alignSelf: "flex-end",
              marginVertical: 8,
              marginRight: 16,
            }}
          >
            Rate Order
          </Button> */}
        </Layout>
      </Layout>
    </Layout>
    <Divider />
  </Layout>
);

function OrderStatusScreen({ navigation, route }) {
  const [toProcessOrders, setToProcessOrders] = useState([]);
  const [toDeliverOrders, setToDeliverOrders] = useState([]);
  const [toReceiveOrders, setToReceiveOrders] = useState([]);
  const [toReviewOrders, setToReviewOrders] = useState([]);

  useEffect(() => {
    getOrdersCurrentUser(ORDER_TO_PAY, setToProcessOrders);
    getOrdersCurrentUser(ORDER_TO_SHIP, setToDeliverOrders);
    getOrdersCurrentUser(ORDER_TO_RECEIVE, setToReceiveOrders);
    getOrdersCurrentUser(ORDER_COMPLETED, setToReviewOrders);
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
        <StatusTabNavigation
          route={route}
          toProcessOrders={toProcessOrders}
          toDeliverOrders={toDeliverOrders}
          toReceiveOrders={toReceiveOrders}
          toReviewOrders={toReviewOrders}
        />
      </NavigationContainer>
    </Layout>
  );
}

const StatusTabNavigation = ({
  route,
  toProcessOrders,
  toDeliverOrders,
  toReceiveOrders,
  toReviewOrders,
}) => {
  return (
    <StatusTab.Navigator
      tabBar={(props) => <TopTabBar {...props} />}
      initialRouteName={route.params.initialScreen || "To Process"}
    >
      <StatusTab.Screen name="To Process">
        {(props) => <ToProcessNav {...props} data={toProcessOrders} />}
      </StatusTab.Screen>
      <StatusTab.Screen name="To Deliver">
        {(props) => <ToDeliverNav {...props} data={toDeliverOrders} />}
      </StatusTab.Screen>
      <StatusTab.Screen name="To Receive">
        {(props) => <ToReceiveNav {...props} data={toReceiveOrders} />}
      </StatusTab.Screen>
      <StatusTab.Screen name="To Review">
        {(props) => <ToRateNav {...props} data={toReviewOrders} />}
      </StatusTab.Screen>
    </StatusTab.Navigator>
  );
};

const ToProcessNav = ({ data }) => {
  return (
    <Layout style={[styles.settingsCard]}>
      <Layout style={styles.inner}>
        <Layout style={{ justifyContent: "flex-start" }}>
          <List data={data} renderItem={renderItem} />
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
          <List data={data} renderItem={renderItemDeliver} />
        </Layout>
      </Layout>
    </Layout>
  );
};

const ToReceiveNav = ({ data }) => {
  return (
    <Layout style={[styles.settingsCard]}>
      <Layout style={styles.inner}>
        <Layout style={{ justifyContent: "flex-start" }}>
          <List data={data} renderItem={renderItemReceived} />
        </Layout>
      </Layout>
    </Layout>
  );
};

const ToRateNav = ({ data }) => {
  return (
    <Layout style={[styles.settingsCard]}>
      <Layout style={styles.inner}>
        <Layout style={{ justifyContent: "flex-start" }}>
          <List data={data} renderItem={renderItemRate} />
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
    <Tab title="To Process" />
    <Tab title="To Deliver" />
    <Tab title="To Receive" />
    <Tab title="To Review" />
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
