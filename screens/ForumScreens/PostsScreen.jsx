import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Image, SectionList } from "react-native";
import {
  Layout,
  Text,
  Button,
  Icon,
  Divider,
  Input,
  Avatar,
  List,
} from "@ui-kitten/components";
import { ScrollView } from "react-native-gesture-handler";
import { readPosts } from "../../services/forums";

const SearchIcon = (props) => <Icon name="search-outline" {...props} />;

const dateToString = (date) => {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  return month + "/" + day + "/" + year;
};

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
            {item.postedAt && dateToString(item.postedAt.toDate())}
          </Text>
        </Layout>
      </Layout>
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

  const groupId = route.params.groupId;

  useEffect(() => {
    readPosts(groupId, setPosts);
  }, []);

  return (
    <Layout style={styles.container}>
      <Layout style={styles.field}>
        <Input
          onChangeText={(value) => setSearch(value)}
          placeholder="Search here"
          accessoryLeft={SearchIcon}
          style={{
            marginHorizontal: 20,
            marginTop: 12,
            marginBottom: 8,
          }}
        />
        <Divider />
        <List data={posts} renderItem={renderItemPosts} />
      </Layout>
      <Layout
        style={{
          flex: 1,
          minWidth: "100%",
          elevation: 3,
          borderColor: "rgb(250,250,250)",
          position: "absolute",
          left: 0,
          bottom: 0,
        }}
      >
        <Divider />
        <Button
          size="large"
          onPress={() => {
            navigation.navigate("Add New Post", { groupId });
          }}
          style={{ marginHorizontal: 20, marginVertical: 16 }}
        >
          + Add New Post
        </Button>
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
  avatar: {
    alignItems: "center",
    margin: 16,
  },
  text: {
    textAlign: "center",
    fontSize: 35,
    marginVertical: 20,
  },
  buttonGroup: {
    alignSelf: "center",
    marginVertical: 20,
  },
  userMessage: {
    padding: 30,
    elevation: 2,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  loading: {
    alignSelf: "center",
  },
  containerTop: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  containerList: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  innerList: {
    flexDirection: "row",
  },
  item2: {
    paddingHorizontal: 25,
  },
  textList: {
    flexDirection: "column",
    marginBottom: 12,
  },
  buttonContain: {
    flex: 1,
    flexDirection: "row",
    minHeight: 80,
    justifyContent: "space-around",
    marginBottom: 32,
  },
  settingsCard: {
    flexDirection: "column",
    justifyContent: "flex-start",
    marginVertical: 8,
  },
});

export default PostsScreen;
