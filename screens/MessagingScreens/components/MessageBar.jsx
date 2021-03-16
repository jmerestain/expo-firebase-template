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

const SearchIcon = (props) => <Icon name="search-outline" {...props} />;

function InboxScreen({ navigation }) {
  const [inbox, setInbox] = useState([]);

  useEffect(() => {
    getInbox(false, setInbox);
  }, []);

  return (
    <Layout style={styles.container}>
      <Input
        onChangeText={(value) => setSearch(value)}
        placeholder="Search here"
        style={{ paddingHorizontal: 16, paddingVertical: 12 }}
        accessoryLeft={SearchIcon}
      />
      <List data={inbox} renderItem={renderItem} />
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


// background: #8A1214;
// border-radius: 10px;
// transform: matrix(-1, 0, 0, 1, 0, 0);