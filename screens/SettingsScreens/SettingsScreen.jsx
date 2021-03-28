import React from "react";
import { StyleSheet, TouchableOpacity, Image, SectionList } from "react-native";
import { Layout, Text, Button, Icon, Divider } from "@ui-kitten/components";
import { createStackNavigator } from "@react-navigation/stack";

const Settings = createStackNavigator();

function SettingsScreen({ navigation }) {
  return (
    <Layout style={styles.container}>
      <Layout style={[styles.settingsCard]}>
        <Layout style={styles.daInner}>
          <Text
            category="s1"
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 12,
              marginTop: 20,
            }}
          >
            Account Settings
          </Text>
          <Divider />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Delivery Information");
            }}
          >
            <Layout
              style={{
                flexDirection: "row",
                backgroundColor: "transparent",
                justifyContent: "space-between",
                marginVertical: 8,
              }}
            >
              <Text style={{ paddingTop: 2 }}>Delivery Information</Text>
              <Icon
                name="chevron-right"
                fill="#8A1214"
                style={{ height: 26, width: 26 }}
              />
            </Layout>
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Account Details");
            }}
          >
            <Layout
              style={{
                flexDirection: "row",
                backgroundColor: "transparent",
                justifyContent: "space-between",
                marginVertical: 8,
              }}
            >
              <Text style={{ paddingTop: 2 }}>Account Details</Text>
              <Icon
                name="chevron-right"
                fill="#8A1214"
                style={{ height: 26, width: 26 }}
              />
            </Layout>
          </TouchableOpacity>
          <Divider />
        </Layout>

        {/*<Layout style={styles.daInner}>
          <Text
            category="s1"
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 12,
              marginTop: 20,
            }}
          >
            Notifications settings
          </Text>
          <Divider />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Push Notifications");
            }}
          >
            <Layout
              style={{
                flexDirection: "row",
                backgroundColor: "transparent",
                justifyContent: "space-between",
                marginVertical: 8,
              }}
            >
              <Text style={{ paddingTop: 2 }}>Push Notifications</Text>
              <Icon
                name="chevron-right"
                fill="#8A1214"
                style={{ height: 26, width: 26 }}
              />
            </Layout>
          </TouchableOpacity>
          <Divider />
        </Layout>*/}

        <Layout style={styles.daInner}>
          <Text
            category="s1"
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 12,
              marginTop: 20,
            }}
          >
            General
          </Text>
          <Divider />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Terms and Conditions");
            }}
          >
            <Layout
              style={{
                flexDirection: "row",
                backgroundColor: "transparent",
                justifyContent: "space-between",
                marginVertical: 8,
              }}
            >
              <Text style={{ paddingTop: 2 }}>Terms and Conditions</Text>
              <Icon
                name="chevron-right"
                fill="#8A1214"
                style={{ height: 26, width: 26 }}
              />
            </Layout>
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Privacy Policy");
            }}
          >
            <Layout
              style={{
                flexDirection: "row",
                backgroundColor: "transparent",
                justifyContent: "space-between",
                marginVertical: 8,
              }}
            >
              <Text style={{ paddingTop: 2 }}>Privacy Policy</Text>
              <Icon
                name="chevron-right"
                fill="#8A1214"
                style={{ height: 26, width: 26 }}
              />
            </Layout>
          </TouchableOpacity>
          <Divider />
        </Layout>
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  settingsCard: {
    flexDirection: "column",
    justifyContent: "flex-start",
    marginVertical: 8,
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

export default SettingsScreen;
