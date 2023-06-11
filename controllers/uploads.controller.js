const path = require('path');
const fs = require('fs');
const { response } = require('express');
const { v4: uuid } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');
const fileUpload = (req, res = response) => {
  const { tipo, id } = req.params;
  const tiposPermitidos = ['hospitales', 'medicos', 'usuarios'];
  if (!tiposPermitidos.includes(tipo))
    return res.status(400).json({
      ok: false,
      msg: 'No es un médico, usuario u hospital (tipo)',
    });

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: 'No se mando ningun archivo',
    });
  }
  const file = req.files.imagen;
  const extension = file.name.split('.').pop();

  const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif', 'giff'];
  if (!extensionesValidas.includes(extension))
    return res.status(400).json({
      ok: false,
      msg: 'No es una extension permitida',
    });

  const nombreArchivo = `${uuid()}.${extension}`;
  const uploadPath = `./uploads/${tipo}/${nombreArchivo}`;

  file.mv(uploadPath, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: 'Error al mover la imagen',
      });
    }

    //Actualizar DB

    actualizarImagen(tipo, id, nombreArchivo);

    res.json({
      ok: true,
      msg: 'Archivo Subido',
    });
  });
};
const getImagen = (req, res = response) => {
  const { tipo, foto } = req.params;
  const tiposPermitidos = ['hospitales', 'medicos', 'usuarios'];
  if (!tiposPermitidos.includes(tipo))
    return res.status(400).json({
      ok: false,
      msg: 'No es un médico, usuario u hospital (tipo)',
    });

  let pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

  if (!fs.existsSync(pathImg))
    pathImg = path.join(__dirname, `../uploads/noImageFound.png`);
  res.sendFile(pathImg);
};

module.exports = {
  fileUpload,
  getImagen,
};
