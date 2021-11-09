import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDssEoFIgpTMkrbASTPLGIU-g1vT_Ubduk",
  authDomain: "insight-63dc7.firebaseapp.com",
  projectId: "insight-63dc7",
  storageBucket: "insight-63dc7.appspot.com",
  messagingSenderId: "992371836739",
  appId: "1:992371836739:web:b8ad42ea10050914aa51f6"
};

const app = firebase.initializeApp(firebaseConfig);
export const db = app.firestore(); // Base de datos
export const auth = app.auth();
export const storage = app.storage();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
