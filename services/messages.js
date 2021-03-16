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
    // chatOwnersRef.set({ contacts: [toUID, currentUserUID] });
    // sendMessage(toUID, content, chatroomId, callback);
  });
};

export const sendMessage = (messageDetails, chatroomId, callback) => {
  const auth = firebase.auth();
  const db = firebase.firestore();
  const currentUserUID = auth.currentUser.uid;

  const { createdAt, text, user } = messageDetails;

  const batch = db.batch();

  const chatRoomRef = db
    .collection("chat-rooms")
    .doc(chatroomId)
    .collection("messages")
    .doc();
  batch.set(chatRoomRef, messageDetails);

  const chatOwnerCurrentRef = db
    .collection("chat-owners")
    .doc(currentUserUID)
    .collection("chatrooms")
    .doc(chatroomId);
  batch.update(chatOwnerCurrentRef, { text, createdAt });

  const chatOwnerOtherRef = db
    .collection("chat-owners")
    .doc(user._id)
    .collection("chatrooms")
    .doc(chatroomId);
  batch.update(chatOwnerOtherRef, { text, createdAt });

  batch
    .commit()
    .then((results) => {
      // console.log(results);
      callback(results);
    })
    .catch((e) => console.log(e));
};

export const readChatroom = (chatroomId, callback) => {
  const db = firebase.firestore();

  db.collection("chat-rooms")
    .doc(chatroomId)
    .collection("messages")
    .orderBy("createdAt", "desc")
    .limit(20)
    .onSnapshot((querySnapshot) => {
      var messages = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(data.createdAt.toDate());
        messages.push({
          ...data,
          id: doc.id,
          createdAt: data.createdAt.toDate(),
        });
      });
      console.log(messages);
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
