// console.log("Hola")
require('dotenv').config()
const { leerInput, inquirerMenu, pause, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");




const main = async () => {
    
    const busquedas = new Busquedas();
    let opt;

    do{
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                //Mostrar mensaje
                const lugar = await leerInput('Ciudad: ');
                
                //Buscar los lugares
                const lugares = await busquedas.ciudad(lugar)

                //Seleccionar Lugar
                const id = await listarLugares(lugares)
                if (id == '0') continue;
                
                const lugarSel = lugares.find( lugar => lugar.id === id )

                //Guardar en DB
                busquedas.agregarHistorial( lugarSel.nombre )

                //Clima
                const clima = await busquedas.climaLugar( lugarSel.latitud , lugarSel.longitud );

                //Mostrar resultados
                console.clear();
                console.log('\n Informacion de la ciudad \n'.green)
                console.log('Ciudad: ', lugarSel.nombre );
                console.log('Latitud: ', lugarSel.latitud);
                console.log('Longitud: ', lugarSel.longitud);
                console.log('Descripcion: ', clima.desc );
                console.log('Temperatura: ', clima.temp );
                console.log('Minima: ', clima.min );
                console.log('Maxima: ', clima.max);
            break;
            case 2:
                busquedas.historialCapitalizado.forEach( ( lugar , i ) => {
                    const idx = `${i+1}.`.green;
                    console.log( `${idx} ${lugar}`)
                })
            break;
        }

        if (opt !== 0) await pause();

    }while( opt !== 0 )

}

main()
