import React, { useState, useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { Layout, Text, Icon, List, Input } from "@ui-kitten/components";
import { getProductsCurrentVendor } from "../../../services/products";
import { useNavigation } from "@react-navigation/native";

const SearchIcon = (props) => <Icon name="search-outline" {...props} />;

const ProductsNav = ({setNumProducts}) => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [query, setSearch] = useState("");

  useEffect(() => {
    var unsubscribe = getProductsCurrentVendor(setProducts);

    return function cleanup() {
      unsubscribe();
    }
  }, []);

  useEffect(() => {
    setFilteredProducts(products);
    setNumProducts(products.length);
  }, [products]);

  useEffect(() => {
    const lowercaseQuery = query.toLowerCase();
    setFilteredProducts(
      products.filter(
        (product) =>
          product.description.toLowerCase().includes(lowercaseQuery) ||
          product.title.toLowerCase().includes(lowercaseQuery)
      )
    );
  }, [query]);

  return (
    <Layout style={styles.container}>
      <Input
        onChangeText={(value) => setSearch(value)}
        placeholder="Search here"
        style={{ paddingHorizontal: 16, paddingVertical: 12 }}
        accessoryLeft={SearchIcon}
      />
      <List
        data={filteredProducts}
        numColumns={2}
        renderItem={(props) => renderItemProducts({...props, navigation})}
        style={{ marginHorizontal: 12 }}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
      />
    </Layout>
  );
};

const renderItemProducts = ({ item, navigation }) => (
  <Layout style={styles.item}>
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Product", {
          productId: item.id,
          title: item.title,
        });
      }}
    >
      <Image
        style={{ resizeMode: "cover", height: 160, width: 160 }}
        source={{ uri: item.imageUrl }}
      />
      <Layout style={{ alignSelf: "flex-start" }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginTop: 8,
            marginBottom: 4,
            marginLeft: 12,
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            marginLeft: 12,
          }}
        >
          P{item.price}
        </Text>
      </Layout>
    </TouchableOpacity>
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  item: {
    width: "50%",
    paddingVertical: 12,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
});

export default ProductsNav;
