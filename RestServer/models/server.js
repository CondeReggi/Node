const express = require('express');
require('dotenv').config();

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        // Middlewares (funciones que van a añadir funcionalidad al webserver)
        this.middleWares();

        // Rutas de mi aplicacion
        this.routes();
    }

    middleWares(){
        // Directorio public
        this.app.use( express.static('public') )
    }

    routes(){
        this.app.get('/api', (req, res) => {
            res.send('Hola mundo')
        })
    }

    listen(){
        this.app.listen( this.port , () => {
            console.log(`Ejecutandose en localhost:`, this.port )
        })
    }
}

module.exports = Server;