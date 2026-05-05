// index.js

// Inicializar los modales de Bootstrap
const modalConfirmEl = document.getElementById('modalConfirm');
const modalWelcomeEl = document.getElementById('modalWelcome');
const bellaAlertEl = document.getElementById('bellaAlert'); // La alerta personalizada para más de 7 invitados

const modalConfirm = new bootstrap.Modal(modalConfirmEl);
const modalWelcome = new bootstrap.Modal(modalWelcomeEl);

// --- Manejadores de eventos para los modales y alerta ---

// Abrir el modal de confirmación al hacer clic en el botón principal
document.getElementById('btnOpenConfirm').addEventListener('click', () => {
    modalConfirm.show();
});

// Mostrar la alerta de "Bella Dudando"
function showBellaAlert() {
    bellaAlertEl.classList.add('show');
}

// Ocultar la alerta de "Bella Dudando"
function hideBellaAlert() {
    bellaAlertEl.classList.remove('show');
}

// Cerrar la alerta de "Bella Dudando" al hacer clic en su botón
document.getElementById('bellaAlertCloseBtn').addEventListener('click', () => {
    hideBellaAlert();
});

// Función para mostrar el modal de bienvenida
function showWelcomeModal(name, guests) {
    document.getElementById('welcomeName').textContent = `¡Hola de nuevo, ${name}!`;
    const welcomeMessageParagraph = document.getElementById('welcomeMessage');
    welcomeMessageParagraph.textContent = 'Parece que ya confirmaste tu asistencia. ¿Quieres ir directamente a tu invitación?';

    const btnGoToInvitation = document.getElementById('btnGoToInvitation');
    btnGoToInvitation.textContent = 'Sí, ir a mi invitación';
    // Construye la URL de redirección cuando el usuario hace clic
    btnGoToInvitation.onclick = () => {
        const cleanedName = name.replace(/ /g, '_'); // Reemplaza espacios por guiones bajos
        // AJUSTA ESTA RUTA BASE SI TU details.html NO ESTÁ EN LA RAÍZ
        window.location.href = `details.html?id=${encodeURIComponent(cleanedName)}_${guests}`;
    };

    modalWelcome.show();
}

// --- Lógica del formulario de confirmación (Netlify Forms) ---

document.getElementById('formConfirm').addEventListener('submit', e => {
    // NO usamos e.preventDefault() aquí, porque queremos que Netlify procese el envío del formulario.
    // Netlify intercepta el envío y luego redirige a la URL especificada en el campo oculto '_redirect'.
    
    const nameInput = document.getElementById('inputName');
    const guestsInput = document.getElementById('inputGuests');
    
    const name = nameInput.value.trim();
    const guests = parseInt(guestsInput.value.trim(), 10);
    const btnEnviar = e.target.querySelector('button[type="submit"]');

    // Validación de inputs antes de permitir el envío
    if (name.length < 6) {
        alert('Por favor, escribe un nombre válido de al menos 6 caracteres.');
        e.preventDefault(); // Evita el envío si la validación falla
        return;
    }
    if (isNaN(guests) || guests < 1) {
        alert('Número de invitados inválido. Debe ser al menos 1.');
        e.preventDefault(); // Evita el envío si la validación falla
        return;
    }
    if (guests > 7) {
        showBellaAlert(); // Muestra la alerta personalizada
        e.preventDefault(); // Evita el envío si hay demasiados invitados
        return;
    }

    // Si las validaciones pasan, Netlify manejará el envío.
    // Antes del envío, guardamos los datos en localStorage para usarlos en la página de éxito.
    localStorage.setItem('confirmado', 'true');
    localStorage.setItem('nombre', name);
    localStorage.setItem('invitados', guests);

    // Opcional: Podrías cambiar el texto del botón aquí para dar feedback
    // Sin embargo, como el formulario se va a enviar y la página redirigirá,
    // el usuario no verá esto por mucho tiempo.
    // btnEnviar.textContent = 'Enviando...';
    // btnEnviar.disabled = true;
});


// --- Lógica al cargar la página (para el modal de bienvenida si ya confirmó) ---

window.addEventListener('load', () => {
    if (localStorage.getItem('confirmado') === 'true') {
        const name = localStorage.getItem('nombre') || 'Invitado';
        const guests = localStorage.getItem('invitados') || '1';
        
        // Muestra el modal de bienvenida con los datos guardados
        showWelcomeModal(name, guests);
    }
});

// --- Manejo de la página de éxito (success.html) ---
// Este código es para la página success.html, NO para index.js.
// Lo incluyo aquí como referencia para la siguiente página.
/*
document.addEventListener('DOMContentLoaded', () => {
    // Recuperar datos de localStorage
    const confirmado = localStorage.getItem('confirmado');
    const name = localStorage.getItem('nombre');
    const guests = localStorage.getItem('invitados');

    if (confirmado === 'true' && name && guests) {
        const cleanedName = name.replace(/ /g, '_');
        // Construye la URL final de detalles
        const finalRedirectUrl = `details.html?id=${encodeURIComponent(cleanedName)}_${guests}`;
        // Redirige al usuario
        window.location.href = finalRedirectUrl;
    } else {
        // Si no hay datos, redirige a la página principal
        window.location.href = 'index.html';
    }
});
*/
