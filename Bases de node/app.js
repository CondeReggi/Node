// const fs = require('fs');

// console.clear();

// const base = 5;
// let salida = '';

// for (let i = 0; i < 10; i++) {
//     salida += `5 x ${i+1} = ${base*(i+1)} \n`
// }

// console.log(salida)

// fs.writeFile('tabla-5.txt', salida, (err) => { //El error salta si, el txt no tiene permisos de escritura
//     if (err) throw err;

//     console.log('tabla-5.txt creada')
// })

// fs.writeFileSync('tabla-5.txt', salida)

//Creando exportaciones

// const { crearArchivoTabla } = require('./helpers/multiplicar')

// const base = 3;

// crearArchivoTabla(base);

//Creando la exportacion pero en forma de promesa

const { crearArchivoTabla } = require('./helpers/multiplicar')

console.log(process.argv)

//CON EL COMANDO EN CONSOLA AL EJECUTAR EL APP.JS Y UN --BASE=5;

//Por posicion hay muchos incovenientes
const [ , , arg3 = 'base=5'] = process.argv;
const [ , base = 5 ] = arg3.split('=')

console.log(base)

// const base = 3;

crearArchivoTabla(base)
    .then( nombreArchivo => console.log(nombreArchivo, 'creado'))
    .catch( err => console.log(err));