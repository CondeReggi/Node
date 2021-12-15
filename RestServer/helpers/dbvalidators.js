// const { response } = require('express');
const { Categoria, Producto } = require('../models');
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
    }
}

const existeCategoria = async ( id ) => {
    const existCategoria = await Categoria.findById( id ) 

    if ( !existCategoria || !existCategoria.estado ) {
        throw new Error(`La categoria con id: ${ id } no existe`)
    }
}

const existeProcuto = async ( id ) => {
    const existeProduct = await Producto.findById( id )

    if ( !existeProduct || !existeProduct.estado ) {
        throw new Error(`El producto con id: ${ id } no es valido`)
    }
}

const coleccionesPermitidas = ( coleccion = '' , coleccionesPermitidas = [] ) => {
    if ( !coleccionesPermitidas.includes(coleccion) ){
        throw new Error(`La coleccion ${coleccion} no es valida`)
    } 

    return true
}


module.exports = {
    esRolValido,
    emailExiste,
    existeUserId,
    existeCategoria,
    existeProcuto,
    coleccionesPermitidas
}