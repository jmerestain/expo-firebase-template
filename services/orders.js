import * as firebase from "firebase";
import "firebase/firestore";

export const getOrder = (id, callback) => {
  const db = firebase.firestore();

  db.collection("orders")
    .doc(id)
    .get()
    .then((order) => callback({ id: order.id, ...order.data() }))
    .catch((e) => console.log(e));
};

export const getOrdersCurrentUser = (callback) => {
  const db = firebase.firestore();
  const auth = firebase.auth();
  const currentUserUID = auth.currentUser.uid;

  db.collection("orders")
    .where("user", "==", currentUserUID)
    .onSnapshot((querySnapshot) => {
      var orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      callback(orders);
    });
};

export const newOrder = (productDetails, callback) => {
  const db = firebase.firestore();
  const auth = firebase.auth();
  const currentUserUID = auth.currentUser.uid;

  const order = {
    product: productDetails,
    quantity: 1,
    user: currentUserUID,
    status: 1,
  };

  db.collection("orders")
    .add(order)
    .then((orderRef) => {
      callback(orderRef.id)
    })
    .catch((e) => console.log(e));
};

const updateOrder = (orderId, status, callback) => {
  const db = firebase.firestore();

  db.collection("orders")
    .doc(orderId)
    .set({ status: status }, { merge: true })
    .then((order) => callback(order))
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
