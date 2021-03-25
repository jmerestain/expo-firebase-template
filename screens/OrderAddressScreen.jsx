import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  SectionList,
} from "react-native";
import {
  Layout,
  Text,
  Button,
  Icon,
  Divider,
  Toggle,
} from "@ui-kitten/components";
import { updateUserProfile, getCurrentUserFromUID } from "../services/users";
import PopUpMessage from "../components/PopUpMessage";
import { Input } from "@ui-kitten/components";

function OrderAddressScreen({ navigation, route }) {
  const [firstName, setFirstName] = useState(route.params.firstName);
  const [lastName, setLastName] = useState(route.params.lastName);
  const [contactNumber, setContactNumber] = useState(route.params.contactNumber);
  const [address, setAddress] = useState(route.params.address);
  const [message, setMessage] = useState("");

  //   useEffect(() => {
  //     const populateFields = (userProfile) => {
  //       setFirstName(userProfile.firstName);
  //       setLastName(userProfile.lastName);
  //       setContactNumber(userProfile.contactNumber);
  //       setAddress(userProfile.address);
  //     }

  //     getCurrentUserFromUID(populateFields);
  //   }, []);

  return (
    <Layout style={styles.container}>
      {message == "" ? null : <PopUpMessage message={message} />}
      <Text
        style={{
          fontFamily: "NunitoSans-Bold",
          fontSize: 16,
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}
      >
        Contact Details
      </Text>
      <Divider style={{ marginHorizontal: 16, marginBottom: 12 }} />
      <Text
        category="s1"
        style={{
          paddingHorizontal: 16,
          paddingVertical: 6,
          fontFamily: "NunitoSans-Regular",
        }}
      >
        First Name
      </Text>
      <Input
        onChangeText={(value) => setFirstName(value)}
        placeholder="First Name"
        style={{ paddingHorizontal: 16 }}
        defaultValue={firstName}
      />
      <Text
        category="s1"
        style={{
          paddingHorizontal: 16,
          paddingVertical: 6,
          fontFamily: "NunitoSans-Regular",
        }}
      >
        Last Name
      </Text>
      <Input
        onChangeText={(value) => setLastName(value)}
        placeholder="Last Name"
        style={{ paddingHorizontal: 16 }}
        defaultValue={lastName}
      />
      <Text
        category="s1"
        style={{
          paddingHorizontal: 16,
          paddingVertical: 6,
          fontFamily: "NunitoSans-Regular",
        }}
      >
        Contact Number
      </Text>
      <Input
        onChangeText={(value) => setContactNumber(value)}
        placeholder="+63 *** *** **** "
        keyboardType="phone-pad"
        style={{ paddingHorizontal: 16 }}
        defaultValue={contactNumber}
      />

      <Text
        style={{
          fontFamily: "NunitoSans-Bold",
          fontSize: 16,
          paddingHorizontal: 16,
          paddingVertical: 8,
          marginTop: 8,
        }}
      >
        Shipping Information
      </Text>
      <Divider style={{ marginHorizontal: 16, marginBottom: 12 }} />

      <Text
        category="s1"
        style={{
          paddingHorizontal: 16,
          paddingVertical: 6,
          fontFamily: "NunitoSans-Regular",
        }}
      >
        Delivery Address
      </Text>
      <Input
        onChangeText={(value) => setAddress(value)}
        placeholder="Delivery Address"
        style={{ paddingHorizontal: 16 }}
        defaultValue={address}
      />
      <Button
        size="large"
        onPress={() => {
          if (
            firstName != "" &&
            lastName != "" &&
            contactNumber != "" &&
            address != ""
          ) {
            const body = {
              firstName,
              lastName,
              contactNumber,
              address,
            };
            route.params.updateAfterGoBack(body);
            navigation.goBack();
          } else {
            setMessage("Incomplete details!");
          }
        }}
        style={{
          marginLeft: 16,
          marginRight: 16,
          marginTop: 24,
          marginBottom: 24,
        }}
      >
        Update Delivery Details
      </Button>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingTop: 24,
    paddingHorizontal: 12,
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
});

export default OrderAddressScreen;
