// HTML Elements
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');

//Game Constants
const xSymbol = '×';
const oSymbol = '⦿';

//Game Variables
let gameIsLive = true;
let xIsNext = true;

//Functions
const letterToSymbol = (letter) => letter === 'x' ? xSymbol : oSymbol;
const handleWin = (letter) => {
    gameIsLive = false;
    if (letter === 'x') {
        statusDiv.innerHTML = `${letterToSymbol(letter)} has won!`;
    } else {
        statusDiv.innerHTML = `<span>${letterToSymbol(letter)} has won!</span>`;
    }
};
const checkGameStatus = () => {
    const topLeft = cellDivs[0].classList[1];
    const topMiddle = cellDivs[1].classList[1];
    const topRight = cellDivs[2].classList[1];
    const middleLeft = cellDivs[3].classList[1];
    const middleMiddle = cellDivs[4].classList[1];
    const middleRight = cellDivs[5].classList[1];
    const bottomLeft = cellDivs[6].classList[1];
    const bottomMiddle = cellDivs[7].classList[1];
    const bottomRight = cellDivs[8].classList[1];

    //Check Winner
    topLeft && topLeft === topMiddle && topLeft === topRight ? (handleWin(topLeft), cellDivs[0].classList.add('won'),
        cellDivs[1].classList.add('won'), 
        cellDivs[2].classList.add('won')) :
        middleLeft && middleLeft === middleMiddle && middleLeft === middleRight ? (handleWin(middleLeft) ,
        cellDivs[3].classList.add('won'), 
        cellDivs[4].classList.add('won'),
        cellDivs[5].classList.add('won')) :
        bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight ? (handleWin(bottomLeft) ,
        cellDivs[6].classList.add('won') ,
        cellDivs[7].classList.add('won') ,
        cellDivs[8].classList.add('won') ):
        topLeft && topLeft === middleLeft && topLeft === bottomLeft ? (handleWin(topLeft) ,
        cellDivs[0].classList.add('won') ,
        cellDivs[3].classList.add('won') ,
        cellDivs[6].classList.add('won')) :
        topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle ? (handleWin(topMiddle) ,
        cellDivs[1].classList.add('won'),
        cellDivs[4].classList.add('won'), 
        cellDivs[7].classList.add('won')) :
        topRight && topRight === middleRight && topRight === bottomRight ? (handleWin(topRight) ,
        cellDivs[2].classList.add('won') ,
        cellDivs[5].classList.add('won') ,
        cellDivs[8].classList.add('won')) :
        topLeft && topLeft === middleMiddle && topLeft === bottomRight ? (handleWin(topLeft) ,
        cellDivs[0].classList.add('won') ,
        cellDivs[4].classList.add('won') ,
        cellDivs[8].classList.add('won')) :
        topRight && topRight === middleMiddle && topRight === bottomLeft ? (handleWin(topRight) ,
        cellDivs[2].classList.add('won') ,
        cellDivs[4].classList.add('won') ,
        cellDivs[6].classList.add('won')) :
        topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight ? (gameIsLive = false, 
        (statusDiv.innerHTML = 'Game is tied!')) :
        (xIsNext = !xIsNext, xIsNext) ? (statusDiv.innerHTML = `${xSymbol} is next`) :
        (statusDiv.innerHTML = `<span>${oSymbol} is next</span>`);
};

//Event Handlers
const handleReset = () => {
    xIsNext = true;
    statusDiv.innerHTML = `${xSymbol} is next`;
    for (const cellDiv of cellDivs) {
        cellDiv.classList.remove('x');
        cellDiv.classList.remove('o');
        cellDiv.classList.remove('won');
    }
    gameIsLive = true;
};
const handleCellClick = (e) => {
    const classList = e.target.classList;
    if (!gameIsLive || classList[1] == 'x' || classList[1] == 'o') {
        return;
    }
    if (xIsNext) {
        classList.add('x');
        checkGameStatus();
    } else {
        classList.add('o');
        checkGameStatus();
    }
};

//Event Listeners
resetDiv.addEventListener('click', handleReset);
for (const cellDiv of cellDivs) {
    cellDiv.addEventListener('click', handleCellClick)
};
