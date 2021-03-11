import * as firebase from "firebase";
import "firebase/firestore";

export const startChat = (toUID, toName, content, isVendorChat, callback) => {
  const auth = firebase.auth();
  const db = firebase.firestore();
  const currentUserUID = auth.currentUser.uid;
  let chatroomId;
  if (currentUserUID.localeCompare(toUID)) {
    chatroomId = `${currentUserUID}+${toUID}+${
      isVendorChat ? "shop" : "personal"
    }`;
  } else {
    chatroomId = `${toUID}+${currentUserUID}+${
      isVendorChat ? "shop" : "personal"
    }`;
  }

  const chatOwnersRef = db.collection("chat-rooms").doc(chatroomId);

  Promise.all([
    db
      .collection("chat-owners")
      .doc(currentUserUID)
      .collection("chatrooms")
      .doc(chatroomId)
      .set({ recipientName: toName, recipient: toUID, isVendorChat: false }),
    db
      .collection("chat-owners")
      .doc(toUID)
      .collection("chatrooms")
      .doc(chatroomId)
      .set({ recipientName: toName, recipient: currentUserUID, isVendorChat }),
  ]).then(() => {
    chatOwnersRef.set({ contacts: [toUID, currentUserUID] });
    sendMessage(toUID, content, chatroomId, callback);
  });
};

export const sendMessage = (toUID, content, chatroomId, callback) => {
  const auth = firebase.auth();
  const db = firebase.firestore();
  const currentUserUID = auth.currentUser.uid;

  const timestamp = Date.now();

  const personalMessage = {
    from: currentUserUID,
    to: toUID,
    content,
    timestamp,
  };

  Promise.all([
    db
      .collection("chat-rooms")
      .doc(chatroomId)
      .collection("messages")
      .add(personalMessage)
      .then((result) => callback({ ...personalMessage, id: result.id })),
    db
      .collection("chat-owners")
      .doc(currentUserUID)
      .collection("chatrooms")
      .doc(chatroomId)
      .update({ content, timestamp }),
    db
      .collection("chat-owners")
      .doc(toUID)
      .collection("chatrooms")
      .doc(chatroomId)
      .update({ content, timestamp }),
  ]);
};

export const readChatroom = (chatroomId, callback) => {
  const db = firebase.firestore();

  db.collection("chat-rooms")
    .doc(chatroomId)
    .collection("messages")
    .orderBy("timestamp", "desc")
    .limit(20)
    .onSnapshot((querySnapshot) => {
      var messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
      });
      callback(messages);
    });
};

export const getInbox = (isVendorInbox, callback) => {
  const db = firebase.firestore();
  const auth = firebase.auth();
  const uid = auth.currentUser.uid;

  db.collection("chat-owners")
    .doc(uid)
    .collection("chatrooms")
    .where("isVendorChat", "==", isVendorInbox)
    .orderBy("timestamp", "desc")
    .onSnapshot((querySnapshot) => {
      var chatrooms = [];
      querySnapshot.forEach((doc) => {
        chatrooms.push({ id: doc.id, ...doc.data() });
      });
      callback(chatrooms);
    });
};
