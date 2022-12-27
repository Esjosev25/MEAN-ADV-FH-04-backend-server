const { response } = require('express');
const { modelos } = require('./interfaces/modelos');
const Hospital = require('../models/hospital.models');
const Usuario = require('../models/usuario.models');
const Medico = require('../models/medico.models');

const getTodo = async (req, res = response) => {
  const { term } = req.params;
  const regex = new RegExp(term, 'i');

  const [usuarios, medicos, hospitales] = await Promise.all(
    Usuario.find({ nombre: regex }),
    Hospital.find({ nombre: regex }),
    Medico.find({ nombre: regex })
  );
  return res.json({
    ok: true,
    msg: 'Tamos bien',
    usuarios,
    medicos,
    hospitales,
  });
};

const getDocumentosColeccion = async (req, res = response) => {
  const { term, tabla } = req.params;
  const regex = new RegExp(term, 'i');
  const coleccion = modelos[tabla];

  if (!coleccion)
    return res.status(400).json({
      ok: false,
      msg: ` La tabla tine que ser una de las siguientes: ${Object.keys(
        modelos
      ).join(' - ')}`,
    });
  let resultado;
  if (coleccion === modelos.medicos)
    resultado = await coleccion
      .find({ nombre: regex })
      .populate('usuario', 'nombre img')
      .populate('hospital', 'nombre img');
  else if (coleccion === modelos.hospitales)
    resultado = await coleccion
      .find({ nombre: regex })
      .populate('usuario', 'nombre img');
  else resultado = await coleccion.find({ nombre: regex });

  return res.json({
    ok: true,
    msg: 'Tamos bien',
    resultado,
  });
};
module.exports = {
  getTodo,
  getDocumentosColeccion,
};
