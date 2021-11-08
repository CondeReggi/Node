let numeros = [] //hago una variable que va a contener numeros

for (let i = 0; i < 3; i++) { // repito el codigo 3 veces
    numeros[i] = parseInt(prompt("ingrese su numero")) //estoy asignando al array en la posicion i un numero x consola
}

function suma(num1 , num2){ //queremos una funcion que reciba como parametro 2 numeros
    return parseInt(num1)+ parseInt(num2); //y retorne la suma de ellos
}

let sumanumeros = 0;

for (let j = 0; j < numeros.length; j++) {
    sumanumeros = suma(sumanumeros, numeros[j])
}

//const sumanum = numeros.reduce((acc, valor) => acc + valor, 0)

console.log(sumanumeros)