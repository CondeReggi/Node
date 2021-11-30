const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, 
        obtenerCategorias, 
        obtenerCategoria, 
        actualizarCategoria, 
        borrarCategoria 
    } = require('../controllers/categorias');

const { existeCategoria } = require('../helpers/dbvalidators');

const { validarJwt, validarCampos, esAdminRole } = require('../middlewares');
const router = Router();

// Obtener todas las categorias
router.get('/', obtenerCategorias );

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
] , obtenerCategoria );

// Crear una categoria - privado - cualquier persona con un token valido
router.post('/', [
    validarJwt,
    check( 'nombre' , 'El nombre es obligatorio' ).not().isEmpty(),
    validarCampos
] , crearCategoria );

// Actualizar segun id - privado - cualquiera con token valido
router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
] , actualizarCategoria );

// Borrar una cateogira - Si es admin
router.delete('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
] , borrarCategoria );

module.exports = router;