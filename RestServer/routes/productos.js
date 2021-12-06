const { Router, response } = require('express');
const { check } = require('express-validator');

const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { existeCategoria, existeProcuto } = require('../helpers/dbvalidators');

const { validarJwt, validarCampos, esAdminRole } = require('../middlewares');
const router = Router();

// Obtener todos los productos
router.get('/', obtenerProductos );

// Obtener un producto por id - publico
router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeProcuto ),
    validarCampos
] , obtenerProducto );

// Crear un producto - privado - cualquier persona con un token valido
router.post('/', [
    validarJwt,
    check( 'nombre' , 'El nombre es obligatorio' ).not().isEmpty(),
    check( 'categoria' , 'No es un id de mongo valido' ).isMongoId(),
    check( 'categoria' , 'No es una categoria valida' ).custom( existeCategoria ),
    validarCampos
] , crearProducto );

// Actualizar segun id - privado - cualquiera con token valido
router.put('/:id', [
    validarJwt,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeProcuto ),
    validarCampos
] , actualizarProducto );

// Borrar una cateogira - Si es admin
router.delete('/:id', [
    validarJwt,
    esAdminRole,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeProcuto ),
    validarCampos
] , borrarProducto );

module.exports = router;