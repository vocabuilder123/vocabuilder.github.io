// Arreglo que contiene las palabras para jugar, relacionadas con gramática
let arrayPalabras = [
    "SUSTANTIVO",  // Es una palabra que nombra a personas, animales, cosas o lugares.
    "ADJETIVO",    // Es una palabra que describe cómo es o cómo está algo o alguien.
    "VERBO",       // Es la parte de la oración que indica la acción que realiza el sujeto.
    "ORACION",     // Es el conjunto de palabras que tiene sentido completo y termina con un punto.
    "ENUNCIADO",   // Es el grupo de palabras que tiene un sujeto y un predicado.
    "COMA",        // Es un signo que se usa para separar elementos dentro de una oración.
    "ANTONIMOS",   // Son palabras que tienen significados opuestos.
    "HOMOFONOS",   // Son palabras que suenan igual, pero tienen significados diferentes.
    "PRETERITO",   // Es el tiempo verbal que indica una acción que ya ha ocurrido.
    "DETERMINANTE" // Es la palabra que acompaña al sustantivo para señalarlo o determinarlo.
];

// Arreglo que contiene las ayudas de cada palabra
let ayudas = [
    "Es una palabra que nombra a personas, animales, cosas o lugares.",  // Sustantivo
    "Es una palabra que describe cómo es o cómo está algo o alguien.",   // Adjetivo
    "Es la parte de la oración que indica la acción que realiza el sujeto.", // Verbo
    "Es el conjunto de palabras que tiene sentido completo y termina con un punto.", // Oración
    "Es el grupo de palabras que tiene un sujeto y un predicado.",  // Enunciado
    "Es un signo que se usa para separar elementos dentro de una oración.", // Coma
    "Son palabras que tienen significados opuestos.", // Antónimos
    "Son palabras que suenan igual, pero tienen significados diferentes.", // Homófonos
    "Es el tiempo verbal que indica una acción que ya ha ocurrido.", // Pretérito
    "Es la palabra que acompaña al sustantivo para señalarlo o determinarlo." // Determinante
];

let cantPalabrasJugadas = 0;
let intentosRestantes = 5;
let posActual;
let arrayPalabraActual = [];
let cantidadAcertadas = 0;
let divsPalabraActual = [];
let totalQueDebeAcertar;

function cargarNuevaPalabra() {
    cantPalabrasJugadas++;
    if (cantPalabrasJugadas > 10) { // Actualizado para reflejar 10 palabras
        cantPalabrasJugadas = 0; // Reiniciar la cuenta
    }

    posActual = Math.floor(Math.random() * arrayPalabras.length);
    let palabra = arrayPalabras[posActual];
    totalQueDebeAcertar = palabra.length;
    cantidadAcertadas = 0;
    arrayPalabraActual = palabra.split('');

    document.getElementById("palabra").innerHTML = "";
    document.getElementById("letrasIngresadas").innerHTML = "";

    for (let i = 0; i < palabra.length; i++) {
        let divLetra = document.createElement("div");
        divLetra.className = "letra";
        document.getElementById("palabra").appendChild(divLetra);
    }

    divsPalabraActual = document.getElementsByClassName("letra");

    intentosRestantes = 5;
    document.getElementById("intentos").innerHTML = intentosRestantes;
    document.getElementById("ayuda").innerHTML = ayudas[posActual];

    arrayPalabras.splice(posActual, 1);
    ayudas.splice(posActual, 1);
}

cargarNuevaPalabra();

document.addEventListener("keydown", event => {
    if (isLetter(event.key)) {
        let letrasIngresadas = document.getElementById("letrasIngresadas").innerHTML;
        letrasIngresadas = letrasIngresadas.split('');

        if (letrasIngresadas.lastIndexOf(event.key.toUpperCase()) === -1) {
            let acerto = false;

            for (let i = 0; i < arrayPalabraActual.length; i++) {
                if (arrayPalabraActual[i] == event.key.toUpperCase()) {
                    divsPalabraActual[i].innerHTML = event.key.toUpperCase();
                    acerto = true;
                    cantidadAcertadas += 1;
                }
            }

            if (acerto) {
                if (totalQueDebeAcertar == cantidadAcertadas) {
                    for (let i = 0; i < arrayPalabraActual.length; i++) {
                        divsPalabraActual[i].className = "letra pintar";
                    }
                }
            } else {
                intentosRestantes -= 1;
                document.getElementById("intentos").innerHTML = intentosRestantes;

                if (intentosRestantes <= 0) {
                    for (let i = 0; i < arrayPalabraActual.length; i++) {
                        divsPalabraActual[i].className = "letra pintarError";
                    }
                }
            }

            document.getElementById("letrasIngresadas").innerHTML += event.key.toLocaleUpperCase() + " - ";
        }
    }
});

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}
