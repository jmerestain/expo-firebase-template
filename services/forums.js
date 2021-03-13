import * as firebase from "firebase";
import "firebase/firestore";

export const createGroup = (groupName, description, callback) => {
  const db = firebase.firestore();
  const auth = firebase.auth();

  const currentUserUID = auth.currentUser.uid;

  const groupList = db.collection("groups");

  const groupDetails = {
    name: groupName,
    description,
    creator: currentUserUID,
  };

  groupList.add(groupDetails).then((groupRef) => {
    groupRef
      .collection("members")
      .doc(currentUserUID)
      .set({ user: currentUserUID, joined: Date.now() });
  });
};

// export const createGroup = (groupName, image, description, callback) => {
//   const db = firebase.firestore();
//   const storage = firebase.storage().ref();
//   const auth = firebase.auth();

//   const currentUserUID = auth.currentUser.uid;
//   const groupImageRef = storage.child(`group-images/${groupName}.jpg`);

//   const groupList = db.collection("groups");

//   groupImageRef
//     .put(image)
//     .then(() => {
//       groupImageRef
//         .getDownloadURL()
//         .then((url) => {
//           const groupDetails = {
//             name: groupName,
//             description,
//             image: url,
//             creator: currentUserUID,
//           };
//           groupList.add(groupDetails).then((groupRef) => {
//             groupRef
//               .collection("members")
//               .doc(currentUserUID)
//               .set({ user: currentUserUID, joined: Date.now() });
//           });
//         })
//         .catch((e) => console.log(e));
//     })
//     .catch((e) => console.log(e));
// };

export const joinGroup = (groupId, callback) => {
  const db = firebase.firestore();
  const auth = firebase.auth();

  const currentUserUID = auth.currentUser.uid;
  let groupMeta;

  db.collection("groups")
    .where("id", "==", groupId)
    .limit(1)
    .then((documents) => {
      groupMeta = documents[0];

      groupMeta
        .collection("members")
        .doc(currentUserUID)
        .set({ user: currentUserUID, joined: Date.now() })
        .then((group) => callback(group));
    });
};

// export const createTopic = (groupId, topicDetails, callback) => {
//   const db = firebase.firestore();
//   let groupMeta;

//   db.collection("groups")
//     .where("id", "==", groupId)
//     .limit(1)
//     .then((documents) => {
//       groupMeta = documents[0];

//       groupMeta
//         .collection("topics")
//         .add(topicDetails)
//         .then((topic) => {
//           topic
//             .set({ id: topic.id }, { merge: true })
//             .then((topic) => callback(topic));
//         })
//         .catch((e) => console.log(e));
//     })
//     .catch((e) => console.log(e));
// };

export const createPost = (groupId, post, callback) => {
  const db = firebase.firestore();
  const auth = firebase.auth();
  const currentUserUID = auth.currentUser.uid;

  db.collection("groups")
    .doc(groupId)
    .collection("posts")
    .add({ ...post, user: currentUserUID })
    .then((postRef) => {
      console.log(postRef.id);
      // callback(postRef.get());
    })
    .catch((e) => console.log(e));
};

export const readPosts = (groupId, callback) => {
  const db = firebase.firestore();

  console.log("Group: " + groupId);

  db.collection("groups")
    .doc(groupId)
    .collection("posts")
    .onSnapshot((querySnapshot) => {
      var posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() });
      });
      callback(posts);
    });
};

export const getGroups = (callback) => {
  const db = firebase.firestore();

  db.collection("groups").onSnapshot((querySnapshot) => {
    var groups = [];
    querySnapshot.forEach((doc) => {
      // const memberCount = doc.ref.collection("members").get();
      // const postCount = doc.ref.collection("posts").get();
      // groups.push({ id: doc.id, ...doc.data(), memberCount, postCount });
      groups.push({ id: doc.id, ...doc.data() });
    });
    callback(groups);
  });
};
