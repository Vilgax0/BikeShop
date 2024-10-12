const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('C:\\Users\\Juan Jose\\Downloads\\clave.json'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


app.use(cors());
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://jcbike-74f69-default-rtdb.firebaseio.com'
});

const db = admin.firestore();

const routes = require('./routes/routes');
app.use('/', routes);

app.get('/productos', async (req, res) => {
  try {
    const snapshot = await db.collection('productos').get();
    const listaProductos = snapshot.docs.map(doc => doc.data());
    res.json(listaProductos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

app.post('/prueba', (req, res) => {
  const { name, email, password } = req.body;
  console.log(`Nombre: ${name}, Email: ${email}, Contraseña: ${password}`);
  res.send('Datos recibidos en el servidor');
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
