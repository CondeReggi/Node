
const path = require('path');
const { v4: uuidv4 } = require('uuid')

const subirArchivo = ( files , extensionesValidas = ['jpg', 'png', 'jpeg', 'gif'] , carpeta = '' ) => {

    return new Promise( (resolve, reject) => {

        const { archivo } = files; // tomo mi archivo

        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1]; // .png .jpg .md

        // Validar la extension

        if (!extensionesValidas.includes(extension)) {
            return reject(`La extension ${extension} no es valida, son permitidas: ${extensionesValidas}`)
        }

        const nombreTemp = uuidv4() + '.' + extension
        const uploadPath = path.join(__dirname, '../uploads/', carpeta , nombreTemp); // obtengo mi ruta fisica de la carpeta en donde quiero guardar el archivo

        archivo.mv(uploadPath, (err) => { //mv de mover (funcion de express. filecoso)
            if (err) {
                console.log(err) // para el del frontend
                return reject(err); // Si pasa algo tira error
            }

            resolve(nombreTemp);
        })

    });

}

module.exports = {
    subirArchivo
}