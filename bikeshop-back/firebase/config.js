const admin = require('firebase-admin');
//C:/Users/USUARIO/Downloads/clave.json
//C:\\Users\\mkcla\\OneDrive\\Escritorio\\clave.json
const serviceAccount = require('C:\\Users\\mkcla\\OneDrive\\Escritorio\\clave.json');
const { initializeApp } = require("firebase/app");
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

const app = initializeApp(firebaseConfig);
const auth = firebaseAuth.getAuth(app);

class FirebaseAdmin {
  constructor(){
    if(!FirebaseAdmin.instance){
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://jcbike-74f69-default-rtdb.firebaseio.com"
      });
      FirebaseAdmin.instance = this;
    }
    this.db = admin.firestore();
    this.auth = admin.auth();
    return FirebaseAdmin.instance;
  }
  getDB(){
    return this.db;
  }
  getAuth(){
    return this.auth;
  }
}

const instance = new FirebaseAdmin();

module.exports = {instance, auth};


/*
const admin = require('firebase-admin');
const serviceAccount = require('C:\\Users\\mkcla\\OneDrive\\Escritorio\\clave.json');

// Inicializa solo `firebase-admin` con el archivo de credenciales de servicio.
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://jcbike-74f69-default-rtdb.firebaseio.com"
});

// Configura Firestore y autenticación.
const db = admin.firestore();
const auth = admin.auth();

// Exporta las instancias de `db` y `auth` directamente.
module.exports = { db, auth };
*/