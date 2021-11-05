console.log("inicio del programa")

setTimeout(() => {
    console.log("Primer timeout")
}, 3000);

setTimeout(() => {
    console.log("Segundo timeout")
}, 0);

setTimeout(() => {
    console.log("Tercero timeout")
}, 0);

console.log("fin del programa")