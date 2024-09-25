const header = document.querySelector('header');
const colorContainer = document.querySelector('.palette');
const hexValue = document.getElementById('hex-value');
const rgbaValue = document.getElementById('rgba-value');
const copyIcons = document.querySelectorAll('.icono');

// Inicializar Pickr
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
    
    // También puedes cambiar dinámicamente el fondo del header o de otro elemento
    document.querySelector('header').style.background = `linear-gradient(${hexColor}, white)`;
});

pickr.on('change', (color) => {
    const selectedColor = color.toHEXA().toString();
    document.querySelector('header').style.background = `linear-gradient(${selectedColor}, white)`;
});


colorContainer.addEventListener('click', (event) => {
    if(event.target.tagName === 'DIV'){
        const selectedColor = window.getComputedStyle(event.target).backgroundColor;
        header.style.background = `linear-gradient(${selectedColor}, #fafafa)`;
    }
})

