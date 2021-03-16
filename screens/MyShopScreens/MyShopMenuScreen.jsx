import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  SectionList,
} from "react-native";
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
import OrderProcess from "./OrderProcessScreen";
import { getShopDetails } from "../../services/vendor";

const MyShopStack = createStackNavigator();

const MyShopScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [shopDetails, setShopDetails] = useState({ shop: {} });

  useEffect(() => {
    getShopDetails(setShopDetails);
  }, []);

  return (
    <Layout style={styles.container}>
      <Layout style={styles.inner}>
        <Layout style={{ alignSelf: "center", alignContent: "center" }}>
          <Avatar
            rounded
            size="giant"
            shape="round"
            source={require("../../screens/avatar-icon.png")}
            style={{
              marginHorizontal: 50,
              marginTop: 24,
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
            {shopDetails.shop.name}
          </Text>
        </Layout>
      </Layout>
      <Divider />
      <Layout style={styles.container}>
        <Layout style={[styles.settingsCard]}>
          <Layout style={styles.daInner}>
            <Layout style={styles.buttonContain}>
              <Layout>
                <Button appearance="ghost" size="large">
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      navigation.navigate("Pending Orders");
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
                  }}
                >
                  Pending Orders
                </Text>
              </Layout>
              <Layout>
                <Button appearance="ghost" size="large">
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      navigation.navigate("Completed Orders");
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
                  }}
                >
                  Completed Orders
                </Text>
              </Layout>
            </Layout>
            <Divider />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Preview Shop");
              }}
            >
              <Layout
                style={{
                  flexDirection: "row",
                  backgroundColor: "transparent",
                  justifyContent: "space-between",
                  marginVertical: 8,
                }}
              >
                <Text style={{ paddingTop: 2 }}>View My Shop</Text>
                <Icon
                  name="chevron-right"
                  fill="#8A1214"
                  style={{ height: 26, width: 26 }}
                />
              </Layout>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Layout
                style={{
                  flexDirection: "row",
                  backgroundColor: "transparent",
                  justifyContent: "space-between",
                  marginVertical: 8,
                }}
              >
                <Text style={{ paddingTop: 2 }}>View DTI Certificate</Text>
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
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Shop Settings");
              }}
            >
              <Layout
                style={{
                  flexDirection: "row",
                  backgroundColor: "transparent",
                  justifyContent: "space-between",
                  marginVertical: 8,
                }}
              >
                <Text style={{ paddingTop: 2 }}>Shop Settings</Text>
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
      <Layout style={styles.centeredView}>
        <Modal
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <Layout style={styles.centeredView}>
            <Layout style={styles.modalView}>
              <Image
                style={{ resizeMode: "contain", width: 240, height: 344 }}
                source={{ uri: shopDetails.DTICert }}
              />
              <Button
                appearance="outline"
                onPress={() => setModalVisible(!modalVisible)}
                style={{ marginTop: 12 }}
              >
                Back to Shop
              </Button>
            </Layout>
          </Layout>
        </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
  buttonContain: {
    flex: 1,
    flexDirection: "row",
    minHeight: 80,
    justifyContent: "space-around",
    marginTop: 4,
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
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 999,
  },
});

export default MyShopScreen;
