/**
 * ruta: api/uploads/
 */
const expressFileUpload = require('express-fileupload');
const { Router } = require('express');

const router = Router();

//midlewares
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload, getImagen } = require('../controllers/uploads.controller');

router.use(expressFileUpload());
router.put('/:tipo/:id', validarJWT, fileUpload);
router.get('/:tipo/:foto', validarJWT, getImagen);


module.exports = router;
