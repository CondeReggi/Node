require("colors");
const { guardarInfo, leerDb } = require("./helpers/guardarArchivo");
const { inquirerMenu, pause, leerInput } = require("./helpers/inquirer");
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
        case "1":
            const desc = await leerInput('Descripcion: ');
            // console.log(desc)
            tareas.crearTarea( desc );
        break;

        case "2":
            tareas.listadoCompleto();
        break;

        case "3":
            tareas.listarPendientesCompletadas(true);
        break;

        case "4":
            tareas.listarPendientesCompletadas(false);
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
