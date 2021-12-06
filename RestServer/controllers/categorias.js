const { response } = require("express");
const { Categoria } = require("../models");

// obtenerCategorias - paginados - total - populate 

const obtenerCategorias = async ( req , res = response ) => { // Salio bien

    const { limite = 5 , desde = 0 } = req.query;

    const categorias = await Promise.all([ 
        Categoria.countDocuments({ estado: true }),
        Categoria.find({ estado: true })
            .populate('usuario', 'nombre')
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

    const categoriaSegunId = await Categoria.findById( id )         // obtengo la categoria
                                    .populate('usuario', 'nombre');

    if ( !categoriaSegunId ) {
        return res.status(400).json({
            msg: `No se ha encontrado una categoria con id: ${id}`
        })
    }

    res.status(201).json({
        msg: 'Fue un exito',
        categoriaSegunId
    })
}

// actualizarCategoria - recibe nombre - cualquiera con token valido

const actualizarCategoria = async ( req , res = response ) => {

    const { estado , usuario , ...data } = req.body;
    const id = req.params.id;

    data.nombre = data.nombre.toUpperCase();
    data.usuario =  req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate( id , data, { new: true } )
                                .populate('usuario', 'nombre')

    // if (!id) {
    //     return res.status(401).json({
    //         msg: "el nombre que desea cambiar ya existe"
    //     })
    // }
    // No es necesario ya que en los middlewares valido esto

    res.status(201).json({
        msg: 'Fue un exito',
        categoria
    })
}

// borrarCategoria - estado: false

const borrarCategoria = async ( req , res = response ) => {

    const id = req.params.id;

    const categoriaBorrada = await Categoria.findByIdAndUpdate( id , { estado : false} , { new : true } )
                                .populate('usuario', 'nombre');
    res.status(200).json({
        msg: 'Fue un exito',
        categoriaBorrada
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