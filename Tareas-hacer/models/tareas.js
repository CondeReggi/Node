const Tarea = require("./tarea");
require('colors')

class Tareas {

    _cantidad = 0;

    _listado = {};

    get listadoArr(){

        const listado = []; 

        //Retorna un array de todos los elementos del objeto _listado
        Object.keys(this._listado).forEach( e => listado.push(this._listado[e]))
        return listado;
    }

    constructor(){
        this._listado = {};
    }

    cargarTareasfromArray( tareas = [] ){
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea( desc = '' ){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
        this._cantidad += 1; 
    }


    listadoCompleto() {
        // console.log(this.listadoArr)

        //Esta fue mi forma de hacerlo 

        let listado = '\n';
        for (let i = 1; i <= this.listadoArr.length ; i++) {
            let desc = this.listadoArr[i-1].desc
            let completed = (this.listadoArr[i-1].completadoEn) ? 'Completado'.green : 'Pendiente'.red; 
            listado += ` ${(i.toString()).green} : ${ desc } :: ${ completed } \n`
        }

        // Otra opcion 

        // this.listadoArr.forEach( (tarea, index) => {
        //     const idx = `${index + 1}`.green;
        //     const { desc , completadoEn } = tarea;
        //     const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red ;
        //     console.log(`${idx} : ${desc} :: ${estado}`)
        // })

        console.log(listado)
    }

    listarPendientesCompletadas( completadas = true ){

        // console.log(completadas)
        let contador = 0;

        this.listadoArr.forEach( (tarea) => {
            const { desc , completadoEn } = tarea;
            if (completadas) {
                if ( completadoEn ){
                    contador++;
                    console.log(`${contador.toString().green }. ${desc} :: ${completadoEn.green}`)
                }
            }else{
                if ( !completadoEn ){
                    contador++;
                    console.log(`${contador.toString().green}. ${desc} :: ${'Pendiente'.red}`)
                }   
            }            
        })
    }

}

module.exports = Tareas;