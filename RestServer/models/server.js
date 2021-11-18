const express = require('express');
const cors = require('cors')
require('dotenv').config();

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'

        // Middlewares (funciones que van a añadir funcionalidad al webserver)
        this.middleWares();

        // Rutas de mi aplicacion
        this.routes();
    }

    middleWares(){
        //CORS
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use(express.json());  // Con esto vamos a lograr que cualquier dato obtenido a travez de un post o lo que sea, venga en formato json

        // Directorio public
        this.app.use( express.static('public') );
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/user'));
    }

    listen(){
        this.app.listen( this.port , () => {
            console.log(`Ejecutandose en localhost:`, this.port )
        })
    }
}

module.exports = Server;