const { response } = require("express");
const { model } = require("mongoose");
const { subirArchivo } = require("../helpers/subir-archivo");
const { Usuario, Producto } = require("../models");
const path = require('path');
const fs = require('fs');

// Subir archivo a nuestro servidor de express

const cargarArchivo = async (req, res = response) => {

    try {
        const extensionesPermitidas = ['txt', 'md','psd']
        const pathCompleto = await subirArchivo(req.files, extensionesPermitidas , 'textos');

        res.json({
            nombre: pathCompleto
        })
    } catch (error) {
        res.status(400).json({ error })
    }

};

const actualizarImagen = async ( req , res = response ) => {

    const { id , coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'usuarios':
            modelo = await Usuario.findById( id )

            if ( !modelo ) {
                return res.status(400).json({
                    msg: `el id: ${id} , no existe en la coleccion ${ coleccion }`
                })
            }
        break;

        case 'productos':
            modelo = await Producto.findById( id )

            if ( !modelo ) {
                return res.status(400).json({
                    msg: `el id: ${id} , no existe en el producto ${ coleccion }`
                })
            }

        break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvido validarla' });
    }

    // Limpiar imagenes previas

    if ( modelo.img ) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join( __dirname , '../uploads' , coleccion , modelo.img );

        if ( fs.existsSync( pathImagen ) ){ //Existe el directorio con la imagen
            fs.unlinkSync( pathImagen ) //Unlink borra el archivo
        }
    }

    const nombre = await subirArchivo( req.files , undefined , coleccion )
    modelo.img = nombre;
    await modelo.save()

    res.json({
        id,
        coleccion
    })

}


const mostrarImagen = async (req, res = response) => {

    const pathNonImage = path.join( __dirname , '../assets/no-image.jpg' ); // Se que esto existe

    const { id , coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'usuarios':
            modelo = await Usuario.findById( id )

            if ( !modelo ) { // Puede mandar una imagen por defecto
                return res.status(400).json({
                    msg: `el id: ${id} , no existe en la coleccion ${ coleccion }`
                })
            }
        break;
        case 'productos':
            modelo = await Producto.findById( id )

            if ( !modelo ) {
                return res.status(400).json({
                    msg: `el id: ${id} , no existe en el producto ${ coleccion }`
                })
            }

        break;
        default:
            return res.status(500).json({ msg: 'Se me olvido validarla' });
    }

    // Limpiar imagenes previas

    if ( modelo.img ) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join( __dirname , '../uploads' , coleccion , modelo.img );

        if ( fs.existsSync( pathImagen ) ){ //Existe el directorio con la imagen
            return res.sendFile( pathImagen )
        }
    }

    res.sendFile( pathNonImage )
}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
};
