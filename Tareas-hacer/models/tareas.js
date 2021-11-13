const Tarea = require("./tarea");
require("colors");

class Tareas {
  _cantidad = 0;

  _listado = {};

  constructor() {
    this._listado = {};
  }

  get listadoArr() {
    const listado = [];

    //Retorna un array de todos los elementos del objeto _listado
    Object.keys(this._listado).forEach((e) => listado.push(this._listado[e]));
    return listado;
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasfromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
    this._cantidad += 1;
  }

  listadoCompleto() {
    //Esta fue mi forma de hacerlo
    let listado = "\n";
    for (let i = 1; i <= this.listadoArr.length; i++) {
      let desc = this.listadoArr[i - 1].desc;
      let completed = this.listadoArr[i - 1].completadoEn
        ? "Completado".green
        : "Pendiente".red;
      listado += ` ${i.toString().green} : ${desc} :: ${completed} \n`;
    }
    // Otra opcion
    // this.listadoArr.forEach( (tarea, index) => {
    //     const idx = `${index + 1}`.green;
    //     const { desc , completadoEn } = tarea;
    //     const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red ;
    //     console.log(`${idx} : ${desc} :: ${estado}`)
    // })
    console.log(listado);
  }

  listarPendientesCompletadas(completadas = true) {
    let contador = 0;

    this.listadoArr.forEach((tarea) => {
      const { desc, completadoEn } = tarea;
      if (completadas) {
        if (completadoEn) {
          contador++;
          console.log(
            `${contador.toString().green}. ${desc} :: ${completadoEn.green}`
          );
        }
      } else {
        if (!completadoEn) {
          contador++;
          console.log(
            `${contador.toString().green}. ${desc} :: ${"Pendiente".red}`
          );
        }
      }
    });
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString(); //Asigno la fecha en la que fue terminada
      }
    });

    this.listadoArr.forEach((tarea) => {
      //para cada tarea me fijo si la id esta en el array de ids
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
