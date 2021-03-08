import * as firebase from "firebase";
import "firebase/firestore";

export const getReviews = (productId, callback) => {
  const db = firebase.firestore();
  db.collection("reviews")
    .where("productId", "==", productId)
    .get()
    .then((reviews) => callback(reviews))
    .catch((e) => console.log(e));
};

export const postReview = (review, callback) => {
  const db = firebase.firestore();
  db.collection("reviews")
    .add(review)
    .then((reviewRef) => {
      reviewRef
        .set({ id: ref.id }, { merge: true })
        .then((review) => callback(review))
        .catch((e) => console.log(e));
    })
    .catch((e) => console.log(e));
};
