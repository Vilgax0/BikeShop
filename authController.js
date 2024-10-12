const admin = require('firebase-admin');
const db = admin.firestore();
const auth = admin.auth();

function registerUser(req, res) {
  const { name, email, password } = req.body;

  admin.auth().createUser({
    email: email,
    password: password,
    displayName: name 
  })
  .then((userRecord) => {
    // Usuario creado exitosamente
    // Ahora, guardamos el nombre en Firestore
    db.collection('usuarios').doc(userRecord.uid).set({
      nombre: name,
      email: email
    })
    .then(() => {
      res.send(`Usuario registrado: ${userRecord.uid}`);
    })
    .catch((error) => {
      res.status(500).send(`Error al guardar el nombre en Firestore: ${error.message}`);
    });
  })
  .catch((error) => {
    res.status(500).send(`Error al registrar usuario: ${error.message}`);
  });
}

function loginUser(req, res) {
  const { email, password } = req.body;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      res.send(`Usuario autenticado: ${user.uid}`);
    })
    .catch((error) => {
      res.status(500).send(`Error al autenticar usuario: ${error.message}`);
    });
}

function logoutUser(req, res) {
  auth.signOut()
    .then(() => {
      res.send('Usuario desconectado');
    })
    .catch((error) => {
      res.status(500).send(`Error al desconectar usuario: ${error.message}`);
    });
}

function forgotPassword(req, res) {
  const { email } = req.body;

  auth.sendPasswordResetEmail(email)
    .then(() => {
      res.send(`Correo de recuperación de contraseña enviado a: ${email}`);
    })
    .catch((error) => {
      res.status(500).send(`Error al enviar correo de recuperación: ${error.message}`);
    });
}

function confirmPasswordReset(req, res) {
  const { code, newPassword } = req.body;

  auth.confirmPasswordReset(code, newPassword)
    .then(() => {
      res.send('Contraseña cambiada exitosamente');
    })
    .catch((error) => {
      res.status(500).send(`Error al cambiar contraseña: ${error.message}`);
    });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  confirmPasswordReset
}
