import React, { useState, useEffect } from "react";
import { StyleSheet, Image } from "react-native";
import { Layout, Input, Button, Text, Divider, Card, Avatar } from "@ui-kitten/components";
import { createUser, createUserProfile } from "../services/users";
import LoadingModal from "../components/LoadingModal";
import PopUpMessage from "../components/PopUpMessage";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";

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
  const [image, setImage] = useState(null);

  return (
    <ScrollView>
      <Layout style={styles.container}>
        <LoadingModal loading={loading} />
        <PreviewComponent
          image={image}
          setImage={setImage}
        />
        <Text
          category="s1"
          style={{ paddingHorizontal: 16, paddingVertical: 6, marginTop: 12, fontFamily: "NunitoSans-Regular" }}
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

const PreviewComponent = ({ setImage, setBlob, image }) => {
  return (
    <Layout style={styles.field}>
        <Avatar
          source={{ uri: image }}
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
            marginVertical: 5,
            alignSelf: "center",
            borderWidth: 1,
            borderColor: "#BDBDBD",
          }}
        />
        <ImagePickerComponent
          setImage={setImage}
          setBlob={setBlob}
          image={image}
        />
    </Layout>
  );
};

function ImagePickerComponent({ setImage, setBlob, image }) {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to add images");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      const response = await fetch(result.uri);
      const blob = await response.blob();
      setBlob(blob);
    }
  };

  return (
    <Layout style={{ flex: 1, justifyContent: "center", marginHorizontal: 5 }}>
      <Button onPress={pickImage} size="small" appearance="ghost" style={{ }}>
        {image != null ? "Change Avatar" : "Set Avatar"}
      </Button>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingVertical: 20,
  },
});

export default RegisterScreen;
