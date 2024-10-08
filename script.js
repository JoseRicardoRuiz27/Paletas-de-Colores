const header = document.querySelector('header');
const colorContainer = document.querySelector('.palette');
const hexValue = document.getElementById('hex-value');
const rgbaValue = document.getElementById('rgba-value');
const copyIcons = document.querySelectorAll('.icono');
const nuevoColorInput = document.getElementById('nuevo_color');
const agregarColorButton = document.getElementById('agregar_color');
const masColores = document.getElementById('mas-colores');
const colores = document.querySelectorAll('.color');

// Inicializar Pickr
const pickr = Pickr.create({
    el: '#color-picker',
    theme: 'classic',
    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)'
    ],
    components: {
        preview: true,
        opacity: true,
        hue: true,
        interaction: {
            hex: true,
            rgba: true,
            input: true,
            save: true
        }
    }
});

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Texto copiado al portapapeles: ' + text);
    }).catch(err => {
        console.error('Error al copiar al portapapeles', err);
    });
}

// Añadir eventos a los iconos de copiar
copyIcons.forEach((icon, index) => {
    icon.addEventListener('click', () => {
        if (index === 0) {
            copyToClipboard(hexValue.textContent);
        } else if (index === 1) {
            copyToClipboard(rgbaValue.textContent);
        }
    });
});

// Cargar colores guardados del LocalStorage al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const coloresGuardados = JSON.parse(localStorage.getItem('colores')) || [];
    coloresGuardados.forEach(color => crearColorDiv(color));
});

function crearColorDiv(color) {
    const nuevoDiv = document.createElement('div');
    nuevoDiv.classList.add('color');
    nuevoDiv.style.backgroundColor = color;

    const iconoImg = document.createElement('img');
    iconoImg.src = './icono/icons8-copiar-24.png';
    iconoImg.alt = 'Icono de copiar';

    nuevoDiv.appendChild(iconoImg);

    nuevoDiv.addEventListener('click', () => {
        copyToClipboard(color);
    });

    masColores.appendChild(nuevoDiv);
}

// Escuchar el evento 'change' de Pickr para actualizar los valores
pickr.on('change', (color) => {
    const hexColor = color.toHEXA().toString();

    const rgbaArray = color.toRGBA();
    const r = Math.round(rgbaArray[0]);
    const g = Math.round(rgbaArray[1]);
    const b = Math.round(rgbaArray[2]);
    const a = Math.round(rgbaArray[3] * 100) / 100;

    const rgbaColor = `rgba(${r}, ${g}, ${b}, ${a})`;

    hexValue.textContent = hexColor;
    rgbaValue.textContent = rgbaColor;

    header.style.background = `linear-gradient(${hexColor}, white)`;
});

// Añadir funcionalidad de copiar al hacer clic en los colores existentes
colores.forEach(colorDiv => {
    colorDiv.addEventListener('click', () => {
        const selectedColor = window.getComputedStyle(colorDiv).backgroundColor;
        copyToClipboard(selectedColor);
    });
});

// Funcionalidad para agregar nuevos colores y guardarlos en LocalStorage
agregarColorButton.addEventListener('click', () => {
    const nuevoColor = nuevoColorInput.value;

    if (nuevoColor) {
        crearColorDiv(nuevoColor);

        const coloresGuardados = JSON.parse(localStorage.getItem('colores')) || [];
        coloresGuardados.push(nuevoColor);
        localStorage.setItem('colores', JSON.stringify(coloresGuardados));
    }
});
