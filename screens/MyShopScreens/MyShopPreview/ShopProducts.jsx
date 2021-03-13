import React, { useState, useEffect } from "react";
import { StyleSheet, Image } from "react-native";
import { Layout, Text, Icon, List, Input } from "@ui-kitten/components";
import { getProductsCurrentVendor } from "../../../services/products";

const SearchIcon = (props) => <Icon name="search-outline" {...props} />;

const ProductsNav = () => {
  const [products, setProducts] = useState({});

  useEffect(() => {
    getProductsCurrentVendor(setProducts);
  }, []);

  return (
    <Layout style={styles.container}>
      <Input
        onChangeText={(value) => setSearch(value)}
        placeholder="Search here"
        style={{ paddingHorizontal: 16, paddingVertical: 12 }}
        accessoryLeft={SearchIcon}
      />
      <List
        data={products}
        numColumns={2}
        renderItem={renderItemProducts}
        style={{ marginHorizontal: 12 }}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
      />
    </Layout>
  );
};

const renderItemProducts = ({ item }) => (
  <Layout style={styles.item}>
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
        }}
      >
        {item.title}
      </Text>
      <Text>P{item.price}</Text>
    </Layout>
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  item: {
    width: "48%",
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
});

export default ProductsNav;
