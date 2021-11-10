const argv = require("yargs")
  .option({
    b: {
      alias: "base",
      type: "number",
      demandOption: true,
      describe: "Base de la tabla de multiplicar",
    },
    l: {
      alias: "listar",
      type: "boolean",
      default: false,
      describe: "Muesta la tabla en consola",
    },
    h: {
      alias: "hasta",
      type: "number",
      default: 10,
      describe: "Indica hasta cuanto va la tabla",
    },
  })
  .check((argv, option) => {
    //console.log(argv)
    if (isNaN(argv.b)) {
      throw "la base tiene que ser un numero";
    }
    if (isNaN(argv.h)) {
      throw "el rango de hasta tiene que ser un numero";
    }
    return true;
  }).argv;

module.exports = argv;
