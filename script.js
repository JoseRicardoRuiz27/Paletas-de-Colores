const header = document.querySelector('header');
const color = document.querySelector('#color');
const colorContainer = document.querySelector('.container');

color.addEventListener('input', (event) => {
    const colorHeader = event.target.value;

    header.style.background = `linear-gradient(${colorHeader}, #fafafa)`;
});