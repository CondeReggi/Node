const { Router } = require('express');
const { check } = require('express-validator');
const { userGet, userPost, userPut, userDelete } = require('../controllers/user');
const { esRolValido, emailExiste, existeUserId } = require('../helpers/dbvalidators');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.get('/', userGet)

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( id => existeUserId(id) ),
    check('rol').custom( rol => esRolValido(rol) ),
    validarCampos
] , userPut)

router.post('/', [ 

    // Esto lo que genera es que vaya almancenando todos los check en la request, y pueda verificarlos en la funcion luego

    check('correo' , 'El correo no es valido').isEmail(),
    check('correo').custom( correo => emailExiste(correo) ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').isLength({ min: 6 }),

    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']), // LOs roles deberian ser traidos desde una base de datos

    check('rol').custom( rol => esRolValido(rol) ),

    validarCampos

] , userPost )

router.delete('/', userDelete)

module.exports = router;