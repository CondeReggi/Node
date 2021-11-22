const { validationResult } = require("express-validator");

const validarCampos = (req , res , next ) => {
    // Obtener todos los errors de validaciones

    const errors = validationResult(req); //Obtengo todos los check
    if (!errors.isEmpty()) {
        return res.status(400).json(errors); // Envio un mensaje de error con status 400 (ERRORES)
    }

    next();
};

module.exports = {
    validarCampos,
};
