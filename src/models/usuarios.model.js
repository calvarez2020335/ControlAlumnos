const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuariosSchema = Schema({
    Nombre: String,
    Email: String,
    Password: String,
    rol: String,
})

module.exports = mongoose.model('Usuarios', UsuariosSchema)