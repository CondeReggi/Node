const express = require('express')
const app = express()
const port = 8080;

//Servir contenido estatico

//Express tiende a buscar el  'index.html' para ejecutar el public 

app.use( express.static('public') )

// Como en la carpeta public detecto el index.html ya no se va a ejecutar el codigo en la ruta '/' 
// Y asi no solo con la ruta '/' sino con cualquiera que no este especificada en public, en ese caso ejecuta los siguientes codigos
// app.get('/', (req, res) => {
//   res.send('Home page')
// })

app.get('/hola-mundo', (req, res) => {
    res.send('Hello World en su respectiva ruta')
})

app.get('*', (req, res) => { //Caso default
    // res.send('404 | Page not found')

    // Podemos enviar achivos html directamente tambien, con el sendFile, seguido de la ruta __dirname (la ruta del archivo) + lo siguiente
    res.sendFile( __dirname + '/public/404.html')
})
 
app.listen(port , () => {
    console.log(`Ejemplo de pagina escuchandose en el puerto : ${port}`)
}) 