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
            navigation.navigate('Registration Details', {uid: user.uid})
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

export const createUserProfile = (userDetails, navigation) => {
    const auth = firebase.auth();
    const db = firebase.firestore();
    const currentUserUID = auth.currentUser.uid;
    db.collection('user-profiles').doc(currentUserUID).set(userDetails)
        .then(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'DashNav' }] // Designated main page
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode)
        });
}

export const sendPersonalMessages = (toUID, message, callback) => {
    const auth = firebase.auth();
    const db = firebase.firestore();
    const currentUserUID = auth.currentUser.uid;
    const personalMessage = {
        message,
        timestamp: Date.now()
    }
    db.collection('personal-messages').doc(toUID).collection(currentUserUID).add(personalMessage).then(callback());
}

export const readPersonalMessages = (senderUID, callback) => {
    const auth = firebase.auth();
    const db = firebase.firestore();
    const currentUserUID = auth.currentUser.uid;
    db.collection('personal-messages').doc(currentUserUID).collection(senderUID)
}

export const getInbox = (userUID, callback) => {
    const db = firebase.firestore();
    db.collection('inboxes').doc(userUID)
        .onSnapshot((inbox) => {
            callback(inbox);
        })
}

export const putInbox = (userUID, callback) => {
    const auth = firebase.auth();
    const db = firebase.firestore();
    const currentUserUID = auth.currentUser.uid;
    db.collection('inboxes').doc(userUID).get()
        .then((doc) => {
            if (doc.exists) {
                const oldInbox = doc.data()[users];
                let newInbox;
                if (!oldInbox.includes(currentUserUID)) {
                    newInbox = {
                        users: [...oldInbox, currentUserUID]
                    }
                } else {
                    newInbox = oldInbox;
                }
                db.collection('inboxes').doc(userUID).set(newInbox)
                    .then(callback())
                    .catch((e) => console.log(e))
            } else {
                const inbox = {
                    users: [currentUserUID]
                }
                db.collection('inboxes').doc(userUID).set(inbox)
                    .then(callback())
                    .catch((e) => console.log(e))
            }
        })
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
    })
    .catch((error) => {
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
    if (user) {
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
    db.collection('products').limit(10)
    .onSnapshot((querySnapshot) => {
        setCatalogue([]);
        querySnapshot.forEach(function(doc) {
            setCatalogue(oldArray => [...oldArray, doc.data()]);
        });
    });
}

export const getUserFromUID = ( uid, callback ) => {
    const db = firebase.firestore();
    db.collection('users').where('uid', '==', uid).get()
        .then((user) => callback(user))
        .catch((e) => console.log(e))
}

export const getStoreFromUID = ( uid, callback ) => {
    const db = firebase.firestore();
    db.collection('stores').where('uid', '==', uid).get()
        .then((store) => callback(store))
        .catch((e) => console.log(e))
}

export const getProductsFromUID = ( uid, callback ) => {
    const db = firebase.firestore();
    db.collection('products').where('vendor', '==', uid).get()
        .then((products) => callback(user))
        .catch((e) => console.log(e))
}

export const getRecommendations = () => {
    const productsRef = ''
}

export const getReviews = (productId, callback) => {
    const db = firebase.firestore();
    db.collection('reviews').where('productId', '==', productId).get()
        .then((reviews) => callback(reviews))
        .catch((e) => console.log(e))
}

export const postReview = (review, callback) => {
    const db = firebase.firestore();
    db.collection('reviews').add(review)
        .then((reviewRef) => {
            reviewRef.set({ id: ref.id }, { merge: true })
                .then((review) => callback(review))
                .catch((e) => console.log(e))
        })
        .catch((e) => console.log(e))
}

export const postMyProduct = (product, image, setMessage, setVisible) => {
    const db = firebase.firestore();
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const imageId = Date.now();
    const productImageRef = storageRef.child(`product-images/${imageId}.jpg`);
    const {title} = product;
    let imageUrl

    productImageRef.put(image)
        .then((snapshot) => {
            productImageRef.getDownloadURL()
                .then((url) => {
                    imageUrl = url
                })
                .then(() => {
                    const productData = {
                        ...product,
                        created_at: firebase.firestore.Timestamp.fromDate(new Date()),
                        imageId,
                        imageUrl: imageUrl,
                    }
                    db.collection("products").add(productData)
                        .then((ref) => {
                            ref.set({ id: ref.id }, { merge: true })
                        });
                })
                .then(() => {
                    setMessage(`${title} successfully posted`);
                    setVisible(true);
                })
                .catch((e) => {
                    setMessage(`Error: ${e}`);
                })
        })
        .catch((e) => {
            setMessage(`Error: ${e}`);
        })
}

export const createGroup = (groupName, image, description, callback) => {
    const db = firebase.firestore();
    const storage = firebase.storage().ref();
    const auth = firebase.auth();

    const currentUserUID = auth.currentUser.uid;
    const groupImageRef = storage.child(`group-images/${groupName}.jpg`);

    const groupList = db.collection('groups');
    const groupMeta = db.collection(`forum-${groupName}`);

    groupImageRef.put(image)
        .then(() => {
            groupImageRef.getDownloadURL()
                .then((url) => {
                    const groupDetails = {
                        name: groupName,
                        description,
                        image: url,
                        creator: currentUserUID,
                    }
                    groupList.add(groupDetails)
                        .then((ref) => ref.set({id: ref.id}, {merge: true}))
                })
                .catch(e => console.log(e))
        })
        .then(() => {
            groupMeta.collection('members').doc(currentUserUID).set({user: currentUserUID, joined: Date.now()})
                .then((group) => callback(group))
        })

}

export const joinGroup = (groupId, callback) => {
    const db = firebase.firestore();
    const auth = firebase.auth();

    const currentUserUID = auth.currentUser.uid;
    let groupMeta;

    db.collection('groups').where('id', '==', groupId).limit(1)
        .then((documents) => {
            groupMeta = documents[0];

            groupMeta.collection('members').doc(currentUserUID).set({user: currentUserUID, joined: Date.now()})
                .then((group) => callback(group))
        })
}

export const createTopic = (groupId, topicDetails, callback) => {
    const db = firebase.firestore();
    let groupMeta;

    db.collection('groups').where('id', '==', groupId).limit(1)
        .then((documents) => {
            groupMeta = documents[0];

            groupMeta.collection('topics').add(topicDetails)
                .then(topic => {
                    topic.set({id: topic.id}, {merge: true})
                        .then((topic) => callback(topic))
                })
                .catch(e => console.log(e))
        })
        .catch(e => console.log(e))
}

export const createPost = (groupId, topicId, post, callback) => {
    const db = firebase.firestore();
    const auth = firebase.auth();

    const currentUserUID = auth.currentUser.uid;
    let groupRef;

    db.collection('groups').where('id', '==', groupId).limit(1)
        .then(groups => {
            groupRef = groups[0];
            const postObject = {
                topic: topicId,
                user: currentUserUID,
                ...post
            }
            groupRef.collection('posts').add(postObject)
                .then(post => {
                    post.set({id: post.id}, {merge: true})
                        .then(callback(e))
                })
                .catch(e => console.log(e))
        })
        .catch(e => console.log(e))
}

export const readPosts = (groupId, topicId, callback) => {
    const db = firebase.firestore();
    
    let groupRef;

    db.collection('groups').where('id', '==', groupId).limit(1)
        .then(groups => {
            groupRef = groups[0];
            groupRef.collection('posts').where('topic', '==', topicId).get()
                .then(posts => {
                    callback(posts);
                })
                .catch(e => console.log(e))
        })
        .catch(e => console.log(e))
}

export const vendorApply = (certImage, idImage, certDetails, shopDetails, callback) => {
    const db = firebase.firestore();
    const auth = firebase.auth();
    const storage = firebase.storage().ref();
    
    const currentUserUID = auth.currentUser.uid;
    const idImageRef = storage.child(`id-images/${currentUserUID}.jpg`);
    const certImageRef = storage.child(`certificate-images/${currentUserUID}.jpg`);

    let idImageUrl;
    let certImageUrl;

    idImageRef.put(idImage)
        .then(() => {
            idImageRef.getDownloadURL()
                .then((url) => idImageUrl = url)
        })
        .then(() => {
            certImageRef.put(certImage)
                .then(() => {
                    idImageRef.getDownloadURL()
                        .then((url) => idImageUrl = url)
                })
        })
        .then(() => {
            const vendorDetails = {
                ...shopDetails,
            }

            db.collection('vendor-profiles').doc(currentUserUID).set(vendorDetails)
                .then(() => console.log('Created Profile'))
        })
        .then(() => {
            const appDetails = {
                ...certDetails,
                idImage: idImageUrl,
                certImage: certImageUrl
            }

            db.collection('vendor-applications').doc(currentUserUID).set(appDetails)
            .then((application) => {
                callback(application);
            })
            .catch((e) => console.log(e))
        })
        .catch((e) => console.log(e))
}

export const vendorApplyStatus = (callback) => {
    const db = firebase.firestore();
    const auth = firebase.auth();
    const currentUserUID = auth.currentUser.uid;

    db.collection('vendor-profiles').doc(currentUserUID).get()
        .then((vendor) => {
            if (vendor.approved) {
                callback(vendor);
            } else {
                callback(false);
            }
        })
}

export const vendorConfirmTransaction = (orderId, callback) => {
    const db = firebase.firestore();
    
    updateOrder(orderId, 2, (order) => {
        db.collection('completed-transactions').doc(order.id).set(order)
            .then(transaction => callback(transaction))
    })
}

export const vendorUpdateOrder = (orderId, status, callback) => {
    updateOrder(orderId, status, () => callback())
}

export const newOrder = (productId, callback) => {
    const db = firebase.firestore();
    const auth = firebase.auth();
    const currentUserUID = auth.currentUser.uid;

    const order = {
        productId,
        user: currentUserUID,
        status: 1,
    }

    db.collection('orders').add(order)
        .then((orderRef) => {
            orderRef.set({id: orderRef.id}, {merge: true})
                .then(order => callback(order))
        })
        .catch(e => console.log(e))
}

const updateOrder = (orderId, status, callback) => {
    const db = firebase.firestore();

    db.collection('orders').doc(orderId).set({status: status}, {merge: true})
        .then(order => callback(order))
        .catch(e => console.log(e))
}

const completeOrder = (orderId, callback) => {
    const db = firebase.firestore();

    db.collection('orders').doc(orderId).set({status: 6}, {merge: true})
        .then(order => callback(order))
        .catch(e => console.log(e))
}

export const newTransaction = (orderId, payment, callback) => {
    const db = firebase.firestore();
    const auth = firebase.auth();
    const currentUserUID = auth.currentUser;

    const transactionObject = {
        customer: currentUserUID,
        orderId,
        created_at: Date.now(),
        payment_method: payment,
    }

    db.collection('pending-transactions').add(transactionObject)
        .then(ref => {
            ref.set({id: ref.id}, {merge: true})
                .then(transaction => callback(transaction))
        })
}

export const buyFromOrders = (orderId, payment, callback) => {
    const db = firebase.firestore();

    db.collection('orders').where('id', '==', orderId).limit(1)
        .then(documents => {
            const order = documents[0]
            order.set({status: 2})
                .then((order) => {
                    completeOrder(order.id, (order) => {
                        newTransaction(order.id, payment, (transaction) => {
                            callback(transaction);
                        })
                    })
                })
        })
}

export const buyNow = (productId, payment, callback) => {
    const db = firebase.firestore();

    db.collection('products').where('id', '==', productId).limit(1)
        .then(documents => {
            const product = documents[0]
            newOrder(product.id, (order) => {
                completeOrder(order.id, (order) => {
                    newTransaction(order.id, payment, (transaction) => {
                        callback(transaction);
                    })
                })
            })
        })
}
