const { Router } = require('express');
const {
  getTodo,
  getDocumentosColeccion,
} = require('../controllers/busquedas.controller');
const router = Router();

//midlewares
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/:term', validarJWT, getTodo);
router.get('/coleccion/:tabla/:term', validarJWT, getDocumentosColeccion);

module.exports = router;
