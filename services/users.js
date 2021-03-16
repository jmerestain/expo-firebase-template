import * as firebase from "firebase";
import "firebase/firestore";

export const createUser = (email, password, setMessage, callback) => {
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          setMessage("Registered user!");
          callback(user.uid);
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          setMessage(error.message);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
      setMessage(error.message);
    });
};

export const createUserProfile = (userDetails, navigation) => {
  const auth = firebase.auth();
  const db = firebase.firestore();
  const currentUserUID = auth.currentUser.uid;
  db.collection("user-profiles")
    .doc(currentUserUID)
    .set(userDetails)
    // .then(() => {
    //   navigation.reset({
    //     index: 0,
    //     routes: [{ name: "DashNav" }], // Designated main page
    //   });
    // })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
    });
};

export const getUserProfile = (uid, callback) => {
  const auth = firebase.auth();
  const db = firebase.firestore();
  db.collection("user-profiles")
    .doc(uid)
    .get()
    .then((userProfile) =>
      callback({ id: uid, ...userProfile.data() })
    )
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
    });
};

export const getCurrentUserFromUID = (callback) => {
  const auth = firebase.auth();
  const db = firebase.firestore();
  const { uid, givenPhotoURL } = auth.currentUser;

  db.collection("user-profiles")
    .doc(uid)
    .get()
    .then((userProfile) =>
      callback({
        id: uid,
        ...((givenPhotoURL && { photoURL: givenPhotoURL }) || null),
        ...userProfile.data(),
      })
    )
    .catch((e) => console.log(e));
};
