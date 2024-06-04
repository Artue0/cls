function button() {
    const buttonTop = document.getElementById("button-top");
    buttonTop.classList.add("click");
    setTimeout(function(){
        buttonTop.classList.remove("click");
    }, 500);
}

let index = 1;
const amountText = document.getElementById('amountText');
let translateX = 3;

function arrowLeft() {
    if (index > 1){
        document.getElementById('arrowRight').classList.remove('unusable');
        console.log("works");
        amountText.style.setProperty('--transform-x', `-${(translateX - 23)}%`);
        amountText.classList.add('moveText');
        index--;
        translateX = translateX - 23;
    }
    if (index < 2){
        document.getElementById('arrowLeft').classList.add('unusable');
    }
}

function arrowRight() {
    if (index < 5){
        document.getElementById('arrowLeft').classList.remove('unusable');
        console.log("works");
        amountText.style.setProperty('--transform-x', `-${(translateX + 23)}%`);
        amountText.classList.add('moveText');
        index++;
        translateX = translateX + 23;
    }
    if (index > 4){
        document.getElementById('arrowRight').classList.add('unusable');
    }
}

arrowLeft();