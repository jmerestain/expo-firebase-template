import React, { useState, useEffect } from "react";
import {
  Layout,
  Input,
  Text,
  Button,
  Card,
  Modal,
  Select,
  SelectItem,
  IndexPath,
} from "@ui-kitten/components";
import * as ImagePicker from "expo-image-picker";
import { StyleSheet, Image, ScrollView } from "react-native";
import { getCurrentUserFromUID } from "../../services/users";
import { createPost } from "../../services/forums";

const AddNewPost = ({ navigation, route }) => {
  const [body, setBody] = useState("");
  const [profile, setProfile] = useState("");
  const [disabled, setDisabled] = useState(true);

  const groupId = route.params.groupId;

  useEffect(() => {
    getCurrentUserFromUID(setProfile);
  }, []);

  const userName = profile.firstName + " " + profile.lastName;

  useEffect(() => {
    if (body && profile) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [body]);

  return (
    <ScrollView style={styles.container}>
      <Layout style={styles.inner}>
        <Layout styles={styles.field}>
          <Text category="label">Post</Text>
          <Input
            multiline={true}
            textStyle={{ minHeight: 64 }}
            onChangeText={(value) => setBody(value)}
            placeholder="Add your post"
            value={body}
          />
        </Layout>
        <Layout style={styles.field}>
          <Button
            disabled={disabled}
            onPress={() => {
              createPost(groupId, body, userName, () => navigation.goBack());
            }}
          >
            Create Post
          </Button>
        </Layout>
      </Layout>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  inner: {
    padding: 20,
  },
  field: {
    marginVertical: 10,
  },
});

export default AddNewPost;
