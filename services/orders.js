import * as firebase from "firebase";
import "firebase/firestore";
import { ORDER_IN_CART } from "../screens/orderStatuses";

export const getOrder = (id, callback) => {
  const db = firebase.firestore();

  db.collection("orders")
    .doc(id)
    .get()
    .then((order) => callback({ id: order.id, ...order.data() }))
    .catch((e) => console.log(e));
};

export const getOrdersCurrentUser = (status, callback) => {
  const db = firebase.firestore();
  const auth = firebase.auth();
  const currentUserUID = auth.currentUser.uid;

  db.collection("orders")
    .where("user", "==", currentUserUID)
    .where("status", "==", status)
    .onSnapshot((querySnapshot) => {
      var orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      callback(orders);
    });
};

export const getOrdersCurrentUserPerVendor = (status, vendor, callback) => {
  const db = firebase.firestore();
  const auth = firebase.auth();
  const currentUserUID = auth.currentUser.uid;

  db.collection("orders")
    .where("status", "==", status)
    .where("user", "==", currentUserUID)
    .where("product.vendorId", "==", vendor)
    .onSnapshot((querySnapshot) => {
      var orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      callback(orders);
    });
};

export const getOrdersUnderCurrentVendor = (status, callback) => {
  const db = firebase.firestore();
  const auth = firebase.auth();
  const currentUserUID = auth.currentUser.uid;

  db.collection("orders")
    .where("status", "==", status)
    .where("product.vendorId", "==", currentUserUID)
    .onSnapshot((querySnapshot) => {
      var orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      callback(orders);
    });
};

export const newOrder = (productDetails, userName, callback) => {
  const db = firebase.firestore();
  const auth = firebase.auth();
  const currentUserUID = auth.currentUser.uid;

  const order = {
    product: productDetails,
    quantity: 1,
    user: currentUserUID,
    userName,
    status: ORDER_IN_CART,
  };

  db.collection("orders")
    .add(order)
    .then((orderRef) => {
      callback(orderRef.id)
    })
    .catch((e) => console.log(e));
};

export const updateOrderStatus = (orderId, status, callback) => {
  const db = firebase.firestore();

  db.collection("orders")
    .doc(orderId)
    .update({ status: status }, { merge: true })
    .then((order) => callback(order))
    .catch((e) => console.log(e));
};

export const updateMultipleOrderStatus = (orderIds, orderDetails, callback) => {
  const db = firebase.firestore();

  const batch = db.batch()

  orderIds.forEach(id => {
    const orderRef = db.collection("orders").doc(id);
    batch.update(orderRef, orderDetails);
  })

  batch
    .commit()
    .then(() => {
      callback();
    })
    .catch((e) => console.log(e));
};

const completeOrder = (orderId, callback) => {
  const db = firebase.firestore();

  db.collection("orders")
    .doc(orderId)
    .set({ status: 6 }, { merge: true })
    .then((order) => callback(order))
    .catch((e) => console.log(e));
};

export const newTransaction = (orderId, payment, callback) => {
  const db = firebase.firestore();
  const auth = firebase.auth();
  const currentUserUID = auth.currentUser;

  const transactionObject = {
    customer: currentUserUID,
    orderId,
    created_at: Date.now(),
    payment_method: payment,
  };

  db.collection("pending-transactions")
    .add(transactionObject)
    .then((ref) => {
      ref
        .set({ id: ref.id }, { merge: true })
        .then((transaction) => callback(transaction));
    });
};

export const buyFromOrders = (orderId, payment, callback) => {
  const db = firebase.firestore();

  db.collection("orders")
    .where("id", "==", orderId)
    .limit(1)
    .then((documents) => {
      const order = documents[0];
      order.set({ status: 2 }).then((order) => {
        completeOrder(order.id, (order) => {
          newTransaction(order.id, payment, (transaction) => {
            callback(transaction);
          });
        });
      });
    });
};

export const buyNow = (productId, payment, callback) => {
  const db = firebase.firestore();

  db.collection("products")
    .where("id", "==", productId)
    .limit(1)
    .then((documents) => {
      const product = documents[0];
      newOrder(product.id, (order) => {
        completeOrder(order.id, (order) => {
          newTransaction(order.id, payment, (transaction) => {
            callback(transaction);
          });
        });
      });
    });
};
