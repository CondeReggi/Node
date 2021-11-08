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

// const getEmpleado = (id) => {
//     const empleado = empleados.find( e => e.id === id)
//     const paga = salarios.find( s => s.id === id)
//     return empleado ? `El empleado es ${empleado.nombre} y su salario es: $${paga ? paga.salario : 0}` : `No se ha encontrado empleado`;
// }

// console.log( getEmpleado(3) )


// const getEmpleado = (id) => {
//     const empleado = empleados.find( e => e.id === id)
//     const paga = salarios.find( s => s.id === id)
//     return empleado ? `El empleado es ${empleado.nombre} y su salario es: $${paga ? paga.salario : 0}` : `No se ha encontrado empleado`;
// }

// getEmpleado(3, (empleado) => console.log(empleado)) ///tiene errores 

// const getEmpleado = (id, callback) => {
//     const empleado = empleados.find( e => e.id === id)

//     if (empleado) {
//         callback(null, empleado)
//     }else{
//         callback(`Empleado con id: ${id} no existe`)
//     }
// }

// getEmpleado(10 , (error, empleado) => {
//     if (error) {
//         console.log('Error!')
//         return console.log((err))
//     }

//     console.log('Empleado existe!')
//     console.log(empleado)
// })

//EJERCICIO QUE MANDA CON SALARIOS

// const getSalario = (id , callback) => {
//     const paga = salarios.find(p => p.id === id);

//     if( paga ){
//         callback(null, paga);
//     }else{
//         callback(`No existe id asociada a un pago`)
//     }
// }

// getSalario(2, (err, salario) => {
//     console.log(salario)
// })

//Last way con muchos callbacks anidados, very dificult de entender

const id = 2;

const getEmpleado = ( id, callback) => {
    const empleado = empleados.find( e => e.id === id);

    if (empleado) {
        callback(null, empleado.nombre)
    }else{
        callback(`El empleado con id: ${id} no existe`)
    }
}

const getSalario = (id , callback) => {
    const paga = salarios.find( p => p.id === id)

    if (paga) {
        callback(null, paga.salario)
    }else{
        callback('El id no tiene paga asignada')
    }
}


getEmpleado( id , (err, empleado) => {
    if (err) {
        console.log('ERROR!')
        return console.log(err)
    }

    getSalario( id , (err , salario) => {
        if (err) {
            return console.log(err)
        }

        console.log('El empleado', empleado ,'tiene un salario de: ', salario)
    })
})