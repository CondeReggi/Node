const { response } = require("express");
const path = require('path')

// Subir archivo a nuestro servidor de express

const cargarArchivo = (req, res = response) => {
    console.log(req.files)
    // res.status(200).json({
    //     msg: 'Archivos cargados'
    // })

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) { // Me fijo si vino lo que queria que venga en la req.files

        console.log( !req.files , Object.keys(req.files).length === 0 , !req.files.archivo )

        res.status(400).json({
            msg: "No hay archivos que subir"
        });
        return;
    }

    //   Caso especifico para un archivo especifico

    //   if (!req.files.archivo ) {
    //     res.status(400).json({
    //         msg: "No se ha subido el archivo"
    //     });
    //     return;
    //   }

    const { archivo } = req.files; // tomo mi archivo

    const uploadPath = path.join( __dirname, '../uploads/' , archivo.name ); // obtengo mi ruta fisica de la carpeta en donde quiero guardar el archivo

    archivo.mv( uploadPath, (err) => { //mv de mover (funcion de express. filecoso)
        if (err) {
            console.log(err) // para el del frontend
            return res.status(500).json({ err }); // Si pasa algo tira error
        }

        res.json({
            msg: "File uploaded to " + uploadPath // Sino tira la ruta donde fue guardada
        });
    });
};

module.exports = {
    cargarArchivo,
};
