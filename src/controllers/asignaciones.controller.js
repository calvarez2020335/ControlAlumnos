const Asignaciones = require('../models/asignaciones.models');

function agregarAsignaciones(req, res) {

    var parametros = req.body;
    var modeloAsignaciones = new Asignaciones();

    modeloAsignaciones.idAlumno = parametros.idAlumno;
    modeloAsignaciones.idCurso = parametros.idCurso;

    modeloAsignaciones.save((err, asignacionesGuardada) => {
        if(err) return res.status(500).send({message: 'Error en la peticion'});
        if(!asignacionesGuardada) return res.status(500).send({message: 'Error al agregar'})

        return res.status(200).send({ Asignaciones : asignacionesGuardada});
    })

}

function obtenerAsignaciones(req, res) {
    Asignaciones.find({}, (err, asignacionEncontradas) => {
        if (err) return res.status(500).send({ message: "Error en la peticion" });
      if (!asignacionEncontradas)
        return res
          .status(500)
          .send({ message: "Error al obtener las encuestas" });

    return res.status(200).send({ Asignaciones: asignacionEncontradas });
    
    }).populate("idAlumno", "Nombre Email").populate("idCurso", "Curso")
}

module.exports = {
    agregarAsignaciones,
    obtenerAsignaciones
}