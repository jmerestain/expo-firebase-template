import * as firebase from "firebase";
import "firebase/firestore";

export const vendorApply = (
  shopDetails,
  validIdImage,
  certImage,
  callback
) => {
  const db = firebase.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage().ref();

  const currentUserUID = auth.currentUser.uid;
  const idImageRef = storage.child(`id-images/${currentUserUID}.jpg`);
  const certImageRef = storage.child(
    `certificate-images/${currentUserUID}.jpg`
  );

  let idImageUrl;
  let certImageUrl;

  idImageRef
    .put(validIdImage)
    .then(() => {
      idImageRef
        .getDownloadURL()
        .then((url) => {
          idImageUrl = url;
        })
        .then(() => {
          certImageRef.put(certImage).then(() => {
            certImageRef
              .getDownloadURL()
              .then((url) => {
                certImageUrl = url;
              })
              .then(() => {
                const vendorDetails = {
                  ...shopDetails,
                  validID: idImageUrl,
                  DTICert: certImageUrl,
                  isApproved: false,
                };

                db.collection("vendor-profiles")
                  .doc(currentUserUID)
                  .set(vendorDetails)
                  .then(() => callback())
              });
            ;
          });
        })
    })
    .catch((e) => console.log(e));
};

export const vendorApplyStatus = (callback) => {
  const db = firebase.firestore();
  const auth = firebase.auth();
  const currentUserUID = auth.currentUser.uid;

  db.collection("vendor-profiles")
    .doc(currentUserUID)
    .get()
    .then((vendor) => {
      if (vendor.exists) {
        callback(vendor.data().isApproved ? "approved" : "pending");
      } else {
        // Vendor hasn't applied
        callback("none");
      }
    });
};

export const vendorConfirmTransaction = (orderId, callback) => {
  const db = firebase.firestore();

  updateOrder(orderId, 2, (order) => {
    db.collection("completed-transactions")
      .doc(order.id)
      .set(order)
      .then((transaction) => callback(transaction));
  });
};

export const vendorUpdateOrder = (orderId, status, callback) => {
  updateOrder(orderId, status, () => callback());
};
