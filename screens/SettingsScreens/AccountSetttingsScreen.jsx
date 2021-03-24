import React, { useState, useEffect } from "react";
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
import { updateUser, getCurrentUserFromUID } from "../../services/users";
import PopUpMessage from "../../components/PopUpMessage";
import { Input } from "@ui-kitten/components";

function AccountSetttingsScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const populateFields = (userProfile) => {
      setEmail(userProfile.email);
    };

    getCurrentUserFromUID(populateFields);
  }, []);

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
        Account ID
      </Text>
      <Divider style={{ marginHorizontal: 16, marginBottom: 12 }} />
      {/* <Text
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
      /> */}
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
        defaultValue={email}
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
          if (email != "" && password != "" && password == confirmPass) {
            updateUser({ email, password }, (message) =>
              setMessage(message)
            );
          } else {
            setMessage(
              "Please input your details correctly. Passwords may not have matched."
            );
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
