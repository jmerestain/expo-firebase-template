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
        style={{ resizeMode: "cover", height: 160, width: 160 }}
        source={{ uri: item.imageUrl }}
      />
      <Layout style={{ alignSelf: "flex-start" }}>
      <Text category="s1" style={{ fontWeight: "bold", marginVertical: 6, fontFamily: "NunitoSans-Bold", color: '#000' }}>
          {item.title}
        </Text>
        <Text category="s2" style={{paddingBottom: 8}}>P {parseFloat(item.price).toFixed(2)}</Text>
        {/*<Text category="s2" style={{ marginVertical: 4, color: '#00000070', fontFamily: "NunitoSans-Regular" }}>{item.vendor}</Text>*/}
      </Layout>
    </TouchableOpacity>
    <Layout
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
        alignSelf: "flex-start",
      }}
    >
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
    getProductsFromCategory(route.params.categoryId, setProducts);
  }, []);

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
          renderItem={(props) => renderItem({...props, navigation})}
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
