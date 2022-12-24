const { response } = require('express');
const Medico = require('../models/medico.models');

const getMedicos = async (req, res = response) => {
  const medicos = await Medico.find()
    .populate('usuario', 'nombre img')
    .populate('hospital', 'nombre img');
  res.json({
    ok: true,
    medicos,
  });
};
const postMedico = async (req, res = response) => {
  const uid = req.uid;
  console.log(uid);
  const { nombre, idHospital } = req.body;
  const medico = new Medico({
    nombre,
    usuario: uid,
    hospital: idHospital,
  });
  try {
    const medicoDB = await medico.save();
    res.json({
      ok: true,
      medico: medicoDB,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    });
  }
};
const putMedico = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'put Medico',
  });
};
const deleteMedico = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'delete Medico',
  });
};

module.exports = {
  getMedicos,
  postMedico,
  putMedico,
  deleteMedico,
};
