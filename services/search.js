import * as firebase from "firebase";
import "firebase/firestore";

// Search through products, users and vendors
// Still inefficent: has to load the whole dataset before filtering
export const searchFromData = (query, callback) => {
  const db = firebase.firestore();
  const lowercaseQuery = query.toLowerCase();

  Promise.all([
    db
      .collection("products")
      .get()
      .then((products) =>
        products.docs
          .map((product) => ({
            id: product.id,
            ...product.data(),
            type: "product",
          }))
          .filter(
            (product) =>
              product.title &&
              product.title.toLowerCase().includes(lowercaseQuery)
          )
      ),
    db
      .collection("vendor-profiles")
      .get()
      .then((vendors) =>
        vendors.docs
          .map((vendor) => ({
            id: vendor.id,
            ...vendor.data(),
            type: "vendor",
          }))
          .filter(
            (vendor) =>
              vendor.shop &&
              vendor.shop.name.toLowerCase().includes(lowercaseQuery) &&
              vendor.isApproved
          )
      ),
  ])
    .then((results) => {
      callback(results.flat());
    })
    .catch((e) => console.log(e));
};
