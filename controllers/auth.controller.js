const { response } = require('express');

const login = async (req, res = response) => {
  try {
    res.send('hola');
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
