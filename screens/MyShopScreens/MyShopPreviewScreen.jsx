import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Image, SectionList } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Rating } from "react-native-elements";
import {
  Layout,
  Text,
  Button,
  Icon,
  Divider,
  Avatar,
  Tab,
  TabBar,
  List,
  Input,
  StatusTab,
} from "@ui-kitten/components";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ScrollView } from "react-native-gesture-handler";
import ShopProducts from "./MyShopPreview/ShopProducts";
import ShopRatings from "./MyShopPreview/ShopRatings";
import { getShopDetails, getShopDetailsByUID } from "../../services/vendor";
import { getReviewsByVendor } from "../../services/reviews";
import { getAvatars } from "../../services/users";

const MyShopPreviewTab = createMaterialTopTabNavigator();

const MyShopPreviewNavigation = ({
  setNumProducts,
  setRating,
  reviews,
  avatars,
}) => {
  return (
    <MyShopPreviewTab.Navigator tabBar={(props) => <TopTabBar {...props} />}>
      <MyShopPreviewTab.Screen name="Products">
        {(props) => <ShopProducts {...props} setNumProducts={setNumProducts} />}
      </MyShopPreviewTab.Screen>
      <MyShopPreviewTab.Screen name="Reviews">
        {(props) => (
          <ShopRatings
            {...props}
            setRating={setRating}
            reviews={reviews}
            avatars={avatars}
          />
        )}
      </MyShopPreviewTab.Screen>
    </MyShopPreviewTab.Navigator>
  );
};

const TopTabBar = ({ navigation, state }) => (
  <TabBar
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <Tab title="Products" />
    <Tab title="Reviews" />
  </TabBar>
);

function PreviewMyShopScreen({ navigation, route }) {
  const [shopDetails, setShopDetails] = useState({});
  const [numProducts, setNumProducts] = useState(0);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [avatars, setAvatars] = useState({});

  useEffect(() => {
    if (route.params && route.params.vendorId) {
      getShopDetailsByUID(route.params.vendorId, (details) =>
        setShopDetails({ ...details, id: details.id })
      );
    } else {
      getShopDetails((details) =>
        setShopDetails({ ...details.shop, id: details.id })
      );
    }
  }, []);

  useEffect(() => {
    getReviewsByVendor(shopDetails.id, setReviews);
  }, [shopDetails]);

  useEffect(() => {
    getAvatars(
      [...new Set(reviews.map((review) => review.userId))],
      setAvatars
    );
  }, [reviews]);

  useEffect(() => {
    if (shopDetails.averageRating)
      setRating(shopDetails.averageRating.avgRating);
  }, [shopDetails]);

  return (
    <ScrollView>
      <Layout style={styles.container}>
        <Layout style={styles.inner}>
          <Layout style={{ alignSelf: "center", alignContent: "center" }}>
            <Avatar
              rounded
              size="giant"
              shape="round"
              source={
                shopDetails.avatarUrl
                  ? { uri: shopDetails.avatarUrl }
                  : require("../avatar-icon.png")
              }
              style={{
                marginHorizontal: 50,
                marginTop: 24,
                alignItems: "center",
                alignSelf: "center",
                alignContent: "center",
              }}
            />
            <Text
              category="h6"
              style={{
                alignSelf: "center",
                alignContent: "center",
                marginBottom: 8,
                marginTop: 16,
              }}
            >
              {shopDetails.name}
            </Text>
            {shopDetails.location ? (
              <Text
                style={{
                  alignSelf: "center",
                  alignContent: "center",
                  marginVertical: 2,
                  color: "rgb(180,180,180)",
                }}
              >
                {shopDetails.location}
              </Text>
            ) : null}
            <Divider style={{ marginTop: 12 }} />
            <Layout
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 16,
              }}
            >
              <Layout style={{ marginHorizontal: 12 }}>
                <Text
                  category="h6"
                  style={{
                    alignSelf: "center",
                    alignContent: "center",
                    marginVertical: 2,
                  }}
                >
                  {rating.toFixed(2)}
                </Text>
                <Text
                  style={{
                    alignSelf: "center",
                    alignContent: "center",
                    marginVertical: 2,
                    color: "rgb(180,180,180)",
                  }}
                >
                  Rating
                </Text>
              </Layout>
              <Layout style={{ marginHorizontal: 16 }}>
                <Text
                  category="h6"
                  style={{
                    alignSelf: "center",
                    alignContent: "center",
                    marginVertical: 2,
                  }}
                >
                  {numProducts}
                </Text>
                <Text
                  style={{
                    alignSelf: "center",
                    alignContent: "center",
                    marginVertical: 2,
                    color: "rgb(180,180,180)",
                  }}
                >
                  Products
                </Text>
              </Layout>
            </Layout>
          </Layout>
        </Layout>
        <MyShopPreviewNavigation
          setNumProducts={setNumProducts}
          reviews={reviews}
          avatars={avatars}
        />
        <Button
          size="large"
          onPress={() => {
            navigation.navigate("Add New Item", { isUpdating: false });
          }}
          style={{ marginHorizontal: 20, marginVertical: 16 }}
        >
          + Add New Product
        </Button>
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
  daInner: {
    marginHorizontal: 20,
    backgroundColor: "transparent",
  },
  inner: {
    padding: 20,
  },
});

export default PreviewMyShopScreen;
