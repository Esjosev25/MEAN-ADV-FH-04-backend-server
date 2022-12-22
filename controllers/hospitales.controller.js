const { response } = require('express');

const getHospitales = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'get Hospitales',
  });
};
const postHospital = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'post Hospital',
  });
};
const putHospital = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'put Hospital',
  });
};
const deleteHospital = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'delete Hospital',
  });
};

module.exports = {
  getHospitales,
  postHospital,
  putHospital,
  deleteHospital,
};
