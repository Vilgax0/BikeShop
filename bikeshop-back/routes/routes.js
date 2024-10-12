const express = require('express');
const router = express.Router();
const registroController = require('../controllers/registroController');
const loginController=require('../controllers/loginController');
const obtenerProductosController=require('../controllers/obtenerProductosController');
const disminuirStockController=require('../controllers/disminuirStockController');
const aumentarStockController=require('../controllers/aumentarStockController');
const capturarOrdenController=require('../controllers/capturarOrdenController');
const aprobarOrdenController=require('../controllers/aprobarOrdenController');


// Rutas de autenticación
router.post('/register', registroController);
router.post('/login', loginController);
router.post('/disminuirstock', disminuirStockController)
router.post('/aumentarstock', aumentarStockController)
router.get('/obtenerproductos', obtenerProductosController)
router.post('/capturar-orden', capturarOrdenController)
router.post('/aprobar-orden', aprobarOrdenController)

module.exports = router;
