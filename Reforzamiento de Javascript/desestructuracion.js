const Deadpool = {
    nombre: 'Wade',
    apellido: 'Conde',
    poder: 'Regeneracion',

    getNombre(){
        return `${this.nombre} ${this.apellido} y tiene el poder de ${this.poder}`
    }
}

//const nombre = Deadpool.nombre;
//const apellido = Deadpool.apellido;
//const poder = Deadpool.poder;

// const { nombre, apellido , poder } = Deadpool

// console.log(nombre, apellido, poder);

// function imprimirHero({ nombre, apellido , poder , edad = 0 }){
//     console.log(nombre , apellido , poder , edad)
// }

function imprimirHero(hero){
    const { nombre, apellido , poder , edad = 0 } = hero;
    console.log(nombre , apellido , poder , edad)
}

imprimirHero(Deadpool)

// const heroes = ['Deadpool','Superman','Batman'];

// const [ , , h3] = heroes

// console.log(h3)

//CTRL + K + C comentar lineas