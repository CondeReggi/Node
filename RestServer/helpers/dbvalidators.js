const Role =  require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async (rol = "") => {
    const existeRol = await Role.findOne( { rol } )
    if ( !existeRol ) {
        throw new Error('El rol no existe')
    }
}

const emailExiste = async (correo) => {
    const existemail = await Usuario.findOne({ correo }) 
    if ( existemail ) {
        throw new Error(`el correo ${correo} ya esta ingresado`)

        // return res.status(400).json({
        //     msg: 'Ese correo ya esta registrado'
        // })
    }
}

const existeUserId = async ( id ) => {
    const existeUsuario = await Usuario.findById( id ) 
    if ( !existeUsuario ) {
        throw new Error(`El usuario con id: ${ id } no existe`)

        // return res.status(400).json({
        //     msg: 'Ese correo ya esta registrado'
        // })
    }
}


module.exports = {
    esRolValido,
    emailExiste,
    existeUserId
}