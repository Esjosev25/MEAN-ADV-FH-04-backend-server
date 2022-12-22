const { response } = require('express');

const getMedicos = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'get Medicos',
  });
};
const postMedico = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'post Medico',
  });
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
