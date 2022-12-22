/**
 * Ruta: /api/usuarios
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {
  getUsuarios,
  postUsuario,
  putUsuario,
  deleteUsuario,
} = require('../controllers/usuarios.controller');

const router = Router();

router.get('/', getUsuarios);
router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos,
  ],
  postUsuario
);

router.put(
  '/:id',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('role', 'El role es obligatorio').isString(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos,
  ],
  putUsuario
);

router.delete(
  '/:id',
  // [
  //   check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  //   check('role', 'El role es obligatorio').isString(),
  //   check('email', 'El email es obligatorio').isEmail(),
  //   validarCampos,
  // ],
  deleteUsuario
);
module.exports = router;
