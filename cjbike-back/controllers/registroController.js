const admin = require('firebase-admin');
const db = admin.firestore();
const usersRef = db.collection('usuarios');

async function registro(req, res) {
  try {
    const { name, email, password} = req.body;

    const nameExists = await usersRef.where('usuario', '==', name).get();

    if (!nameExists.empty) {
      return res.status(400).send({ message: 'El nombre de usuario ya está en uso' });
    }

    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    await usersRef.doc(userRecord.uid).set({
      email,
      usuario: name,
    });


    res.status(201).send({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error al registrar el usuario' });
  }
}

module.exports = registro;



