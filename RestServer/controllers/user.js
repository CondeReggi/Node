// El archivo tambien podria llamarse user.controller.js para especificar mas y para cuando se hacen muchas importanciones
// podria llegar a servir mucho mas y asi quede un codigo mas claro

const { response , request } = require('express')

const userGet = (req = request, res = response) => {

    const query = req.query; // Obtengo los parametros de las query es decir ---> si yo tengo http://localhost:3000/api/usuarios?q=hola&p=pepe&apikey=156196198151

    // query tendria la forma de 
    // "query": {
    //     "q": "hola",
    //     "p": "pepe",
    //     "apikey": "156196198151"
    // }

    res.json({
        msg: 'get API - Controller',
        query
    })
}

const userPost = (req, res = response) => {

    // Postman ---> POST ---> Body ---> Raw ---> ( FORMAT JSON ) --->
    // {
    //     "nombre": "Mi Nombre",
    //     "edad": 22,
    //     "id": 123,
    //     "apellido": "Otro apellido"
    // }
    // ---> SEND

    // const { nombre, edad } = req.body;

    const body = req.body;

    res.json({
        msg: 'post API - Controller',
        // nombre , edad
        body
    })
}

const userDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - Controller'
    })
}

const userPut = (req, res = response) => {

    // const id = req.params.id;
    const { id } = req.params; // Parametros enviados desde la ruta en el router put path

    res.json({
        msg: 'put API - Controller',
        id
    })
}

module.exports = {
    userGet,
    userPost,
    userDelete,
    userPut
}