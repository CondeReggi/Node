const express = require('express');
const hbs = require('hbs');
require('dotenv').config();

const app = express()
const port = process.env.PORT;

app.set('view engine', 'hbs');
hbs.registerPartials( __dirname + '/views/partials', function (err) { console.log(err) });


app.use( express.static('public') )

const datos = {
    nombre: 'Lucas Conde',
    titulo: 'Curso de node'
}

app.get('/', (req, res) => { //Caso default
    res.render('home' , datos);
})

app.get('/elements', (req, res) => { //Caso default
    res.render('elements' , datos)
})

app.get('/generic', (req, res) => { //Caso default
    res.render('generic' , datos)
})

app.get('*', (req, res) => { //Caso default
    res.send('404 | Not found')
})

app.listen(port, () => {
    console.log('App corriendo en puerto: ', port)
})