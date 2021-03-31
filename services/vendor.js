import * as firebase from "firebase";
import "firebase/firestore";

export const vendorApply = (
  shopDetails,
  validIdImage,
  certImage,
  avatar,
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
  const avatarRef = storage.child(`vendor-images/${currentUserUID}.jpg`);

  let idImageUrl;
  let certImageUrl;
  let avatarUrl;

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
                if (avatar) {
                  avatarRef.put(avatar).then(() => {
                    avatarRef
                      .getDownloadURL()
                      .then((url) => {
                        avatarUrl = url;
                      })
                      .then(() => {
                        const vendorDetails = {
                          ...shopDetails,
                          validID: idImageUrl,
                          DTICert: certImageUrl,
                          avatarUrl,
                          isApproved: false,
                        };

                        db.collection("vendor-profiles")
                          .doc(currentUserUID)
                          .set(vendorDetails)
                          .then(() => callback());
                      });
                  });
                } else {
                  const vendorDetails = {
                    ...shopDetails,
                    validID: idImageUrl,
                    DTICert: certImageUrl,
                    isApproved: false,
                  };

                  db.collection("vendor-profiles")
                    .doc(currentUserUID)
                    .set(vendorDetails)
                    .then(() => callback());
                }
              });
          });
        });
    })
    .catch((e) => console.log(e));
};

export const getShopDetails = (callback) => {
  const db = firebase.firestore();
  const auth = firebase.auth();
  const currentUserUID = auth.currentUser.uid;

  db.collection("vendor-profiles")
    .doc(currentUserUID)
    .get()
    .then((vendor) => {
      const shop = {
        ...vendor.data().shop,
        avatarUrl: vendor.data().avatarUrl,
      }
      callback({ ...vendor.data(), shop, id: vendor.id });
    })
    .catch((e) => console.log(e));
};

export const getShopDetailsByUID = (uid, callback) => {
  const db = firebase.firestore();

  db.collection("vendor-profiles")
    .doc(uid)
    .get()
    .then((vendor) => {
      callback({
        ...vendor.data().shop,
        id: vendor.id,
        ...vendor.data().avatarUrl,
      });
    })
    .catch((e) => console.log(e));
};

export const getShopDetailsByManyUID = (uids, callback) => {
  const db = firebase.firestore();

  db.collection("vendor-profiles")
    .where(firebase.firestore.FieldPath.documentId(), "in", uids)
    .get()
    .then((vendors) =>
      vendors.docs.map((vendor) => ({ id: vendor.id, ...vendor.data().shop }))
    )
    .then((vendors) => {
      callback(vendors);
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
