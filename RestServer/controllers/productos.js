const { response } = require("express");
const { Producto } = require("../models");

const crearProducto = async ( req , res = response ) => {

    const { estado, usuario, nombre , ...rest } = req.body;
    const productoDB = await Producto.findOne({ nombre : nombre.toUpperCase() })

    if ( productoDB ) {
        return res.status(400).json({
            msg: `El producto ${ productoDB.nombre }, ya existe`
        })
    }

    const data = {
        nombre: nombre.toUpperCase(),
        ...rest,
        usuario: req.usuario._id
    }

    const producto = new Producto( data )
    await producto.save()

    res.status(201).json({
        msg: 'Fue un exito',
        producto
    })

}

// Obtener todos los productos

const obtenerProductos = async ( req , res = response ) => { // Salio bien

    const { limite = 5 , desde = 0 } = req.query;

    const productos = await Promise.all([ // ACORDARSE DEL PROMISE ALL
        Producto.countDocuments({ estado: true }),
        Producto.find({ estado: true })
            .populate('usuario', 'nombre')
            .skip( Number(desde) )
            .limit( parseInt(limite) )
    ])

    // const contenedor = document.getElementById('contenedor');

    res.status(201).json({
        msg: 'Fue un exito',
        productos
    })
}

// Obtener Producto segun el id

const obtenerProducto = async ( req , res = response ) => {

    const id = req.params.id // Aca me quede no voy a seguir hasta mañana

    const productoSegunID = await Producto.findById( id )         // obtengo la categoria
                                    .populate('usuario', 'nombre')
                                    .populate('categoria', 'nombre');
                                

    if ( !productoSegunID ) {
        return res.status(400).json({
            msg: `No se ha encontrado un producto con id: ${id}`
        })
    }

    res.status(201).json({
        msg: 'Fue un exito',
        productoSegunID
    })
}

// Actualizar Producto

const actualizarProducto = async ( req , res = response ) => {

    const { estado , usuario , ...data } = req.body;
    const id = req.params.id;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario =  req.usuario._id;

    const producto = await Producto.findByIdAndUpdate( id , data, { new: true } )
                                .populate('usuario', 'nombre')
                                .populate('categoria', 'nombre')


    res.status(201).json({
        msg: 'Fue un exito',
        producto
    })
}

// Borrar Producto

const borrarProducto = async ( req , res = response ) => {

    const id = req.params.id;

    const productoBorrado = await Producto.findByIdAndUpdate( id , { 
        estado : false,
        disponible : false
    } , { new : true } )
        .populate('usuario', 'nombre')
        .populate('categoria' , 'nombre')


    res.status(200).json({
        msg: 'Fue un exito',
        productoBorrado
    })
}


module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}
