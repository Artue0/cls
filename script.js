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
let coins = 25000;
let catsAmount = 0;
document.getElementById('coins').querySelector('p').textContent = coins;
document.getElementById('catsAmount').querySelector('p').textContent = catsAmount;
const buttonTop = document.getElementById("button-top");
let commonChance = 35;
let uncommonChance = 25;
let rareChance = 15;
let epicChance = 10;
let mythicChance = 10;
let legendaryChance = 5;
let divineChance = 0;

function updatePrice() {
    switch (true) {
        case rarityIndex === 1:
            cost = 50 * amountIndex;
            commonChance = 60;
            uncommonChance = 25;
            rareChance = 8;
            epicChance = 4;
            mythicChance = 2;
            legendaryChance = 1;
            divineChance = 0;
            break;
        case rarityIndex === 2:
            cost = 100 * amountIndex;
            commonChance = 50;
            uncommonChance = 25;
            rareChance = 10;
            epicChance = 7;
            mythicChance = 5;
            legendaryChance = 3;
            divineChance = 0;
            break;
        case rarityIndex === 3:
            cost = 200 * amountIndex;
            commonChance = 40;
            uncommonChance = 25;
            rareChance = 15;
            epicChance = 10;
            mythicChance = 7;
            legendaryChance = 3;
            divineChance = 0;
            break;
        case rarityIndex === 4:
            cost = 500 * amountIndex;
            commonChance = 30;
            uncommonChance = 25;
            rareChance = 20;
            epicChance = 12;
            mythicChance = 8;
            legendaryChance = 5;
            divineChance = 0;
            break;
        case rarityIndex === 5:
            cost = 1000 * amountIndex;
            commonChance = 20;
            uncommonChance = 20;
            rareChance = 20;
            epicChance = 15;
            mythicChance = 14;
            legendaryChance = 10;
            divineChance = 1;
            break;
        case rarityIndex === 6:
            cost = 2500 * amountIndex;
            commonChance = 9;
            uncommonChance = 14;
            rareChance = 20;
            epicChance = 20;
            mythicChance = 20;
            legendaryChance = 15;
            divineChance = 2;
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
            newPointer.id = 'pointer';
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

function createBox(src, c) {
    const box = document.createElement('div');
    box.classList.add('box');
    box.style.setProperty('--color', c);

    switch (true) {
        case c === 'gray':
            box.classList.add('common');
            break;
        case c === 'green':
            box.classList.add('uncommon');
            break;
        case c === 'blue':
            box.classList.add('rare');
            break;
        case c === 'purple':
            box.classList.add('epic');
            break;
        case c === 'red':
            box.classList.add('mythic');
            break;
        case c === 'gold':
            box.classList.add('legendary');
            break;
        case c === 'black':
            box.classList.add('divine');
            break;
    }

    const img = document.createElement('img');
    img.src = src;
    box.appendChild(img);
    
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
            let src, color;
            switch (true) {
                case rand >= 1 && rand <= commonChance:
                    src = 'assets/common-lootbox-pic.png';
                    color = 'gray';
                    break;
                case rand > commonChance && rand <= commonChance + uncommonChance:
                    src = 'assets/uncommon-lootbox-pic.png';
                    color = 'green';
                    break;
                case rand > commonChance + uncommonChance && rand <= commonChance + uncommonChance + rareChance:
                    src = 'assets/rare-lootbox-pic.png';
                    color = 'blue';
                    break;
                case rand > commonChance + uncommonChance + rareChance && rand <= commonChance + uncommonChance + rareChance + epicChance:
                    src = 'assets/epic-lootbox-pic.png';
                    color = 'purple';
                    break;
                case rand > commonChance + uncommonChance + rareChance + epicChance && rand <= commonChance + uncommonChance + rareChance + epicChance + mythicChance:
                    src = 'assets/mythic-lootbox-pic.png';
                    color = 'red';
                    break;
                case rand > commonChance + uncommonChance + rareChance + epicChance + mythicChance && rand <= commonChance + uncommonChance + rareChance + epicChance + mythicChance + legendaryChance:
                    src = 'assets/legendary-lootbox-pic.png';
                    color = 'gold';
                    break;
                case rand > commonChance + uncommonChance + rareChance + epicChance + mythicChance + legendaryChance && rand <= commonChance + uncommonChance + rareChance + epicChance + mythicChance + legendaryChance + divineChance:
                    src = 'assets/divine-lootbox-pic.png';
                    color = 'black';
                    break;
            }
            const newBox = createBox(src, color);
            lootBox.appendChild(newBox);
            newBox.style.left = lastBox ? `${lastBox.offsetLeft + boxWidth + 15}px` : `${containerWidth}px`;
            boxes.push(newBox);
        }

        boxes.forEach(box => {
            box.style.left = `${box.offsetLeft - speed}px`;
        });

        speed = Math.max(speed - deceleration, 0);
        deceleration = deceleration + deceleration2;

        let closestLenght = 99999;
        let closestBox = null;
        let animSrc;

        if (speed <= 0.01) {
            setTimeout(function() {
                boxes.forEach(box => {
                    const pointer = document.getElementById('pointer');
                    const dist = Math.abs(box.offsetLeft - (pointer.offsetLeft));
                    if (dist < closestLenght) {
                        closestLenght = dist;
                        closestBox = box;
                    }
                });
                switch (true) {
                    case closestBox.classList.contains('common'):
                        animSrc = 'assets/common-lootbox-anim.webm';
                        break;
                    case closestBox.classList.contains('uncommon'):
                        animSrc = 'assets/uncommon-lootbox-anim.webm';
                        break;
                    case closestBox.classList.contains('rare'):
                        animSrc = 'assets/legendary-lootbox-anim.webm';
                        break;
                    case closestBox.classList.contains('epic'):
                        animSrc = 'assets/divine-lootbox-anim.webm';
                        break;
                    case closestBox.classList.contains('mythic'):
                        animSrc = 'assets/mythic-lootbox-anim.webm';
                        break;
                    case closestBox.classList.contains('legendary'):
                        animSrc = 'assets/legendary-lootbox-anim.webm';
                        break;
                    case closestBox.classList.contains('divine'):
                        animSrc = 'assets/divine-lootbox-anim.webm';
                        break;
                }
                createCats(animSrc);
            }, 1000);
        } else {
            requestAnimationFrame(update);
        }
    }

    update();
}

function createCats(animSrc) {
    document.querySelectorAll('.lootbox-container').forEach(function(lootbox) {
        lootbox.classList.add('dissapear');
    });

    const stripeContainer = document.createElement('div');
    stripeContainer.id = 'stripe-container';
    document.body.appendChild(stripeContainer);
    const stripePattern = document.createElement('div');
    stripePattern.id = 'stripe-pattern';
    stripeContainer.appendChild(stripePattern);

    setTimeout(function() {
        document.querySelectorAll('.lootbox-container').forEach(function(lootbox) {
            lootbox.remove();
        })

        const catAnimation = document.createElement('div');
        catAnimation.classList.add('catAnimation');
        document.body.appendChild(catAnimation);


        const videoElement = document.createElement('video');
        videoElement.classList.add('video');

        const videoSource = document.createElement('source');
        videoSource.src = animSrc;
        videoSource.type = 'video/webm';

        videoElement.appendChild(videoSource);

        videoElement.autoplay = true;
        videoElement.playsInline = true;
        videoElement.playbackRate = 1.25;
        
        catAnimation.appendChild(videoElement);
    }, 1500);

    // const cat = document.getElementById('catContainer').cloneNode(true);
    // for(var i = 0; i < 100; i++) {

    // }
}

// createCats();