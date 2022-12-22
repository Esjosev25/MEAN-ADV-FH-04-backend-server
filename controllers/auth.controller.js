const { response } = require('express');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');

const Usuario = require('../models/usuario.models');

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const usuarioDB = await Usuario.findOne({ email });

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Credenciales incorrectas - Email',
      });
    }

    //Verificar email

    const validPassword = bcrypt.compareSync(password, usuarioDB.password);

    if (!validPassword)
      return res.status(400).json({
        ok: false,
        msg: 'Credenciales incorrectas - Password',
      });

    //generar token
    const token = await generarJWT(usuarioDB.id);
    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    });
  }
};

module.exports = {
  login,
};
