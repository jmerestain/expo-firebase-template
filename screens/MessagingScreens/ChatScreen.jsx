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

function ChatScreen({ navigation, route }) {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState([]);
  const { chatId, recipientId } = route.params;

  useEffect(() => {
    const chatroomListener = readChatroom(chatId, setMessages);
    return function cleanup() {
      chatroomListener();
    }
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
