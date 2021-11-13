const inquirer = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Que desea hacer?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Crear tarea`,
      },
      {
        value: "2",
        name: `${"2.".green} Listar tareas`,
      },
      {
        value: "3",
        name: `${"3.".green} Listar tareas completadas`,
      },
      {
        value: "4",
        name: `${"4.".green} Listar tareas pendientes`,
      },
      {
        value: "5",
        name: `${"5.".green} Completar tarea(s)`,
      },
      {
        value: "6",
        name: `${"6.".green} Borrar tarea`,
      },
      {
        value: "0",
        name: `${"0.".green} Salir \n`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();

  console.log("=====================".green);
  console.log("=====SELECCIONAR=====".green);
  console.log("=====================\n".green);

  const { opcion } = await inquirer.prompt(preguntas);

  return opcion;
};

const pause = async () => {
  const pausa = [
    {
      type: "input",
      name: "opcionpausa",
      message: [`\nPresione ${"ENTER".yellow} para continuar \n`],
    },
  ];

  const { opcionpausa } = await inquirer.prompt(pausa);
  console.log('\n');
  return opcionpausa;
};

const leerInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if ( value.length === 0) {
          return 'Por favor ingrese un valor'
        }
        return true;
      }
    }
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
}

module.exports = {
  inquirerMenu,
  pause,
  leerInput
};
