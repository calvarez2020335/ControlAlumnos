const express = require('express');
const cors = require('cors');
const app = express();

//Importacion de rutas

const usuariosRoutes = require('./src/routes/usuarios.routes');
const cursosRoutes = require('./src/routes/cursos.routes');
const asignacionesRoutes = require('./src/routes/asignaciones.routes');

//MIdd

app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Cabeceras

app.use(cors());

//carga de rutas a localhost

app.use('/api', usuariosRoutes, cursosRoutes, asignacionesRoutes);

module.exports = app;