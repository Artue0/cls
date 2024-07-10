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
let goUp = true;

inventory.addEventListener('mousedown', (event) => {
    const catCollection = document.getElementById('catCollectionContainer');
    if (event.target === catCollection || catCollection.contains(event.target)) {
        return;
    }
    switch (true) {
        case goUp:
            inventory.style.setProperty('--top', `${(inventory.getBoundingClientRect().top)}px`);
            inventory.style.setProperty('--precent', `1s`);
            inventory.classList.add('jumpUp');
            inventory.classList.remove('jumpDown');
            break;
        case !goUp:
            inventory.style.setProperty('--top', `${(inventory.getBoundingClientRect().top)}px`);
            inventory.style.setProperty('--precent', `1s`);
            inventory.classList.add('jumpDown');
            inventory.classList.remove('jumpUp');
            break;
    }
    goUp = !goUp;
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
                    src = 'assets/common lootbox/common-lootbox-pic.png';
                    color = 'gray';
                    break;
                case rand > commonChance && rand <= commonChance + uncommonChance:
                    src = 'assets/uncommon lootbox/uncommon-lootbox-pic.png';
                    color = 'green';
                    break;
                case rand > commonChance + uncommonChance && rand <= commonChance + uncommonChance + rareChance:
                    src = 'assets/rare lootbox/rare-lootbox-pic.png';
                    color = 'blue';
                    break;
                case rand > commonChance + uncommonChance + rareChance && rand <= commonChance + uncommonChance + rareChance + epicChance:
                    src = 'assets/epic lootbox/epic-lootbox-pic.png';
                    color = 'purple';
                    break;
                case rand > commonChance + uncommonChance + rareChance + epicChance && rand <= commonChance + uncommonChance + rareChance + epicChance + mythicChance:
                    src = 'assets/mythic lootbox/mythic-lootbox-pic.png';
                    color = 'red';
                    break;
                case rand > commonChance + uncommonChance + rareChance + epicChance + mythicChance && rand <= commonChance + uncommonChance + rareChance + epicChance + mythicChance + legendaryChance:
                    src = 'assets/legendary lootbox/legendary-lootbox-pic.png';
                    color = 'gold';
                    break;
                case rand > commonChance + uncommonChance + rareChance + epicChance + mythicChance + legendaryChance && rand <= commonChance + uncommonChance + rareChance + epicChance + mythicChance + legendaryChance + divineChance:
                    src = 'assets/divine lootbox/divine-lootbox-pic.png';
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
        let animSrc, overalySrc;

        if (speed <= 0.01) {
            setTimeout(function() {
                boxes.forEach(box => {
                    const pointer = document.getElementById('pointer');
                    const dist = Math.abs((box.offsetLeft + (box.offsetWidth / 2)) - (pointer.offsetLeft + (pointer.offsetWidth / 2)));
                    if (dist < closestLenght) {
                        closestLenght = dist;
                        closestBox = box;
                    }
                });
                switch (true) {
                    case closestBox.classList.contains('common'):
                        animSrc = 'assets/common lootbox/common-lootbox-anim.webm';
                        overalySrc = 'assets/common lootbox/common-lootbox-overlay.png';
                        break;
                    case closestBox.classList.contains('uncommon'):
                        animSrc = 'assets/uncommon lootbox/uncommon-lootbox-anim.webm';
                        overalySrc = 'assets/uncommon lootbox/uncommon-lootbox-overlay.png';
                        break;
                    case closestBox.classList.contains('rare'):
                        animSrc = 'assets/rare lootbox/rare-lootbox-anim.webm';
                        overalySrc = 'assets/rare lootbox/rare-lootbox-overlay.png';
                        break;
                    case closestBox.classList.contains('epic'):
                        animSrc = 'assets/epic lootbox/epic-lootbox-anim.webm';
                        overalySrc = 'assets/epic lootbox/epic-lootbox-overlay.png';
                        break;
                    case closestBox.classList.contains('mythic'):
                        animSrc = 'assets/mythic lootbox/mythic-lootbox-anim.webm';
                        overalySrc = 'assets/mythic lootbox/mythic-lootbox-overlay.png';
                        break;
                    case closestBox.classList.contains('legendary'):
                        animSrc = 'assets/legendary lootbox/legendary-lootbox-anim.webm';
                        overalySrc = 'assets/legendary lootbox/legendary-lootbox-overlay.png';
                        break;
                    case closestBox.classList.contains('divine'):
                        animSrc = 'assets/divine lootbox/divine-lootbox-anim.webm';
                        overalySrc = 'assets/divine lootbox/divine-lootbox-overlay.png';
                        break;
                }
                createCats(animSrc, overalySrc);
            }, 1000);
        } else {
            requestAnimationFrame(update);
        }
    }

    update();
}

function createCats(animSrc, overalySrc) {
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

        setTimeout(function() {
            const overlay = document.createElement('div');
            overlay.classList.add('overlay');
            catAnimation.appendChild(overlay);
    
            const overlayImg = document.createElement('img');
            overlayImg.src = overalySrc;
            overlay.appendChild(overlayImg);

            const backgroundCircle = document.createElement('div');
            backgroundCircle.classList.add('backgroundCircle');
            catAnimation.appendChild(backgroundCircle);

            const catContainer = document.createElement('div');
            catContainer.classList.add('clonesContainer');
            catAnimation.appendChild(catContainer);
            const clones = [];
            let createClones = true;

            setInterval(function() {
                if (clones.length <= 15 && createClones) {
                    for (let i = 0; i < 1; i++) {
                        const clone = document.getElementById('catContainer').cloneNode(true);
                        clone.classList.add('catClone');
                        clone.classList.remove('hidden');
                        clone.style.bottom = 0;
                        clone.style.left = Math.random() * catContainer.offsetWidth + 'px';
                        clone.style.setProperty('--angle', `${(Math.random() * 100)}deg`);
                        clone.style.setProperty('--side', `${(Math.random() < 0.5 ? -1 : 1)}`);

                        randomizeCat(clone);

                        catContainer.appendChild(clone);
        
                        const horizontalVelocity = Math.random() * (1 - (-1)) + (-1);
                        const verticalVelocity = window.innerHeight * (Math.random() * (0.0055 - 0.005) + 0.005);
        
                        clones.push({
                            element: clone,
                            hVelocity: horizontalVelocity,
                            vVelocity: verticalVelocity,
                            overlayed: false
                        });
                    }
                }
            }, 180);
    
            function moveClones() {
                clones.forEach((clone, index) => {
                    const element = clone.element;
                    let currentBottom = parseFloat(element.style.bottom);
                    let currentLeft = parseFloat(element.style.left);
                    let overlayed = clone.overlayed;
                    const rect = element.getBoundingClientRect();
    
                    currentBottom += clone.vVelocity;
                    currentLeft += clone.hVelocity;
    
                    clone.vVelocity -= 0.027;
    
                    if (rect.bottom > window.innerHeight * 1.1) {
                        element.remove();
                        clones.splice(index, 1);
                    } else {
                        element.style.bottom = currentBottom + 'px';
                        element.style.left = currentLeft + 'px';
                    }

                    if (!overlayed) {
                        setTimeout(function() {
                            clone.overlayed = true
                            element.style.zIndex = 1001;
                        }, 1000);
                    }
                });
            }
            
            setInterval(moveClones, 1);

            function updateHeight() {catContainer.style.height = overlay.getBoundingClientRect().top + (overlay.offsetHeight * 0.85) + 'px';}
            window.addEventListener('resize', updateHeight);
            updateHeight();

            setTimeout(function() {
                const hiddenCat = document.getElementById('catContainer').cloneNode(true);
                hiddenCat.classList.add('hiddenCat');
                hiddenCat.classList.add('hiddenCatColors');
                hiddenCat.classList.remove('hidden');
                hiddenCat.style.top = catContainer.offsetHeight + 'px';
                hiddenCat.style.setProperty('--angle', `${(Math.random() * 100)}deg`);
                catAnimation.appendChild(hiddenCat);
                const questionMark = document.createElement('div');
                questionMark.classList.add('questionMark');
                hiddenCat.querySelector('.cat').querySelector('.catBottom').appendChild(questionMark);
                questionMark.innerText = '?';
                let velocity = -window.innerHeight * 0.0055;
                let currentTop;
                createClones = false;

                function moveHiddenCat() {
                    currentTop = parseFloat(hiddenCat.style.top);
                    currentTop += velocity;
                    velocity += 0.027;
                    hiddenCat.style.top = currentTop + 'px';
                }

                setTimeout(function() {
                    // hiddenCat.style.zIndex = 101;
                    const checkPos = setInterval(function() {
                        if (hiddenCat.getBoundingClientRect().top > window.innerHeight / 2) {
                            clearInterval(checkPos);
                            hiddenCat.style.setProperty('--top', `${currentTop}px`);
                            const matrix = window.getComputedStyle(hiddenCat).transform;
                            hiddenCat.style.setProperty('--rotation', `${matrix === 'none' ? 0 : Math.round(Math.atan2(matrix.match(/matrix\((.+)\)/)[1].split(', ').map(parseFloat)[1], matrix.match(/matrix\((.+)\)/)[1].split(', ').map(parseFloat)[0]) * (180 / Math.PI))}deg`);
                            hiddenCat.classList.add('hiddenCatAnim');
                            setTimeout(function() {
                                hiddenCat.style.setProperty('--scale-width', `${hiddenCat.getBoundingClientRect().width}px`)
                                hiddenCat.classList.add('hiddenCatScale');
                                overlay.remove();
                                videoElement.remove();
                            }, 2000);
                            clearInterval(moveCat);
                            backgroundCircle.classList.add('backgroundCircleAnim');
                            setTimeout(function() {
                                hiddenCat.classList.remove('hiddenCatColors');
                                questionMark.remove();
                                let delay = 30;
                                function animateRandomCat() {
                                    hiddenCat.classList = '';
                                    hiddenCat.classList.add('catContainer');
                                    hiddenCat.classList.add('hiddenCat');
                                    hiddenCat.classList.add('hiddenCatAnim');
                                    hiddenCat.classList.add('hiddenCatScale');
                                    delay = delay * 1.1;

                                    randomizeCat(hiddenCat);

                                    const computedStyle = window.getComputedStyle(hiddenCat.querySelector('.cat').querySelector('.catBottom'));
                                    const catColorString = computedStyle.getPropertyValue('--cat-color').trim();
                                    const catColor = catColorString.split(' ').map(value => parseInt(value, 10))
                                    const darkenedColor = [
                                        Math.max(catColor[0] - 40, 0),
                                        Math.max(catColor[1] - 40, 0),
                                        Math.max(catColor[2] - 40, 0)
                                    ];
                                    let darkenedColor2 = [
                                        Math.max(catColor[0] - 50, 0),
                                        Math.max(catColor[1] - 50, 0),
                                        Math.max(catColor[2] - 50, 0)
                                    ];
                                    if (catColor[0] <= 50 && catColor[1] <= 50 && catColor[2] <= 50) {
                                        darkenedColor2 = [
                                            catColor[0] + 5,
                                            catColor[1] + 5,
                                            catColor[2] + 5
                                        ];
                                        hiddenCat.classList.add('hiddenCatBlack');
                                    }
                                    backgroundCircle.style.setProperty('--circle-color', `${darkenedColor}`);
                                    backgroundCircle.style.setProperty('--border-color', `${darkenedColor2}`);

                                    if (delay <= 1000) {setTimeout(
                                        animateRandomCat, delay);
                                    } else {
                                        setTimeout(function() {
                                            backgroundCircle.classList.add('hideCircle');
                                            hiddenCat.classList.add('hideHiddenCat');
                                            setTimeout(function() {
                                                let classArray = [];
                                                classArray = Array.from(hiddenCat.classList);
                                                classArray.splice(0, 4);
                                                classArray.pop();
                                                console.log(classArray)
                                                
                                                const catDisplayContainer = document.getElementById('catDisplayContainer');
                                                const catDisplayClone = catDisplayContainer.cloneNode(true);
                                                catDisplayClone.id = '';
                                                catDisplayClone.classList.remove('hidden');
                                                document.getElementById('catCollection').appendChild(catDisplayClone);
                                                classArray.forEach(className => catDisplayClone.querySelector('.displayedCatContainer').querySelector('.displayedCat').classList.add(className));
                                                console.log(catDisplayClone.querySelector('.displayedCatContainer').querySelector('.displayedCat'));

                                                hiddenCat.remove();
                                                backgroundCircle.remove();
                                                stripeContainer.remove();
                                                while (lootboxesContainer.firstChild) {
                                                    lootboxesContainer.removeChild(lootboxesContainer.firstChild);
                                                }
                                                catAnimation.remove();
                                                save();
                                            }, 2000);
                                        }, 500);
                                    }
                                }
                                animateRandomCat();
                            }, 2000);
                        }
                    }, 5);
                }, 1000);
                const moveCat = setInterval(moveHiddenCat, 1);
            }, 5000);
        }, 5000);
    }, 1500);
}

function randomizeCat(element) {
        const randBody = Math.random() * 100;
    if (randBody <= 20) {
        element.classList.add('gray-body');
    } else if (randBody <= 35) {
        element.classList.add('white-body');
    } else if (randBody <= 55) {
        element.classList.add('black-body');
        element.classList.add('whiteMouth');
    } else if (randBody <= 70) {
        element.classList.add('orange-body');
    } else if (randBody <= 85) {
        element.classList.add('brown-body');
    } else if (randBody <= 95) {
        element.classList.add('peach-body');
    } else {
        const remainingRand = Math.random() * 100;
        switch (true) {
            case remainingRand <= 6.667:
                element.classList.add('grayBlue-body');
                break;
            case remainingRand <= 13.334:
                element.classList.add('blue-body');
                break;
            case remainingRand <= 20.001:
                element.classList.add('lightBlue-body');
                break;
            case remainingRand <= 26.668:
                element.classList.add('red-body');
                break;
            case remainingRand <= 33.335:
                element.classList.add('purple-body');
                break;
            case remainingRand <= 40.002:
                element.classList.add('darkBlue-body');
                break;
            case remainingRand <= 46.669:
                element.classList.add('darkRed-body');
                break;
            case remainingRand <= 53.336:
                element.classList.add('darkGreen-body');
                break;
            case remainingRand <= 60.003:
                element.classList.add('cyan-body');
                break;
            case remainingRand <= 66.67:
                element.classList.add('green-body');
                break;
            case remainingRand <= 73.337:
                element.classList.add('pink-body');
                break;
            case remainingRand <= 80.004:
                element.classList.add('pinkRed-body');
                break;
            case remainingRand <= 86.671:
                element.classList.add('pinkPurple-body');
                break;
            case remainingRand <= 93.338:
                element.classList.add('orangeYellow-body');
                break;
            default:
                element.classList.add('peach-body');
                break;
        }
    }
    const randStripe = Math.random() * 100;
    if (randStripe <= 25) {
    } else if (randStripe <= 50) {
        element.classList.add('black-stripe');
    } else if (randStripe <= 70) {
        element.classList.add('white-stripe');
    } else if (randStripe <= 90) {
        element.classList.add('gray-stripe');
    } else {
        const remainingRand = Math.random() * 100;
        switch (true) {
            case remainingRand <= 16.667:
                element.classList.add('orange-stripe');
                break;
            case remainingRand <= 33.334:
                element.classList.add('brown-stripe');
                break;
            case remainingRand <= 50.001:
                element.classList.add('blue-stripe');
                break;
            case remainingRand <= 66.668:
                element.classList.add('red-stripe');
                break;
            case remainingRand <= 83.335:
                element.classList.add('green-stripe');
                break;
            default:
                element.classList.add('pink-stripe');
                break;
        }
    }
    const randPattern = Math.random() * 100;
    if (randPattern <= 20) {
        element.classList.add('gray-pattern');
    } else if (randPattern <= 40) {
        element.classList.add('white-pattern');
    } else if (randPattern <= 60) {
        element.classList.add('gray-pattern');
    }
    const randPaw = Math.random() * 100;
    if (randPaw <= 30) {
        element.classList.add('firstPaw');
        element.classList.add('secondPaw');
        element.classList.add('thirdPaw');
        element.classList.add('forthPaw');
    } else if (randPaw <= 60) {
    } else {
        const randomFirstPaw = Math.random() * 100;
        const randomSecondPaw = Math.random() * 100;
        const randomThirdPaw = Math.random() * 100;
        const randomForthPaw = Math.random() * 100;

        if (randomFirstPaw <= 25) {
            element.classList.add('firstPaw');
        }
        if (randomSecondPaw <= 25) {
            element.classList.add('secondPaw');
        }
        if (randomThirdPaw <= 25) {
            element.classList.add('thirdPaw');
        }
        if (randomForthPaw <= 25) {
            element.classList.add('forthPaw');
        }
    }
    const randTail = Math.random() * 100;
    if (randTail <= 50) {
        element.classList.add('whiteTail');
    }
    const randBelly = Math.random() * 100;
    if (randBelly <= 50) {
        element.classList.add('whiteBelly');
    }
    const randTounge = Math.random() * 100;
    if (randTounge <= 30) {
        element.classList.add('withTounge');
    }
    const randBowTie = Math.random() * 100;
    if (randBowTie <= 10) {
        element.classList.add('white-bowTie');
    } else if (randBowTie <= 20) {
        element.classList.add('black-bowTie');
    } else if (randBowTie <= 35) {
        element.classList.add('stripe-bowTie');
    }

}

function setHeight() {
    document.getElementById('title').style.height = document.getElementById('button-top').getBoundingClientRect().top - 50 + 'px';
    document.getElementById('catsAmount').style.setProperty('--catsAmount-scale', document.getElementById('coins').getBoundingClientRect().width + 'px');
    document.getElementById('coins').style.setProperty('--width', document.getElementById('pCollection').getBoundingClientRect().width + 'px');
    document.getElementById('catsAmount').style.setProperty('--width', document.getElementById('pCollection').getBoundingClientRect().width + 'px');
}

window.addEventListener("load", setHeight());
window.addEventListener("resize", setHeight);

const cooldownMap = new WeakMap();
let infoDeleted = true;
let settingsDeleted = true;

function animateNav(element, className) {
    function rotate() {
        if (cooldownMap.get(element)) { return; }
        element.classList.add(className);

        cooldownMap.set(element, true);

        setTimeout(() => {
            cooldownMap.set(element, false);
            element.classList.remove(className);
        }, 700);
    }

    if (className === 'infoAnim' && !document.querySelector('.settingsElement') && infoDeleted) {
        rotate();
        info(); 
    } else if (className === 'infoAnim' && document.querySelector('.settingsElement') && infoDeleted && infoDeleted) {
        rotate();
        info();
        settings(); 
    }
    if (className === 'settingsAnim' && !document.querySelector('.infoElement') && settingsDeleted) {
        rotate();
        settings(); 
    } else if (className === 'settingsAnim' && document.querySelector('.infoElement') && settingsDeleted && infoDeleted) {
        rotate();
        settings(); 
        info();
    }
}

function info() {
    if (!document.querySelector('.infoElement')) {
        const infoElement = document.createElement('div');
        // infoElement.style.setProperty('--option-top', infoElement.offsetTop + 'px');
        infoElement.classList.add('infoElement');
        document.body.appendChild(infoElement);
    } else {
        document.querySelector('.infoElement').style.setProperty('--option-top', document.querySelector('.infoElement').offsetTop + 'px');
        document.querySelector('.infoElement').classList.add('slideBack');
        infoDeleted = false;
        setTimeout(() => {
            document.querySelector('.infoElement').remove();
            infoDeleted = true;
        }, 1000);
    }
}

function settings() {
    if (!document.querySelector('.settingsElement')) {
        const settingsElement = document.createElement('div');
        // settingsElement.style.setProperty('--option-top', settingsElement.offsetTop + 'px');
        settingsElement.classList.add('settingsElement');
        document.body.appendChild(settingsElement);
    } else {
        document.querySelector('.settingsElement').style.setProperty('--option-top', document.querySelector('.settingsElement').offsetTop + 'px');
        document.querySelector('.settingsElement').classList.add('slideBack');
        settingsDeleted = false;
        setTimeout(() => {
            document.querySelector('.settingsElement').remove();
            settingsDeleted = true;
        }, 1000);
    }
}

document.getElementById('info').addEventListener('click', function() {
    animateNav(document.getElementById('info'), 'infoAnim');
});

document.getElementById('settings').addEventListener('click', function() {
    animateNav(document.getElementById('settings'), 'settingsAnim');
});

function showCat(element) {
    element = element.parentElement;
    const clone = element.cloneNode(true);
    console.log(clone)
    clone.style.setProperty('--width', element.getBoundingClientRect().width + 'px');
    clone.style.setProperty('--left', element.getBoundingClientRect().left + 'px');
    clone.style.setProperty('--top', element.getBoundingClientRect().top + 'px');
    clone.classList.add('showCat');
    document.body.appendChild(clone);
    const displayCatOverlay = document.createElement('div');
    displayCatOverlay.classList.add('displayCatOverlay');
    element.appendChild(displayCatOverlay);
}



function load() {
    let savedElementString = localStorage.getItem('savedCatCollection');
    if (savedElementString !== null) {
        let container = document.createElement('div');
        container.innerHTML = savedElementString;
        let savedElement = container;
        let currentElement = document.getElementById('catCollection');
        currentElement.replaceWith(savedElement);
        savedElement.id = 'catCollection';
    }
}

function save() {
    let element = document.getElementById('catCollection');
    let elementString = element.outerHTML;
    localStorage.setItem('savedCatCollection', elementString);
}

window.addEventListener('load', load);