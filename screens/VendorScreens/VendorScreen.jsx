import React, { useState, useEffect } from "react";
import {
  Layout,
  Button,
  Text,
  List,
  Card,
  Avatar,
} from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { getCurrentUserFromUID } from "../../services/users";
import { getMyStore } from "../../services/products";
import { createStackNavigator } from "@react-navigation/stack";

const ManageNav = createStackNavigator();

const VendorScreen = ({ route, navigation, vendorStatus }) => {
  const [user, setUser] = useState(null);
  const [myProducts, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUserFromUID(setUser);
  }, []);

  // useEffect(() => {
  //   getMyStore(user, setProducts);
  // }, [user]);

  console.log(user);

  return (
    <Layout style={styles.container}>
      {/*<Layout style={styles.field}>
                <List data={myProducts} renderItem={RenderItem} />
            </Layout>*/}
      <Layout>
        <Layout style={styles.avatar}>
          <Avatar
            rounded
            size="giant"
            shape="round"
            source={
              (user && user.avatarUrl)
                ? { uri: user.avatarUrl }
                : require("../../screens/avatar-icon.png")
            }
            style={{
              marginHorizontal: 50,
              width: 80,
              height: 80,
              alignItems: "center",
            }}
          />
        </Layout>
        <Button
          size="large"
          onPress={() => {
            navigation.navigate("My Account");
          }}
          style={{ marginHorizontal: 32, marginVertical: 8 }}
        >
          My Account
        </Button>
        <Button
          size="large"
          onPress={() => {
            if (vendorStatus == "approved") {
              navigation.navigate("My Shop");
            } else {
              navigation.navigate("Build My Shop", { vendorStatus });
            }
          }}
          style={{ marginHorizontal: 32, marginVertical: 8 }}
        >
          My Shop
        </Button>
        <Button
          size="large"
          onPress={() => {
            navigation.navigate("Settings");
          }}
          style={{ marginHorizontal: 32, marginVertical: 8 }}
        >
          Settings
        </Button>
        {/* <Button
          size="large"
          onPress={() => {
            navigation.navigate("Vendor Application");
          }}
          style={{ marginHorizontal: 32, marginVertical: 8 }}
        >
          Vendor App
        </Button>*/}
        <Button
          size="large"
          onPress={() => {
            navigation.navigate("Manage Products");
          }}
          style={{
            marginHorizontal: 32,
            marginVertical: 8,
            backgroundColor: "rgb(210,145,91)",
            borderColor: "rgb(210,145,91)",
          }}
        >
          Manage Products
        </Button>

        {/*<Button
          size="large"
          onPress={() => {
            navigation.navigate("Product");
          }}
          style={{
            marginHorizontal: 32,
            marginVertical: 8,
            backgroundColor: "rgb(210,145,91)",
            borderColor: "rgb(210,145,91)",
          }}
        >
          Product Screen Sample
        </Button> */}
      </Layout>
    </Layout>
  );
};

const RenderItem = ({ item }) => {
  const { title, description, price } = item;
  return (
    <Card>
      <Text category="h4">{title}</Text>
      <Text>{description}</Text>
      <Text>{price}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  avatar: {
    alignItems: "center",
    margin: 16,
  },
  text: {
    textAlign: "center",
    fontSize: 35,
    marginVertical: 20,
  },
  buttonGroup: {
    alignSelf: "center",
    marginVertical: 20,
  },
  userMessage: {
    padding: 30,
    elevation: 2,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  loading: {
    alignSelf: "center",
  },
});

export default VendorScreen;
