const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CursosSchema = Schema({
    Curso: String,
    idMaestro: {type: Schema.Types.ObjectId, ref: 'Usuarios'},
})

module.exports = mongoose.model('Cursos', CursosSchema);