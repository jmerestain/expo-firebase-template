import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Layout, Input, Button, Text } from "@ui-kitten/components";
//import { createUser } from "./services/users";
import PopUpMessage from "./components/PopUpMessage";

const SettingsDeliveryAddress = ({ navigation }) => {
  const [address, setAddress] = useState("");

  return (
    <Layout style={styles.container}>
      <Text
        category="h6"
        style={{ padding: 16, fontFamily: "NunitoSans-Regular" }}
      >
        Delivery Address
      </Text>
      <Input
        onChangeText={(value) => setAddress(value)}
        placeholder="Shipping Address"
        style={{ paddingHorizontal: 16 }}
      />
      <Button
        size="large"
        onPress={() => {
          if (address != "") {
            {
              /*createUser(
              address,
              setMessage,
              navigation
            );*/
            }
          } else {
            setMessage("Address field is empty");
          }
        }}
        style={{ marginLeft: 16, marginRight: 16, marginTop: 24 }}
      >
        Change Delivery Address
      </Button>
      <Button
        size="large"
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          marginLeft: 16,
          marginRight: 16,
          marginTop: 8,
          backgroundColor: "rgb(255,255,255)",
          borderColor: "rgb(138,18,20)",
        }}
      >
        <Text style={{ color: "rgb(138,18,20)", fontWeight: "bold" }}>
          Back to Settings
        </Text>
      </Button>
      {message == "" ? null : <PopUpMessage message={message} />}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default SettingsDeliveryAddress;
