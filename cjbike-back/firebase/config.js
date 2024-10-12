const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
const { getFirestore } = require("firebase/firestore");
const firebaseAuth = require('firebase/auth');

const firebaseConfig = {
    apiKey: "AIzaSyDRrX4Eqrj7y5mi-ctBnsMdSI7arGj5hbk",
    authDomain: "jcbike-74f69.firebaseapp.com",
    databaseURL: "https://jcbike-74f69-default-rtdb.firebaseio.com",
    projectId: "jcbike-74f69",
    storageBucket: "jcbike-74f69.appspot.com",
    messagingSenderId: "238225156704",
    appId: "1:238225156704:web:02646297275406f3543105",
    measurementId: "G-J3S1P61MVM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = firebaseAuth.getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

module.exports = { auth, storage, db };