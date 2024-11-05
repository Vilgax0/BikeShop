const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const config = require('./firebase/config');

const app = express();
const PORT = process.env.PORT || 3000;

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


app.use(cors());
app.use(express.json());

const db = config.instance.getDB();

const routes = require('./routes/routes');
app.use('/', routes);

// app.get('/productos', async (req, res) => {
//   try {
//     const snapshot = await db.collection('productos').get();
//     const listaProductos = snapshot.docs.map(doc => doc.data());
//     res.json(listaProductos);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error al obtener productos' });
//   }
// });

app.post('/prueba', (req, res) => {
  const { name, email, password } = req.body;
  console.log(`Nombre: ${name}, Email: ${email}, Contraseña: ${password}`);
  res.send('Datos recibidos en el servidor');
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});