const argv = require('yargs')
                .option({
                    'b': {
                        alias: 'base',
                        type: 'number',
                        demandOption: true,
                        describe: 'Base de la tabla de multiplicar'
                    },
                    'l': {
                        alias: 'listar',
                        type: 'boolean',
                        default: false,
                        describe: 'Muesta la tabla en consola'
                    }
                })
                .check( (argv, option) => {
                    //console.log(argv)
                    if (isNaN(argv.b) ){
                        throw 'la base tiene que ser un numero'
                    }
                    return true;
                })
                .argv;

module.exports = argv;