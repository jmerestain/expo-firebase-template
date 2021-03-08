import React, { useState, useEffect } from "react";
import { StyleSheet, Image, Pressable } from "react-native";
import { Layout, Text, Input, Icon, List, Avatar } from "@ui-kitten/components";
import { getProductsFromCategory } from "../../../services/products";

const SearchIcon = (props) => <Icon name="search-outline" {...props} />;

const renderItem = ({ item, index, navigation }) => (
  <Layout style={styles.item}>
    <Image
      style={{ resizeMode: "contain" }}
      source={require("../../Rectangle_164.png")}
      onPress={() => navigation.navigate("Build My Shop")}
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
        {item.product}
      </Text>
      <Text>{item.price}</Text>
    </Layout>
    <Layout
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
        alignSelf: "flex-start",
      }}
    >
      <Avatar
        size="small"
        source={require("../../avatar-icon.png")}
        style={{ marginRight: 8 }}
      />
      <Text
        style={{ fontSize: 13, fontWeight: "bold", color: "rgb(138,18,20)" }}
      >
        {item.shop}
      </Text>
    </Layout>
  </Layout>
);

const Category = ({ route, navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log(route.params)
    getProductsFromCategory(route.params.categoryId, setProducts);
  }, [products]);

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
          data={products}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={renderItem}
          style={{
            backgroundColor: "transparent",
            flex: 1,
          }}
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
