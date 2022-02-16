//Importaciones
const express = require('express');
const usuariosControlador = require('../controllers/usuarios.controller');

const md_autenticacion = require('../middlewares/autenticacion');

//RUTAS
const api = express.Router();

api.post('/RegistrarMaestroDefecto', usuariosControlador.registrarMestroDefecto);
api.post('/RegistrarMaestroManual', usuariosControlador.registrarMaestroManual);
api.post('/RegistrarAlumno', usuariosControlador.registrarAlumno);
api.put('/EditarAlumno/:idUsuario',usuariosControlador.editarAlumno);
api.delete('/EliminarAlumno/:idUsuario', usuariosControlador.eliminarAlumno);
api.post('/Login', usuariosControlador.Login);

module.exports = api;