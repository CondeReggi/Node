const { Router } = require('express');
const { check } = require('express-validator');
const { userGet, userPost, userPut, userDelete } = require('../controllers/user');
const router = Router();

router.get('/', userGet)

router.put('/:id', userPut)

router.post('/', [ 

    // Esto lo que genera es que vaya almancenando todos los check en la request, y pueda verificarlos en la funcion luego

    check('correo' , 'El correo no es valido').isEmail(),
] , userPost )

router.delete('/', userDelete)

module.exports = router;