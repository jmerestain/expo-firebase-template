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
  ORDER_TO_RATE,
  ORDER_COMPLETED,
} from "../orderStatuses";
import { getCurrentUserFromUID } from "../../services/users";
import { postReview } from "../../services/reviews";
import { Rating } from "react-native-elements";
import LoadingModal from "../../components/LoadingModal";
import MessageComponent from "../../components/MessageComponent";
import Modal from "react-native-modal";
{
  /*import RatingScreen from './RatingScreen';

const RatingNav = createStackNavigator();

const RatingsScreens = () => (
  <RatingNav.Navigator screenOptions={{
      headerStyle: {
          backgroundColor: 'rgb(138,18,20)',
      }
  }}>
      <RatingNav.Screen name="Rate Order" component={RatingScreen} 
      options={showHeader} />
  </RatingNav.Navigator>
)
 */
}

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
              style={{
                alignContent: "center",
                marginTop: 8,
                marginBottom: 2,
                fontSize: 16,
                fontFamily: "NunitoSans-Bold",
              }}
            >
              {item.product.title}
            </Text>
            <Text
              category="s2"
              style={{
                alignContent: "center",
                marginVertical: 2,
                color: "#000000",
              }}
            >
              P{item.product.price}
            </Text>
            <Text
              category="s2"
              style={{
                fontFamily: "NunitoSans-Regular",
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
                fontFamily: "NunitoSans-Regular",
                alignContent: "center",
                marginVertical: 1,
                color: "rgb(128, 128, 128)",
              }}
            >
              {item.product.vendor}
            </Text>
          </Layout>
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
              style={{
                alignContent: "center",
                marginTop: 8,
                marginBottom: 2,
                fontSize: 16,
                fontFamily: "NunitoSans-Bold",
              }}
            >
              {item.product.title}
            </Text>
            <Text
              category="s2"
              style={{
                alignContent: "center",
                marginVertical: 2,
                color: "#000000",
              }}
            >
              P{item.product.price}
            </Text>
            <Text
              category="s2"
              style={{
                fontFamily: "NunitoSans-Regular",
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
                fontFamily: "NunitoSans-Regular",
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
                fontFamily: "NunitoSans-Regular",
                alignContent: "center",
                marginVertical: 1,
                color: "rgb(128, 128, 128)",
              }}
            >
              Expected delivery by {item.deliveryDate}
            </Text>
          </Layout>
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
              style={{
                alignContent: "center",
                marginTop: 8,
                marginBottom: 2,
                fontSize: 16,
                fontFamily: "NunitoSans-Bold",
              }}
            >
              {item.product.title}
            </Text>
            <Text
              category="s2"
              style={{
                alignContent: "center",
                marginVertical: 2,
                color: "#000000",
              }}
            >
              P{item.product.price}
            </Text>
            <Text
              category="s2"
              style={{
                fontFamily: "NunitoSans-Regular",
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
                fontFamily: "NunitoSans-Regular",
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
          <Button
            size="small"
            style={{
              alignSelf: "flex-end",
              marginVertical: 8,
              marginRight: 16,
            }}
            onPress={() => {
              updateOrderStatus(item.id, ORDER_TO_RATE, () => {});
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

const renderItemRate = ({ item, index, setModalVisible, setOrderToRate }) => (
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
              style={{
                alignContent: "center",
                marginTop: 8,
                marginBottom: 2,
                fontSize: 16,
                fontFamily: "NunitoSans-Bold",
              }}
            >
              {item.product.title}
            </Text>
            <Text
              category="s2"
              style={{
                alignContent: "center",
                marginVertical: 2,
                color: "#000000",
              }}
            >
              P{item.product.price}
            </Text>
            <Text
              category="s2"
              style={{
                fontFamily: "NunitoSans-Regular",
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
                fontFamily: "NunitoSans-Regular",
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
          <Button
            size="small"
            style={{
              alignSelf: "flex-end",
              marginVertical: 8,
              marginRight: 16,
            }}
            onPress={() => {
              setOrderToRate(item);
              setModalVisible(true);
            }}
          >
            Rate Order
          </Button>
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

  const [filteredToProcessOrders, setFilteredToProcessOrders] = useState([]);
  const [filteredToDeliverOrders, setFilteredToDeliverOrders] = useState([]);
  const [filteredToReceiveOrders, setFilteredToReceiveOrders] = useState([]);
  const [filteredToReviewOrders, setFilteredToReviewOrders] = useState([]);

  const [profile, setProfile] = useState({});
  const [query, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [orderToRate, setOrderToRate] = useState({});
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("Successful!");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const unsubscribeToPay = getOrdersCurrentUser(
      ORDER_TO_PAY,
      setToProcessOrders
    );
    const unsubscribeToShip = getOrdersCurrentUser(
      ORDER_TO_SHIP,
      setToDeliverOrders
    );
    const unsubscribeToReceive = getOrdersCurrentUser(
      ORDER_TO_RECEIVE,
      setToReceiveOrders
    );
    const unsubscribeCompleted = getOrdersCurrentUser(
      ORDER_TO_RATE,
      setToReviewOrders
    );

    return function cleanup() {
      unsubscribeToPay();
      unsubscribeToShip();
      unsubscribeToReceive();
      unsubscribeCompleted();
    };
  }, []);

  useEffect(() => {
    getCurrentUserFromUID(setProfile);
  }, []);

  const userName = profile.firstName + " " + profile.lastName;

  useEffect(() => {
    setFilteredToProcessOrders(toProcessOrders);
  }, [toProcessOrders]);

  useEffect(() => {
    setFilteredToDeliverOrders(toDeliverOrders);
  }, [toDeliverOrders]);

  useEffect(() => {
    setFilteredToReceiveOrders(toReceiveOrders);
  }, [toReceiveOrders]);

  useEffect(() => {
    setFilteredToReviewOrders(toReviewOrders);
  }, [toReviewOrders]);

  useEffect(() => {
    const lowercaseQuery = query.toLowerCase();
    setFilteredToProcessOrders(
      toProcessOrders.filter(
        (order) =>
          order.product &&
          (order.product.title.toLowerCase().includes(lowercaseQuery) ||
            order.product.vendor.toLowerCase().includes(lowercaseQuery))
      )
    );
    setFilteredToDeliverOrders(
      toDeliverOrders.filter(
        (order) =>
          order.product &&
          (order.product.title.toLowerCase().includes(lowercaseQuery) ||
            order.product.vendor.toLowerCase().includes(lowercaseQuery))
      )
    );
    setFilteredToReceiveOrders(
      toReceiveOrders.filter(
        (order) =>
          order.product &&
          (order.product.title.toLowerCase().includes(lowercaseQuery) ||
            order.product.vendor.toLowerCase().includes(lowercaseQuery))
      )
    );
    setFilteredToReviewOrders(
      toReviewOrders.filter(
        (order) =>
          order.product &&
          (order.product.title.toLowerCase().includes(lowercaseQuery) ||
            order.product.vendor.toLowerCase().includes(lowercaseQuery))
      )
    );
  }, [query]);

  return (
    <Layout style={styles.container}>
      <LoadingModal loading={loading} />
      <Input
        onChangeText={(value) => setSearch(value)}
        placeholder="Search here"
        style={{ paddingHorizontal: 16, paddingVertical: 12 }}
        accessoryLeft={SearchIcon}
      />
      <MessageComponent
        message={message}
        setMessage={setMessage}
        visible={visible}
        setVisible={setVisible}
      />
      <NavigationContainer independent="true">
        <StatusTabNavigation
          route={route}
          toProcessOrders={filteredToProcessOrders}
          toDeliverOrders={filteredToDeliverOrders}
          toReceiveOrders={filteredToReceiveOrders}
          toReviewOrders={filteredToReviewOrders}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setLoading={setLoading}
          userName={userName}
          setOrderToRate={setOrderToRate}
          orderToRate={orderToRate}
          setMessage={setMessage}
          message={message}
          setVisible={setVisible}
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
  modalVisible,
  setModalVisible,
  setLoading,
  userName,
  orderToRate,
  setOrderToRate,
  message,
  setMessage,
  setVisible,
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
        {(props) => (
          <ToRateNav
            {...props}
            data={toReviewOrders}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            setLoading={setLoading}
            userName={userName}
            orderToRate={orderToRate}
            setOrderToRate={setOrderToRate}
            message={message}
            setMessage={setMessage}
            setVisible={setVisible}
          />
        )}
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

const ToRateNav = ({
  data,
  modalVisible,
  setModalVisible,
  setLoading,
  userName,
  orderToRate,
  setOrderToRate,
  message,
  setMessage,
  setVisible,
}) => {
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState("");

  return (
    <Layout style={styles.container}>
      <Layout style={[styles.settingsCard]}>
        <Layout style={styles.inner}>
          <Layout style={{ justifyContent: "flex-start" }}>
            <List
              data={data}
              renderItem={(props) =>
                renderItemRate({ ...props, setModalVisible, setOrderToRate })
              }
            />
          </Layout>
        </Layout>
      </Layout>
      <Layout style={styles.centeredView}>
        <Modal
          style={{ margin: 0 }}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <Layout style={styles.modalView}>
            <Text
              category="s1"
              style={{
                fontSize: 17,
                color: "#8A1214",
                paddingVertical: 16,
                textAlign: "center",
              }}
            >
              Rating Product from Seller
            </Text>
            <Layout
              style={{ alignItems: "left", justifyContent: "center" }}
              flexDirection="center"
            >
              <Layout>
                <Text style={{ textAlign: "left" }}>Rating</Text>
                <Rating
                  type="custom"
                  style={{ paddingBottom: 16, paddingTop: 8 }}
                  ratingColor="rgb(210,145,91)"
                  imageSize={24}
                  onFinishRating={setRating}
                />
              </Layout>
              <Text>Additional Comments</Text>
              <Input
                style={{ paddingTop: 8 }}
                placeholder="Enter comments on the product here"
                onChangeText={setComments}
              ></Input>
            </Layout>
            <Button
              appearance="primary"
              onPress={() => {
                setModalVisible(false);
                setLoading(true);
                postReview(
                  orderToRate.product.vendorId,
                  orderToRate.product.id,
                  { rating, comments, userName },
                  (callbackMessage) => {
                    if (callbackMessage == "Successfully rated the product!") {
                      updateOrderStatus(orderToRate.id, ORDER_COMPLETED, (arg) => {
                        setLoading(false);
                        if(typeof arg == "string") {
                          setMessage("Error in rating the product!");
                          setVisible(true);
                        }
                        else {
                          setMessage("Successfully rated the product!");
                          setVisible(true);
                        }
                        // navigation.goBack();
                      });
                    }
                    else {
                      setLoading(false);
                      setMessage(callbackMessage);
                      setVisible(true);
                    }
                  }
                );
              }}
              style={{ marginTop: 20 }}
            >
              Rate Now
            </Button>
            <Button
              appearance="ghost"
              onPress={() => setModalVisible(!modalVisible)}
              style={{ marginTop: 4 }}
            >
              Cancel
            </Button>
          </Layout>
        </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#00000080",
    alignContent: "stretch",
    textAlign: "center",
    paddingHorizontal: 16,
  },
  containerList: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  innerList: {
    flexDirection: "row",
    marginBottom: 8,
  },
  textList: {
    flexDirection: "column",
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
    marginVertical: 1,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: "stretch",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  daInner: {
    marginHorizontal: 20,
    backgroundColor: "transparent",
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
