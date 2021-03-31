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
  Input,
  Text,
  Button,
  Icon,
  Divider,
  Toggle,
  Avatar,
} from "@ui-kitten/components";
import { createStackNavigator } from "@react-navigation/stack";
import * as ImagePicker from "expo-image-picker";
import OrdersScreen from "../OrdersScreen";
import { ScrollView } from "react-native-gesture-handler";

const SettingsStack = createStackNavigator();

const SettingsScreenNavigation = () => (
  <SettingsStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: "rgb(138,18,20)" },
    }}
  >
    <SettingsStack.Screen name="Profile Information" component={OrdersScreen} />
    <SettingsStack.Screen name="Change Password" component={OrdersScreen} />
    <SettingsStack.Screen name="Push Notification" component={OrdersScreen} />
    <SettingsStack.Screen name="Push Information" component={OrdersScreen} />
    <SettingsStack.Screen name="Privacy Policy" component={OrdersScreen} />
  </SettingsStack.Navigator>
);

function ShopSettingsScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [businessName, setBusinessName] = useState("");
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  return (
    <ScrollView>
      <Layout style={styles.container}>
        <PreviewComponent image={image} setImage={setImage} />
        <Text
          style={{
            fontFamily: "NunitoSans-Bold",
            fontSize: 16,
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
        >
          Shop Information
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
          Business Name
        </Text>
        <Input
          onChangeText={(value) => setBusinessName(value)}
          placeholder="Business Name"
          style={{ paddingHorizontal: 16 }}
          defaultValue={businessName}
        />
        <Text
          category="s1"
          style={{
            paddingHorizontal: 16,
            paddingVertical: 6,
            fontFamily: "NunitoSans-Regular",
          }}
        >
          Full Name
        </Text>
        <Input
          onChangeText={(value) => setFullName(value)}
          placeholder="Full Name"
          style={{ paddingHorizontal: 16 }}
          defaultValue={fullName}
        />
        <Text
          category="s1"
          style={{
            paddingHorizontal: 16,
            paddingVertical: 6,
            fontFamily: "NunitoSans-Regular",
          }}
        >
          Location
        </Text>
        <Input
          onChangeText={(value) => setLocation(value)}
          placeholder="Location"
          style={{ paddingHorizontal: 16 }}
          defaultValue={location}
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
          placeholder="Contact Number"
          style={{ paddingHorizontal: 16 }}
          defaultValue={contactNumber}
        />
        {/*<Text style={{ fontFamily:'NunitoSans-Bold', fontSize: 17, paddingHorizontal:16, paddingVertical: 12}}>Notifications</Text>
            <Divider style={{ marginBottom: 12 }} />
            <Layout style={{flexDirection:'row', paddingHorizontal:16, alignItems: 'flex-end', justifyContent: 'space-between', borderColor: 'rgb(186,186,186)'}}>
                <Text>Turn on Notifications</Text>
                <Layout>
                <SettingsOptions />
                </Layout>
                </Layout>
            <Divider style={{ marginVertical: 18, marginBottom: 12 }} />*/}
        <Text
          style={{
            fontFamily: "NunitoSans-Bold",
            fontSize: 16,
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
        >
          Danger Zone
        </Text>
        <Divider style={{ marginHorizontal: 16, marginBottom: 12 }} />
        <Layout
          style={{
            flexDirection: "row",
            paddingHorizontal: 16,
            alignItems: "center",
            justifyContent: "space-between",
            borderColor: "rgb(186,186,186)",
          }}
        >
          <Text>Delete Shop Account</Text>
          <Layout>
            <Button
              style={{ marginRight: 8 }}
              onPress={() => setModalVisible(true)}
            >
              Delete Now
            </Button>
          </Layout>
        </Layout>
        <Divider style={{ marginVertical: 12, marginBottom: 12 }} />
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
                <Layout
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Icon
                    name="alert-triangle-outline"
                    fill="#8A1214"
                    style={{ height: 26, width: 26, justifyContent: "center" }}
                  />
                </Layout>
                <Text
                  category="h6"
                  style={{ color: "#8A1214", paddingVertical: 12 }}
                >
                  You are about to delete your shop
                </Text>
                <Text>
                  Are you sure about this? You will not be able to recover your
                  account after deleting.
                </Text>
                <Button
                  appearance="primary"
                  onPress={() => setModalVisible(!modalVisible)}
                  style={{ marginTop: 20 }}
                >
                  Back to Settings
                </Button>
                <Button
                  appearance="outline"
                  onPress={() => setModalVisible(!modalVisible)}
                  style={{ marginTop: 12 }}
                >
                  Delete Now
                </Button>
              </Layout>
            </Layout>
          </Modal>
        </Layout>
      </Layout>
    </ScrollView>
  );
}

const SettingsOptions = () => {
  const [activeChecked, setActiveChecked] = React.useState(true);

  const onActiveCheckedChange = (isChecked) => {
    setActiveChecked(isChecked);
  };

  return (
    <Layout style={styles.container} level="1">
      <Toggle
        style={styles.toggle}
        checked={activeChecked}
        onChange={onActiveCheckedChange}
      ></Toggle>
    </Layout>
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
    <Layout style={{ flex: 1, justifyContent: "center", marginHorizontal: 16 }}>
      <Button
        onPress={pickImage}
        size="small"
        appearance="ghost"
        style={{ marginTop: 16 }}
      >
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

export default ShopSettingsScreen;
