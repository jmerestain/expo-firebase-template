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

const OStack = createStackNavigator();

const OrdersScreenNavigator = () => (
  <OStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: "rgb(138,18,20)" },
    }}
  >
    <OStack.Screen name="All Orders" component={OrdersScreen} />
    <OStack.Screen name="Individual Order" component={OrdersIndividualScreen} />
  </OStack.Navigator>
);

const renderIndivItem = ({ item }) => (
  <Layout style={styles.innerList}>
    <Avatar
      rounded
      size="giant"
      source={require("../screens/avatar-icon.png")}
      style={{ marginHorizontal: 20, alignSelf: "center" }}
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
          category="h6"
          style={{ alignContent: "center", marginVertical: 6 }}
        >
          {item.product.title}
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
        <Layout
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
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
            x{item.quantity}
          </Text>
          <Text
            category="s2"
            style={{
              alignContent: "center",
              marginVertical: 3,
              color: "rgb(128, 128, 128)",
            }}
          >
            Subtotal: P{item.product.price * item.quantity}
          </Text>
        </Layout>
      </Layout>
    </Layout>
  </Layout>
);

const renderVendorItem = ({ item, index, navigation }) => (
  <Layout style={styles.container}>
    <Layout style={styles.inner}>
      <Layout style={styles.header}>
        <Text category="h6" style={styles.headerText}>
          {item.vendor}
        </Text>
      </Layout>
      <Layout style={styles.containerList}>
        <List
          data={item.orders}
          renderItem={renderIndivItem}
        />
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
              navigation.navigate("Individual Order", { vendorId: item.vendorId })
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
  return (
    <Layout style={styles.container}>
      <DeliverAddress navigation={navigation} />
      <Layout style={styles.inner}>
        <Layout style={styles.field}>
          <Text category="label"></Text>
        </Layout>
      </Layout>
    </Layout>
  );
}

const DeliverAddress = ({ navigation }) => {
  const [orders, setOrders] = useState([]);

  const groupOrdersByVendor = (orders) => {
    let groupedOrders = _.groupBy(orders, (order) => order.product.vendor);
    groupedOrders = Object.entries(groupedOrders).map(([key, val]) => ({
      orders: val,
      vendor: key,
      vendorId: val[0].product.vendorId,
      totalPrice: val.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0)
    }));
    setOrders(groupedOrders);
  };

  useEffect(() => {
    getOrdersCurrentUser(groupOrdersByVendor);
  }, []);

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
    paddingHorizontal: 24,
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
  },
  textList: {
    flexDirection: "column",
    marginBottom: 12,
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
