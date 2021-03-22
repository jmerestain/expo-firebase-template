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
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { readChatroom, sendMessage } from "../../services/messages";
import { getUserID } from "../../services/auth";

const SearchIcon = (props) => <Icon name="search-outline" {...props} />;

const renderItem = ({ item, index }) => (
  <Layout style={styles.container}>
    <Layout style={styles.inner}>
      <Layout style={styles.containerList}>
        <Layout style={styles.innerList}>
          <Avatar
            rounded
            size="giant"
            source={require("../../screens/avatar-icon.png")}
            style={{ marginHorizontal: 20, alignSelf: "center" }}
          />
          <Layout style={styles.textList}>
            <Text
              category="h6"
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
                  marginVertical: 1,
                  color: "rgb(128, 128, 128)",
                }}
              >
                {item.content}
              </Text>
              <Text
                style={{
                  alignContent: "center",
                  marginVertical: 1,
                  color: "rgb(128, 128, 128)",
                }}
              >
                {item.timestamp}
              </Text>
            </Layout>
          </Layout>
        </Layout>
        <Icon
          name="more-horizontal"
          fill="rgb(160,160,160)"
          style={{
            height: 26,
            width: 26,
            marginHorizontal: 16,
            marginVertical: 4,
          }}
        />
      </Layout>
    </Layout>
    <Divider />
  </Layout>
);

function ChatScreen({ navigation, route }) {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState([]);
  const { chatId, recipientId } = route.params;

  useEffect(() => {
    readChatroom(chatId, setMessages);
  }, []);

  useEffect(() => {
    getUserID(setUserId);
  }, []);

  const onSend = (messages) => {
    messages.forEach((message) => {
      sendMessage(recipientId, message, chatId, () => {});
    });
  };

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#8A1214",
        },
      }}
    />
  );

  return (
    <GiftedChat
      messages={messages}
      renderBubble={renderBubble}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: userId,
      }}
    />
  );
}

export default ChatScreen;
