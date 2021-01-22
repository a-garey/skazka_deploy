//Word scramble
const gameArea = document.querySelector('.gameArea');
const btn = document.createElement('button');
const output = document.createElement('div');
const inWord = document.createElement('input');
const scoreBoard = document.createElement('div');
scoreBoard.style.display = 'none';
scoreBoard.classList.add("showScore");
inWord.setAttribute('type', 'text'); 
inWord.classList.add("myInput");
inWord.style.display = 'none';
output.style.textAlign = 'center';
btn.textContent = "Start Game";
btn.classList.add("gameButton")
output.textContent = "";
output.style.letterSpacing = '0.5em';


//Add to HTML
gameArea.append(btn);
gameArea.append(output);
gameArea.append(inWord);
gameArea.prepend(scoreBoard);

//game start values
const myWords = ["акула", "геккон", "лев", "зебра", "слон", "кот", "тигр"]
const game = {sel: ' ', scramble: '', score: 0, incorrect: 0, wordsLeft: 0, played: myWords.length};

//event listeners
btn.addEventListener('click',(e)=>{
    if (myWords.length < 1) {
        gameArea.textContent = `Game over! You got ${game.score} correct and ${game.incorrect} incorrect`
    } else {
        inWord.disabled = false;
        inWord.style.borderWidth = '1px';
        inWord.style.borderColor = 'black';
        inWord.value = "";
        scoreBoard.style.display = 'inline-block';
        inWord.style.display = 'inline';
        btn.style.display = 'none';
        myWords.sort(()=>{ return 0.5 - Math.random()});
        game.sel = myWords.shift();
        game.wordsLeft = myWords.length;
        game.scramble = sorter(game.sel)
        addScore();
        output.style.fontSize = '36px';
        output.style.letterSpacing = '0.5em';
        inWord.setAttribute('maxLength', game.sel.length);
        inWord.focus();
        output.textContent = `${game.scramble}`; 
        console.log(myWords);
    }  
});   

inWord.addEventListener('keyup', (e) => {
    inWord.style.borderColor = 'black';
    inWord.style.borderWidth = '1px';
    if(inWord.value.length == game.sel.length || e.code == 'Enter') {
        winChecker();
    }
})

inWord.addEventListener('click', (e) => {

})

//methods
function sorter(val) {
    let temp = game.sel.split("");
    temp.sort(() => { return 0.5 - Math.random()});
    temp = temp.join("");
    console.log(temp);
    if(val === temp) {
        return sorter(val)
    }
    return temp;
}

function winChecker() {
    inWord.style.borderWidth = '5px';
    if(inWord.value == game.sel) {
        inWord.style.borderColor = 'green';
        game.score++; 
        inWord.disabled = true;
        btn.style.display = "inline";
        btn.style.marginLeft = "20px";
        btn.textContent = "next word";
    } else{
        inWord.style.borderColor = 'red';
        inWord.value = "";
        inWord.focus();
        game.incorrect++;
        btn.style.display = "inline";
        btn.style.marginLeft = "20px";
        btn.textContent = "next word";
    }
    addScore();    
}

function addScore() {
    let tempOutput = `Correct: ${game.score} &nbsp;&nbsp; Incorrect: ${game.incorrect} &nbsp;&nbsp; Words left: ${game.wordsLeft}`;
    scoreBoard.innerHTML = tempOutput; 
    if (myWords.length < 1) {
        gameArea.textContent = `Game over! You got ${game.score} correct and ${game.incorrect} incorrect`
        gameArea.classList.add("resultText")
    }
}