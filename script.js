const header = document.querySelector('header');
const colorContainer = document.querySelector('.container');
// Inicializar Pickr
const pickr = Pickr.create({
    el: '#color-picker', // El contenedor donde irá el selector
    theme: 'classic', // Puedes elegir entre 'classic', 'monolith', 'nano'

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
        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            input: true,
            save: true
        }
    }
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

