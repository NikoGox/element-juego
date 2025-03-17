const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonElementalJugador = document.getElementById('boton-elemental')
const botonReiniciar = document.getElementById ('boton-reiniciar')

const sectionSeleccionarElemental = document.getElementById('seleccionar-elemental')
const spanElementalJugador = document.getElementById('elemental-jugador')
const spanElementalEnemigo = document.getElementById('elemental-enemigo')
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataqueDelJugador = document.getElementById('ataque-jugador')
const ataqueDelEnemigo = document.getElementById('ataque-enemigo')
const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const contenedorAtaques =  document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')


let jugadorId = null
let enemigoId = null
let elementales = []
let elementalesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo =[]
let opcionDeElementales
let inputTutipollo
let inputAleatron 
let inputRudeflora
let elementalJugador
let elementalJugadorObjeto
let ataquesElemental
let ataquesElementalEnemigo
let botonFuego
let botonAgua
let botonPlanta
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let VictoriasJugador = 0
let VictoriasEnemigo = 0
let VidasJugador = 3
let VidasEnemigo = 3
let lienzo = mapa.getContext('2d')
let intervalo
let mapaInGame = new Image()
mapaInGame.src = './assets/mokemap.png'
let alturaResponsive
let anchoDelMapa = window.innerWidth - 20
const anchoMaxMap = 520

if(anchoDelMapa > anchoMaxMap) {
    anchoDelMapa = anchoMaxMap - 20
}

alturaResponsive = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaResponsive

class Elemental {
    constructor (nombre, foto, vida, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 80
        this.alto = 80
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.width - this.alto)
        this.mapaFoto = new Image ()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarElemental() {
        lienzo.drawImage( 
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let tutipollo = new Elemental('Tutipollo','./assets/Tutipollo.jpg', 3,'./assets/Tutipollo.jpg')

let aleatron = new Elemental('Aleatron','./assets/Aleatron.png', 3,'./assets/Aleatron.png')

let rudeflora = new Elemental('Rudeflora','./assets/Rudeflora.jpg', 3,'./assets/Rudeflora.jpg')

const TUTIPOLLO_ATAQUES = [
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌿', id: 'boton-planta' },
]
const ALEATRON_ATAQUES = [
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌿', id: 'boton-planta' },
    { nombre: '🔥', id: 'boton-fuego' },
]
const RUDEFLORA_ATAQUES = [
    { nombre: '🌿', id: 'boton-planta' },
    { nombre: '🌿', id: 'boton-planta' },
    { nombre: '🌿', id: 'boton-planta' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
]

tutipollo.ataques.push(...TUTIPOLLO_ATAQUES)
aleatron.ataques.push(...ALEATRON_ATAQUES)
rudeflora.ataques.push(...RUDEFLORA_ATAQUES)

elementales.push (tutipollo,aleatron,rudeflora)

function iniciarJuego(){

    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    sectionVerMapa.style.display = 'none'
    
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
    botonReiniciar.addEventListener('click', reiniciarJuego)
    unirseAlJuego ()
}

function unirseAlJuego () {
    fetch('http://192.168.100.6:8080/unirse')
        .then(function (res) {
            console.log(res)
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarElementalJugador() {
    
    

    if (inputTutipollo.checked) {
        spanElementalJugador.innerHTML = inputTutipollo.id
        elementalJugador = inputTutipollo.id
    }else if (inputAleatron.checked) {
        spanElementalJugador.innerHTML = inputAleatron.id
        elementalJugador = inputAleatron.id
    }else if (inputRudeflora.checked) {
        spanElementalJugador.innerHTML = inputRudeflora.id
        elementalJugador = inputRudeflora.id
        
    }else {
        alert('Tienes que elegir una opcion')
        return
    }

    sectionSeleccionarElemental.style.display = ('none')


    seleccionarElemental(elementalJugador)

    extraerAtaques(elementalJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
}

function seleccionarElemental(elementalJugador) {
    fetch(`http://192.168.100.6:8080/elemental/${jugadorId}`,{
        method: 'post',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            elemental:elementalJugador
        })
    })
}

function extraerAtaques(elementalJugador) {
    let ataques
    for (let i = 0; i < elementales.length; i++) {
       if (elementalJugador === elementales[i].nombre){
            ataques = elementales[i].ataques
       }
    }

    mostrarAtaques(ataques)
}
function mostrarAtaques (ataques) {
    ataques.forEach((ataque) => {
        ataquesElemental = `
        <button id=${ataque.id} class="ataque-fuego BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesElemental
    })

        botonFuego = document.getElementById ('boton-fuego')
        botonAgua = document.getElementById ('boton-agua')
        botonPlanta = document.getElementById ('boton-planta')
        botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push ('FUEGO')
                boton.style.background = '#606060e1'
                boton.disabled = true
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push ('AGUA')
                boton.style.background = '#606060e1' 
                boton.disabled = true
            } else  {
                ataqueJugador.push ('PLANTA')
                boton.style.background = '#606060e1'
                boton.disabled = true
            }
            if (ataqueJugador.length === 5) {
                enviarAtaques()
            }
        })
    })
}

function enviarAtaques () {
    fetch(`http://192.168.100.6:8080/elemental/${jugadorId}/ataques`, {
        method: 'post',
        headers: {
            "Content-Type":'application/json'
        },
        body: JSON.stringify({
            ataques:ataqueJugador
        })
        
    })
    
    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques () {
    fetch(`http://192.168.100.6:8080/elemental/${enemigoId}/ataques`)
        .then(function (res) {
            if(res.ok) {
                res.json()
                    .then(function ({ataques}) {
                        if (ataques.length === 5) {
                            ataqueEnemigo = ataques
                            Combate()
                        }
                    })
            }
        })
}

function seleccionarElementalEnemigo(enemigo) {
    spanElementalEnemigo.innerHTML = enemigo.nombre;
    ataquesElementalEnemigo = enemigo.ataques;
    secuenciaAtaque();
}


function ataqueAleatorioEnemigo () {
    let ataqueAleatorio = aleatorio(0, ataquesElementalEnemigo.length -1)
        
    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
    ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
    ataqueEnemigo.push('AGUA')
    } else {
    ataqueEnemigo.push('PLANTA')
    }
    iniciarCombate()
       
}

function iniciarCombate() {
    if (ataqueJugador.length === 5) {
        Combate()
    }
}
 
function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function Combate() {

clearInterval(intervalo)

for (let index = 0; index < ataqueJugador.length; index++) {
    if (ataqueJugador[index] === ataqueEnemigo[index]) {
        indexAmbosOponentes(index, index)
        crearMensaje('EMPATE')
    } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'PLANTA') {
        indexAmbosOponentes(index, index)
        crearMensaje('GANASTE')
        VictoriasJugador++
        spanVidasJugador.innerHTML = VictoriasJugador
    } else if (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO') {
        indexAmbosOponentes(index, index)
        crearMensaje('GANASTE')
        VictoriasJugador++
        spanVidasJugador.innerHTML = VictoriasJugador
    } else if (ataqueJugador[index] === 'PLANTA' && ataqueEnemigo[index] === 'AGUA') {
        indexAmbosOponentes(index, index)
        crearMensaje('GANASTE')
        VictoriasJugador++
        spanVidasJugador.innerHTML = VictoriasJugador
    } else {
        indexAmbosOponentes(index, index)
        crearMensaje('PERDISTE')
        VictoriasEnemigo++
        spanVidasEnemigo.innerHTML = VictoriasEnemigo
    }
    
}

    revisarVidas()
}

function revisarVidas() {
    if (VictoriasJugador == VictoriasEnemigo) {
        crearMensajeFinal('Esto fue un empate!')
    }else if (VictoriasJugador > VictoriasEnemigo) {
        crearMensajeFinal('El elemental del enemigo se debilitó, Ganaste!')
    }else {
        crearMensajeFinal('El elemental del jugador se debilitó... Pierdes')
    }
}

function crearMensajeFinal(resultadoFinal) {

    sectionMensajes.innerHTML = resultadoFinal
    sectionReiniciar.style.display = 'block'
}

function crearMensaje(resultado) {

    let nuevoAtaqueDelJugador= document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')
    
    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo   

    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function reiniciarJuego() {
    
    location.reload()
    sectionVerMapa.style.display = 'none'
    sectionSeleccionarElemental.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    iniciarJuego
}

function aleatorio (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {
    
    elementalJugadorObjeto.x = elementalJugadorObjeto.x + elementalJugadorObjeto.velocidadX
    elementalJugadorObjeto.y = elementalJugadorObjeto.y + elementalJugadorObjeto.velocidadY

    lienzo.clearRect(0,0, mapa.clientWidth, mapa.height)
    lienzo.drawImage(
        mapaInGame,
        0,
        0,
        mapa.width,
        mapa.height
    )
    elementalJugadorObjeto.pintarElemental()
    
    enviarPosicion(elementalJugadorObjeto.x, elementalJugadorObjeto.y)

    elementalesEnemigos.forEach(function (elemental) {
        elemental.pintarElemental()
        revisarColision(elemental)
    })
}

function enviarPosicion(x,y) {
    fetch(`http://192.168.100.6:8080/elemental/${jugadorId}/posicion`, {
        method:'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({ enemigos }){
                    console.log(enemigos)
                    elementalesEnemigos = enemigos.map(function (enemigo) {
                        let elementalEnemigo = null
                        const elementalNombre = enemigo.elemental.nombre || ''
                        if (elementalNombre === "Tutipollo") {
                            elementalEnemigo = new Elemental('Tutipollo','./assets/Tutipollo.jpg', 3,'./assets/Tutipollo.jpg', enemigo.id)
                        } else if (elementalNombre === "Aleatron") {
                            elementalEnemigo = new Elemental('Aleatron','./assets/Aleatron.png', 3,'./assets/Aleatron.png', enemigo.id)
                        } else if (elementalNombre === "Rudeflora") {
                            elementalEnemigo = new Elemental('Rudeflora','./assets/Rudeflora.jpg', 3,'./assets/Rudeflora.jpg', enemigo.id)
                        }

                        elementalEnemigo.x = enemigo.x
                        elementalEnemigo.y = enemigo.y

                        return elementalEnemigo
                    })
                })
        }
    })
}

function moverL() {
    elementalJugadorObjeto.velocidadX = -5
}
function moverR() {
    elementalJugadorObjeto.velocidadX = 5
}
function moverU() {
    elementalJugadorObjeto.velocidadY = -5
    
}
function moverD() {
    elementalJugadorObjeto.velocidadY = 5
}
function detenerMovimiento() {
    elementalJugadorObjeto.velocidadX = 0
    elementalJugadorObjeto.velocidadY = 0
}
function KeyPress (event) {
    switch (event.key) {
        case 'ArrowUp':
            moverU()
            break
        case 'ArrowDown':
            moverD()
            break
        case 'ArrowLeft':
            moverL()
            break
        case 'ArrowRight':
            moverR()
            break
        default:
            break
    }
}
function iniciarMapa() {

    elementalJugadorObjeto = obtenerObjetoElemental(elementalJugador)

    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', KeyPress)

    window.addEventListener('keyup', detenerMovimiento)
}
function obtenerObjetoElemental() {
    for (let i = 0; i < elementales.length; i++) {
        if (elementalJugador === elementales[i].nombre){
             return elementales[i]
        }
     }
}
function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaElemental=
        elementalJugadorObjeto.y
    const abajoElemental=
        elementalJugadorObjeto.y + elementalJugadorObjeto.alto
    const derechaElemental=
        elementalJugadorObjeto.x + elementalJugadorObjeto.ancho
    const izquierdaElemental=
        elementalJugadorObjeto.x
    if(
        abajoElemental < arribaEnemigo ||
        arribaElemental > abajoEnemigo ||
        derechaElemental < izquierdaEnemigo||
        izquierdaElemental > derechaEnemigo
    ) {
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    console.log('colision');

    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarElementalEnemigo(enemigo)   

    
}
window.addEventListener('load', iniciarJuego)