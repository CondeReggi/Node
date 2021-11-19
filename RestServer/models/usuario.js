// MongoDB guarda en la BD en formato de objeto
// {
//     nombre: 'Lucas',
//     correo: 'srtoxing@gmail.com',
//     password: 'slkdjalsjd@!asjkhd' // Deberia estar encriptado
//     img: imagen,
//     rol: 'Ejecutivo de ventas',
//     estado:  false / true 
//     google: false
// }

const { Schema , model } = require('mongoose'); 

const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'] // Es requerido el campo, el segundo campo alude al mensaje de error en caso de no ponerse
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La constraseña es obligatorio'],
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: [true],
        enum: ['ADMIN_ROL','USER_ROL']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
})

module.exports = model('Usuario' , usuarioSchema);