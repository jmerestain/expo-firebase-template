import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  SectionList,
  ScrollView,
} from "react-native";
import {
  Layout,
  Text,
  Button,
  Icon,
  List,
  Divider,
  Avatar,
} from "@ui-kitten/components";
import { createStackNavigator } from "@react-navigation/stack";
import OrdersIndividualScreen from "./OrdersIndividualScreen";
import { getOrdersCurrentUser } from "../services/orders";
import _ from "lodash";
import { ORDER_IN_CART } from "./orderStatuses";
import EmptyState from "@freakycoder/react-native-empty-state";
import OrderAddressScreen from "./OrderAddressScreen";

const OStack = createStackNavigator();

const emptyStateImage = () => {
  <Image
      source={require("../assets/empty-image.png")}
      style={styles.categoryImage}
  />
}

const OrdersScreenNavigator = () => (
  <OStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: "rgb(138,18,20)" },
    }}
  >
    <OStack.Screen name="Pending Orders" component={OrdersScreen} />
    <OStack.Screen name="Individual Order" component={OrdersIndividualScreen} />
    <OStack.Screen
      name="Delivery Information"
      component={OrderAddressScreen}
    />
  </OStack.Navigator>
);

const renderIndivItem = ({ item }) => (
  <Layout style={styles.innerList}>
    <Image
      style={{ resizeMode: "cover", height: 60, width: 60, marginHorizontal: 18, borderRadius: 4  }}
      source={{ uri: item.imageUrl }}
    />
    <Layout style={styles.textList}>
      <Layout
        style={{
          paddingHorizontal: 8,
          shadowRadius: 1,
          borderColor: "rgb(220,220,220)",
          marginVertical: 8,
        }}
      >
        <Text
          category="s1"
          style={{ fontFamily: "NunitoSans-Bold", alignContent: "center", marginTop: 4 }}
        >
          {item.product.title}
        </Text>
        <Text
          category="s2"
          style={{
            alignContent: "center",
            fontFamily: "NunitoSans-Bold", 
            marginVertical: 3,
            color: "rgb(128, 128, 128)",
          }}
        >
          P{item.product.price}
        </Text>
        <Layout
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Layout>
          <Text
            category="s2"
            style={{
              alignContent: "center",
              fontFamily: "NunitoSans-Regular", 
              marginBottom: 3,
              color: "rgb(128, 128, 128)",
            }}
          >
            x{item.quantity}
          </Text>
          </Layout>
          <Layout style={{alignItems:"flex-end"}}>
          <Text
            category="s2"
            style={{
              alignContent: "flex-end",
              fontFamily: "NunitoSans-Regular", 
              marginBottom: 3,
              color: "rgb(128, 128, 128)",
            }}
          >
            Subtotal: P{item.product.price * item.quantity}
          </Text>
          </Layout>
        </Layout>
      </Layout>
      <Divider />
    </Layout>
  </Layout>
);

const renderVendorItem = ({ item, index, navigation }) => (
  <Layout style={styles.container}>
    <Layout style={styles.inner}>
      <Layout style={styles.header}>
        <Text category="s1" style={styles.headerText}>
          {item.vendor}
        </Text>
      </Layout>
      <Layout style={styles.containerList}>
        <List data={item.orders} renderItem={renderIndivItem} />
        <Divider />
        <Layout
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 12,
          }}
        >
          <Button
            size="medium"
            onPress={() =>
              navigation.navigate("Individual Order", {
                vendorId: item.vendorId,
              })
            }
          >
            View Order
          </Button>
          <Layout>
            <Text
              category="s1"
              style={{
                alignContent: "center",
                marginVertical: 1,
                textAlign: "right",
                marginRight: 18,
              }}
            >
              Order Total: P{item.totalPrice}
            </Text>
            <Text
              category="s1"
              style={{
                alignContent: "center",
                marginVertical: 1,
                textAlign: "right",
                marginRight: 18,
              }}
            >
              {item.status}
            </Text>
          </Layout>
        </Layout>
        <Divider />
      </Layout>
    </Layout>
  </Layout>
);

function OrdersScreen({ navigation }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = getOrdersCurrentUser(
      ORDER_IN_CART,
      groupOrdersByVendor
    );
    return function cleanup() {
      unsubscribe();
    };
  }, []);

  const groupOrdersByVendor = (orders) => {
    let groupedOrders = _.groupBy(orders, (order) => order.product.vendor);
    groupedOrders = Object.entries(groupedOrders).map(([key, val]) => ({
      orders: val,
      vendor: key,
      vendorId: val[0].product.vendorId,
      totalPrice: val.reduce(
        (acc, curr) => acc + curr.product.price * curr.quantity,
        0
      ),
    }));
    setOrders(groupedOrders);
  };

  return (
    <Layout style={styles.container}>
      {orders == 0 && <EmptyState
        style={{
          paddingHorizontal: 24,
          textAlign: "center",
          alignContent: "center",
        }}
        imageSource={emptyStateImage}
        title="Oops! Nothing in your bag yet."
        description="We have an array of Nueva Ecija goodies for you to choose from. View our catalogue now!"
        titleTextStyle={{ color: "#00000080" }}
      />}
      <DeliverAddress navigation={navigation} orders={orders} setOrders={setOrders} />
      <Layout style={styles.inner}>
        <Layout style={styles.field}>
          <Text category="label"></Text>
        </Layout>
      </Layout>
    </Layout>
  );
}

const DeliverAddress = ({ navigation, orders, setOrders }) => {
  return (
    <ScrollView>
      <Layout>
        <Layout>
          <Layout style={[styles.settingsCard]}>
            <Layout style={styles.inner}>
              <Layout style={{ justifyContent: "flex-start" }}>
                <List
                  data={orders}
                  renderItem={(props) =>
                    renderVendorItem({ navigation, ...props })
                  }
                />
              </Layout>
            </Layout>
          </Layout>
        </Layout>
      </Layout>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  header: {
    backgroundColor: "rgb(138,18,20)",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  headerText: {
    fontWeight: "500",
    color: "rgb(254,254,254)",
  },
  deliverAddress: {
    marginVertical: 10,
    backgroundColor: "rgb(252,252,252)",
    height: 120,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  daInner: {
    marginHorizontal: 20,
    backgroundColor: "rgb(252,252,252)",
  },
  innerList: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  textList: {
    flexDirection: "column",
    marginBottom: 12,
    width: "72%",
  },
  inner: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  field: {
    marginVertical: 10,
  },
  buttonGroup: {
    alignSelf: "center",
  },
  settingsCard: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
});

export default OrdersScreenNavigator;
