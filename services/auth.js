import * as firebase from "firebase";
import "firebase/firestore";

export const loginUser = (
  email,
  password,
  setMessage,
  navigation,
  callback
) => {
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          setMessage("Authenticated User!");
          //console.log(user);
          navigation.reset({
            index: 0,
            routes: [{ name: "DashNav" }], // Designated main page
          });
          callback();
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          setMessage(error.message);
          callback();
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
      setMessage(error.message);
      callback();
    });
};

export const signOutUser = async (navigation) => {
  try {
    await firebase.auth().signOut();
    navigation.reset({
      index: 0,
      routes: [{ name: "Welcome" }],
    });
  } catch (error) {
    console.log(error);
  }
};

export const checkAuthenticated = (setUser, navigation) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: "Welcome" }],
      });
    }
  });
};

export const authOnOpen = (navigation) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      navigation.reset({
        index: 0,
        routes: [{ name: "DashNav" }],
      });
    }
  });
};

export const getUserID = (callback) => {
  const auth = firebase.auth();
  const currentUserUID = auth.currentUser.uid;
  callback(currentUserUID);
};
