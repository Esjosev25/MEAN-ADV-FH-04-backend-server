/**
 * Ruta: /api/usuarios
 */
const { Router } = require('express');
const router = Router();

//midlewares
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
  getUsuarios,
  postUsuario,
  putUsuario,
  deleteUsuario,
} = require('../controllers/usuarios.controller');

router.get('/', validarJWT, getUsuarios);
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
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('role', 'El role es obligatorio').isString(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos,
  ],
  putUsuario
);

router.delete('/:id', validarJWT, deleteUsuario);
module.exports = router;
