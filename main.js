// JavaScript source code
const GAMEOVER = document.querySelector(".gameover");
const SCORE = document.querySelector("#current-score");

let time = null;
let stopAnimation = null;
let filled = new Set();
let score = 0;

function repeatMove(timestamp) {
    window.addEventListener('keydown', keyAction);
    if (!time) time = timestamp;
    let progress = timestamp - time;

    if (progress > 1000) {
        if (!vaildMove(mainBlock, 0, 1)) {  
            stackBlock(mainBlock);
            getNextblock();
            time = timestamp;
        }

        MATRIX[0].some(value => { // 게임오버
            if (value > 0) {
                window.cancelAnimationFrame(stopAnimation);
                stopAnimation = null;
                GAMEOVER.classList.toggle('hidden');
                return true;
            }
        });
    
        filled = isFilledLine();
        
        if (filled.size > 0) {
            score++;
            SCORE.innerHTML = score;
            deleteLine(filled);
        }
        
        if (stopAnimation == null) {
            return;
        }

        time = timestamp;
    }

    rebuild();
    stopAnimation = window.requestAnimationFrame(repeatMove);
}


function getNextblock() {
    mainBlock = nextBlock?nextBlock:createNextBlock();
    mainBlock.x = 3;
    mainBlock.y = 0;
    nextBlock = createNextBlock();
    nextBlock.y = 1;
    nextBlock.x = 1;
}

function main() {
    initMatrix(MAIN_ROWS,MAIN_COLS);
    getNextblock();
    window.addEventListener('resize', rebuild);
    repeatMove(0);
}

main();