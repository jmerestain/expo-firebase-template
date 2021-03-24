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
import { getCurrentUserFromUID } from "../services/users";
import { getShopDetailsByUID } from "../services/vendor";
import {
  getOrdersCurrentUserPerVendor,
  updateMultipleOrderStatus,
} from "../services/orders";
import { sendMessage, startChat } from "../services/messages";
import { ORDER_IN_CART, ORDER_PENDING } from "./orderStatuses";
import DateTimePicker from "@react-native-community/datetimepicker";
import DeliveryAddress from "./SettingsScreens/AddressSettingsScreen";

const dateToString = (date) => {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  return month + "/" + day + "/" + year;
};

const renderItem = ({ item, index }) => (
  <Layout style={styles.innerList}>
    <Image
      style={{ resizeMode: "cover", height: 80, width: '20%' }}
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
            flex: 1,
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
    </Layout>
  </Layout>
);

function OrdersIndividualScreen({ route, navigation }) {
  return (
    <Layout style={styles.container}>
      <DeliverAddress navigation={navigation} route={route} />
      <Layout style={styles.inner}>
        <Layout style={styles.field}>
          <Text category="label"></Text>
        </Layout>
      </Layout>
    </Layout>
  );
}

const DeliverAddress = ({ route, navigation }) => {
  const [orders, setOrders] = useState([]);
  const [profile, setProfile] = useState([]);
  const [vendor, setVendor] = useState({});
  const [modeOfPayment, setModeOfPayment] = useState("");
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const vendorId = route.params.vendorId;

  useEffect(() => {
    const unsubscribe = getOrdersCurrentUserPerVendor(ORDER_IN_CART, vendorId, setOrders);

    return function cleanup() {
      unsubscribe();
    }
  }, []);

  useEffect(() => {
    getCurrentUserFromUID(setProfile);
  }, []);

  useEffect(() => {
    getShopDetailsByUID(vendorId, setVendor);
  }, []);

  const vendorName = vendor.name;
  const userName = profile.firstName + " " + profile.lastName;

  const totalPrice = orders.reduce(
    (acc, curr) => acc + curr.product.price * curr.quantity,
    0
  );

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || deliveryDate;
    setDeliveryDate(currentDate);
  };

  const placeOrderCallback = (event) => {
    const navigateCallback = (chatroomId) =>
      navigation.navigate("Inbox", {
        params: {
          chatId: chatroomId,
          recipient: vendor.name,
          recipientId: vendor.id,
        },
        screen: "Chat",
      });

    const sendMessageCallback = (chatroomId) => {
      const messageDetails = {
        _id: orders.join("+"),
        createdAt: new Date(),
        text: `Hi, I placed an order! Here are the details:\n\nOrder Summary:\n${orders.reduce(
          (acc, curr) => acc + `${curr.product.title}, x${curr.quantity}\n`,
          ""
        )}\nDelivery Date: ${dateToString(deliveryDate)}\nMode of Payment: ${
          modeOfPayment || "COD"
        }
        `,
      };
      sendMessage(vendorId, messageDetails, chatroomId, navigateCallback);
    };

    const orderIds = orders.map((order) => order.id);
    updateMultipleOrderStatus(
      orderIds,
      { status: ORDER_PENDING, deliveryDate },
      startChat(vendorId, vendorName, userName, true, sendMessageCallback)
    );
  };

  return (
    <ScrollView>
      <Layout>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Delivery Address");
        }}
        >
          <Layout style={[styles.deliverAddress]}>
            <Layout style={styles.daInner}>
              <Layout
                style={{
                  flexDirection: "row",
                  paddingVertical: 10,
                  justifyContent: "space-between",
                }}
              >
                <Layout
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    backgroundColor: "transparent",
                    
                  }}
                >
                  <Icon
                    name="map-outline"
                    fill="#8A1214"
                    style={{ height: 32, width: 32, marginRight: 10 }}
                  />
                  <Layout
                    style={{
                      backgroundColor: "transparent",
                      flexDirection: "column",
                      flexShrink: 1,
                    }}
                  >
                    <Text category="s1" style={{ fontWeight: "bold", marginBottom: 4 }}>
                      Delivery Address
                    </Text>
                    <Text category="p2">
                      {profile.firstName} {profile.lastName} |{" "}
                      {profile.contactNumber}
                    </Text>
                    <Text
                      category="p2"
                      style={{
                        alignSelf: "baseline",
                        marginTop: 4,
                        flexWrap: "wrap",
                      }}
                    >
                      {profile.address}
                    </Text>
                  </Layout>
                </Layout>
                <Icon
                  name="chevron-right"
                  fill="#8A1214"
                  style={{ height: 26, width: 26 }}
                />
              </Layout>
            </Layout>
          </Layout>
        </TouchableOpacity>
        <Layout>
          <Layout style={styles.header}>
            <Text category="h6" style={styles.headerText}>
              Items in Cart
            </Text>
          </Layout>
          <Layout style={[styles.settingsCard]}>
            <Layout style={styles.inner}>
              <Layout style={{ justifyContent: "flex-start" }}>
                <List data={orders} renderItem={renderItem} />
              </Layout>
            </Layout>
            <Layout>
              <Layout style={styles.header}>
                <Text category="h6" style={styles.headerText}>
                  Shipping Options
                </Text>
              </Layout>
              {/* <Layout
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 24,
                  alignItems: "center",
                  paddingVertical: 12,
                }}
              >
                <Text category="s1">Fastbreak</Text>
                <Layout style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text category="s1">P50</Text>
                  <Icon
                    name="chevron-right"
                    fill="#8A1214"
                    style={{ height: 26, width: 26 }}
                  />
                </Layout>
              </Layout> */}
              <Divider />
              <Layout
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 24,
                  alignItems: "center",
                  paddingVertical: 12,
                }}
              >
                <Text category="s1">Delivery Date</Text>
                <TouchableOpacity onPress={() => setShow(true)}>
                  <Layout
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={deliveryDate}
                      mode="date"
                      is24Hour={true}
                      minimumDate={new Date()}
                      display="default"
                      onChange={onDateChange}
                      style={{ width: 80 }}
                    />
                    <Icon
                      name="chevron-right"
                      fill="#8A1214"
                      style={{ height: 26, width: 26 }}
                    />
                  </Layout>
                </TouchableOpacity>
              </Layout>
              <Divider />

              {/* <Layout
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 24,
                  alignItems: "center",
                  paddingVertical: 12,
                }}
              >
                <Text category="s1">Message</Text>
                <Layout style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text category="p2" style={{ color: "rgb(189,189,189)" }}>
                    Please leave a message...
                  </Text>
                </Layout>
              </Layout>
              <Divider /> */}

              {/* <Layout
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 24,
                  alignItems: "center",
                  paddingVertical: 12,
                }}
              >
                <Text category="s1">Applied Discount Code</Text>
                <Layout style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text category="s1">BILINE50</Text>
                  <Icon
                    name="chevron-right"
                    fill="#8A1214"
                    style={{ height: 26, width: 26 }}
                  />
                </Layout>
              </Layout>
              <Divider /> */}

              {/* <Layout
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 24,
                  alignItems: "center",
                  paddingVertical: 12,
                }}
              >
                <Text category="s1">Payment Options</Text>
                <Layout style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text category="s1">Gcash</Text>
                  <Icon
                    name="chevron-right"
                    fill="#8A1214"
                    style={{ height: 26, width: 26 }}
                  />
                </Layout>
              </Layout>
              <Divider /> */}
              {/* <Layout
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 24,
                  alignItems: "center",
                  paddingVertical: 6,
                }}
              >
                <Text category="p2" style={{ color: "rgb(189,189,189)" }}>
                  Product Subtotal
                </Text>
                <Layout style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text category="p2" style={{ color: "rgb(189,189,189)" }}>
                    P{totalPrice}
                  </Text>
                </Layout>
              </Layout> */}
              {/* <Layout
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingLeft: 24,
                  paddingRight: 24,
                  alignItems: "center",
                  paddingVertical: 6,
                }}
              >
                <Text category="p2" style={{ color: "rgb(189,189,189)" }}>
                  Delivery Subtotal
                </Text>
                <Layout style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text category="p2" style={{ color: "rgb(189,189,189)" }}>
                    P50
                  </Text>
                </Layout>
              </Layout> */}
              {/* <Layout
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingLeft: 24,
                  paddingRight: 24,
                  alignItems: "center",
                  paddingVertical: 6,
                }}
              >
                <Text category="p2" style={{ color: "rgb(189,189,189)" }}>
                  Discount Code
                </Text>
                <Layout style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text category="p2" style={{ color: "rgb(189,189,189)" }}>
                    P50
                  </Text>
                </Layout>
              </Layout> */}
              <Divider />
              <Layout
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 24,
                  alignItems: "center",
                  paddingVertical: 12,
                }}
              >
                <Text category="s1">Order Total</Text>
                <Layout style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text category="s1">P{totalPrice}</Text>
                </Layout>
              </Layout>
              <Divider />
            </Layout>
            <Button
              size="large"
              style={{ backgroundColor: "rgb(210,145,91)",
              borderColor: "rgb(210,145,91)", marginTop: 24 }}
              onPress={placeOrderCallback}
            >
              Place Order
            </Button>
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
    paddingHorizontal: 20,
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
    width: '70%'
  },
  inner: {
    paddingVertical: 4,
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

export default OrdersIndividualScreen;
