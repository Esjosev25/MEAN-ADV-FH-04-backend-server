/**
 * Ruta: /api/hospitales
 */

const { Router } = require('express');
const router = Router();

//midlewares
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
  getHospitales,
  postHospital,
  putHospital,
  deleteHospital,
} = require('../controllers/hospitales.controller');

router.get('/', validarJWT, getHospitales);
router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  postHospital
);

router.put('/:id', [validarJWT, validarCampos], putHospital);

router.delete('/:id', validarJWT, deleteHospital);
module.exports = router;
