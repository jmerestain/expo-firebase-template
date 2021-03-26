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
import { Rating } from "react-native-elements";
import LoadingModal from "../../components/LoadingModal";
import Modal from "react-native-modal";
import { postReview } from "../../services/reviews";

const StatusTab = createMaterialTopTabNavigator();

const emptyStateImage = () => {
  <Image
    source={require("../../assets/empty-image.png")}
    style={styles.categoryImage}
  />;
};

const renderItemRate = ({ item, index, props }) => {
  return (
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
                style={{
                  alignContent: "center",
                  marginTop: 8,
                  marginBottom: 2,
                  fontSize: 16,
                  fontFamily: "NunitoSans-Bold",
                }}
              >
                {item.product.title}
              </Text>
              <Text
                category="s2"
                style={{
                  alignContent: "center",
                  marginVertical: 2,
                  color: "#000000",
                }}
              >
                P{item.product.price}
              </Text>
              <Text
                category="s2"
                style={{
                  fontFamily: "NunitoSans-Regular",
                  alignContent: "center",
                  marginVertical: 1,
                  color: "rgb(128, 128, 128)",
                }}
              >
                x{item.quantity}
              </Text>
              <Text
                category="s2"
                style={{
                  fontFamily: "NunitoSans-Regular",
                  alignContent: "center",
                  marginVertical: 1,
                  color: "rgb(128, 128, 128)",
                }}
              >
                {item.product.vendor}
              </Text>
            </Layout>
          </Layout>
          <Layout style={{ alignContent: "flex-end", alignItems: "flex-end" }}>
            <Button
              size="small"
              style={{
                alignSelf: "flex-end",
                marginVertical: 8,
                marginRight: 16,
              }}
              onPress={() => setModalVisible(true)}
            >
              Rate Order
            </Button>
          </Layout>
        </Layout>
      </Layout>
      <Divider />
    </Layout>
  );
};

function RatingScreen({ navigation, route, data }) {
  const [toReviewOrders, setToReviewOrders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <Layout style={styles.container}>
      <LoadingModal loading={loading} />
      <Layout style={[styles.settingsCard]}>
        <Layout style={styles.inner}>
          <Layout style={{ justifyContent: "flex-start" }}>
            <Button onPress={() => setModalVisible(true)}>To Rate</Button>
            <List data={toReviewOrders} renderItem={renderItemRate} />
          </Layout>
        </Layout>
      </Layout>
      <Layout style={styles.centeredView}>
        <Modal
          style={{ margin: 0 }}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <Layout style={styles.modalView}>
            <Text
              category="s1"
              style={{
                fontSize: 17,
                color: "#8A1214",
                paddingVertical: 16,
                textAlign: "center",
              }}
            >
              Rating Product from Seller
            </Text>
            <Layout
              style={{ alignItems: "left", justifyContent: "center" }}
              flexDirection="center"
            >
              <Layout>
                <Text style={{ textAlign: "left" }}>Rating</Text>
                <Rating
                  type="custom"
                  style={{ paddingBottom: 16, paddingTop: 8 }}
                  ratingColor="rgb(210,145,91)"
                  imageSize={24}
                  onFinishRating={setRating}
                />
              </Layout>
              <Text>Additional Comments</Text>
              <Input
                style={{ paddingTop: 8 }}
                placeholder="Enter comments on the product here"
                onChangeText={setComments}
              ></Input>
            </Layout>
            <Button
              appearance="primary"
              onPress={() => {
                setModalVisible(!modalVisible);
                setLoading(true);
                postReview({ rating, comments }, () => {
                  setLoading(false);
                  navigation.goBack();
                });
              }}
              style={{ marginTop: 20 }}
            >
              Rate Now
            </Button>
            <Button
              appearance="ghost"
              onPress={() => setModalVisible(!modalVisible)}
              style={{ marginTop: 4 }}
            >
              Cancel
            </Button>
          </Layout>
        </Modal>
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

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#00000080",
    alignContent: "stretch",
    textAlign: "center",
    paddingHorizontal: 16,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 12,
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
  daInner: {
    marginHorizontal: 20,
    backgroundColor: "transparent",
  },
  inner: {
    paddingVertical: 12,
  },
  field: {
    marginVertical: 10,
  },
  buttonGroup: {
    alignSelf: "center",
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

export default RatingScreen;
