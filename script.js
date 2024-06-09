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
        rarityText.style.setProperty('--transform-x2', `-${(translateX2 + amount2)}px`);
        rarityIndex++;
        translateX2 = translateX2 + amount2;
        console.log(translateX2);
    }
    if (rarityIndex > 5){
        document.getElementById('arrowRight2').classList.add('unusable');
    }
}

arrowLeft2();

let cost = 50;
let coins = 2500;
let catsAmount = 0;
document.getElementById('coins').querySelector('p').textContent = coins;
document.getElementById('catsAmount').querySelector('p').textContent = catsAmount;
const buttonTop = document.getElementById("button-top");

function updatePrice() {
    switch (true) {
        case rarityIndex === 1:
            cost = 50 * amountIndex;
            break;
        case rarityIndex === 2:
            cost = 100 * amountIndex;
            break;
        case rarityIndex === 3:
            cost = 200 * amountIndex;
            break;
        case rarityIndex === 4:
            cost = 500 * amountIndex;
            break;
        case rarityIndex === 5:
            cost = 1000 * amountIndex;
            break;
        case rarityIndex === 6:
            cost = 2500 * amountIndex;
            break;
    }
    document.getElementById('price').querySelector('p').textContent = `${cost}`;
    if (coins - cost < 0){
        document.getElementById('points').innerText = "NOT ENOUGH COINS";
        document.getElementById('points').classList.add('notEnoughtCoins')
    } else {
        document.getElementById('points').classList.remove('notEnoughtCoins')
        document.getElementById('points').innerText = "BUY BOXES";
    }
}
const lootboxesContainer = document.getElementById('lootboxesContainer');
function button() {
    if (coins - cost >= 0 && !lootboxesContainer.hasChildNodes()){
        buttonTop.classList.add("click");
        coins = coins - cost;
        catsAmount = catsAmount + amountIndex;
        document.getElementById('catsAmount').querySelector('p').textContent = catsAmount;
        document.getElementById('coins').querySelector('p').textContent = coins;

        for(var i = 1; i <= amountIndex; i++){
            console.log("done")
            var newLootbox = document.createElement("div");
            newLootbox.setAttribute("id", "lootboxContainer");
            newLootbox.classList.add('lootbox-container');
            lootboxesContainer.appendChild(newLootbox);
            var newPointer = document.createElement("div");
            newPointer.classList.add('pointer');
            newLootbox.appendChild(newPointer);
            newLootbox.style.animationDelay = `${100*i}ms`
            startAnimation(newLootbox);
        }

        setTimeout(function(){
            buttonTop.classList.remove("click");
        }, 500);
    } 
    if (coins < cost){
        document.getElementById('points').innerText = "NOT ENOUGH COINS";
        document.getElementById('points').classList.add('notEnoughtCoins')
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
    if(window.innerWidth > 600){
        offsetY = event.clientY - inventory.getBoundingClientRect().top;
        startY = event.clientY;
        inventory.classList.remove('jump');
        isDragging = true;
    } else {
        console.log(goUp);
        switch (true) {
            case goUp:
                console.log("goUp");
                inventory.style.setProperty('--top', `${(inventory.getBoundingClientRect().top)}px`);
                inventory.style.setProperty('--precent', `1s`);
                inventory.classList.add('jumpUp');
                inventory.classList.remove('jumpDown');
                break;
            case !goUp:
                console.log("!goUp");
                inventory.style.setProperty('--top', `${(inventory.getBoundingClientRect().top)}px`);
                inventory.style.setProperty('--precent', `1s`);
                inventory.classList.add('jumpDown');
                inventory.classList.remove('jumpUp');
                break;
        }
        goUp = !goUp;
    }
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

function createBox(content, c) {
    const box = document.createElement('div');
    box.classList.add('box');
    box.innerText = content;
    box.style.setProperty('--color', c);
    return box;
}

function startAnimation(lootBox) {
    const boxWidth = 130;
    const containerWidth = lootBox.offsetWidth;
    let boxes = [];
    let speed = 18;
    let deceleration = 0.005;
    const deceleration2 = 0.0001;

    function update() {
        boxes = boxes.filter(box => {
            if (box.offsetLeft + boxWidth < 0) {
                lootBox.removeChild(box);
                return false;
            }
            return true;
        });

        while (boxes.length < 20) {
            const lastBox = boxes[boxes.length - 1];
            let rand = Math.floor(Math.random() * 100) + 1;
            let textContent, color;
            switch (true) {
                case rand >= 1 && rand <= 35:
                    textContent = 'Common';
                    color = 'gray';
                    break;
                case rand > 35 && rand <= 60:
                    textContent = 'Uncommon';
                    color = 'green';
                    break;
                case rand > 60 && rand <= 75:
                    textContent = 'Rare';
                    color = 'blue';
                    break;
                case rand > 75 && rand <= 85:
                    textContent = 'Epic';
                    color = 'purple';
                    break;
                case rand > 85 && rand <= 95:
                    textContent = 'Mythic';
                    color = 'red';
                    break;
                case rand > 95 && rand <= 100:
                    textContent = 'Legendary';
                    color = 'gold';
                    break;
            }
            const newBox = createBox(textContent, color);
            lootBox.appendChild(newBox);
            newBox.style.left = lastBox ? `${lastBox.offsetLeft + boxWidth + 15}px` : `${containerWidth}px`;
            boxes.push(newBox);
        }

        boxes.forEach(box => {
            box.style.left = `${box.offsetLeft - speed}px`;
        });

        speed = Math.max(speed - deceleration, 0);
        deceleration = deceleration + deceleration2;

        if (speed <= 0.01) {
            setTimeout(function() {
                lootBox.remove();
            }, 1000);
        } else {
            requestAnimationFrame(update);
        }
    }

    update();
}