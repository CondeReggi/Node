const empleados = [
    {
        id: 1,
        nombre: 'Lucas'
    },
    {
        id: 2,
        nombre: 'Cristhian'
    },
    {
        id: 3,
        nombre: 'Gerardo'
    }
]

const salarios = [
    {
        id: 2,
        salario: 1500
    },
    {
        id: 3,
        salario: 2000
    }
]

const id = 3;

const getEmpleado = ( id ) => {
    
    const promesa = new Promise( (resolve, reject) => {
        const empleado = empleados.find( e => e.id === id)?.nombre;

        if(empleado) {
             resolve(empleado)
        }else{
            reject(`No existe empleado con id:${id}`)
        }
    } )

    return promesa;
}

const getSalario = ( id ) => {
    return new Promise( (resolve, reject) => {
        const paga = salarios.find( p => p.id === id)?.salario;

        paga ? resolve(paga) : reject(`No existe salario asignado a el id:${id}`)
    })
}

// getEmpleado(id)
//     .then(empleado => console.log(empleado))
//     .catch( err => console.log(err))

// getSalario(id)
//     .then(salario => console.log(salario))
//     .catch( err => console.log(err))

//Funciona siempre y cuando esto existan los datos

// getEmpleado(id)
//     .then(empleado => {
//         getSalario(id)
//             .then(salario => console.log('El empleado', empleado , 'tiene un salario de:' , salario))
//     })

//Promesas en cadena no tan lindo

// getEmpleado(id)
//     .then(empleado => {
//         getSalario(id)
//             .then(salario => console.log('El empleado', empleado , 'tiene un salario de:' , salario))
//             .catch(err => console.log(err))
//     })
//     .catch(err => console.log(err))

//Promesas en cadena LINDO
let nombre;

getEmpleado(id)
    .then(empleado => {
        nombre = empleado

        return getSalario(id)
    })
    .then(salario => console.log('el empleado', nombre ,'tiene un salario de', salario)) 
    .catch(err => console.log(err))