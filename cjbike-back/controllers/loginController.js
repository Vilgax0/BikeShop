// Import the functions you need from the SDKs you need
const admin = require('firebase-admin');
const { auth } = require('../firebase/config.js')
const firebaseAuth = require('firebase/auth');
const { sign } = require("jsonwebtoken");
// Importa SweetAlert
const Swal = require('sweetalert2');

async function Login(req, res) {
  try {
    const { email, password } = req.body;

    // Inicia sesión con correo electrónico y contraseña
    const userCredential = await firebaseAuth.signInWithEmailAndPassword(auth, email, password);

    // Obtiene el token de ID
    const idToken = await userCredential.user.getIdToken();

    // Usa el UID del usuario para obtener su información de Firestore
    const doc = await admin.firestore().collection('usuarios').doc(userCredential.user.uid).get();

    if (!doc.exists) {
      console.log('No se encontró al usuario');
      return res.status(404).send({ message: 'No se encontró al usuario' });
    } else {
      const usuario = doc.data();

      return res.status(200).send({ message: 'Sesión iniciada', token: idToken, usuario: usuario.usuario });
    }
  } catch (error) {
    console.log('Error al iniciar sesión:', error);
    return res.status(500).send({ message: 'Error al iniciar sesión' });
  }
}

module.exports = Login;