const express = require('express');
const controladorCursos = require('../controllers/curso.controller')

const md_autenticacion = require('../middlewares/autenticacion')

const api = express.Router();

api.post('/agregarCurso', md_autenticacion.Auth, controladorCursos.AgregarCurso);
api.get('/obtenerCursos', md_autenticacion.Auth, controladorCursos.obtenerCursos);
api.put('/editarCursos/:idCurso', md_autenticacion.Auth, controladorCursos.editarCurso);
api.delete('/eliminarCurso/:idCurso', md_autenticacion.Auth, controladorCursos.EliminarCursos);

module.exports = api;