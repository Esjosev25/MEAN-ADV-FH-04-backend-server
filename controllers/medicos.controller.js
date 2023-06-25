const { response } = require('express');
const { Medico } = require('../models');

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
const putMedico = async (req, res = response) => {
  const uid = req.uid;
  const id = req.params.id;

  try {
    const medico = await Medico.findById(id);
    if (!medico) {
      return res.status(400).json({
        ok: false,
        msg: 'No existe el medico',
      });
    }
    const { idHospital, ...otrosAtributos } = req.body;
    const changes = {
      ...otrosAtributos,
      usuario: uid,
      hospital: idHospital,
    };
    const medicoActualizado = await Medico.findByIdAndUpdate(id, changes, {
      new: true,
    });
    res.json({
      ok: true,
      msg: 'Medico Actualizado',
      medicoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Comuniquese con el administrador',
    });
  }
};
const deleteMedico = async (req, res = response) => {
  const id = req.params.id;
  try {
    const medico = await Medico.findById(id);
    if (!medico) {
      return res.status(400).json({
        ok: false,
        msg: 'No existe el medico',
      });
    }

    await Medico.findOneAndDelete(id);
    res.json({
      ok: true,
      msg: 'Medico eliminado',
    });
  } catch (error) {}
};

module.exports = {
  getMedicos,
  postMedico,
  putMedico,
  deleteMedico,
};
