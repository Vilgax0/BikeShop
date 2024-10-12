const admin = require('firebase-admin');
const express = require('express');

async function capturarOrden(req, res) {
  try {
    const { orderId, amount } = req.body;

    // Obtiene el documento de la orden en base al ID proporcionado
    const ordenRef = admin.firestore().collection('ordenes').doc(orderId);
    const ordenSnapshot = await ordenRef.get();

    // Verifica si la orden existe
    if (!ordenSnapshot.exists) {
      return res.status(404).send({ message: 'Orden no encontrada' });
    }

    // Actualiza el estado de la orden a "capturada"
    await ordenRef.update({ estado: 'capturada', amount: amount });

    // Crea una nueva entrada en la colección de transacciones
    const transaccionRef = admin.firestore().collection('transacciones').doc();
    await transaccionRef.set({
      orderId: orderId,
      monto: amount.value,
      fecha: admin.firestore.FieldValue.serverTimestamp(),
      // Incluye cualquier otro detalle relevante
    });

    // Retorna el ID de la orden
    return res.status(200).send({ success: true, orderId: orderId });
  } catch (error) {
    console.log('Error al capturar la orden:', error);
    return res.status(500).send({ success: false, message: 'Error al capturar la orden' });
  }
}


  

module.exports = capturarOrden;
