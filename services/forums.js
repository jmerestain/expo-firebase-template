import * as firebase from "firebase";
import "firebase/firestore";

export const createGroup = (groupName, image, description, callback) => {
  const db = firebase.firestore();
  const storage = firebase.storage().ref();
  const auth = firebase.auth();

  const currentUserUID = auth.currentUser.uid;
  const groupImageRef = storage.child(`group-images/${groupName}.jpg`);

  const groupList = db.collection("groups");
  const groupMeta = db.collection(`forum-${groupName}`);

  groupImageRef
    .put(image)
    .then(() => {
      groupImageRef
        .getDownloadURL()
        .then((url) => {
          const groupDetails = {
            name: groupName,
            description,
            image: url,
            creator: currentUserUID,
          };
          groupList
            .add(groupDetails)
            .then((ref) => ref.set({ id: ref.id }, { merge: true }));
        })
        .catch((e) => console.log(e));
    })
    .then(() => {
      groupMeta
        .collection("members")
        .doc(currentUserUID)
        .set({ user: currentUserUID, joined: Date.now() })
        .then((group) => callback(group));
    });
};

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

export const createTopic = (groupId, topicDetails, callback) => {
  const db = firebase.firestore();
  let groupMeta;

  db.collection("groups")
    .where("id", "==", groupId)
    .limit(1)
    .then((documents) => {
      groupMeta = documents[0];

      groupMeta
        .collection("topics")
        .add(topicDetails)
        .then((topic) => {
          topic
            .set({ id: topic.id }, { merge: true })
            .then((topic) => callback(topic));
        })
        .catch((e) => console.log(e));
    })
    .catch((e) => console.log(e));
};

export const createPost = (groupId, topicId, post, callback) => {
  const db = firebase.firestore();
  const auth = firebase.auth();

  const currentUserUID = auth.currentUser.uid;
  let groupRef;

  db.collection("groups")
    .where("id", "==", groupId)
    .limit(1)
    .then((groups) => {
      groupRef = groups[0];
      const postObject = {
        topic: topicId,
        user: currentUserUID,
        ...post,
      };
      groupRef
        .collection("posts")
        .add(postObject)
        .then((post) => {
          post.set({ id: post.id }, { merge: true }).then(callback(e));
        })
        .catch((e) => console.log(e));
    })
    .catch((e) => console.log(e));
};

export const readPosts = (groupId, topicId, callback) => {
  const db = firebase.firestore();

  let groupRef;

  db.collection("groups")
    .where("id", "==", groupId)
    .limit(1)
    .then((groups) => {
      groupRef = groups[0];
      groupRef
        .collection("posts")
        .where("topic", "==", topicId)
        .get()
        .then((posts) => {
          callback(posts);
        })
        .catch((e) => console.log(e));
    })
    .catch((e) => console.log(e));
};