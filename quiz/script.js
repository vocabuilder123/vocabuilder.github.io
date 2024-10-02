// Arreglo de preguntas de gramática en español
let preguntas = [
    "¿Cuál de las siguientes palabras es un sustantivo?",
    "¿Cuál de estas palabras es un adjetivo?",
    "¿Cuál es el verbo en esta oración: 'María corre por el parque'?",
    "¿Cuál de estas oraciones tiene un adjetivo?",
    "¿Cuál de estas palabras es un antónimo (lo contrario de 'grande')?",
    "¿Cuál de estas oraciones está en pretérito?",
    "¿Cuál es un homófono de 'vaya'?",
    "¿Cuál de estas frases usa correctamente la coma?"
];

// Arreglo que guarda la opción correcta para cada pregunta
let correcta = [1, 0, 2, 0, 1, 0, 0, 2];

// Arreglo que guarda las opciones para cada pregunta
let opciones = [
    ["A) Saltar", "B) Gato", "C) Rápidamente"],
    ["A) Azul", "B) Jugar", "C) Árbol"],
    ["A) María", "B) Parque", "C) Corre"],
    ["A) El perro es grande.", "B) Pedro juega al fútbol.", "C) La mesa es de madera."],
    ["A) Enorme", "B) Pequeño", "C) Gigante"],
    ["A) Ellos caminaron hasta la tienda.", "B) Nosotros caminamos ahora.", "C) Yo caminaré mañana."],
    ["A) Baya", "B) Calla", "C) Raya"],
    ["A) Comí una manzana, roja.", "B) Comí una manzana, y un plátano.", "C) Comí una manzana, plátano, y pera."]
];

// Función para mezclar un array
function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Función para mezclar las preguntas, opciones y respuestas correctas
function mezclarPreguntas() {
    const combinaciones = preguntas.map((pregunta, index) => ({
        pregunta,
        opciones: opciones[index],
        correcta: correcta[index]
    }));
    
    mezclarArray(combinaciones);

    // Actualizar los arreglos con las preguntas mezcladas
    preguntas = combinaciones.map(comb => comb.pregunta);
    opciones = combinaciones.map(comb => comb.opciones);
    correcta = combinaciones.map(comb => comb.correcta);
}

// Variable que guarda la posición actual
let posActual = 0;
// Variable que guarda la cantidad de respuestas correctas hasta el momento
let cantidadCorrectas = 0;

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("contenido").classList.add("mostrar");
});

// Función para comenzar el juego
function comenzarJuego() {
    // Reseteamos las variables
    posActual = 0;
    cantidadCorrectas = 0;

    // Mezclar preguntas, opciones y respuestas correctas
    mezclarPreguntas();

    // Activamos las pantallas necesarias
    document.getElementById("pantalla-inicial").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "block";
    cargarPregunta();
}

// Función para cargar la próxima pregunta y opciones
function cargarPregunta() {
    if (preguntas.length <= posActual) {
        terminarJuego();
    } else {
        limpiarOpciones();

        document.getElementById("textoPregunta").innerHTML = preguntas[posActual];
        document.getElementById("n0").innerHTML = opciones[posActual][0];
        document.getElementById("n1").innerHTML = opciones[posActual][1];
        document.getElementById("n2").innerHTML = opciones[posActual][2];
    }
}

// Función para limpiar las clases de las opciones
function limpiarOpciones() {
    for (let i = 0; i < 3; i++) {
        document.getElementById("n" + i).className = "respuesta";
        document.getElementById("l" + i).className = "letra";
    }
}

// Función para comprobar la respuesta seleccionada
function comprobarRespuesta(opcionElegida) {
    if (opcionElegida === correcta[posActual]) {
        // Si la respuesta es correcta, agregar clases para resaltarlo en verde
        document.getElementById("n" + opcionElegida).className = "respuesta respuestaAcertada";
        document.getElementById("l" + opcionElegida).className = "letra letraAcertada";
        cantidadCorrectas++;
    } else {
        // Si la respuesta es incorrecta, agregar clases para resaltarlo en rojo
        document.getElementById("n" + opcionElegida).className = "respuesta respuestaNoAcertada";
        document.getElementById("l" + opcionElegida).className = "letra letraNoAcertada";
        // Resaltar la respuesta correcta
        document.getElementById("n" + correcta[posActual]).className = "respuesta respuestaAcertada";
        document.getElementById("l" + correcta[posActual]).className = "letra letraAcertada";
    }
    // Incrementar la posición actual y cargar la siguiente pregunta
    posActual++;
    setTimeout(cargarPregunta, 1000); // Esperar 1 segundo antes de cargar la próxima pregunta
}

// Función para terminar el juego
function terminarJuego() {
    // Ocultar la pantalla de juego y mostrar la pantalla final
    document.getElementById("pantalla-juego").style.display = "none";
    document.getElementById("pantalla-final").style.display = "block";
    // Mostrar los resultados
    document.getElementById("numCorrectas").innerHTML = cantidadCorrectas;
    document.getElementById("numIncorrectas").innerHTML = preguntas.length - cantidadCorrectas;
}

// Función para volver al inicio
function volverAlInicio() {
    // Ocultar la pantalla final y mostrar la pantalla inicial
    document.getElementById("pantalla-final").style.display = "none";
    document.getElementById("pantalla-inicial").style.display = "block";
    document.getElementById("pantalla-juego").style.display = "none";
}
