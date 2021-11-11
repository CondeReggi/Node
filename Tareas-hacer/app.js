require('colors');
const { inquirerMenu, pause } = require('./helpers/inquirer');

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
    let opt = ''
    do {
        opt = await inquirerMenu()
        console.log(parseInt(opt))

        await pause();
    } while (opt !== '0');
}

main();