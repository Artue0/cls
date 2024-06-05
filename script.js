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