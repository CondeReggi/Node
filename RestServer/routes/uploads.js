const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/dbvalidators');
const { validarArchivoSubir } = require('../middlewares');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post( '/', validarArchivoSubir , cargarArchivo )

router.put( '/:coleccion/:id' , [
    validarArchivoSubir,
    check( "id" , "El id tiene que ser de mongo" ).isMongoId(),
    check( "coleccion" ).custom( c => coleccionesPermitidas(c , ['usuarios','productos']) ),
    validarCampos
] , actualizarImagen )


module.exports = router;