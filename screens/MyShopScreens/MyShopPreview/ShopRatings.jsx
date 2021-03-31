import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Rating } from "react-native-elements";
import { Layout, Text, Divider, Avatar, List } from "@ui-kitten/components";

const dateToString = (date) => {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  return month + "/" + day + "/" + year;
};

const RatingNav = ({ reviews, avatars }) => {
  return (
    <Layout style={styles.container}>
      <List
        data={reviews}
        renderItem={(props) => renderItemRatings({ ...props, avatars })}
        style={{ marginHorizontal: 12 }}
      />
    </Layout>
  );
};

const renderItemRatings = ({ item, index, avatars }) => (
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
          source={
            avatars[item.userId]
              ? { uri: avatars[item.userId] }
              : require("../../avatar-icon.png")
          }
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
