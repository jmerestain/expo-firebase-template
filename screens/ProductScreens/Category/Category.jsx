import React, { useState, useEffect } from "react";
import { StyleSheet, Image, Pressable, TouchableOpacity } from "react-native";
import { Layout, Text, Input, Icon, List, Avatar } from "@ui-kitten/components";
import { getProductsFromCategory } from "../../../services/products";
import { getShopDetailsByManyUID } from "../../../services/vendor";

const SearchIcon = (props) => <Icon name="search-outline" {...props} />;

const renderItem = ({ item, index, navigation }) => (
  <Layout style={styles.item}>
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Product", { productId: item.id, title: item.title });
      }}
    >
      <Image
        style={{ resizeMode: "cover", height: 155, width: 155 }}
        source={{ uri: item.imageUrl }}
      />
      <Layout style={{ alignSelf: "flex-start"}}>
        <Text category="s1" style={{ fontWeight: "bold", marginBottom: 3, marginTop: 10, fontFamily: "NunitoSans-Bold", color: '#000' }}>
          {item.title}
        </Text>
        <Text category="s2" style={{paddingBottom: 4}}>P {parseFloat(item.price).toFixed(2)}</Text>
        {/*<Text category="s2" style={{ marginVertical: 4, color: '#00000070', fontFamily: "NunitoSans-Regular" }}>{item.vendor}</Text>*/}
        <Text
          style={{ fontSize: 13, fontWeight: "bold", color: "rgb(138,18,20)" }}
        >
          {item.vendorName}
        </Text>
      </Layout>
    </TouchableOpacity>
  </Layout>
);
const Category = ({ route, navigation }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [query, setSearch] = useState("");

  useEffect(() => {
    var unsubscribe = () => {};
    unsubscribe = getProductsFromCategory(
      route.params.categoryId,
      setProducts
    );

    return function cleanup() {
      if(unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    const lowercaseQuery = query.toLowerCase();
    setFilteredProducts(
      products.filter(
        (product) =>
          product.description.toLowerCase().includes(lowercaseQuery) ||
          product.title.toLowerCase().includes(lowercaseQuery) ||
          (product.vendorName &&
            product.vendorName.toLowerCase().includes(lowercaseQuery))
      )
    );
  }, [query]);

  return (
    <Layout style={styles.container}>
      <Layout style={styles.inner}>
        <Input
          onChangeText={(value) => setSearch(value)}
          placeholder="Search here"
          accessoryLeft={SearchIcon}
          style={{
            marginVertical: 16,
          }}
        />
        <List
          contentContainerStyle={styles.containerList}
          data={filteredProducts}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={(props) => renderItem({...props, navigation})}
          style={[{
            backgroundColor: "transparent",
            flex: 1,
          }]}
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
        />
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  inner: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  containerList: {},
  item: {
    width: "48%",
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
});

export default Category;
