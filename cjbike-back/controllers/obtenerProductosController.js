const admin = require('firebase-admin');

async function obtenerProductos(req, res) {
  try {
    // Obtiene todos los documentos de la colección 'productos'
    const snapshot = await admin.firestore().collection('productos').get();

    // Crea un array para almacenar los productos
    let productos = [];

    // Itera sobre cada documento de la colección 'productos'
    for (let doc of snapshot.docs) {
      // Agrega el campo 'id' al documento del producto
      let producto = doc.data();
      producto.id = doc.id;

      // Añade el producto al array de productos
      productos.push(producto);
    }

    // Retorna los productos
    return res.status(200).send(productos);
  } catch (error) {
    console.log('Error al obtener los productos:', error);
    return res.status(500).send({ message: error });
  }
}

module.exports = obtenerProductos;
