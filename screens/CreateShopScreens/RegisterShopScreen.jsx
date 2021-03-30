import React, { useState, useEffect } from "react";
import { StyleSheet, Image } from "react-native";
import { Layout, Input, Button, Text, Card, Icon, Avatar } from "@ui-kitten/components";
import * as ImagePicker from "expo-image-picker";
import { vendorApply } from "../../services/vendor";
import PopUpMessage from "../../components/PopUpMessage";
import { ScrollView } from "react-native-gesture-handler";

const RegisterShopScreen = ({ navigation }) => {
  const [businessName, setBusinessName] = useState("");
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [ID, setID] = useState("");
  const [blob1, setBlob1] = useState(null);
  const [blob2, setBlob2] = useState(null);
  const [DTIcert, setDTIcert] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  return (
    <ScrollView style={{backgroundColor: "#FFFFFF",}}>
      <Layout style={styles.container}>
        <PreviewComponent
          image={image}
          setImage={setImage}
        />
        <Text
            category="s1"
            style={{ paddingHorizontal: 16, paddingVertical: 6, fontFamily: "NunitoSans-Regular" }}
            >
          Business Name
        </Text>
        <Input
          onChangeText={(value) => setBusinessName(value)}
          placeholder="Registered Business Name"
          style={{ paddingHorizontal: 16 }}
        />

        <Text
            category="s1"
            style={{ paddingHorizontal: 16, paddingVertical: 6, fontFamily: "NunitoSans-Regular" }}
            >
          Owner Full Name
        </Text>
        <Input
          onChangeText={(value) => setFullName(value)}
          placeholder="Registered Full Name"
          style={{ paddingHorizontal: 16 }}
        />

        <Text
            category="s1"
            style={{ paddingHorizontal: 16, paddingVertical: 6, fontFamily: "NunitoSans-Regular" }}
            >
          Location
        </Text>
        <Input
          onChangeText={setLocation}
          placeholder="Business Location"
          style={{ paddingHorizontal: 16 }}
        />

        <Text
            category="s1"
            style={{ paddingHorizontal: 16, paddingVertical: 6, fontFamily: "NunitoSans-Regular" }}
            >
          Business Email
        </Text>
        <Input
          onChangeText={setEmail}
          placeholder="Business Email"
          style={{ paddingHorizontal: 16 }}
        />

        <Text
            category="s1"
            style={{ paddingHorizontal: 16, paddingVertical: 6, fontFamily: "NunitoSans-Regular" }}
            >
          Phone Number
        </Text>
        <Input
          onChangeText={setContactNumber}
          placeholder="Phone Number"
          style={{ paddingHorizontal: 16 }}
        />

        <Text
            category="s1"
            style={{ paddingHorizontal: 16, paddingVertical: 6, fontFamily: "NunitoSans-Regular" }}
            >
          Valid ID
        </Text>
        <ImagePickerComponent image={ID} setImage={setID} setBlob={setBlob1} />
        <Text
            category="s1"
            style={{ paddingHorizontal: 16, paddingVertical: 6, fontFamily: "NunitoSans-Regular" }}
            >
          DTI Registration
        </Text>
        <ImagePickerComponent
          image={DTIcert}
          setImage={setDTIcert}
          setBlob={setBlob2}
        />
        <Button
          size="large"
          onPress={() => {
            if (businessName && fullName && ID && DTIcert) {
              const shopDetails = {
                shop: {
                  name: businessName,
                  owner: fullName,
                  ...(location && { location }),
                  ...(email && { email }),
                  ...(contactNumber && { contactNumber }),
                },
              };
              vendorApply(shopDetails, blob1, blob2, () =>
                navigation.navigate("Confirm Register Shop")
              );
            } else {
              setMessage("Some parts may not have been filled up.");
            }
          }}
          style={{ marginLeft: 16, marginRight: 16, marginTop: 40 }}
        >
          Register Shop
        </Button>
        {message ? (<PopUpMessage message={message} />) : null}
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
    alignContent: "stretch",
    paddingVertical: 24,
    paddingHorizontal: 8
  },
});

export default RegisterShopScreen;
