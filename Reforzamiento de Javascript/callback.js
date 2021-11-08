setTimeout(() => console.log("Hola Mundo") ,1000)

const getUsuarioByID = ( id,  callback ) => {
    const usuario = {
        id,
        nombre: 'Lucas'
    }
    setTimeout(() => callback(usuario) ,1000)
}

getUsuarioByID( 10 , (user) => console.log(user))