import * as firebase from 'firebase';
import 'firebase/firestore';
import { API_KEY, PROJECT_ID, SENDER_ID, FB_APP_ID, G_MEASURE_ID } from '@env';

export const initFirebase = () => {
    const firebaseConfig = {
        // Set these in the config file
        apiKey: `${API_KEY}`, // Firebase Web API key
        authDomain: `${PROJECT_ID}.firebaseapp.com`, // project-id.firebaseapp.com
        databaseURL: `https://${PROJECT_ID}.firebaseio.com`, // https://project-id.firebaseio.com
        projectId: `${PROJECT_ID}`, // project-id
        storageBucket: `gs://${PROJECT_ID}.appspot.com`, // project-id.appspot.com
        messagingSenderId: `${SENDER_ID}`, // sender-id
        appId: `${FB_APP_ID}`, // facebook app id
        measurementId: `${G_MEASURE_ID}`, // google analytics id
    };

    if (!firebase.apps.length) {
        console.log(firebaseConfig)
        firebase.initializeApp(firebaseConfig);
    }
    else {
        firebase.app();
     }
}

export const createUser = (email, password, setMessage, navigation) => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            setMessage('Registered user!');
            //console.log(user);
            navigation.reset({
                index: 0,
                routes: [{ name: 'DashNav' }], // Designated main page
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode)
            setMessage(error.message);
        });
    }).catch((error) => {
        const errorCode = error.code;
        console.log(errorCode)
        setMessage(error.message);
    });
}

export const loginUser = (email, password, setMessage, navigation) => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            setMessage('Authenticated User!');
            //console.log(user);
            navigation.reset({
                index: 0,
                routes: [{ name: 'DashNav' }], // Designated main page
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode)
            setMessage(error.message);
        });
    }).catch((error) => {
        const errorCode = error.code;
        console.log(errorCode)
        setMessage(error.message);
    });
}

export const signOutUser = async (navigation) => {
    try {
        await firebase.auth().signOut();
        navigation.reset({
            index: 0,
            routes: [{ name: 'Welcome' }],
        });
    } catch (error) {
        console.log(error);
    }
}

export const checkAuthenticated = (setUser, navigation) => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            setUser(user);
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Welcome' }],
            });
        }
    });
}

export const authOnOpen = (navigation) => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'DashNav' }],
            });
        }
    });
}

export const getMyStore = (user, setProducts) => {
    const db = firebase.firestore();
    if(user) {
        db.collection("products").where("vendor", "==", user.uid)
        .onSnapshot((querySnapshot) => {
            setProducts([]);
            querySnapshot.forEach(function(doc) {
                setProducts(oldArray => [...oldArray, doc.data()])
            });
        });
    }
}

export const getCatalogue = (setCatalogue) => {
    const db = firebase.firestore();
    db.collection('products')
    .onSnapshot((querySnapshot) => {
        setCatalogue([]);
        querySnapshot.forEach(function(doc) {
            setCatalogue(oldArray => [...oldArray, doc.data()]);
        });
    });
}

export const getRecommendations = () => {
    const productsRef = ''
}

export const getReviews = (product) => {
}

export const postMyProduct = (product, image, setMessage) => {
    const db = firebase.firestore();
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const imageId = Date.now();
    const productImageRef = storageRef.child(`product-images/${imageId}.jpg`);
    let imageUrl

    productImageRef.put(image)
        .then((snapshot) => {
            console.log(`Image Id: ${imageId}`);
            productImageRef.getDownloadURL()
                .then((url) => {
                    imageUrl = url
                    console.log(imageUrl);
                })
                .then(() => {
                    const {title} = product;
                    const productData = {
                        ...product,
                        created_at: firebase.firestore.Timestamp.fromDate(new Date()),
                        imageId,
                        imageUrl: imageUrl,
                    }
                    db.collection("products").doc(title).set(productData)
                    .then(() => {
                        setMessage(`${title} successfully posted`);
                    })
                    .catch((e) => {
                        setMessage(`Error: ${e}`);
                    })
                })
                .catch((e) => {
                    setMessage(`Error: ${e}`);
                })
        })
        .catch((e) => {
            setMessage(`Error: ${e}`);
        })
}

export const postReview = (user, product) => {
}