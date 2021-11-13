require("colors");
const { guardarInfo, leerDb } = require("./helpers/guardarArchivo");
const { inquirerMenu, pause, leerInput , listarTareasBorrar , confirmar, mostrarListadoChecklist} = require("./helpers/inquirer");
const Tarea = require("./models/tarea");
const Tareas = require("./models/tareas");

// const { mostrarMenu, pause } = require('./helpers/mensajes');

console.clear();

// const main = async () => {
//     let opt = ''
//     do {
//         //(parseInt(opt) < 0 || parseInt(opt) > 6) ? console.log("La opcion tiene que ser entre 0 y 6") : null;
//         opt = await mostrarMenu()
//         console.log(parseInt(opt))
//         await pause();
//     } while (opt !== '0');
// }

const main = async () => {
  let opt = "";

  const tareas = new Tareas(); //creo objeto sin tareas

  const tareasDb = leerDb()

  if (tareasDb) { //cargar tareas
    tareas.cargarTareasfromArray(tareasDb);
  }

  do {
    opt = await inquirerMenu();
    // console.log(parseInt(opt));

    switch (opt) {
        case "1": //Crear tarea
            const desc = await leerInput('Descripcion: ');
            // console.log(desc)
            tareas.crearTarea( desc );
        break;

        case "2": //Listar tareas
            tareas.listadoCompleto();
        break;

        case "3": //Listar tareas completadas
            tareas.listarPendientesCompletadas(true);
        break;

        case "4": //Listar tareas pendientes
            tareas.listarPendientesCompletadas(false);
        break;

        case "5": //Completado o pendiente
            const ids = await mostrarListadoChecklist( tareas.listadoArr );
            // console.log({ids})

            tareas.toggleCompletadas(ids)
        break;

        case "6": //Eliminar tarea
            const id = await listarTareasBorrar( tareas.listadoArr );

            if ( id !== '0') {
              const ok = await confirmar('Estas seguro?')
              if ( ok ) {
                tareas.borrarTarea(id);
                console.log(`\n Tu tarea fue borrada ${'EXITOSAMENTE'.yellow} \n`)
              }
            }
        break;
 
        default:
        break;
    }

    guardarInfo( tareas.listadoArr ); //crea y guarda la tarea en el json

    await pause();
  } while (opt !== "0");
};

// const tareas = new Tareas();
// const tarea = new Tarea('Comprar comida')

// tareas._listado[tarea.id] = tarea
// console.log(tareas)

main();
