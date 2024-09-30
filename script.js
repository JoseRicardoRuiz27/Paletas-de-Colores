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
            // Si es el primer icono, copia el valor HEX
            copyToClipboard(hexValue.textContent);
        } else if (index === 1) {
            // Si es el segundo icono, copia el valor RGBA
            copyToClipboard(rgbaValue.textContent);
        }
    });
});

// Obtener los elementos de la UI donde se mostrarán los valores
const hexValueElement = document.getElementById('hex-value');
const rgbaValueElement = document.getElementById('rgba-value');

// Escuchar el evento 'change' de Pickr para actualizar los valores
pickr.on('change', (color) => {
    const hexColor = color.toHEXA().toString();  // Obtener el valor en HEXA

    // Obtener los valores en RGBA y redondearlos a 2 decimales
    const rgbaArray = color.toRGBA();
    const r = Math.round(rgbaArray[0]);          // Valor de R (Red)
    const g = Math.round(rgbaArray[1]);          // Valor de G (Green)
    const b = Math.round(rgbaArray[2]);          // Valor de B (Blue)
    const a = Math.round(rgbaArray[3] * 100) / 100;  // Valor de A (Alpha) con 2 decimales

    const rgbaColor = `rgba(${r}, ${g}, ${b}, ${a})`;

    // Actualizar el contenido de la UI
    hexValueElement.textContent = hexColor;
    rgbaValueElement.textContent = rgbaColor;

    // Cambiar dinámicamente el fondo del header
    header.style.background = `linear-gradient(${hexColor}, white)`;
});

// Escuchar clics en el colorContainer
colorContainer.addEventListener('click', (event) => {
    if (event.target.tagName === 'DIV') {
        const selectedColor = window.getComputedStyle(event.target).backgroundColor;
        header.style.background = `linear-gradient(${selectedColor}, #fafafa)`;
        copyToClipboard(selectedColor); // Copiar color al portapapeles
    }
});

// Añadir funcionalidad de copiar al hacer clic en los colores existentes
colores.forEach(colorDiv => {
    colorDiv.addEventListener('click', () => {
        const selectedColor = window.getComputedStyle(colorDiv).backgroundColor;
        copyToClipboard(selectedColor);
    });
});

// Funcionalidad para agregar nuevos colores
agregarColorButton.addEventListener('click', () => {
    const nuevoColor = nuevoColorInput.value; // Obtener el valor del input

    // Crear un elemento DIV con el color seleccionado
    const nuevoDiv = document.createElement('div');
    nuevoDiv.classList.add('color'); // Agregar la clase 'color' al elemento DIV
    nuevoDiv.style.backgroundColor = nuevoColor; // Asignar el color de fondo

    // Añadir el evento de copiar para el nuevo color
    nuevoDiv.addEventListener('click', () => {
        copyToClipboard(nuevoColor);
    });

    masColores.appendChild(nuevoDiv); // Agregar el elemento DIV al elemento 'mas-colores'
});
