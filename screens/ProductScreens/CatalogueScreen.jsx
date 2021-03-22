import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Layout, Text, List, Card, Spinner, Icon } from "@ui-kitten/components";
import { getUserFromUID } from "../../services/users";
import { getCatalogue, getCategories } from "../../services/products";
import { getShopDetailsByManyUID } from "../../services/vendor";
import { checkAuthenticated } from "../../services/auth";
import { useNavigation } from "@react-navigation/native";
// Components
import MessagingScreen from "../MessagingScreens";
import SearchScreen from "../SearchScreens/Search";
import Category from "./Category/Category";
import ProductScreen from "./ProductDetail/ProductScreen";
import DashHeader from "../../components/headers/DashHeader";

const artscrafts = require("../../assets/categories/artscrafts.png");
const beautypersonalcare = require("../../assets/categories/beautypersonalcare.png");
const freshproduce = require("../../assets/categories/freshproduce.png");
const fooddrinks = require("../../assets/categories/fooddrinks.png");
const beautyandwellness = require("../../assets/categories/beautyandwellness.png");
const homestyle = require("../../assets/categories/homestyle.png");
const wearables = require("../../assets/categories/wearables.png");

const CatalogueNavigator = () => {
  const CStack = createStackNavigator();
  return (
    <CStack.Navigator
      headerMode="screen"
      screenOptions={{
        headerStyle: { backgroundColor: "rgb(138,18,20)" },
      }}
    >
      <CStack.Screen
        name="Catalogue"
        component={CatalogueScreen}
        options={(props) => ({
          header: ({ navigation }) => {
            return <DashHeader {...props} navigation={navigation} />;
          },
        })}
      />
      <CStack.Screen
        name="Category"
        component={Category}
        options={({ route }) => ({
          headerTitle: route.params.title,
        })}
      />
      <CStack.Screen
        name="Product"
        component={ProductScreen}
        options={({ route }) => ({
          headerTitle: route.params.title,
        })}
      />
      <CStack.Screen
        name="Inbox"
        component={MessagingScreen}
        options={{
          headerShown: false,
          title: "My Inbox",
        }}
      />
      <CStack.Screen
        name="Search"
        component={SearchScreen}
        options={() => ({
          headerShown: true,
          title: "Search",
        })}
      />
    </CStack.Navigator>
  );
};

const HomeComponent = ({ user, navigation }) => {
  const [homeProducts, setHomeProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const vendorsCallBack = (vendors, products) => {
    const finalProducts = products.map((product) => {
      const vendorName = vendors.find((vendor) => vendor.id == product.vendor)
        .name;
      return { ...product, vendor: vendorName };
    });

    setHomeProducts(finalProducts);
  };

  const homeProductsCallback = (products) => {
    getShopDetailsByManyUID(
      products.map((product) => product.vendor),
      (vendors) => vendorsCallBack(vendors, products)
    );
  };

  useEffect(() => {
    var unsubscribe = getCatalogue(homeProductsCallback);
    return function cleanup() {
      unsubscribe();
    }
  }, []);

  useEffect(() => {
    getCategories(setCategories);
  }, []);

  return (
    <ScrollView style={[styles.container]}>
      <Layout style={styles.inner}>
        <Layout>
          <Image
            source={require("../../assets/dashboardHeader.png")}
            style={styles.categoryImage}
          />
        </Layout>
        <Text style={{ paddingVertical: 20, fontWeight: "bold" }} category="h6">
          Categories
        </Text>
        <CategorySection categories={categories} />
        <Text style={{ paddingVertical: 20, fontWeight: "bold" }} category="h6">
          Latest Products
        </Text>
        {homeProducts.length != 0 ? (
          <List
            data={homeProducts}
            renderItem={(props) => renderItem({ navigation, ...props })}
            extraData={homeProducts}
            horizontal={true}
            style={{ backgroundColor: "transparent" }}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <Spinner style={styles.loading} size="giant" />
        )}
      </Layout>
    </ScrollView>
  );
};
const CategoryEntry = ({ category }) => {
  const navigation = useNavigation();
  const { id, image_name, title } = category;

  let imageSource;
  if (image_name === "fooddrinks") {
    imageSource = fooddrinks;
  } else if (image_name === "artscrafts") {
    imageSource = artscrafts;
  } else if (image_name === "beautypersonalcare") {
    imageSource = beautypersonalcare;
  } else if (image_name === "freshproduce") {
    imageSource = freshproduce;
  } else if (image_name === "wearables") {
    imageSource = wearables;
  } else if (image_name === "beautyandwellness") {
    imageSource = beautyandwellness;
  } else if (image_name === "homestyle") {
    imageSource = homestyle;
  } else {
    imageSource = fooddrinks;
  }

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Category", { categoryId: id, title });
      }}
    >
      <Layout style={styles.categoryEntry}>
        <Image source={imageSource} style={styles.icon} />
        <Text
          category="label"
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontFamily: "NunitoSans-Bold",
          }}
        >
          {title}
        </Text>
      </Layout>
    </TouchableOpacity>
  );
};

const CategorySection = ({ categories }) => {
  return (
    <Layout style={styles.categorySection}>
      {categories.map((category) => (
        <CategoryEntry key={category.id} category={category} />
      ))}
    </Layout>
  );
};

const renderItem = ({ item, navigation }) => {
  const { title, description, price, imageUrl, vendor, id } = item;

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Product", {
          productId: id,
          title: title,
        });
      }}
    >
      <Layout style={styles.pickForYou}>
        <Image source={{ uri: imageUrl }} style={{ width: 160, height: 120 }} />
        <Text
          category="s1"
          style={{
            fontWeight: "bold",
            marginVertical: 6,
            fontFamily: "NunitoSans-Bold",
            color: "#000",
          }}
        >
          {title}
        </Text>
        <Text category="s2">P{price}</Text>
        <Text
          category="s2"
          style={{
            marginVertical: 4,
            color: "#00000070",
            fontFamily: "NunitoSans-Regular",
          }}
        >
          {vendor}
        </Text>
      </Layout>
    </TouchableOpacity>
  );
};

const CatalogueScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuthenticated(setUser, navigation);
  }, []);

  return (
    <Layout style={styles.container}>
      <HomeComponent user={user} navigation={navigation} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  inner: {
    flex: 1,
    margin: 20,
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
  categoryImage: {
    backgroundColor: "#FFF",
    height: 240,
    resizeMode: "contain",
    alignSelf: "center",
    paddingHorizontal: 20,
  },
  categoryEntry: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    width: 120,
    marginBottom: 10,
  },
  categorySection: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  icon: {
    width: 44,
    height: 44,
    marginBottom: 12,
  },
  pickForYou: {
    flex: 1,
    maxWidth: 160,
    marginRight: 10,
  },
});

export default CatalogueNavigator;
