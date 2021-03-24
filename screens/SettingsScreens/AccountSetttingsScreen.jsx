import React, { useState } from "react";
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
import { createUser, createUserProfile } from "../../services/users";
import PopUpMessage from "../../components/PopUpMessage";
import { Input } from "@ui-kitten/components";

function AccountSetttingsScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  return (
    <Layout style={styles.container}>
      <Text
        style={{
          fontFamily: "NunitoSans-Bold",
          fontSize: 16,
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}
      >
        Account ID
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
        Username
      </Text>
      <Input
        onChangeText={(value) => setUsername(value)}
        placeholder="Username"
        style={{ paddingHorizontal: 16 }}
      />
      <Text
        category="s1"
        style={{
          paddingHorizontal: 16,
          paddingVertical: 6,
          fontFamily: "NunitoSans-Regular",
        }}
      >
        Email
      </Text>
      <Input
        onChangeText={(value) => setEmail(value)}
        placeholder="Email"
        style={{ paddingHorizontal: 16 }}
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
        Change Password
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
        Password
      </Text>
      <Input
        onChangeText={(value) => setPassword(value)}
        placeholder="Password"
        secureTextEntry={true}
        style={{ paddingHorizontal: 16 }}
      />
      <Text
        category="s1"
        style={{
          paddingHorizontal: 16,
          paddingVertical: 6,
          fontFamily: "NunitoSans-Regular",
        }}
      >
        Retype Password
      </Text>
      <Input
        onChangeText={(value) => setConfirmPass(value)}
        placeholder="Retype Password"
        secureTextEntry={true}
        style={{ paddingHorizontal: 16, marginBottom: 16 }}
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
            createUser(email, password, setMessage, (uid) => {
              createUserProfile(
                {
                  firstName,
                  lastName,
                  contactNumber,
                  address,
                },
                navigation
              );
            });
          } else {
            setMessage("Credentials provided is not valid");
          }
        }}
        style={{
          marginLeft: 16,
          marginRight: 16,
          marginTop: 24,
          marginBottom: 24,
        }}
      >
        Submit
      </Button>
      {message == "" ? null : <PopUpMessage message={message} />}
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

export default AccountSetttingsScreen;
