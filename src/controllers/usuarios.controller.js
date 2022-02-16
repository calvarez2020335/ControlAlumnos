const Usuario = require("../models/usuarios.model");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt")

//MaestroPorDefecto
function registrarMestroDefecto(req, res) {
  var parametros = req.body;
  var modeloUsuario = new Usuario();

  Usuario.find({ email: parametros.Email }, (err, usuarioEncontrado) => {
    if (usuarioEncontrado.length > 0) {
      return res
        .status(500)
        .send({ mensaje: "Este correo ya se encuentra utilizado." });
    } else {
      modeloUsuario.Nombre = "MAESTRO";
      modeloUsuario.Email = "admin@gmail.com";
      modeloUsuario.Password = parametros.Password;
      parametros.Password = "123456";
      modeloUsuario.rol = "ROL_MAESTRO";

      bcrypt.hash(
        parametros.Password,
        null,
        null,
        (err, passwordEncriptada) => {
          modeloUsuario.Password = passwordEncriptada;

          modeloUsuario.save((err, usuarioGuardado) => {
            if (err)
              return res.status(500).send({ mensaje: "Error en la peticion" });
            if (!usuarioGuardado)
              return res
                .status(500)
                .send({ mensaje: "Error al registrar usuario" });

            return res.status(200).send({ usuario: usuarioGuardado });
          });
        }
      );
    }
  });
}

//RegistrarMestroManual

function registrarMaestroManual(req, res) {
  var parametros = req.body;
  var modeloUsuario = new Usuario();

  Usuario.find({ Email: parametros.Email }, (err, usuarioEncontrado) => {
    if (usuarioEncontrado.length > 0) {
      return res
        .status(500)
        .send({ mensaje: "Este correo ya se encuentra utilizado." });
    } else {
      modeloUsuario.Nombre = parametros.Nombre;
      modeloUsuario.Email = parametros.Email;
      modeloUsuario.rol = "ROL_MAESTRO";

      bcrypt.hash(
        parametros.Password,
        null,
        null,
        (err, passwordEncriptada) => {
          modeloUsuario.Password = passwordEncriptada;

          modeloUsuario.save((err, usuarioGuardado) => {
            if (err)
              return res.status(500).send({ mensaje: "Error en la peticion" });
            if (!usuarioGuardado)
              return res
                .status(500)
                .send({ mensaje: "Error al registrar usuario" });

            return res.status(200).send({ usuario: usuarioGuardado });
          });
        }
      );
    }
  });
}

//RegistrarAlumno

function registrarAlumno(req, res) {
  var parametros = req.body;
  var modeloUsuario = new Usuario();

  Usuario.find({ Email: parametros.Email }, (err, usuarioEncontrado) => {
    if (usuarioEncontrado.length > 0) {
      return res
        .status(500)
        .send({ mensaje: "Este correo ya se encuentra utilizado." });
    } else {
      modeloUsuario.Nombre = parametros.Nombre;
      modeloUsuario.Email = parametros.Email;
      modeloUsuario.rol = "ROL_ALUMNO";

      bcrypt.hash(
        parametros.Password,
        null,
        null,
        (err, passwordEncriptada) => {
          modeloUsuario.Password = passwordEncriptada;

          modeloUsuario.save((err, usuarioGuardado) => {
            if (err)
              return res.status(500).send({ mensaje: "Error en la peticion" });
            if (!usuarioGuardado)
              return res
                .status(500)
                .send({ mensaje: "Error al registrar usuario" });

            return res.status(200).send({ usuario: usuarioGuardado });
          });
        }
      );
    }
  });
}

//Editar Alumno

function editarAlumno(req, res) {

  var idUsuario = req.params.idUsuario;
  var parametros = req.body;

  Usuario.findByIdAndUpdate(idUsuario, parametros, {new : true}, (err, usuarioEditado) => {
    if (err) return res.status(500).send({ message: "ERROR EN LA PETICION" });
    if(!usuarioEditado)
      return res.status(403).send({ message: "Error al editar"})


      return res.status(200).send({Usuario: usuarioEditado})
  })

}


//Eliminar alumnos 

function eliminarAlumno(req, res) {

  var idUser = req.params.idUsuario;

  Usuario.findByIdAndDelete(idUser, (err, usuarioEliminado) => {
    if(err) return res.status(500).send({ message: 'Error en la peticion'})
    if(!usuarioEliminado) return res.status(500).send({ message: 'Error al eliminar'})

    return res.status(200).send({ Usuarios: usuarioEliminado })
  })

}

//Login

function Login(req, res) {
  var parametros = req.body;
  // BUSCAMOS EL USUARIO POR EMAIL
  Usuario.findOne({ Email : parametros.Email }, (err, usuarioEncontrado) => {
      if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
      if (usuarioEncontrado){
          // COMPARAMOS CONTRASENAS SIN ENCRIPTAR CON ENCRIPTADA
          bcrypt.compare(parametros.Password, usuarioEncontrado.Password, 
              (err, passwordCorrecta)=>{//TRUE OR FALSE
                  if(passwordCorrecta){
                      return res.status(200)
                          .send({ token : jwt.crearToken(usuarioEncontrado)})
                  } else {
                      return res.status(500).
                          send({ mensaje: 'Las contrasenas no coinciden.'})
                  }
          })

      } else {
          return res.status(500)
              .send({ mensaje: 'El usuario, no se ha podido identificar'})
      }
  })
}
   



module.exports = {
  registrarMestroDefecto,
  registrarAlumno,
  registrarMaestroManual,
  editarAlumno,
  eliminarAlumno,
  Login
};
