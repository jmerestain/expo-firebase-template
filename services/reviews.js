import * as firebase from "firebase";
import "firebase/firestore";

export const getReviewsByProduct = (productId, callback) => {
  const db = firebase.firestore();
  db.collection("products")
    .doc(productId)
    .collection("reviews")
    .orderBy("createdAt", "desc")
    .limit(5)
    .get()
    .then((reviews) =>
      callback(
        reviews.docs.map((review) => ({ id: review.id, ...review.data() }))
      )
    )
    .catch((e) => console.log(e));
};

export const getReviewsByVendor = (vendorId, callback) => {
  const db = firebase.firestore();
  db.collection("vendor-profiles")
    .doc(vendorId)
    .collection("reviews")
    .orderBy("createdAt", "desc")
    .get()
    .then((reviews) =>
      callback(
        reviews.docs.map((review) => ({ id: review.id, ...review.data() }))
      )
    )
    .catch((e) => console.log(e));
};

export const postReview = (vendorId, productId, review, callback) => {
  const db = firebase.firestore();
  const auth = firebase.auth();
  const currentUserUID = auth.currentUser.uid;

  const finalReview = {
    ...review,
    userId: currentUserUID,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  };

  const vendorAvgRef = db.collection("vendor-profiles").doc(vendorId);
  const vendorRef = db
    .collection("vendor-profiles")
    .doc(vendorId)
    .collection("reviews")
    .doc();
  const productRef = db
    .collection("products")
    .doc(productId)
    .collection("reviews")
    .doc();

  db.runTransaction((transaction) => {
    return transaction.get(vendorAvgRef).then((vendorDoc) => {
      const oldAverageRating = vendorDoc.data().averageRating;
      if (oldAverageRating) {
        const { numRatings, avgRating } = oldAverageRating;
        const newAverageRating = {
          numRatings: numRatings + 1,
          avgRating:
            (avgRating * numRatings + review.rating) / (numRatings + 1),
        };
        transaction.update(vendorAvgRef, {
          shop: { ...vendorDoc.data().shop, averageRating: newAverageRating },
        });
      } else {
        const newAverageRating = {
          numRatings: 1,
          avgRating: review.rating,
        };
        transaction.update(vendorAvgRef, { averageRating: newAverageRating });
      }
      transaction.set(vendorRef, finalReview);
      transaction.set(productRef, finalReview);
    });
  })
    .then(() => {
      callback("Successfully rated the product!");
    })
    .catch((e) => {
      console.log(e);
      callback("Was not able to rate the product due to an error.");
    });
};
