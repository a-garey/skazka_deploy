//matching game -- match word tiles to pictures


//variables
let tiles = Array.from(document.querySelectorAll('.tile'));
let board = document.getElementById('board')
let results = document.getElementById('results')
let start = document.getElementById('start')
const matchBtn = document.getElementById('matchBtn')
let hasFlippedTile = false;
let firstTile, secondTile;
let lockBoard = false;
let count = 0;
start.style.display = 'none';

//event listeners
tiles.forEach(tile => tile.addEventListener('click', flipTile))
matchBtn.addEventListener('click', (e) => {
    newGame();
})

//methods
function flipTile() { 
    if (lockBoard) return;
    this.classList.add('flip');

    if(!hasFlippedTile) {
        hasFlippedTile = true;
        firstTile = this;
        firstTile.removeEventListener('click', flipTile)
    } else {
        hasFlippedTile = false;
        secondTile = this; 

        checkMatch();
    }
}

function checkMatch() {
    if (firstTile.dataset.framework === secondTile.dataset.framework) {
        disableTiles();
        firstTile.classList.add('correct');
        secondTile.classList.add('correct');
        count++; 
        // console.log(count)
        checkWin();
    } else {
        unFlipTiles();
        firstTile.addEventListener('click', flipTile)
    }
}

function disableTiles() {
    firstTile.removeEventListener('click', flipTile)
    secondTile.removeEventListener('click', flipTile)

    resetBoard();
}

function unFlipTiles() {
    lockBoard = true;
    setTimeout(() => {
        firstTile.classList.remove('flip');
        secondTile.classList.remove('flip');

        resetBoard();
    }, 1200); 
}

function resetBoard() {
    [hasFlippedTile, lockBoard] = [false, false];
}

function checkWin() {
    if (count === 6) {
        console.log("You won!");
        board.style.display = 'none';
        results.textContent = 'Молодец, you won!'
        results.style.fontSize = '2em';
        results.style.color = '#b900bc';
        results.style.fontFamily = 'Gochi Hand, cursive';
        start.style.display = 'block';
    }
}

function newGame() {
    start.style.display ='none';
    count = 0;
    unFlipTiles();
    board.style.display = 'grid';
    tiles.forEach(tile => tile.classList.remove('flip'));
    tiles.forEach(tile => tile.classList.remove('correct'));
    tiles.forEach(tile => tile.addEventListener('click', flipTile))
    shuffleAgain();
}

(function shuffle() {
    tiles.forEach(tile => {
        let randomLoc = Math.floor(Math.random() * 12);
        tile.style.order = randomLoc; 
    })
})();

function shuffleAgain() {
    tiles.forEach(tile => {
        let randomLoc = Math.floor(Math.random() * 12);
        tile.style.order = randomLoc; 
    })
};


// //classes
// class AudioController {
//     constructor() {
//         this.flipSound = new Audio("static/audio/flip.mp3")
//         this.matchSound = new Audio("static/audio/match.wav")
//     }
//     flip() {
//         this.flipSound.play();
//     }
//     match () {
//         this.matchSound.play();
//     }
// }

//         this.tilesArray = tiles;
//         this.totalTime = totalTime;
//         this.timeRemaining = totalTime;
//         this.matchTimer = document.getElementById('time-remaining');
//         this.ticker = document.getElementById("flips");
//         this.audioController = new AudioController;
//     }
//     startMatchGame() {
//         this.tileToCheck = null;
//         this.totalClicks = 0;
//         this.timeRemaining = this.totalTime;
//         this.matchedTiles = [];
//         this.busy = true;



