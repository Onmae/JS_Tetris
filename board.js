// JavaScript source code
const MAIN_COLS = 10;
const MAIN_ROWS = 20;
const NEXT_COLS = 4;
const NEXT_ROWS = 4;

const canvasMain = document.querySelector(".tetris__canvas");
const ctxMain = canvasMain.getContext('2d');
const canvasNext = document.querySelector(".score__next-shape");
const ctxNext = canvasNext.getContext('2d');

function resize() {
    const WINDOW_INNERWIDTH = (window.innerWidth > 600) ? 600 : window.innerWidth;
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
