const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonElementalJugador = document.getElementById('boton-elemental')
const botonFuego = document.getElementById ('boton-fuego')
const botonAgua = document.getElementById ('boton-agua')
const botonPlanta = document.getElementById ('boton-planta')
const botonReiniciar = document.getElementById ('boton-reiniciar')

const sectionSeleccionarElemental = document.getElementById('seleccionar-elemental')
const spanElementalJugador = document.getElementById('elemental-jugador')
const spanElementalEnemigo = document.getElementById('elemental-enemigo')
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataqueDelJugador = document.getElementById('ataque-jugador')
const ataqueDelEnemigo = document.getElementById('ataque-enemigo')
const nuevoAtaqueDelJugador= document.createElement('p')
const nuevoAtaqueDelEnemigo = document.createElement('p')
const contenedorTarjetas = document.getElementById('contenedor-tarjetas')

let elementales = []
let ataqueJugador
let ataqueEnemigo
let opcionDeElementales
let inputTutipollo
let inputAleatron 
let inputRudeflora
let VidasJugador = 3
let VidasEnemigo = 3


class Elemental {
    constructor (nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let tutipollo = new Elemental('Tutipollo','./assets/Tutipollo.jpg', 3)

let aleatron = new Elemental('Aleatron','./assets/Aleatron.jpg', 3)

let rudeflora = new Elemental('Rudeflora','./assets/Rudeflora.jpg', 3)

tutipollo.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌿', id: 'boton-planta' },
)

aleatron.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌿', id: 'boton-planta' },
)

rudeflora.ataques.push(
    { nombre: '🌿', id: 'boton-planta' },
    { nombre: '🌿', id: 'boton-planta' },
    { nombre: '🌿', id: 'boton-planta' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego'},
)

elementales.push (tutipollo,aleatron,rudeflora)

function iniciarJuego(){

    sectionSeleccionarAtaque.style.display = ('none')
    sectionReiniciar.style.display = ('none')
    
    elementales.forEach((elemental) => {
        opcionDeElementales = `
        <input type="radio" name="elemental" id=${elemental.nombre} />
                <label class="TutipolloC" for=${elemental.nombre}>
                    <p>${elemental.nombre}</p>
                    <img src=${elemental.foto} alt=${elemental.nombre}>
                </label>
        `
    contenedorTarjetas.innerHTML += opcionDeElementales
        
     inputTutipollo = document.getElementById('Tutipollo')
     inputAleatron = document.getElementById('Aleatron')
     inputRudeflora = document.getElementById('Rudeflora')

    })

    botonElementalJugador.addEventListener('click', seleccionarElementalJugador)
    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonPlanta.addEventListener('click', ataquePlanta)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarElementalJugador() {
    sectionSeleccionarAtaque.style.display = ('flex')
    sectionSeleccionarElemental.style.display = ('none')
    
    if (inputTutipollo.checked) {
        spanElementalJugador.innerHTML = inputTutipollo.id
    }else if (inputAleatron.checked) {
        spanElementalJugador.innerHTML = inputAleatron.id
    }else if (inputRudeflora.checked) {
        spanElementalJugador.innerHTML = inputRudeflora.id
        
    }else {
        alert('Tienes que elegir una opcion')
        iniciarJuego()
        reiniciarJuego()
    }
    seleccionarElementalEnemigo()   
}

function seleccionarElementalEnemigo() {
    let elementalAleatorio = aleatorio(0, elementales.length -1)


    spanElementalEnemigo.innerHTML = elementales[elementalAleatorio].length
}

function ataqueFuego() {
        ataqueJugador = 'FUEGO'
        ataqueAleatorioEnemigo()
}

function ataqueAgua() {
        ataqueJugador = 'AGUA'
        ataqueAleatorioEnemigo()
} 

function ataquePlanta() {
        ataqueJugador = 'PLANTA'
        ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo () {
    let ataqueAleatorio = aleatorio(1,3)
        
    if (ataqueAleatorio == 1) {
    ataqueEnemigo = 'FUEGO'
    } else if (ataqueAleatorio == 2) {
    ataqueEnemigo = 'AGUA'
    } else {
    ataqueEnemigo = 'PLANTA'
    }

    Combate() 
       
}
 
function Combate () {

    let CorazonesJ = VidasJugador
    let CorazonesE = VidasEnemigo

    if (VidasJugador == 3){ 
        CorazonesJ = '❤️❤️'
    } else if (VidasJugador == 2){ 
        CorazonesJ = '❤️'
    } else if (VidasJugador == 1){ 
        CorazonesJ = '💊'
    } else {'💊'}

    if (VidasEnemigo == 3){ 
        CorazonesE = '❤️❤️'
    } else if (VidasEnemigo == 2){ 
        CorazonesE = '❤️'
    } else if (VidasEnemigo == 1){ 
        CorazonesE = '💊'
    } else {'💊'}

    if(ataqueJugador == ataqueEnemigo) {
        crearMensaje("El enemigo usó tu mismo tipo de ataque")
    }else if(ataqueJugador == 'FUEGO' && ataqueEnemigo == 'PLANTA') {
        crearMensaje('Diste un ataque tipo Fuego, el elemental enemigo pierde un ❤️') +
        VidasEnemigo--
        spanVidasEnemigo.innerHTML = CorazonesE
    }else if (ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO') {
        crearMensaje("Diste un ataque tipo Agua, el elemental enemigo pierde un ❤️")
        VidasEnemigo--
        spanVidasEnemigo.innerHTML = CorazonesE
    }else if (ataqueJugador == 'PLANTA' && ataqueEnemigo == 'AGUA') {
        crearMensaje("Diste un ataque tipo Planta, el elemental enemigo pierde un ❤️")
        VidasEnemigo--
        spanVidasEnemigo.innerHTML = CorazonesE
    }else { 
        crearMensaje("Tu ataque fue revertido, tu elemental pierde un ❤️")
        VidasJugador--
        spanVidasJugador.innerHTML = CorazonesJ
    }

    revisarVidas()
}


function revisarVidas() {
    if (VidasEnemigo == 0) {
        crearMensajeFinal('El elemental del enemigo se debilitó, Ganaste!')
    }else if (VidasJugador == 0) {
        crearMensajeFinal('El elemental del jugador se debilitó... Pierdes')
    }
}

function crearMensajeFinal(resultadoFinal) {

    sectionMensajes.innerHTML = resultadoFinal
    botonFuego.disabled = true
    botonAgua.disabled = true
    botonPlanta.disabled = true
    sectionReiniciar.style.display = 'block'
}

function crearMensaje(resultado) {
    
    sectionMensajes.innerHTML = resultado
    ataqueDelJugador.innerHTML = ataqueJugador
    ataqueDelEnemigo.innerHTML = ataqueEnemigo
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo
    
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego)