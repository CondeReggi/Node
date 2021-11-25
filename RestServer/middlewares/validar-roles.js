const { request, response } = require("express");

const esAdminRole = ( req = request , res = response , next ) => {
    const usuario = req.usuario;

    if ( !usuario ){
        res.status(500).json({
            msg: 'Se quiere validar el usuario sin validar el token primero'
        })
    }

    if ( usuario.rol !== 'ADMIN_ROLE' ){
        res.status(401).json({
            msg: 'El usuario no puede borrar debido a que no es administrador'
        })
    }

    next()
}

const tieneRole = ( ...roles ) => {
    return ( req = request , res = response , next ) => {
        const { rol } = req.usuario;

        if (  !req.usuario ){
            res.status(500).json({
                msg: 'Se quiere validar el usuario sin validar el token primero'
            })
        }
    
        if ( !roles.includes( rol ) ){
            res.status(401).json({
                msg: 'El usuario no posee el rol que se definio'
            })
        }

        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}