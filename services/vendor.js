import * as firebase from "firebase";
import "firebase/firestore";

export const vendorApply = (
  certImage,
  idImage,
  certDetails,
  shopDetails,
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
    .put(idImage)
    .then(() => {
      idImageRef.getDownloadURL().then((url) => (idImageUrl = url));
    })
    .then(() => {
      certImageRef.put(certImage).then(() => {
        idImageRef.getDownloadURL().then((url) => (idImageUrl = url));
      });
    })
    .then(() => {
      const vendorDetails = {
        ...shopDetails,
      };

      db.collection("vendor-profiles")
        .doc(currentUserUID)
        .set(vendorDetails)
        .then(() => console.log("Created Profile"));
    })
    .then(() => {
      const appDetails = {
        ...certDetails,
        idImage: idImageUrl,
        certImage: certImageUrl,
      };

      db.collection("vendor-applications")
        .doc(currentUserUID)
        .set(appDetails)
        .then((application) => {
          callback(application);
        })
        .catch((e) => console.log(e));
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
      if (vendor.approved) {
        callback(vendor);
      } else {
        callback(false);
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
