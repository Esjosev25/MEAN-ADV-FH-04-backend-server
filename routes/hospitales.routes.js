/**
 * Ruta: /api/hospitales
 */

const { Router } = require('express');
const router = Router();

//midlewares
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
//Para que no valide el jwt mientras tanto
//const { validarJWT } = require('../middlewares/validar-jwt');
const validarJWT = (req, res, next) => next();
const {
  getHospitales,
  postHospital,
  putHospital,
  deleteHospital,
} = require('../controllers/hospitales.controller');

router.get('/', validarJWT, getHospitales);
router.post('/', [validarCampos], postHospital);

router.put('/:id', [validarJWT, validarCampos], putHospital);

router.delete('/:id', validarJWT, deleteHospital);
module.exports = router;
