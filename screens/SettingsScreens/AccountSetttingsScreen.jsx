import React, { useState, useEffect, useImperativeHandle } from "react";
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
  Avatar
} from "@ui-kitten/components";
import { updateUser, getCurrentUserFromUID } from "../../services/users";
import PopUpMessage from "../../components/PopUpMessage";
import { Input } from "@ui-kitten/components";
import * as ImagePicker from "expo-image-picker";

function AccountSetttingsScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const populateFields = (userProfile) => {
      setEmail(userProfile.email);
      setUsername(userProfile.username || "");
    };

    getCurrentUserFromUID(populateFields);
  }, []);

  return (
    <Layout style={styles.container}>
      {message == "" ? null : <PopUpMessage message={message} />}
      <PreviewComponent
          image={image}
          setImage={setImage}
        />
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
        defaultValue={username}
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
          if (email != "" && password == confirmPass) {
            updateUser({ email, password, username }, (message) =>
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
      <Layout style={{ flex: 1, justifyContent: "center", marginHorizontal:  16}}>
        <Button onPress={pickImage} size="small" appearance="ghost" style={{ marginTop: 16 }}>
          {image != null ? "Change Avatar" : "Set Avatar"}
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
