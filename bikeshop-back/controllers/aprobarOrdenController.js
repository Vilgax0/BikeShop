const admin = require('firebase-admin');
const express = require('express');
const router = express.Router();

async function aprobarOrden(req, res) {
  try {
    const { orderId, orderDetails } = req.body;

    // Crea un nuevo documento en la colección de órdenes con los detalles de la orden
    const ordenRef = admin.firestore().collection('ordenes').doc(orderId);
    await ordenRef.set(orderDetails);

    // Retorna el ID de la orden
    return res.status(200).send({ success: true, orderId: orderId });
  } catch (error) {
    console.log('Error al aprobar la orden:', error);
    return res.status(500).send({ success: false, message: 'Error al aprobar la orden' });
  }
}


module.exports = aprobarOrden;
