const firebaseConfig = require('../firebase/config');

const db = firebaseConfig.instance.getDB();
const auth = firebaseConfig.instance.getAuth();

const usersRef = db.collection('usuarios');

async function registro(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    // Verifica si el nombre de usuario ya está en uso
    const nameExists = await usersRef.where('usuario', '==', name).get();

    if (!nameExists.empty) {
      return res.status(400).send({ message: 'El nombre de usuario ya está en uso' });
    }

    // Crea el usuario en Firebase Authentication
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
    });

    // Almacena información del usuario en Firestore
    await usersRef.doc(userRecord.uid).set({
      email,
      usuario: name,
    });

    res.status(201).send({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.status(500).send({ message: 'Error al registrar el usuario' });
  }
}

module.exports = registro;