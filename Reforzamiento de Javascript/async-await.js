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

const getInfoUser = async (id) => {
    try {
        const empleado = await getEmpleado(id);
        const salario = await getSalario(id)

        return `El salario del empleado ${empleado} es de $${salario}` 
    } catch (error) {
        throw error
    }
}

getInfoUser(id)
    .then(msg => console.log(msg))
    .catch(err => console.log(err))