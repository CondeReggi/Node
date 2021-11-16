const axios = require('axios');
const fs = require('fs')

class Busquedas {
    historial = []

    dbPath = './db/database.json';

    constructor(){
        // Leer DB si existe
        this.leerDB()
    }

    get historialCapitalizado() {
        return this.historial.map ( ciudad => {
            let palabras = ciudad.split(' ');
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1) )

            return palabras.join(' ')
        })
    }

    get paramsMapBox() {
        return {
            'access_token' : process.env.MAPBOX_KEY,
            'limit' : 5,
            'language' : 'es'
        }
    }

    get paramsWeather() {
        return {
            'appid' : process.env.OPENWEATHER_KEY,
            'units' : 'metric',
            'lang' : 'es'
        }
    }

    async climaLugar( lat , lon ){
        try {
            const instace_weather = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsWeather , lat , lon }
            })
            const resp = await instace_weather.get()

            const { weather , main } = resp.data

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
        } catch (error) {
            console.log(error)
        }
    }

    async ciudad (lugar = ''){
        //Peticion HTTP

        const instance_place = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?`,
            params: this.paramsMapBox
        });

        const resp = await instance_place.get()

        return resp.data.features.map( feature => ({
            id: feature.id,
            nombre:  feature.place_name,
            longitud: feature.center[0],
            latitud: feature.center[1]
        }))
    }

    agregarHistorial( lugar = '' ) {
        //Prevenir duplicados

        if (!this.historial.find( hlugar => hlugar === lugar)) {
            if( this.historial.length === 5){
                this.historial = this.historial.slice(0,4);
                this.historial.unshift(lugar)
            }else{
                this.historial.unshift(lugar)
            }
        }

        this.guardarDB()
    }

    guardarDB(){
        const payload = {
            historial: this.historial
        };

        fs.writeFileSync( this.dbPath , JSON.stringify( payload ));
    }

    leerDB(){
        //Debe existir
        const archivo = './db/database.json'

        if ( !fs.existsSync(archivo) ){
            return null;
        }

        const info =  fs.readFileSync( archivo , { encoding: 'utf-8'});
        const data = JSON.parse(info);

        this.historial = data.historial
    }
}

module.exports = Busquedas;