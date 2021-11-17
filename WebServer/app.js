const http = require('http');

http.createServer( (req, res) => {

    res.writeHead( 200 , { 'Content-Type': 'text/plain' } )

    const persona = {
        id: 1,
        nombre: 'Lucas Conde'
    }

    // res.write( persona ) // No funciona porque persona es un objeto y el content-type es texto plano
    res.write( JSON.stringify( persona ) ) //Si funciona ahora

    // res.writeHead( 200 , { 'Content-Type': 'application/json' } )

    res.setHeader('Content-Disposition','attachment; filename=lista.csv');
    res.writeHead( 200 , { 'Content-Type': 'application/csv' })

    // 200 = Correctamente
    // 201 = Crear un registro / algo
    // 404 = Page not found

    // En los headers se pueden mandar tokens como variables 'hola' : 'mundo'
    // Mas info de http ---> https://nodejs.org/api/http.html

    res.write('Hola mundo');
    res.write('id: nombre\n');
    res.write('1: Juan\n');
    res.write('2: Lucas\n');
    res.write('3: Camila\n');

    res.end();
})
.listen( 8080 );

console.log('Escuchando el puerto: ', 8080);