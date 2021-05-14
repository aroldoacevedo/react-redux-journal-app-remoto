import firebase from 'firebase/app';
//import 'firebase/firebase'
import 'firebase/firestore'
import 'firebase/auth'
//import 'firebase/database'

// Al crear una nueva aplicacion en firebase, se genera automaticamente estos datos
const firebaseConfig = {
    apiKey: "AIzaSyBgB1rYuzd0doRPZuwHaQzfnPi98t9cD-c",
    authDomain: "react-redux-app-3ef43.firebaseapp.com",
    projectId: "react-redux-app-3ef43",
    storageBucket: "react-redux-app-3ef43.appspot.com",
    messagingSenderId: "315714206868",
    appId: "1:315714206868:web:3487807dab7f2d7bfd0881"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db,
      googleAuthProvider,
      firebase
  }
