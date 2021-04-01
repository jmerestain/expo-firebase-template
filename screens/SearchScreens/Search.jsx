import React, { useState, useEffect } from "react";
import {
  Layout,
  Button,
  Text,
  List,
  Card,
  Avatar,
  Divider,
  Input,
  Icon,
} from "@ui-kitten/components";
import { StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { searchFromData } from "../../services/search";

const SearchIcon = (props) => <Icon name="search-outline" {...props} />;

const RenderItem = ({ item, navigation }) => (
  <ScrollView>
    <Layout style={styles.containerTop}>
      <Layout style={styles.inner}>
        <TouchableOpacity
          onPress={() =>
            item.type == "product"
              ? navigation.navigate("Product", {
                  productId: item.id,
                  title: item.title,
                })
              : item.type == "vendor"
              ? navigation.navigate("Vendor Shop", {
                  vendorName: item.shop.name,
                  vendorId: item.id,
                })
              : null
          }
        >
          <Layout style={styles.containerList}>
            <Layout style={styles.innerList}>
              <Image
                style={{
                  resizeMode: "cover",
                  height: 80,
                  width: 80,
                  marginHorizontal: 18,
                  borderRadius: 4,
                }}
                source={{ uri: item.imageUrl || item.avatarUrl }}
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
                  {item.type == "product"
                    ? item.title
                    : item.shop
                    ? item.shop.name
                    : ""}
                </Text>
                <Text
                  category="s2"
                  style={{
                    alignContent: "center",
                    marginVertical: 2,
                    color: "#000000",
                  }}
                >
                  {item.type == "product"
                    ? "P" + item.price
                    : item.shop
                    ? item.shop.owner
                    : ""}
                </Text>
                {item.type == "product" && (
                  <Text
                    category="s2"
                    style={{
                      alignContent: "center",
                      marginVertical: 2,
                      color: "#00000060",
                      fontFamily: "NunitoSans-Regular",
                      fontSize: 12,
                    }}
                  >
                    {item.stock} left
                  </Text>
                )}
              </Layout>
            </Layout>
          </Layout>
        </TouchableOpacity>
      </Layout>
      <Divider />
    </Layout>
  </ScrollView>
);

const Search = ({ navigation, route }) => {
  const [results, setResults] = useState({});
  const [query, setSearch] = useState("");

  useEffect(() => {
    if (route.params.query) {
      setSearch(route.params.query);
      searchFromData(route.params.query, setResults);
    }
  }, []);

  console.log(results);

  return (
    <Layout style={styles.container}>
      <Layout style={styles.field}>
        <Input
          onChangeText={(value) => setSearch(value)}
          defaultValue={query}
          onSubmitEditing={() => searchFromData(query, setResults)}
          placeholder="Search here"
          accessoryLeft={SearchIcon}
          style={{
            marginHorizontal: 20,
            marginTop: 12,
            marginBottom: 8,
          }}
        />
        <Divider />
        <List
          data={results}
          renderItem={(props) => RenderItem({ ...props, navigation })}
          style={{ marginBottom: 145 }}
        />
      </Layout>
      <Layout
        style={{
          flex: 1,
          minWidth: "100%",
          elevation: 3,
          borderColor: "rgb(250,250,250)",
          position: "absolute",
          left: 0,
          bottom: 0,
        }}
      ></Layout>
    </Layout>
  );
};

{
  /*const RenderItem = ({item}) => {
    const {title, description, price} = item;
    return (
     <Card>
         <Text category='h4'>
            {title}
         </Text>
         <Text>
            {description}
         </Text>
         <Text>
            {price}
         </Text>
     </Card>  
    )
}*/
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  avatar: {
    alignItems: "center",
    margin: 16,
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
  containerTop: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  containerList: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginVertical: 8,
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
});

export default Search;
