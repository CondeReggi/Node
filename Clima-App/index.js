// console.log("Hola")

const { leerInput, inquirerMenu, pause } = require("./helpers/inquirer");
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
                
                await busquedas.ciudad(lugar)

                //Buscar los lugares

                //Seleccionar Lugar

                //Clima

                //Mostrar resultados
                console.log('\n Informacion de la ciudad \n'.green)
                console.log('Ciudad: ', );
                console.log('Latitud: ', );
                console.log('Longitud: ', );
                console.log('Temperatura: ', );
                console.log('Minima: ', );
                console.log('Maxima: ', );

                console.log("Informacion de la ciudad ciudad")
            break;
            case 2:
                console.log("Ver historial")
            break;
            default:
            break;
        }

        if (opt !== 0) await pause();

    }while( opt !== 0 )

}

main()