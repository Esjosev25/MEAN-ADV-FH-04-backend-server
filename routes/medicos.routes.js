/**
 * Ruta: /api/medicos
 */

const { Router } = require('express');
const router = Router();

//midlewares
const { check } = require('express-validator');
const {
  validarCampos,
  validateBody,
} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
  getMedicos,
  postMedico,
  putMedico,
  deleteMedico,
} = require('../controllers/Medicos.controller');

router.get('/', validarJWT, getMedicos);
router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'El nombre del Médico es obligatorio').not().isEmpty(),
    check('idHospital', 'El id del Hospital debe de ser valido').isMongoId(),
    validateBody(['nombre','idHospital']),
    validarCampos,
  ],
  postMedico
);

router.put(
  '/:id',
  [
    validarJWT,
    check('nombre', 'El nombre del Médico es obligatorio').not().isEmpty(),
    check('idHospital', 'El id del Hospital debe de ser valido').isMongoId(),
    validateBody(['nombre','idHospital']),
    validarCampos,
  ],
  putMedico
);

router.delete('/:id', validarJWT, deleteMedico);
module.exports = router;
