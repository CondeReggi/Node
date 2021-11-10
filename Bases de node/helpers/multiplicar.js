const fs = require('fs');

// const crearArchivoTabla = (base = 1) => {
//     console.clear();
//     let salida = '';

//     console.log('=========================');
//     console.log(`=======TABLA DEL ${base}=======`);
//     console.log('=========================');

//     for (let i = 0; i < 10; i++) {
//         salida += `${base} x ${i+1} = ${base*(i+1)} \n`
//     }

//     console.log(salida);

//     fs.writeFileSync(`tabla-del-${base}.txt`, salida )
//     console.log(`tabla-del-${base}.txt creada`);
// }

//transformando en una funcion asincrona

//Usando colors en consola
const colors = require('colors');

const crearArchivoTabla = async (base = 1 , listar) => {
    try {
        console.clear();
        let salida = '';

        
        for (let i = 0; i < 10; i++) {
            salida += `${base} x ${i+1} = ${base*(i+1)} \n`
        }
        
        if (listar) {
            console.log('========================='.rainbow);
            console.log(`=======TABLA DEL ${base}=======`.rainbow);
            console.log('========================='.rainbow);
            console.log(salida);
        }

        fs.writeFileSync(`tabla-del-${base}.txt`, salida )

        return `tabla-del-${base}.txt creada`; //HAY QUE PONERLE EL RETURN
    } catch (error) {
        throw error
    }
}

//O sino podemos hacerlo mediante una promesa

// const crearArchivoTabla = (base = 1) => {
//     return new Promise( (resolve, reject) => {
//         console.clear();
//         let salida = '';

//         console.log('=========================');
//         console.log(`=======TABLA DEL ${base}=======`);
//         console.log('=========================');

//         for (let i = 0; i < 10; i++) {
//             salida += `${base} x ${i+1} = ${base*(i+1)} \n`
//         }

//         console.log(salida);

//         fs.writeFileSync(`tabla-del-${base}.txt`, salida )

//         resolve(`tabla-del-${base}.txt creada`) ; //HAY QUE PONERLE EL RESOLVE
//     })
// }


module.exports = {
    crearArchivoTabla
}