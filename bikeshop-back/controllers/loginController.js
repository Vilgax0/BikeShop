const admin = require('firebase-admin');
const config = require('../firebase/config');
const { signInWithEmailAndPassword } = require('firebase/auth');

const auth = config.auth;

async function Login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    // Inicia sesión con Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    // Obtiene el token de ID para el usuario
    const idToken = await userCredential.user.getIdToken();

    // Busca información del usuario en Firestore
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
    return res.status(500).send({ message: 'Error al iniciar sesión', error: error.message });
  }
}

module.exports = Login;