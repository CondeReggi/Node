// El archivo tambien podria llamarse user.controller.js para especificar mas y para cuando se hacen muchas importanciones
// podria llegar a servir mucho mas y asi quede un codigo mas claro

const { response , request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { validationResult } = require('express-validator');


const userGet = async (req = request, res = response) => {

    // const query = req.query; // Obtengo los parametros de las query es decir ---> si yo tengo http://localhost:3000/api/usuarios?q=hola&p=pepe&apikey=156196198151

    // query tendria la forma de 
    // "query": {
    //     "q": "hola",
    //     "p": "pepe",
    //     "apikey": "156196198151"
    // }

    const { limite = 5 , desde = 0 } = req.query;

    // const usuarios = await Usuario.find({ estado: true }) // Encontrame todos los modelos de usuario (Si hay 2 mil trae 2 mil) que tengan estado en true
    //     .skip( Number(desde) )
    //     .limit( parseInt(limite) );

    // const total = await Usuario.countDocuments(); // Hacer esto genera que si lo de arriba tarda 2 segundos y esto 2 tambien demora 4 segundas, hay que hacer que se muestre simulataneamente

    const [total , usuarios] = await Promise.all([  // Si una da error todas dan error (Ejecuta todas simulataneamente)
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true }) 
            .skip( Number(desde) )
            .limit( parseInt(limite) )
    ])

    res.json({
        total,
        usuarios
        // resp
    })
}

const userPost = async (req, res = response) => {

    // Postman ---> POST ---> Body ---> Raw ---> ( FORMAT JSON ) --->
    // {
    //     "nombre": "Mi Nombre",
    //     "edad": 22,
    //     "id": 123,
    //     "apellido": "Otro apellido"
    // }
    // ---> SEND
    // const { nombre, edad } = req.body;

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } );

    //Encriptar la password
    const salt =  bcryptjs.genSaltSync(); //Mientras mas alto ams seguro
    usuario.password = bcryptjs.hashSync( password, salt )

    //Guardar usuario en la base de datos

    await usuario.save();

    res.json({
        msg: 'post API - Controller',
        // nombre , edad
        usuario
    })
}

const userDelete = async (req, res = response) => {

    const { id } = req.params;

    // Fisicamente lo borramos  (Perdemos integridad)
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id , { estado: false } ) // Cambbio el estado a false del id con modelo Usuario

    res.json({
        id,
        usuario
    })
}

const userPut = async (req, res = response) => {

    // const id = req.params.id;
    const { id } = req.params; // Parametros enviados desde la ruta en el router put path
    const { _id, password , google , correo , ...resto } = req.body; // Excluyo datos que no quiero utilizar del objeto

    // Validar contra base de datos

    if (password) {
        // Encriptar contraseña
        const salt =  bcryptjs.genSaltSync(); //Mientras mas alto ams seguro
        resto.password = bcryptjs.hashSync( password, salt )
    }

    const usuario = await Usuario.findByIdAndUpdate( id , resto )

    res.json( usuario )
}

module.exports = {
    userGet,
    userPost,
    userDelete,
    userPut
}