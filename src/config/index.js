import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCpTeU4QrZGg7eMB6G-oSMpy_RgOMgH2Yo",
    authDomain: "catflix-9786a.firebaseapp.com",
    projectId: "catflix-9786a",
    storageBucket: "catflix-9786a.appspot.com",
    messagingSenderId: "859144027652",
    appId: "1:859144027652:web:445f1f416f480e78183f51"
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore();

export {db}
