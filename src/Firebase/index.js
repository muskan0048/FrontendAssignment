import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDsmrq3vKyuuDUwAlkCOiL5KFLqvXTuwJo",
    authDomain: "demopr-88af8.firebaseapp.com",
    databaseURL: "https://demopr-88af8.firebaseio.com",
    projectId: "demopr-88af8",
    storageBucket: "demopr-88af8.appspot.com",
    messagingSenderId: "731665130940",
    appId: "1:731665130940:web:e075590abd3ad3e6da37b9"
  };

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { firebase, storage as default };