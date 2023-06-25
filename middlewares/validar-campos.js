const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty())
    return res.status(400).json({
      ok: false,
      errors: errores.mapped(),
    });
  next();
};

const validateBody = (keys) => {
  return (req, res, next) => {
    const bodyKeys = Object.keys(req.body);
    const extraKeys = [];
    for (const bodyKey of bodyKeys) {
      if(!keys.includes(bodyKey))
        extraKeys.push(bodyKey)
    }
    if (bodyKeys.length > keys.length) {
      return res.status(400).json({ ok: false,errors: `Se enviaron algunos parametros extras: ${extraKeys.join(', ')}` });
    }
    
    next();
  };
};

module.exports = {
  validarCampos,
  validateBody
};
