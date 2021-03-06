const jwt_simple = require('jwt-simple');
const moment = require('moment');
const claveSecreta = "clave_secreta";

exports.Auth = function (req, res, next) {
    if(!req.headers.authorization){
        return res.status(500).send({mensaje: 'La peticion no tiene la cabecera de autorizacion'});
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        var payload = jwt_simple.decode(token, claveSecreta);
        //EXP: variable que contien el tiempo de expiracion del token
        if(payload.exp <= moment().unix()) {
            return res.status(500).send({mensaje: 'El token a expirado'});
        }
    } catch (error) {
        return res.status(500).send({mensaje: 'El token no es valido'})
    }

    req.user = payload;
    next();
}