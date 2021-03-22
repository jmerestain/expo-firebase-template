import * as firebase from "firebase";
import "firebase/firestore";

export const startChat = (toUID, toName, fromName, isVendorChat, callback) => {
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

  const batch = db.batch();

  const currentOwnerRef = db
    .collection("chat-owners")
    .doc(currentUserUID)
    .collection("chatrooms")
    .doc(chatroomId);
  batch.set(currentOwnerRef, {
    recipientName: toName,
    recipient: toUID,
    isVendorChat: false,
  });

  const otherOwnerRef = db
    .collection("chat-owners")
    .doc(toUID)
    .collection("chatrooms")
    .doc(chatroomId);
  batch.set(otherOwnerRef, {
    recipientName: fromName,
    recipient: currentUserUID,
    isVendorChat: false,
  });

  const chatRoomRef = db.collection("chat-rooms").doc(chatroomId);
  batch.set(chatRoomRef, {
    contacts: [toUID, currentUserUID],
  });

  batch
    .commit()
    .then(() => {
      callback(chatroomId);
    })
    .catch((e) => console.log(e));
};

export const sendMessage = (
  recipientId,
  messageDetails,
  chatroomId,
  callback
) => {
  const auth = firebase.auth();
  const db = firebase.firestore();
  const currentUserUID = auth.currentUser.uid;

  if (!(user in messageDetails)) {
    messageDetails.user = {
      _id: currentUserUID,
    };
  }

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
    .doc(recipientId)
    .collection("chatrooms")
    .doc(chatroomId);
  batch.update(chatOwnerOtherRef, { text, createdAt });

  batch
    .commit()
    .then(() => {
      callback(chatroomId);
    })
    .catch((e) => console.log(e));
};

export const readChatroom = (chatroomId, callback) => {
  const db = firebase.firestore();

  var unsubscribe = db.collection("chat-rooms")
    .doc(chatroomId)
    .collection("messages")
    .orderBy("createdAt", "desc")
    .limit(20)
    .onSnapshot((querySnapshot) => {
      var messages = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        messages.push({
          ...data,
          id: doc.id,
          createdAt: data.createdAt.toDate(),
        });
      });
      callback(messages);
    });
  
    return unsubscribe;
};

export const getInbox = (isVendorInbox, callback) => {
  const db = firebase.firestore();
  const auth = firebase.auth();
  const uid = auth.currentUser.uid;

  var unsubscribe = db
    .collection("chat-owners")
    .doc(uid)
    .collection("chatrooms")
    .where("isVendorChat", "==", isVendorInbox)
    .orderBy("createdAt", "desc")
    .onSnapshot((querySnapshot) => {
      var chatrooms = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        chatrooms.push({
          ...doc.data(),
          id: doc.id,
          createdAt: data.createdAt.toDate(),
        });
      });
      callback(chatrooms);
    });

  return unsubscribe;
};
