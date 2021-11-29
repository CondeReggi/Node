const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();


// Obtener todas las categorias
router.get('/', ( req , res ) => {
    res.json({
        msg: 'Obtener todas las categorias'
    })
} );

// Obtener una categoria por id - publico
router.get('/:id', ( req , res ) => {
    res.json({
        msg: ' Obtener una categoria por id - publico'
    })
} );

// Crear una categoria - privado - cualquier persona con un token valido
router.post('/', ( req , res ) => {
    res.json({
        msg: 'Crear una categoria - privado - cualquier persona con un token valido'
    })
} );

// Actualizar segun id - privado - cualquiera con token valido
router.put('/:id', ( req , res ) => {
    res.json({
        msg: 'Actualizar segun id - privado - cualquiera con token valido'
    })
} );

// Borrar una cateogira - Si es admin
router.delete('/:id', ( req , res ) => {
    res.json({
        msg: ' Borrar una cateogira - Si es admin'
    })
} );

module.exports = router;