const axios = require('axios');

class Busquedas {
    historial = ['Montevideo','Madrid','Buenos Aires']

    constructor(){
        // Leer DB si existe
    }

    async ciudad (lugar = ''){
        //Peticion HTTP

        // console.log('Ciudad' , lugar)
        
        const resp = await axios.get('https://reqres.in/api/users?page=2')
        console.log(resp.data)

        return [];
    }
}

module.exports = Busquedas;