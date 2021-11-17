const express = require('express')
const app = express()
const port = 8080;

app.use( express.static('public') )

// Tambien podriamos hacer una carpeta en public con cada ruta y su index asociado dentro, eso tambien solucionaria el problema
// Pero esta opcion generaria que las rutas de las fotos y todo cambie por lo que no es una buena alternativa, es mejor hacer los get necesarios

app.get('/generic', (req, res) => { //Caso default
    res.sendFile( __dirname + '/public/generic.html')
})

app.get('/elements', (req, res) => { //Caso default
    res.sendFile( __dirname + '/public/elements.html')
})

app.get('*', (req, res) => { //Caso default
    res.send('404 | Not found')
})

app.listen(port)