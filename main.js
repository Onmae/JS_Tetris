// JavaScript source code
const GAMEOVER = document.querySelector(".gameover");
const SCORE = document.querySelector("#current-score");
const PAUSE = document.querySelector("#pause-btn");
const START = document.querySelector("#start-btn");

let isPause = false;
let time = 0;
let stopAnimation = null;
let timeforDeleteLine = 0;
let filled = new Set();
let score = 0;
let playing = false;

function repeatMove(timeStamp) {
    if (time === 0) time = timeStamp;

    if (timeStamp - time > 500) {
        if (!vaildMove(mainBlock, 0, 1)) {
            AfterMove();
        }
        time = timeStamp;
        
    }

    if (filled.size > 0) {
        if (timeforDeleteLine === 0) {
            timeforDeleteLine = timeStamp;
            time = 0;
        }

        if (timeStamp - timeforDeleteLine > 300) {
            score++;
            SCORE.innerHTML = score;
            deleteLine(filled);
            timeforDeleteLine = 0;
            time = 0;
            filled.clear();
            getNextblock();
        }
    }
    
    rebuild();
    if (playing) stopAnimation = window.requestAnimationFrame(repeatMove);
    else quit();
}

function AfterMove() {
    stackBlock(mainBlock);
    isFilledLine();

    if (filled.size === 0) {
        
        const cloneNextBlock = clone(nextBlock);
        cloneNextBlock.y = 0;
        cloneNextBlock.x = 3;
        if (vaildCheck(cloneNextBlock)) {
            getNextblock();
        } else {
            gameOver(ctxMain);
        }
    }
}
    
function gameOver(ctx) {
    GAMEOVER.classList.toggle('hidden');
    PAUSE.removeEventListener("mousedown", pauseButtonPress);
    playing = false;
}


function getNextblock() {
    mainBlock = nextBlock?nextBlock:createNextBlock();
    mainBlock.x = 3;
    mainBlock.y = 0;
    nextBlock = createNextBlock();
    nextBlock.y = 1;
    nextBlock.x = 1;
    if (nextBlock.shape[0].includes(5))
        nextBlock.x = 1;
    if (nextBlock.shape[0].includes(4)) {
        nextBlock.x = 0;
        nextBlock.y = 0;
    }
}

function pauseButtonPress() {
        isPause === true ? isPause = false : isPause = true;
    if (isPause === true) {
        ctxMain.font = '2px serif';
        ctxMain.fillStyle = '#FFFFFF';
        ctxMain.fillText('PAUSE', 1.5, 10);
        quit();
    } else {
        time = 0;
        start();
        ctxMain.clearRect(1.5, 10, 10, 20);
    }
    return;
}


function quit() {
    window.cancelAnimationFrame(stopAnimation);
    stopAnimation = null;
    window.removeEventListener("keydown", keyAction);
}


function start() {
    playing = true;
    window.addEventListener('keydown', keyAction);
    PAUSE.addEventListener('mousedown', pauseButtonPress);
    repeatMove(0);
}

function startButtonPress() {
    START.addEventListener('mousedown', () => {
        initMatrix(MAIN_ROWS, MAIN_COLS);
        getNextblock();
        start();
        GAMEOVER.classList.add('hidden');
    });
}

function AnimationDeleteLine(filledLine,ctx) {
    filledLine.forEach((row,y) => {
        for (let x = 0; x < MAIN_COLS; x++){
            ctx.fillStyle = "rgb(255,0,0)";
            ctx.fillRect(x, row, 1, 1);
        }
    })
}

function main() {
    resize();
    window.addEventListener('resize', rebuild);
    makePlaidBoard(MAIN_COLS, MAIN_ROWS,ctxMain);
    makePlaidBoard(NEXT_COLS,NEXT_ROWS,ctxNext);
    startButtonPress();
}

main();