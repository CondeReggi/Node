const { response } = require("express");
const  { ObjectId } = require('mongoose').Types;
const { Usuario , Categoria , Producto } = require('../models')

const coleccionesPermitidas = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
];

const buscarUsuarios = async ( termino = '' , res = response ) => {

    const esMongoId = ObjectId.isValid( termino )

    if ( esMongoId ){
        const usuario = await Usuario.findById( termino );

        return res.json({
            results: usuario ? [ usuario ] : []
        })
    }

    // Busquedas insensibles

    const regex = new RegExp( termino, 'i' ) // insensibles a mayusculas y minusculas

    const usuarios = await Usuario.find( {  // Usuario.count cuenta cuantas respuestas hay
        $or: [
            { nombre: regex }, { correo: regex }
        ],
        $and: [ { estado: true } ]
    } )

    return res.json({
        results: usuarios
    })

}

const buscar = ( req , res = response ) => {

    const { coleccion , termino } = req.params;

    if ( !coleccionesPermitidas.includes( coleccion ) ) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }` 
        })
    }

    switch (coleccion) {
        case 'usuarios': 
            buscarUsuarios( termino , res )
        break;
        case 'categoria': 
        break;
        case 'productos': 
        break;

        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta busqueda'
            })
    }

    // res.json({
    //     msg: 'buscar',
    //     coleccion,
    //     termino
    // })
}

module.exports = {
    buscar
}