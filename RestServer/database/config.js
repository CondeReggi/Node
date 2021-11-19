const mongoose = require('mongoose')

const dbConnection = async() => {

    try {
        
        // Podria poner un .then porque devuelve una promesa, pero al estar en una funcion async con el await esta bien
        await mongoose.connect( process.env.MONGODB_CNN , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Database online')

    } catch (err) {
        console.log(err)
        throw new Error('Error a la hora de iniciar la base de datos')
    }

}

module.exports = {
    dbConnection
}