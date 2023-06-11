const fs = require('fs');
const { Usuario, Medico, Hospital } = require('../models');
const actualizarImagen = async (tipo, id, nombreArchivo) => {
  let pathViejo = '';
  switch (tipo) {
    case 'medicos':
      const medico = await Medico.findById(id);
      if (!medico) {
        console.log(' No se encontro el medico por ID');
        return false;
      }

      pathViejo = `./uploads/medicos/${medico.img}`;
      eliminarImagenExistente(pathViejo);
      medico.img = nombreArchivo;
      await medico.save();
      break;
    case 'hospitales':
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        console.log(' No se encontro el hospital por ID');
        return false;
      }

      pathViejo = `./uploads/hospitales/${hospital.img}`;
      eliminarImagenExistente(pathViejo);
      hospital.img = nombreArchivo;
      await hospital.save();
      break;
    case 'usuarios':
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        console.log(' No se encontro el usuario por ID');
        return false;
      }

      pathViejo = `./uploads/usuarios/${usuario.img}`;
      eliminarImagenExistente(pathViejo);
      usuario.img = nombreArchivo;
      await usuario.save();
      break;
    default:
      break;
  }
};
const eliminarImagenExistente = (path) => {
  if (fs.existsSync(path)) fs.unlinkSync(path);
};
module.exports = {
  actualizarImagen,
};
