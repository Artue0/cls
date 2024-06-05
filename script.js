function button() {
    const buttonTop = document.getElementById("button-top");
    buttonTop.classList.add("click");
    setTimeout(function(){
        buttonTop.classList.remove("click");
    }, 500);
}

let amountIndex = 1;
const amountText = document.getElementById('amountText');
const amountTextElementWidth = 50;
const amountTextGapWidth = 120;
const amount = amountTextGapWidth + amountTextElementWidth;
let translateX = 0;
amountText.style.setProperty('--transform-x', `${(translateX)}px`);

function arrowLeft() {
    if (amountIndex > 1){
        document.getElementById('arrowRight').classList.remove('unusable');
        amountText.style.setProperty('--transform-x', `-${(translateX - amount)}px`);
        amountIndex--;
        translateX = translateX - amount;
    }
    if (amountIndex < 2){
        document.getElementById('arrowLeft').classList.add('unusable');
    }
}

function arrowRight() {
    if (amountIndex < 5){
        document.getElementById('arrowLeft').classList.remove('unusable');
        amountText.style.setProperty('--transform-x', `-${(translateX + amount)}px`);
        amountIndex++;
        translateX = translateX + amount;
    }
    if (amountIndex > 4){
        document.getElementById('arrowRight').classList.add('unusable');
    }
}

arrowLeft();

let rarityIndex = 1;
const rarityText = document.getElementById('rarityText');
const rarityTextElementWidth = rarityText.querySelector('p').offsetWidth;
const rarityTextGapWidth = 120;
const amount2 = rarityTextGapWidth + rarityTextElementWidth;
let translateX2 = 0;
rarityText.style.setProperty('--transform-x2', `${(translateX2)}px`);
console.log(translateX2);

function arrowLeft2() {
    if (rarityIndex > 1){
        document.getElementById('arrowRight2').classList.remove('unusable');
        rarityText.style.setProperty('--transform-x2', `-${(translateX2 - amount2)}px`);
        rarityIndex--;
        translateX2 = translateX2 - amount2;
        console.log(translateX2);
    }
    if (rarityIndex < 2){
        document.getElementById('arrowLeft2').classList.add('unusable');
    }
}

function arrowRight2() {
    if (rarityIndex < 6){
        document.getElementById('arrowLeft2').classList.remove('unusable');
        rarityText.style.setProperty('--transform-x2', `-${(translateX2 + amount2)}px`);22222
        rarityIndex++;
        translateX2 = translateX2 + amount2;
        console.log(translateX2);
    }
    if (rarityIndex > 5){
        document.getElementById('arrowRight2').classList.add('unusable');
    }
}

arrowLeft2();

function updatePrice() {
    switch (true) {
        case rarityIndex === 1:
            document.getElementById('price').querySelector('p').textContent = `${50 * amountIndex}`;
            break;
        case rarityIndex === 2:
            document.getElementById('price').querySelector('p').textContent = `${100 * amountIndex}`;
            break;
        case rarityIndex === 3:
            document.getElementById('price').querySelector('p').textContent = `${200 * amountIndex}`;
            break;
        case rarityIndex === 4:
            document.getElementById('price').querySelector('p').textContent = `${500 * amountIndex}`;
            break;
        case rarityIndex === 5:
            document.getElementById('price').querySelector('p').textContent = `${1000 * amountIndex}`;
            break;
        case rarityIndex === 6:
            document.getElementById('price').querySelector('p').textContent = `${2500 * amountIndex}`;
            break;
    }
}

document.getElementById('arrowLeft2').addEventListener('click', updatePrice);
document.getElementById('arrowRight2').addEventListener('click', updatePrice);
document.getElementById('arrowLeft').addEventListener('click', updatePrice);
document.getElementById('arrowRight').addEventListener('click', updatePrice);

const inventory = document.getElementById('inventory');

let isDragging = false;
let offsetY, startY, endY, diffY;
let goUp = true;
let reset = true;

inventory.addEventListener('mousedown', (event) => {
    isDragging = true;
    offsetY = event.clientY - inventory.getBoundingClientRect().top;
    startY = event.clientY;
    inventory.classList.remove('jump');
});

document.addEventListener('mousemove', (event) => {
    if (inventory.getBoundingClientRect().top < window.innerHeight * 0.05) {
        isDragging = false;
        inventory.style.top = `${window.innerHeight * 0.05}px`;
    }
    if (inventory.getBoundingClientRect().top > window.innerHeight * 0.85) {
        isDragging = false;
        inventory.style.top = `${window.innerHeight * 0.85}px`;
    }
    if (isDragging) {
        if (reset) {
            reset = false;
            inventory.classList.remove('jumpUp');
            inventory.classList.remove('jumpDown');
        }
        inventory.style.top = `${event.clientY - offsetY}px`;
        endY = event.clientY;
        diffY = Math.abs(endY - startY);
        if (diffY > 300) {
            inventory.classList.remove('jumpUp');
            inventory.classList.remove('jumpDown');
            inventory.style.setProperty('--top', `${(inventory.getBoundingClientRect().top)}px`);
            inventory.style.setProperty('--precent', `${(inventory.getBoundingClientRect().top / window.innerHeight)}s`);
            switch (true) {
                case goUp:
                    inventory.classList.add('jumpUp');
                    break;
                case !goUp:
                    inventory.classList.add('jumpDown');
                    break;
            }
            goUp = !goUp;
            isDragging = false;
            console.log(inventory.getBoundingClientRect().top / window.innerHeight)
        }
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    reset = true;
    diffY = 0;
    endY = 0;
    startY = 0;
});

document.addEventListener('mouseleave', () => {
    isDragging = false;
});