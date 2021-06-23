// JavaScript source code
const MAIN_COLS = 10;
const MAIN_ROWS = 20;
const NEXT_COLS = 5;
const NEXT_ROWS = 4;

const canvasMain = document.querySelector(".tetris__canvas");
const ctxMain = canvasMain.getContext('2d');
const canvasNext = document.querySelector(".score__next-shape");
const ctxNext = canvasNext.getContext('2d');

function resize() {
    const WINDOW_INNERWIDTH = (window.innerWidth > 660) ? 660 : window.innerWidth;
    const MAIN_CONTENTS_WIDTH = Math.floor(WINDOW_INNERWIDTH * 0.6);
    const BLOCK_SIZE = Math.floor(MAIN_CONTENTS_WIDTH / MAIN_COLS);
    
    ctxMain.canvas.width = BLOCK_SIZE * MAIN_COLS;
    ctxMain.canvas.height = BLOCK_SIZE * MAIN_ROWS;
    ctxMain.scale(BLOCK_SIZE, BLOCK_SIZE);

    ctxNext.canvas.width = BLOCK_SIZE * NEXT_COLS;
    ctxNext.canvas.height = BLOCK_SIZE * NEXT_ROWS;
    ctxNext.scale(BLOCK_SIZE, BLOCK_SIZE);

    const FONT_RATIO = WINDOW_INNERWIDTH / 350;
    document.querySelector('.score__wrapper').style.fontSize = FONT_RATIO + 'rem';
}

function drawBoard(ctx) {
    MATRIX.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value > 0) {
                ctx.fillStyle = BLOCK_COLOR[value];
                ctx.fillRect(x, y, 1, 1);
            }
        })
    })
}

function makePlaidBoard(cols,rows, ctx) {
    for (let i = 0; i < cols; i++ ){
        for (let j = 0; j < rows; j++){
            if ((i%2 == 0 && j%2 == 0) || (i%2 == 1 && j%2 == 1)) {
                ctx.fillStyle = "rgba(100, 16, 18, 0.3)";
            }
            else {
                ctx.fillStyle = "rgba(18, 16, 18, 10)";
            }
            ctx.fillRect(i, j, 1, 1);
        }
    }
}
