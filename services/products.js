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

export const getCatalogue = (callback) => {
  const db = firebase.firestore();
  db.collection("products")
    .limit(10)
    .onSnapshot((querySnapshot) => {
      var products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      callback(products);
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
      callback(products);
    });
};

// Get products by vendor ID
export const getProductsFromUID = (uid, callback) => {
  const db = firebase.firestore();
  
  db.collection("products")
    .where("vendor", "==", uid)
    .onSnapshot((querySnapshot) => {
      var products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      callback(products);
    });
};

// Get products by vendor ID (limited)
export const getProductsLimitedFromUID = (uid, limit, callback) => {
  const db = firebase.firestore();
  
  db.collection("products")
    .where("vendor", "==", uid)
    .limit(limit)
    .onSnapshot((querySnapshot) => {
      var products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      callback(products);
    });
};

// Get products of current vendor
export const getProductsCurrentVendor = (callback) => {
  const db = firebase.firestore();
  const auth = firebase.auth();
  const uid = auth.currentUser.uid;
  
  db.collection("products")
    .where("vendor", "==", uid)
    .onSnapshot((querySnapshot) => {
      var products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      callback(products);
    });
};

// Get product by its ID
export const getProductByID = (id, callback) => {
  const db = firebase.firestore();
  
  db.collection("products")
    .doc(id)
    .get()
    .then((product) => callback({id: product.id, ...product.data()}))
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
    .then(() => {
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
            imageUrl,
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
