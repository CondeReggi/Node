const { response } = require("express");

const validarArchivoSubir = (req, res = response , next ) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) { // Me fijo si vino lo que queria que venga en la req.files

        // console.log(!req.files, Object.keys(req.files).length === 0, !req.files.archivo)

        return res.status(400).json({
            msg: "No hay archivos que subir"
        });

    }

    next();
}

module.exports = {
    validarArchivoSubir
}