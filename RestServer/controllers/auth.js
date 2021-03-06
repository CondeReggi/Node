const bcrypt = require('bcryptjs');
const { response } = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');
const Usuario = require('../models/usuario');

const login = async ( req , res = response ) => {

    const { correo , password } = req.body;

    try {
        
        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo }) //Ya tengo el objeto usuario guardado en usuario

        if ( !usuario ){  // No existe el usuario
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

        // Es un usuario activo?
        const esActivoUsuario =  usuario.estado;
        if ( !esActivoUsuario ) {
            return res.status(400).json({
                msg: 'El estado de dicho usuario no esta activo momentaneamente'
            })
        }

        // Verificar la password
        const contraseñaValida = bcrypt.compareSync( password , usuario.password );
        if ( !contraseñaValida ) {
            return res.status(400).json({
                msg: 'El password no es correcto'
            })
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id ); // Luego pediremos el token para ver si es que nosotros lo firmamos y tiene la informacion que yo espero

        res.json({  // Hay un solo res.json x funcion
            usuario,
            msg: 'Login ok',
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({  // Internal server error
            msg: 'Hable con el administrador'
        })
    }
}

const googleSingIn = async ( req, res = response ) => {
    
    const { id_token } = req.body;

    try {
        const { correo, nombre, img } = await googleVerify( id_token );

        // console.log(googleUser)
        console.log( correo, nombre, img  )

        let usuario = await Usuario.findOne({ correo })

        if ( !usuario ) {
            // Tengo que crearlo
            const data = {
                nombre,
                correo,
                password: 'asdasdasd',
                img,
                google: true
            }

            usuario = new Usuario( data );
            await usuario.save();
        }

        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrador para desbloquearlo'
            })
        }

        const token = await generarJWT( usuario.id )

        res.json({
            usuario,
            token
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error,
            ok: false,
            msg: 'Token de google no es valido',
            id_token
        })
    }



}

module.exports = {
    login,
    googleSingIn
}