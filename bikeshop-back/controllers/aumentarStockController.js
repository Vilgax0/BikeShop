const admin = require('firebase-admin');

async function aumentarStock(req, res) {
  try {
    const { id, cantidad } = req.body;

    // Obtiene el documento del producto en base al id proporcionado
    const productoRef = admin.firestore().collection('productos').doc(id);
    const productoSnapshot = await productoRef.get();

    // Verifica si el producto existe
    if (!productoSnapshot.exists) {
      return res.status(404).send({ message: 'Producto no encontrado' });
    }

    // Obtiene el objeto del producto y verifica si hay suficiente stock
    const producto = productoSnapshot.data();
    
      // aumenta la cantidad del stock
      await productoRef.update({ stock: producto.stock + cantidad });

      return res.status(200).send({ success: true });
    
    
  } catch (error) {
    console.log('Error al disminuir el stock:', error);
    return res.status(500).send({ success: false, message: 'Error al disminuir el stock' });
  }
}

module.exports = aumentarStock;
