import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Rating } from "react-native-elements";
import { Layout, Text, Divider, Avatar, List } from "@ui-kitten/components";
import { getReviewsByVendor } from "../../../services/reviews";

const dateToString = (date) => {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  return month + "/" + day + "/" + year;
};

const data = new Array(8).fill({
  name: "Bea's Bakery",
  location: "Cabanatuan, Nueva Ecija",
  shopRating: "3.5",
  totalProducts: "12",
  totalFollowers: "234",
  product: "Cheeseburger",
  price: "P150",
  rating: 5,
  review:
    "Very responsive, good service. Carrot cake came just in time for my sister’s birthday.",
  ratedBy: "Nelly Cruz",
  dateReviewed: "01/11/21",
});

const RatingNav = ({ vendorId, setRating }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviewsByVendor(vendorId, setReviews);
  }, []);

  // console.log(reviews);

  return (
    <Layout style={styles.container}>
      <List
        data={reviews}
        renderItem={renderItemRatings}
        style={{ marginHorizontal: 12 }}
      />
    </Layout>
  );
};

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
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 2 }}>
            {item.userName}
          </Text>
          <Text style={{ fontSize: 10, color: "rgb(186,186,186)" }}>
            {dateToString(item.createdAt.toDate())}
          </Text>
        </Layout>
      </Layout>
      <Layout style={{ marginLeft: "25%" }}>
        <Rating
          type="custom"
          startingValue={item.rating}
          style={{ paddingVertical: 16 }}
          ratingColor="rgb(210,145,91)"
          imageSize={13}
          readonly
        />
      </Layout>
      <Layout></Layout>
    </Layout>
    <Text style={{ marginBottom: 16 }}>{item.comments}</Text>
    <Divider />
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  item2: {
    paddingBottom: 10,
    paddingHorizontal: 16,
    alignItems: "stretch",
    flexDirection: "column",
  },
});

export default RatingNav;
