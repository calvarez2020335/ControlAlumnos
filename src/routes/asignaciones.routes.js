const express = require('express');
const controladorAsignaciones = require('../controllers/asignaciones.controller')

const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/agregarAsignaciones', md_autenticacion.Auth, controladorAsignaciones.agregarAsignaciones);
api.get('/asignaciones', md_autenticacion.Auth, controladorAsignaciones.obtenerAsignaciones);

module.exports = api;