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

export const postReview = (vendorId, productId, review, callback) => {
  const db = firebase.firestore();
  const auth = firebase.auth();
  const currentUserUID = auth.currentUser.uid;
  const batch = db.batch();

  const finalReview = {
    ...review,
    userId: currentUserUID,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  };

  const vendorRef = db
    .collection("vendor-profiles")
    .doc(vendorId)
    .collection("reviews")
    .doc();
  batch.set(vendorRef, finalReview);

  const productRef = db
    .collection("products")
    .doc(productId)
    .collection("reviews")
    .doc();
  batch.set(productRef, finalReview);

  batch
    .commit()
    .then(() => {
      callback("Successfully rated the product!");
    })
    .catch((e) => {
      callback("Was not able to rate the product due to an error.");
    });
};
