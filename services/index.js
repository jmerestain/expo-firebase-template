import * as firebase from "firebase";
import "firebase/firestore";
import { API_KEY, PROJECT_ID, SENDER_ID, FB_APP_ID, G_MEASURE_ID } from "@env";

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
    console.log(firebaseConfig);
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
};
