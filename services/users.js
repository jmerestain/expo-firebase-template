import * as firebase from "firebase";
import "firebase/firestore";

export const createUserAndProfile = (
  email,
  password,
  userDetails,
  avatar,
  setMessage,
  callback
) => {
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(({ user }) => {
          createUserProfile(user.uid, userDetails, avatar, callback);
          setMessage("Registered user!");
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

export const createUserProfile = (
  currentUserUID,
  userDetails,
  image,
  callback
) => {
  const db = firebase.firestore();
  const storage = firebase.storage();
  const storageRef = storage.ref();
  const imageId = Date.now();
  const avatarRef = storageRef.child(`avatars/${currentUserUID}/imageId.jpg`);
  let imageUrl;

  if (image) {
    avatarRef
      .put(image)
      .then(() => {
        avatarRef
          .getDownloadURL()
          .then((url) => {
            imageUrl = url;
          })
          .then(() => {
            const userData = {
              ...userDetails,
              avatarId: imageId,
              avatarUrl: imageUrl,
            };
            db.collection("user-profiles")
              .doc(currentUserUID)
              .set(userData)
              .then(() => {
                callback();
                // navigation.reset({
                //   index: 0,
                //   routes: [{ name: "DashNav" }], // Designated main page
                // });
              });
          })
          .catch((e) => {
            const errorCode = e.code;
            console.log(e.message);
            console.log(errorCode);
            callback();
          });
      })
      .catch((e) => {
        const errorCode = e.code;
        console.log(e.message);
        console.log(errorCode);
        callback();
      });
  } else {
    db.collection("user-profiles")
      .doc(currentUserUID)
      .set(userDetails)
      .then(() => {
        callback();
        // navigation.reset({
        //   index: 0,
        //   routes: [{ name: "DashNav" }], // Designated main page
        // });
      })
      .catch((e) => {
        const errorCode = e.code;
        console.log(e.message);
        console.log(errorCode);
        callback();
      });
  }
};

export const getUserProfile = (uid, callback) => {
  const db = firebase.firestore();
  db.collection("user-profiles")
    .doc(uid)
    .get()
    .then((userProfile) => callback({ id: uid, ...userProfile.data() }))
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
    });
};

export const getAvatars = (uids, callback) => {
  const db = firebase.firestore();
  const avatarUrls = {};

  Promise.all(
    uids.map((uid) => {
      db.collection("user-profiles")
        .doc(uid)
        .get()
        .then((userProfile) => {
          const userData = userProfile.data();
          if (userData.avatarUrl) {
            avatarUrls[userProfile.id] = userData.avatarUrl;
          }
        });
    })
  )
    .then(() => {
      callback(avatarUrls);
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
    });
};

export const getCurrentUserFromUID = (callback) => {
  const auth = firebase.auth();
  const db = firebase.firestore();
  const { uid, givenPhotoURL, email } = auth.currentUser;

  db.collection("user-profiles")
    .doc(uid)
    .get()
    .then((userProfile) =>
      callback({
        id: uid,
        ...((givenPhotoURL && { photoURL: givenPhotoURL }) || null),
        ...userProfile.data(),
        email,
      })
    )
    .catch((e) => console.log(e));
};

export const updateUserProfile = (body, callback) => {
  const auth = firebase.auth();
  const db = firebase.firestore();
  const currentUserUID = auth.currentUser.uid;

  db.collection("user-profiles")
    .doc(currentUserUID)
    .update(body)
    .then(() => callback("Successfully updated your details!"))
    .catch((e) => {
      callback(
        "Could not update your details because of the following: " + e.message
      );
    });
};

export const updateUser = (body, callback) => {
  const auth = firebase.auth();
  const db = firebase.firestore();
  const currentUser = auth.currentUser;
  const { email, password, username } = body;

  Promise.all([
    currentUser.updateEmail(email),
    password && currentUser.updatePassword(password),
    db.collection("user-profiles").doc(currentUser.uid).update({ username }),
  ])
    .then(() => {
      callback("Successfully updated your details!");
    })
    .catch((e) => {
      callback(
        "Could not update your details because of the following: " + e.message
      );
    });
};
