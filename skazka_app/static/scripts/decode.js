//Decode game -- match Cyrillic to Latin letters

const decodeArea = document.querySelector('.decodeArea');
// const userInput = document.createElement('textarea');
const decOutput = document.createElement('div');
const decBtn = document.createElement('button');
const output1 = document.createElement('div');
const output2 = document.createElement('div');
const solutionKey = document.createElement('div')
const timeCounter = document.createElement('div');
const minutesCounter = document.createElement('span');
const secondsCounter = document.createElement('span');
timeCounter.classList.add('clockCounter');
const decGame = {totalSeconds: 0, inter: {}, codeKeys: false, myPhrase: ''};
const decWords = ['тв', 'бургер', 'суп', 'такси', 'балерина', 'радио', 'баскетбол', 'студент', 'парк',
'водка', 'лифт', 'интернет', 'телефон', 'робот']
// const decWords = ['тв', 'суп']
let gameWord = "";
let myPhrase = "";

let arr1 = {а: 'a', б: 'b', д: 'd', е: 'e', ф: 'f', г: 'g', х: 'h', и: 'i', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o',
п: 'p', р: 'r', с: 's', т: 't', у: 'u', в: 'v', з: 'z'}

let arr2 = {a: 'а', b: 'б', d: 'д', e: 'е', f: 'ф', g: 'г', h: 'х', i: 'и', k: 'к', l: 'л', m: 'м', n: 'н', o: 'о',
p: 'п', r: 'р', s: 'с', t: 'т', u: 'у', v: 'в', z: 'з'}

//button and style
decBtn.textContent = 'Start Game';
decBtn.style.display = 'block';
decBtn.classList.add("gameButton")
output1.style.fontSize = '0.8em';
output1.style.backgroundColor = '#ddd';
output1.style.padding = '10px';
output1.style.marginTop = '18px';
output1.style.display = 'none';
output1.classList.add("codeKeys")
timeCounter.style.display = 'none';

//add to HTML
timeCounter.append(minutesCounter, ":");
timeCounter.append(secondsCounter);
decodeArea.append(timeCounter);  
decodeArea.append(decOutput);
decodeArea.append(output2);
decodeArea.append(decBtn);
decodeArea.append(output1);
window.addEventListener('DOMContentLoaded', init());

//event listeners
decBtn.addEventListener('click', (e) => {
    startGame();
    decWords.sort(() => {return 0.5 - Math.random()});
    decBtn.style.display = 'none';
    // timeCounter.style.display = 'inline';
    output1.style.display = 'inline';
    decGame.inter = setInterval(setTimer, 1000);
})

//methods
function makeOutput(val) {
    for (i=0; i < val.length; i++) {
        rusVal = val[i];
        engVal = arr1[rusVal];
        console.log(rusVal, engVal, "RUS")
    }
}

function init() {
    let valHtml = '';
    for (const conv in arr1){
        let objKey = conv
        let objVal = arr1[conv]
        // console.log(`${objKey} = ${objVal}  `);
        valHtml += `${objKey} = ${objVal}&nbsp;&nbsp;  `;
    }
    output1.innerHTML = valHtml;  
}

function startGame() {
    minutesCounter.textContent = '00';
    secondsCounter.textContent = '00';
    if (decWords.length > 0 ){
        decGame.totalSeconds = 0;
        output1.style.display = 'block';
        decWords.sort(() => {return 0.5 - Math.random()});
        let myPhrase = decWords.shift();
        console.log(decWords);
        console.log(myPhrase, "myPhrase");
        let resp = myPhrase;
        makeOutput(myPhrase);
        decOutput.textContent = resp;
        decOutput.style.fontSize = '2em'
        createInputs(myPhrase);
    } else {
        decOutput.style.display = 'none';
        timeCounter.style.display = 'none';
        output1.textContent = "All words guessed!"
        output1.style.backgroundColor = 'transparent';
        output2.innerHTML = 'Game Over';
        output1.style.fontSize = '2em';
        output2.style.fontSize = '2em';
        output1.style.color = '#b900bc';
        output2.style.color = '#b900bc';
        output1.style.fontFamily = 'Gochi Hand, cursive';
        output2.style.fontFamily = 'Gochi Hand, cursive';
    }
}

function createInputs(val) {
    output2.innerHTML = '';
    for (let i=0; i < val.length; i++) {
        let playerInput = document.createElement('input');
        playerInput.setAttribute('maxlength', 1);
        playerInput.classList.add('inVal');
        if (val[i] == " ") {
            playerInput.disabled = true;
        }
        output2.append(playerInput);
        playerInput.guess = false;
        playerInput.addEventListener('keydown', (e) => { 
            playerInput.value = playerInput.value.toLowerCase();
            playerInput.value = playerInput.value.toLowerCase();
            if (e.key.toLowerCase() ==  arr1[val[i]].toLowerCase()) {
                playerInput.style.border = '3px solid green'; 
                playerInput.guess = true;
            } else {
                playerInput.style.border = '3px solid red';
            }
        })
        playerInput.addEventListener('keyup', (e) => { 
            let up = e.target.nextElementSibling;
            if(up != null) {
                if (up.disabled == true) {
                    up.nextElementSibling;
                }
                up.focus();
            }
            checkWinner(val);
        })
        playerInput.addEventListener('focus', (e) => {
            if (!playerInput.guess) {
                playerInput.value = "";
            }
        })
        if (i == 0) {
            playerInput.focus();
        }
    }
}

function checkWinner(val) {
    let eleInputs =  output2.querySelectorAll('input')
    let holder = [];
    eleInputs.forEach((ele, index) => {
        holder.push(ele.value); 
    })
    let winVar = holder.join('');
    // console.log(winVar, "winVar -- Player entry");
    let engArr = [];
    for (let i = 0; i < val.length; i++) {
        engArr.push(arr1[val[i]]);
    }
    let engVar = engArr.join('');
    // console.log(engVar, "engVAr--original word");
    if (engVar == winVar) {
        console.log("You won!")
        endGame();
    }
}

function endGame() {
    clearInterval(decGame.inter);
    decBtn.style.display = 'inline';
    decBtn.innerText = 'Next Word';
    output1.style.display = 'none';
}

function setTimer() {
    decGame.totalSeconds++;
    secondsCounter.innerHTML = padNum(decGame.totalSeconds % 60);
    minutesCounter.innerHTML = padNum(Math.floor(decGame.totalSeconds / 60));
}

function padNum(val){
    let valString = val + "";
    if(valString.length < 2) {
        return "0" + valString
    } else {
        return valString;
    }
}