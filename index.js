require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { connectDB } = require('./database/config');

const app = express();

//Configurar CORS
app.use(cors());

//Base de datos
connectDB();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
