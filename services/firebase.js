import * as firebase from 'firebase';
import { API_KEY, PROJECT_ID, SENDER_ID, FB_APP_ID, G_MEASURE_ID } from '@env';

export const initFirebase = () => {
    const firebaseConfig = {
        // Set these in the config file
        apiKey: `${API_KEY}`, // Firebase Web API key
        authDomain: `${PROJECT_ID}.firebaseapp.com`, // project-id.firebaseapp.com
        databaseURL: `https://${PROJECT_ID}.firebaseio.com`, // https://project-id.firebaseio.com
        projectId: `${PROJECT_ID}`, // project-id
        storageBucket: `${PROJECT_ID}.appspot.com`, // project-id.appspot.com
        messagingSenderId: `${SENDER_ID}`, // sender-id
        appId: `${FB_APP_ID}`, // facebook app id
        measurementId: `${G_MEASURE_ID}`, // google analytics id
    };

    if (!firebase.apps.length) {
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
                routes: [{ name: 'Sample' }], // Designated main page
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
                routes: [{ name: 'Sample' }], // Designated main page
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
