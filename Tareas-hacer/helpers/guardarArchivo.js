const fs = require('fs')
const archivo = './db/data.json'

const guardarInfo = ( data ) => {
    // const archivo = './db/data.txt'
    fs.writeFileSync( archivo, JSON.stringify(data) )
}

const leerDb = () => {
    if ( !fs.existsSync(archivo) ){
        return null;
    }

    const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
    const data = JSON.parse(info);
    // console.log(data)

    return data;
}

module.exports = {
    guardarInfo,
    leerDb
}