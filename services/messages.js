import * as firebase from "firebase";
import "firebase/firestore";

export const sendPersonalMessages = (toUID, message, callback) => {
  const auth = firebase.auth();
  const db = firebase.firestore();
  const currentUserUID = auth.currentUser.uid;
  const personalMessage = {
    message,
    timestamp: Date.now(),
  };
  db.collection("personal-messages")
    .doc(toUID)
    .collection(currentUserUID)
    .add(personalMessage)
    .then(callback());
};

export const readPersonalMessages = (senderUID, callback) => {
  const auth = firebase.auth();
  const db = firebase.firestore();
  const currentUserUID = auth.currentUser.uid;
  db.collection("personal-messages").doc(currentUserUID).collection(senderUID);
};

export const getInbox = (userUID, callback) => {
  const db = firebase.firestore();
  db.collection("inboxes")
    .doc(userUID)
    .onSnapshot((inbox) => {
      callback(inbox);
    });
};

export const putInbox = (userUID, callback) => {
  const auth = firebase.auth();
  const db = firebase.firestore();
  const currentUserUID = auth.currentUser.uid;
  db.collection("inboxes")
    .doc(userUID)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const oldInbox = doc.data()[users];
        let newInbox;
        if (!oldInbox.includes(currentUserUID)) {
          newInbox = {
            users: [...oldInbox, currentUserUID],
          };
        } else {
          newInbox = oldInbox;
        }
        db.collection("inboxes")
          .doc(userUID)
          .set(newInbox)
          .then(callback())
          .catch((e) => console.log(e));
      } else {
        const inbox = {
          users: [currentUserUID],
        };
        db.collection("inboxes")
          .doc(userUID)
          .set(inbox)
          .then(callback())
          .catch((e) => console.log(e));
      }
    });
};
