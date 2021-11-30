const { response } = require("express");
const { Categoria } = require("../models");

// obtenerCategorias - paginados - total - populate 

const obtenerCategorias = async ( req , res = response ) => {

    const { limite = 5 , desde = 0 } = req.query;

    const categorias = await Promise.all([ 
        Categoria.countDocuments({ estado: true }),
        Categoria.find({ estado: true })
            .skip( Number(desde) )
            .limit( parseInt(limite) )
    ])

    res.status(201).json({
        msg: 'Fue un exito',
        categorias
    })
}

// obtenerCategoria - populate {}

const obtenerCategoria = async ( req , res = response ) => {

    const id = req.params.id // Aca me quede no voy a seguir hasta mañana

    res.status(201).json({
        msg: 'Fue un exito'
    })
}

// actualizarCategoria - recibe nombre

const actualizarCategoria = async ( req , res = response ) => {
    res.status(201).json({
        msg: 'Fue un exito'
    })
}

// borrarCategoria - estado: false

const borrarCategoria = async ( req , res = response ) => {
    res.status(201).json({
        msg: 'Fue un exito'
    })
}

const crearCategoria = async ( req , res = response ) => {

    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ nombre })

    if ( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre }, ya existe`
        })
    }

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data )
    await categoria.save()

    res.status(201).json({
        msg: 'Fue un exito',
        categoria
    })

}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}