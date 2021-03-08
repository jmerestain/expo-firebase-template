import * as firebase from "firebase";
import "firebase/firestore";

export const getMyStore = (user, setProducts) => {
  const db = firebase.firestore();
  if (user) {
    db.collection("products")
      .where("vendor", "==", user.uid)
      .onSnapshot((querySnapshot) => {
        setProducts([]);
        querySnapshot.forEach(function (doc) {
          setProducts((oldArray) => [...oldArray, doc.data()]);
        });
      });
  }
};

export const getCatalogue = (setCatalogue) => {
  const db = firebase.firestore();
  db.collection("products")
    .limit(10)
    .onSnapshot((querySnapshot) => {
      setCatalogue([]);
      querySnapshot.forEach(function (doc) {
        setCatalogue((oldArray) => [...oldArray, doc.data()]);
      });
    });
};

export const getCategories = (callback) => {
  const db = firebase.firestore();
  db.collection("categories")
    .get()
    .then((categories) =>
      categories.docs.map((cat) => ({ id: cat.id, ...cat.data() }))
    )
    .then((categories) => callback(categories))
    .catch((e) => console.log(e));
};

export const getProductsFromCategory = (categoryId, callback) => {
  const db = firebase.firestore();
  db.collection("products")
    .where("category", "array-contains", categoryId)
    .onSnapshot((querySnapshot) => {
      var products = [];
      querySnapshot.forEach((doc) => {
        products.push({id: doc.id, ...doc.data()});
      });
      console.log(categoryId)
      console.log(products)
      callback(products);
    });
};

export const getStoreFromUID = (uid, callback) => {
  const db = firebase.firestore();
  db.collection("stores")
    .where("uid", "==", uid)
    .get()
    .then((store) => callback(store))
    .catch((e) => console.log(e));
};

export const getProductsFromUID = (uid, callback) => {
  const db = firebase.firestore();
  db.collection("products")
    .where("vendor", "==", uid)
    .get()
    .then((products) => callback(products))
    .catch((e) => console.log(e));
};

export const postMyProduct = (product, image, setMessage, setVisible) => {
  const db = firebase.firestore();
  const storage = firebase.storage();
  const storageRef = storage.ref();
  const imageId = Date.now();
  const productImageRef = storageRef.child(`product-images/${imageId}.jpg`);
  const { title } = product;
  let imageUrl;

  productImageRef
    .put(image)
    .then((snapshot) => {
      productImageRef
        .getDownloadURL()
        .then((url) => {
          imageUrl = url;
        })
        .then(() => {
          const productData = {
            ...product,
            created_at: firebase.firestore.Timestamp.fromDate(new Date()),
            imageId,
            imageUrl: imageUrl,
          };
          db.collection("products")
            .add(productData)
            .then((ref) => {
              ref.set({ id: ref.id }, { merge: true });
            });
        })
        .then(() => {
          setMessage(`${title} successfully posted`);
          setVisible(true);
        })
        .catch((e) => {
          setMessage(`Error: ${e}`);
        });
    })
    .catch((e) => {
      setMessage(`Error: ${e}`);
    });
};
