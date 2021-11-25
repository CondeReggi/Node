const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require('../models/usuario');

const validarJwt = async (req = request, res = response, next) => {
    // Enviar el 'x-token para validar la autentificacion de usuario y acceder a funciones'

    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            msg: "No vino ningun token",
        });
    }

    try {

        const { uid } = jwt.verify( token , process.env.SECRETORPRIVATEKEY ); // Verifico que el token es igual a mi key personalizada

        const usuarioAutentificado = await Usuario.findById( uid ); // Obtengo mi usuario
        req.usuario = usuarioAutentificado;

        if ( !usuarioAutentificado ) { // Si el usuario no existe
            res.status(401).json({
                msg: 'Token no valido - El usuario no existe siquiera'
            })
        }

        if ( !usuarioAutentificado.estado ) { // Va a entrar si es false el usuario
            res.status(401).json({
                msg: 'Token no valido - El usuario esta en false'
            })
        }
 
        // Creo una propiedad uid en la request con el valor del uid que yo deseo ya que es la misma req que va a pasar por los siguientes controladores
        req.uid = uid; 

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: "Token no valido",
        });
    }
};

module.exports = {
    validarJwt,
};
