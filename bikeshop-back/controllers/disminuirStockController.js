const admin = require('firebase-admin');

async function disminuirStock(req, res) {
  try {
    const { id, cantidad } = req.body;
    if(!id || !cantidad || cantidad <=0){
      return res.status(400).json({message: "Faltan datos o error en los datos"});
    }
    // Obtiene el documento del producto en base al id proporcionado
    const productoRef = admin.firestore().collection('productos').doc(id);
    const productoSnapshot = await productoRef.get();

    // Verifica si el producto existe
    if (!productoSnapshot.exists) {
      return res.status(404).send({ message: 'Producto no encontrado' });
    }

    // Obtiene el objeto del producto y verifica si hay suficiente stock
    const producto = productoSnapshot.data();
    if (producto.stock >= cantidad) {
      // Disminuye la cantidad en stock
      await productoRef.update({ stock: producto.stock - cantidad });

      // Retorna true si se pudo disminuir el stock
      return res.status(200).send({ success: true });
    } else {
      // Retorna false si no hay suficiente stock
      return res.status(200).send({ success: false, message: 'Stock insuficiente' });
    }
  } catch (error) {
    console.log('Error al disminuir el stock:', error);
    return res.status(500).send({ success: false, message: 'Error al disminuir el stock' });
  }
}

module.exports = disminuirStock;
