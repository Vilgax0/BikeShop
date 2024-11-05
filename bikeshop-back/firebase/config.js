const admin = require('firebase-admin');
const serviceAccount = require('C:/Users/USUARIO/Downloads/clave.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://jcbike-74f69-default-rtdb.firebaseio.com"
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { auth, db };
