import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Image, SectionList } from "react-native";
import { Rating } from "react-native-elements";
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
import { ScrollView } from "react-native-gesture-handler";
import { readPosts } from "../../services/forums";

const SearchIcon = (props) => <Icon name="search-outline" {...props} />;

const renderItemPosts = ({ item, index }) => (
  <Layout style={styles.item2}>
    <Layout
      style={{
        flexDirection: "row",
        alignSelf: "stretch",
        justifyContent: "space-between",
      }}
    >
      <Layout
        style={{ flexDirection: "row", alignSelf: "flex-start", marginTop: 12 }}
      >
        <Avatar
          rounded
          size="small"
          shape="round"
          source={require("../../screens/avatar-icon.png")}
          style={{
            marginRight: 12,
            marginLeft: 2,
            marginBottom: 8,
            alignItems: "center",
            alignSelf: "center",
            alignContent: "center",
          }}
        />
        <Layout>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 2 }}>
            {item.postedBy}
          </Text>
          <Text style={{ fontSize: 10, color: "rgb(186,186,186)" }}>
            {item.postedAt}
          </Text>
        </Layout>
      </Layout>
      <Layout style={{ marginLeft: "25%" }}></Layout>
      <Layout></Layout>
    </Layout>
    <Text style={{ marginBottom: 16 }}>{item.body}</Text>
    {/* <Image
      style={{ resizeMode: "contain" }}
      source={require("../../assets/Seller.png")}
    /> */}
    <Divider style={{ marginTop: 16 }} />
  </Layout>
);

function PostsScreen({ navigation, route }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    readPosts(route.params.groupId, setPosts);
  }, []);

  console.log(posts);

  return (
    <ScrollView>
      <Layout style={styles.container}>
        <Input
          onChangeText={(value) => setSearch(value)}
          placeholder="Search here"
          style={{ paddingHorizontal: 16, paddingVertical: 12 }}
          accessoryLeft={SearchIcon}
        />
        <Layout style={styles.inner}>
          <List data={posts} renderItem={renderItemPosts} />
        </Layout>
      </Layout>
    </ScrollView>
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
    marginBottom: 12,
    width: "60%",
  },
  inner: {},
  item2: {
    paddingBottom: 10,
    paddingHorizontal: 24,
    alignItems: "stretch",
    flexDirection: "column",
  },
  item: {
    width: "49%",
    paddingVertical: 8,
    paddingHorizontal: 6,
    marginLeft: 3,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
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

export default PostsScreen;
