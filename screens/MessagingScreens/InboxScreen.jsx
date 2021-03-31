import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Image, SectionList } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  Layout,
  Text,
  Button,
  Icon,
  Divider,
  Input,
  Avatar,
  Tab,
  TabBar,
  List,
} from "@ui-kitten/components";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { getInbox } from "../../services/messages";
import { getAvatarsVendorOrBuyer } from "../../services/users";

const SearchIcon = (props) => <Icon name="search-outline" {...props} />;

const truncateText = (text) => {
  const MAX_LENGTH = 30;
  if (text.length <= MAX_LENGTH) {
    return text;
  } else {
    return text.substring(0, MAX_LENGTH) + "...";
  }
};

const renderItem = ({ item, navigation, avatars }) => (
  <Layout style={styles.container}>
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Chat", {
          chatId: item.id,
          recipientId: item.recipient,
          recipient: item.recipientName,
        })
      }
    >
      <Layout style={styles.inner}>
        <Layout style={styles.containerList}>
          <Layout style={styles.innerList}>
            <Avatar
              rounded
              size="giant"
              source={
                avatars[
                  `${item.recipient}-${
                    item.isVendorChat ? "vendor" : "personal"
                  }`
                ]
                  ? avatars[
                      `${item.recipient}-${
                        item.isVendorChat ? "vendor" : "personal"
                      }`
                    ]
                  : require("../../screens/avatar-icon.png")
              }
              style={{ marginHorizontal: 20, marginTop: 3 }}
            />
            <Layout style={styles.textList}>
              <Text
                category="s1"
                style={{ alignContent: "center", marginVertical: 6 }}
              >
                {item.recipientName}
              </Text>
              <Layout
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <Text
                  style={{
                    alignContent: "center",
                    fontSize: 13,
                    marginVertical: 1,
                    color: "rgb(128, 128, 128)",
                  }}
                >
                  {truncateText(item.text)}
                </Text>
                {/* <Text
                  style={{
                    alignContent: "center",
                    marginVertical: 1,
                    color: "rgb(128, 128, 128)",
                  }}
                >
                  {item.createdAt.toString()}
                </Text> */}
              </Layout>
            </Layout>
          </Layout>
        </Layout>
      </Layout>
    </TouchableOpacity>
    <Divider />
  </Layout>
);

function InboxScreen({ navigation }) {
  const [inbox, setInbox] = useState([]);
  const [avatars, setAvatars] = useState({});

  useEffect(() => {
    const unsubscribe = getInbox(false, setInbox);

    return function cleanup() {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    getAvatarsVendorOrBuyer(
      inbox.map((chat) => ({
        uid: chat.recipient,
        isVendorChat: chat.isVendorChat,
      })),
      setAvatars
    );
  }, [inbox]);

  return (
    <Layout style={styles.container}>
      <Input
        onChangeText={(value) => setSearch(value)}
        placeholder="Search here"
        style={{ paddingHorizontal: 16, paddingVertical: 12 }}
        accessoryLeft={SearchIcon}
      />
      <List
        data={inbox}
        renderItem={(props) => renderItem({ ...props, navigation, avatars })}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  containerList: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  innerList: {
    flexDirection: "row",
  },
  textList: {
    flexDirection: "column",
    marginBottom: 12,
  },
  inner: {
    paddingVertical: 12,
  },
  button: {
    margin: 2,
    elevation: 5,
    shadowColor: "rgb(255,255,255)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    borderColor: "rgb(220,220,220)",
  },
});

export default InboxScreen;
