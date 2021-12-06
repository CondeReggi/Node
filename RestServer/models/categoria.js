const { Schema , model } = require("mongoose");

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: [ true, 'el estado es obligatorio']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

CategoriaSchema.methods.toJSON = function() {
    //De el objeto CategoriaSchema, tomo la version y la contraseña (los quito)
    //Y todo el resto de elementos del json ...user lo retorno, en consecuencia a la bd le paso el modelo sin la pass y la version
    
    const { __v , estado, ...categoria } = this.toObject();
    return categoria
}


module.exports = model( 'Categoria' , CategoriaSchema )