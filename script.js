const heroBtn = document.getElementById('hero-btn');
const modalBtn = document.getElementById('modal-btn');
const closeModalBtn = document.getElementById('close-modal');
const modal = document.getElementById('demo-modal');
const mixColorBtn = document.getElementById('mix-color-btn');
const colorBox = document.getElementById('color-box');
const colorValue = document.getElementById('color-value');
const redInput = document.getElementById('red-input');
const greenInput = document.getElementById('green-input');
const blueInput = document.getElementById('blue-input');

let isPulsing = true;

function mixColors(red, green, blue) {
    function validateColorValue(value) {
        return Math.min(255, Math.max(0, parseInt(value) || 0));
    }
    const validRed = validateColorValue(red);
    const validGreen = validateColorValue(green);
    const validBlue = validateColorValue(blue);
    
    return `rgb(${validRed}, ${validGreen}, ${validBlue})`;
}

function calculateLuminance(r, g, b) {
    const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function createColorAdjuster(adjustment) {
    return function(colorValue) {
        return Math.min(255, Math.max(0, colorValue + adjustment));
    };
}


function toggleModal() {
    modal.classList.toggle('active');
    
    document.body.style.overflow = modal.classList.contains('active') ? 'hidden' : '';
}

function handleHeroButtonClick() {
    const animatedElement = document.querySelector('.animated-element');
    
    if (isPulsing) {
        animatedElement.style.animation = 'none';
        heroBtn.textContent = 'Restart Animation';
    } else {
        animatedElement.style.animation = 'pulse 2s infinite, colorChange 5s infinite alternate';
        heroBtn.textContent = 'Pause Animation';
    }
    
    isPulsing = !isPulsing;
}

function updateColorBox() {
    const red = redInput.value;
    const green = greenInput.value;
    const blue = blueInput.value;
    
    const rgbColor = mixColors(red, green, blue);
    
    colorBox.style.backgroundColor = rgbColor;
    colorValue.textContent = rgbColor;
    
    const luminance = calculateLuminance(red, green, blue);
    colorValue.style.color = luminance > 0.5 ? 'black' : 'white';
    
    colorBox.classList.add('flash');
    setTimeout(() => {
        colorBox.classList.remove('flash');
    }, 500);
}

heroBtn.addEventListener('click', handleHeroButtonClick);
modalBtn.addEventListener('click', toggleModal);
closeModalBtn.addEventListener('click', toggleModal);
mixColorBtn.addEventListener('click', updateColorBox);

modal.addEventListener('click', (e) => {
    if (e.target === modal) toggleModal();
});

document.addEventListener('DOMContentLoaded', () => {
    updateColorBox();
    
    const darkenColor = createColorAdjuster(-30);
    const lightenColor = createColorAdjuster(30);
    
    console.log('Darken 150:', darkenColor(150)); 
    console.log('Lighten 150:', lightenColor(150)); 
});
