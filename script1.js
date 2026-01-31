// ---- Para la cuenta regresiva

// Seteamos la fecha del evento: 14 de marzo de 2026 a las 21:30
const eventDate = new Date("March 14, 2026 21:30:00").getTime();

// Actualizamos el contador cada 1 segundo
const x = setInterval(function() {

    // Obtenemos la fecha y hora actual
    const now = new Date().getTime();

    // Calculamos la distancia entre hoy y la fecha del evento
    const distance = eventDate - now;

    // Cálculos de tiempo para días, horas, minutos y segundos
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Mostramos el resultado en el elemento con id="timer"
    document.getElementById("timer").innerHTML = 
        days + "d : " + 
        hours + "h : " + 
        minutes + "m : " + 
        seconds + "s ";

    // Si la cuenta regresiva termina, mostramos un mensaje
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "¡LLEGÓ EL DÍA! 🥳";
    }
}, 1000);

// ---- Para mostrar el modal para la cuenta bancaria

const modal = document.getElementById('miModal');
const btnAbrir = document.getElementById('btnAbrirModal');
const btnCerrar = document.getElementById('btnCerrar');

// Abrir modal
btnAbrir.onclick = function() {
    modal.classList.add('is-visible');
}

// Cerrar modal al tocar la X
btnCerrar.onclick = function() {
    modal.classList.remove('is-visible');
}

// Cerrar modal si se toca fuera del recuadro blanco
window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.remove('is-visible');
    }
}

// Este script se encarga de cambiar el ícono y manejar la reproducción
const audio = document.getElementById('bgMusic');
const btn = document.getElementById('musicBtn');
const svgPlay = document.getElementById('svgPlay');
const svgPause = document.getElementById('svgPause');

function toggleIcons(playing) {
    if (playing) {
        svgPlay.style.display = 'none';
        svgPause.style.display = 'block';
        btn.classList.add('is-playing');
    } else {
        svgPlay.style.display = 'block';
        svgPause.style.display = 'none';
        btn.classList.remove('is-playing');
    }
}

// Función para intentar reproducir
function intentarReproducir() {
    audio.play().then(() => {
        toggleIcons(true);
    }).catch(() => {
        console.log("Esperando interacción para sonar...");
    });
}

// Intentar al cargar y al primer clic en cualquier lado
window.addEventListener('load', intentarReproducir);
document.addEventListener('click', () => {
    if (audio.paused) intentarReproducir();
}, { once: true });

// Control manual del botón
btn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (audio.paused) {
        audio.play();
        toggleIcons(true);
    } else {
        audio.pause();
        toggleIcons(false);
    }
});