import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Layout, Input, Button, Text, Divider } from "@ui-kitten/components";
import { createUser, createUserProfile } from "../services/users";
import LoadingModal from "../components/LoadingModal";
import PopUpMessage from "../components/PopUpMessage";
import { ScrollView } from "react-native-gesture-handler";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [message, setMessage] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <ScrollView>
      <Layout style={styles.container}>
        <LoadingModal loading={loading} />
        <Text
          category="s1"
          style={{ paddingHorizontal: 16, paddingVertical: 6, fontFamily: "NunitoSans-Regular" }}
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
          style={{ paddingHorizontal: 16, paddingVertical: 6, fontFamily: "NunitoSans-Regular" }}
        >
          Email
        </Text>
        <Input
          onChangeText={(value) => setEmail(value)}
          placeholder="Email"
          style={{ paddingHorizontal: 16 }}
        />
        <Text
          category="s1"
          style={{ paddingHorizontal: 16, paddingVertical: 6, fontFamily: "NunitoSans-Regular" }}
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
          style={{ paddingHorizontal: 16, paddingVertical: 6, fontFamily: "NunitoSans-Regular" }}
        >
          Retype Password
        </Text>
        <Input
          onChangeText={(value) => setConfirmPass(value)}
          placeholder="Retype Password"
          secureTextEntry={true}
          style={{ paddingHorizontal: 16, marginBottom: 16 }}
        />
        <Divider style={{ marginHorizontal: 16, marginBottom: 8 }} />
        <Text
          category="s1"
          style={{ paddingHorizontal: 16, paddingVertical: 6, fontFamily: "NunitoSans-Regular" }}
        >
          First Name
        </Text>
        <Input
          onChangeText={(value) => setFirstName(value)}
          placeholder="First Name"
          style={{ paddingHorizontal: 16 }}
        />
        <Text
          category="s1"
          style={{ paddingHorizontal: 16, paddingVertical: 6, fontFamily: "NunitoSans-Regular" }}
        >
          Last Name
        </Text>
        <Input
          onChangeText={(value) => setLastName(value)}
          placeholder="Last Name"
          style={{ paddingHorizontal: 16 }}
        />
        <Text
          category="s1"
          style={{ paddingHorizontal: 16, paddingVertical: 6, fontFamily: "NunitoSans-Regular" }}
        >
          Contact Number
        </Text>
        <Input
          onChangeText={(value) => setContactNumber(value)}
          placeholder="+63 *** *** **** "
          keyboardType="phone-pad"
          style={{ paddingHorizontal: 16 }}
        />
        <Text
          category="s1"
          style={{ paddingHorizontal: 16, paddingVertical: 6, fontFamily: "NunitoSans-Regular" }}
        >
          Delivery Address
        </Text>
        <Input
          onChangeText={(value) => setAddress(value)}
          placeholder="Delivery Address"
          style={{ paddingHorizontal: 16 }}
        />
        <Button
          size="large"
          onPress={() => {
            if (
              confirmPass == password &&
              email != "" &&
              username != "" &&
              password != "" &&
              firstName != "" &&
              lastName != "" &&
              contactNumber != "" &&
              address != ""
            ) {
              setLoading(true);
              createUser(email, password, setMessage, (uid) => {
                createUserProfile(
                  {
                    firstName,
                    lastName,
                    contactNumber,
                    address,
                  },
                  () => setLoading(false)
                );
              });
            } else {
              setMessage("Credentials provided is not valid");
              setLoading(false);
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
        {/* <Text
          category="h6"
          style={{
            textAlign: "center",
            marginBottom: 8,
            fontFamily: "Quicksand-Regular",
          }}
        >
          OR
        </Text>
        <Button
          size="large"
          onPress={() => {}}
          style={{
            marginTop: 8,
            marginLeft: 16,
            marginRight: 16,
            backgroundColor: "rgb(255,255,255)",
            borderColor: "rgb(210,145,91)",
          }}
        >
          <Text style={{ color: "rgb(210,145,91)", fontWeight: "bold" }}>
            Signup with Facebook
          </Text>
        </Button>
        <Button
          size="large"
          onPress={() => {}}
          style={{
            marginTop: 8,
            marginLeft: 16,
            marginRight: 16,
            backgroundColor: "rgb(210,145,91)",
            borderColor: "rgb(210,145,91)",
          }}
        >
          Signup with Google
        </Button> */}
        <Layout
          style={{ flex: 1, flexDirection: "row", justifyContent: "center", paddingBottom: 20 }}
        >
          <Text
            category="s1"
            style={{
              textAlign: "center",
              marginTop: 16,
              fontFamily: "Quicksand-Regular",
              fontWeight: "bold",
            }}
          >
            Already have an account?
          </Text>
          <Layout>
            <Button
              appearance="ghost"
              size="small"
              style={{ textAlign: "center", marginTop: 7 }}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text
                category="s1"
                style={{
                  marginLeft: 4,
                  fontFamily: "Quicksand-Regular",
                  color: "rgb(138,18,20)",
                }}
              >
                Login
              </Text>
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
    justifyContent: "center",
    paddingVertical: 20,
  },
});

export default RegisterScreen;
