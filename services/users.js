import * as firebase from "firebase";
import "firebase/firestore";

export const createUser = (email, password, setMessage, navigation) => {
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          setMessage("Registered user!");
          navigation.navigate("Registration Details", { uid: user.uid });
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
    .then(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "DashNav" }], // Designated main page
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
    });
};

export const getUserFromUID = (uid, callback) => {
  const db = firebase.firestore();
  db.collection("users")
    .where("uid", "==", uid)
    .get()
    .then((user) => callback(user))
    .catch((e) => console.log(e));
};