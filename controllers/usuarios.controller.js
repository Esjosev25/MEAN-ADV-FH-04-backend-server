const Usuario = require('../models/usuario.models');
const { response } = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { findById } = require('../models/usuario.models');
const getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find({}, 'nombre google id role email');
  res.json({
    ok: true,
    usuarios,
  });
};

const postUsuario = async (req, res = response) => {
  try {
    console.log(req.body);

    const { email, password } = req.body;
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail)
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya está registrado',
      });

    const usuario = new Usuario(req.body);

    //encriptar contraseña
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);

    // Guardar Usuarios
    await usuario.save();
    return res.json({
      ok: true,
      usuario,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    });
  }
};

const putUsuario = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB)
      return res.status(404).json({
        ok: false,
        msg: 'Usuario no existe',
      });
    //TODO: Validar token
    //Actualizacion
    const { password, google, email, ...campos } = req.body;

    if (email !== usuarioDB.email) {
      const existeEmail = await Usuario.findOne({
        email,
      });
      if (existeEmail)
        return res.status(400).json({
          ok: false,
          msg: 'Usuario existente con ese email',
        });
    }
    campos.email = email;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });
    return res.status(200).json({
      ok: true,
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    });
  }
};

const deleteUsuario = async (req, res) => {
  const { id: uid } = req.params;

  try {
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB)
      return res.status(404).json({
        ok: false,
        msg: 'Usuario no existe',
      });
    await Usuario.findByIdAndDelete(uid);
    return res.json({
      ok: true,
      msg: `Usuario con ${uid} eliminado`,
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
  getUsuarios,
  postUsuario,
  putUsuario,
  deleteUsuario,
};
