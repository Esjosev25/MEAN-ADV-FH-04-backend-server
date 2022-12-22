require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { connectDB } = require('./database/config');
const morgan = require('morgan');

const app = express();

//Configurar CORS
app.use(cors());

app.use(morgan('dev'));

//lectura del body
app.use(express.json());

//Base de datos
connectDB();

app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/login', require('./routes/auth.routes'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
