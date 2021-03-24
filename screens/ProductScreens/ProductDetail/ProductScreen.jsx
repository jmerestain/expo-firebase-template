import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  SectionList,
  Dimensions,
} from "react-native";
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
import {
  getProductByID,
  getProductsLimitedFromUID,
} from "../../../services/products";
import { getShopDetailsByUID } from "../../../services/vendor";
import { newOrder } from "../../../services/orders";
import { getCurrentUserFromUID } from "../../../services/users";
import { startChat } from "../../../services/messages";
import LoadingModal from "../../../components/LoadingModal";

const data = new Array(8).fill({
  product: "Banana Bread",
  shop: "Bea’s Bakery",
  rating: 4,
  price: "P200",
  productDetails:
    "Our banana bread will surely leave you drooling and craving for more! Made from bananas and flour, this bread is one of the best here in Nueva Ecija! Grab your loaf today!",
  quantity: "120",
  review:
    "Very responsive, good service. Carrot cake came just in time for my sister’s birthday.",
  ratedBy: "Nelly Cruz",
  dateReviewed: "01/11/21",
});

const renderItemMore = ({ item, navigation, index }) => (
  <Layout style={styles.item}>
    <TouchableOpacity
      onPress={() => {
        navigation.push("Product", {
          productId: item.id,
          title: item.title,
        });
      }}
    >
      <Image
        style={{ resizeMode: "cover", height: 160, width: 170 }}
        source={{ uri: item.imageUrl }}
      />
      <Layout style={{ alignSelf: "flex-start", marginHorizontal: 10 }}>
        <Text
          category="s1"
          style={{
            marginTop: 8,
            marginBottom: 4,
          }}
        >
          {item.title}
        </Text>
        <Text category="s2" style={{ color: "#00000080" }}>
          P{item.price}
        </Text>
      </Layout>
    </TouchableOpacity>
  </Layout>
);

const renderItemRatings = ({ item, index }) => (
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
          source={require("../../avatar-icon.png")}
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
          <Text style={{ fontSize: 13, fontWeight: "bold", marginVertical: 2 }}>
            {item.ratedBy}
          </Text>
          <Text style={{ fontSize: 10, color: "rgb(186,186,186)" }}>
            {item.dateReviewed}
          </Text>
        </Layout>
      </Layout>
      <Layout style={{ marginLeft: "25%" }}>
        <Rating
          type="custom"
          rating={item.rating}
          style={{ paddingVertical: 16 }}
          ratingColor="rgb(210,145,91)"
          imageSize={16}
        />
      </Layout>
    </Layout>
    <Text style={{ marginBottom: 16 }}>{item.review}</Text>
    <Divider />
  </Layout>
);

function ProductScreen({ route, navigation }) {
  const deviceWidth = Dimensions.get("window").width;
  const [profile, setProfile] = useState({});
  const [product, setProduct] = useState({});
  const [vendor, setVendor] = useState({});
  const [loading, setLoading] = useState(false);
  const [moreProducts, setMoreProducts] = useState({});
  const userName = profile.firstName + " " + profile.lastName;

  useEffect(() => {
    getProductByID(route.params.productId, setProduct);
  }, []);

  useEffect(() => {
    getCurrentUserFromUID(setProfile);
  }, []);

  useEffect(() => {
    if (product.vendor) {
      getShopDetailsByUID(product.vendor, setVendor);
      var unsubscribe = getProductsLimitedFromUID(
        product.vendor,
        6,
        setMoreProducts
      );
    }

    return function cleanup() {
      if(unsubscribe) {
        unsubscribe();
      }
    }
  }, [product]);

  const contactSellerOnPress = () => {
    setLoading(true);
    const contactSellerCallback = (chatroomId) => {
      setLoading(false);
      navigation.navigate("Inbox", {
        params: {
          chatId: chatroomId,
          recipient: vendor.name,
          recipientId: vendor.id,
        },
        screen: "Chat",
      });
    };

    startChat(vendor.id, vendor.name, userName, true, contactSellerCallback);
  };

  const addToCartOnPress = () => {
    setLoading(true);
    const addToCartCallback = () => {
      setLoading(false);
      navigation.navigate("Orders");
    };

    const { title, price, id } = product;

    newOrder(
      { title, price, vendor: vendor.name, vendorId: vendor.id, id },
      userName,
      addToCartCallback
    );
  };

  return (
    <Layout style={{ display: "flex", flexDirection: "column" }}>
      <ScrollView>
        <LoadingModal loading={loading} />
        <Layout style={styles.container}>
          <Image
            style={{ resizeMode: "contain", height: 200, width: deviceWidth }}
            source={{ uri: product.imageUrl }}
          />
          {product.rating && (
            <Rating
              type="custom"
              rating={product.rating}
              style={{ paddingVertical: 12, position: "absolute", right: 10 }}
              ratingColor="rgb(210,145,91)"
              tintColor="rgb(0, 0, 0)"
              imageSize={20}
            />
          )}
          <Layout style={styles.inner}>
            <Layout style={styles.containerList}>
              <Layout style={styles.innerList}>
                <Layout style={styles.textList}>
                  <Text
                    category="h6"
                    style={{
                      alignContent: "center",
                      marginVertical: 6,
                      marginLeft: 16,
                    }}
                  >
                    {product.title}
                  </Text>
                  <Text
                    style={{
                      alignContent: "center",
                      marginVertical: 1,
                      marginLeft: 16,
                      color: "rgb(128, 128, 128)",
                    }}
                  >
                    {vendor.name}
                  </Text>
                </Layout>
              </Layout>
              <Layout>
                <Text
                  category="h6"
                  style={{
                    alignContent: "center",
                    marginVertical: 6,
                    marginRight: 16,
                  }}
                >
                  P{parseFloat(product.price).toFixed(2)}
                </Text>
              </Layout>
            </Layout>
            <Divider />
            <Text
              category="s1"
              style={{ alignContent: "center", marginTop: 12, marginLeft: 16 }}
            >
              Product Details
            </Text>
            <Text
              style={{
                alignContent: "center",
                marginVertical: 6,
                marginHorizontal: 16,
                color: "#00000070",
              }}
            >
              Stock: {product.stock}
            </Text>
            <Text
              style={{
                alignContent: "center",
                marginVertical: 2,
                marginBottom: 16,
                marginHorizontal: 16,
              }}
            >
              {product.description}
            </Text>
            <Divider />
            <Layout
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text category="s1" style={{ marginTop: 18, marginLeft: 18 }}>
                More from {vendor.name}
              </Text>
              <Button
                appearance="ghost"
                size="medium"
                style={{ marginTop: 6 }}
              >
                View Shop &gt;
              </Button>
            </Layout>

            <List
              data={moreProducts}
              numColumns={2}
              renderItem={(props) => renderItemMore({...props, navigation})}
            />

            <Divider />
            <Layout
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                category="s1"
                style={{ marginTop: 18, marginLeft: 18 }}
              >
                Product Reviews
              </Text>
              <Button
                appearance="ghost"
                size="medium"
                style={{ marginTop: 6 }}
              >
                See All &gt;
              </Button>
            </Layout>
            <List data={data} renderItem={renderItemRatings} />
          </Layout>
        </Layout>
      </ScrollView>
      <Layout style={{ position: "sticky", flex: 1 }}>
        <Layout
          style={{
            position: "absolute",
            bottom: 0,
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "rgb(250,250,250)",
            paddingVertical: 8,
          }}
        >
          <Button
            size="large"
            style={{
              width: "48%",
              marginHorizontal: 4,
              backgroundColor: "rgb(87,11,13)",
            }}
            onPress={contactSellerOnPress}
          >
            Contact Seller
          </Button>
          <Button
            size="large"
            style={{ width: "48%", marginHorizontal: 4 }}
            onPress={addToCartOnPress}
          >
            Add to Cart
          </Button>
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
    width: "65%",
  },
  inner: {
    paddingVertical: 12,
  },
  item2: {
    paddingBottom: 10,
    paddingHorizontal: 16,
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

export default ProductScreen;
