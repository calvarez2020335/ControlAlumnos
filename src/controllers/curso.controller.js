const Curso = require("../models/cursos.model");

//AgregarCurso --Nota Solo los maestro pueden agregar curso

function AgregarCurso(req, res) {
  var parametros = req.body;
  var modeloCurso = new Curso();

  Curso.find({ Curso: parametros.Curso }, (err, cursoEncontrado) => {
    if (cursoEncontrado.length > 0) {
      return res.status(500).send({ message: "Este curso ya a sido creado" });
    } else {
      if (parametros.Curso) {
        modeloCurso.Curso = parametros.Curso;
        modeloCurso.idMaestro = req.user.sub;

        modeloCurso.save((err, cursoGuardado) => {
          if (err)
            return res.status(500).send({ message: "Error en la peticion" });
          if (!cursoGuardado)
            return res
              .status(500)
              .send({ message: "Error al agregear encuesta" });

          return res.status(200).send({ Curso: cursoGuardado });
        });
      } else {
        return res
          .status(500)
          .send({ message: "Debe ingresar los parametros obligatorios" });
      }
    }
  });
}

//
function editarCurso(req, res) {
  var idCurso = req.params.idCurso;
  var parametros = req.body;

  if (req.user.rol !== "ROL_MAESTRO") {
    return res.status(500).send({ message: "No tiene permisos para editar" });
  }

  Curso.findByIdAndUpdate(
    idCurso,
    parametros,
    { new: true },
    (err, cursoEditado) => {
      if (err) return res.status(500).send({ message: "ERROR EN LA PETICION" });
      if (!cursoEditado)
        return res.status(403).send({ message: "Error al editar" });

      return res.status(200).send({ Curso: cursoEditado });
    }
  );
}

//Eliminar Cursos

function EliminarCursos(req, res) {
  var idCurso = req.params.idCurso;

  if (req.user.rol !== "ROL_MAESTRO") {
    return res.status(500).send({ message: "No tiene permisos para Eliminar" });
  }

  Curso.findByIdAndDelete(idCurso, (err, cursoEliminados) => {
    if (err) return res.status(500).send({ message: "ERROR en la petición" });
    if (!cursoEliminados)
      return res.status(500).send({ mensaja: "Error al eliminar producto" });

    return res.status(200).send({ Curso: cursoEliminados });
  });
}

//
function obtenerCursos(req, res) {
  if (req.user.rol == "ROL_MAESTRO") {
    Curso.find({}, (err, cursoEncontrado) => {
      if (err) return res.status(500).send({ message: "Error en la peticion" });
      if (!cursoEncontrado)
        return res
          .status(500)
          .send({ message: "Error al obtener las encuestas" });

      return res.send({ Curso: cursoEncontrado });
    }).populate("idMaestro", "Nombre Email");
  } else {
    return res.send({ mensage: "No tiene permisos para acceder al recurso" });
  }
}

module.exports = {
  AgregarCurso,
  obtenerCursos,
  editarCurso,
  EliminarCursos,
};
