// JavaScript source code

let time = null;
let cancelAnimationFrame = null;

function repeatMove(timestamp) {
    if (!time) time = timestamp;
    let progress = timestamp - time;

    if (progress > 1000) {
        if (!vaildMove(mainBlock, 0, 1)) {
            mainBlock = nextBlock;
            nextBlock = createNextBlock();
        }
        time = timestamp;
    }

    rebuild();
    cancelAnimationFrame = window.requestAnimationFrame(repeatMove);
}

function main() {
    mainBlock = createNextBlock();
    nextBlock = createNextBlock();
    window.addEventListener('resize', rebuild);
    window.addEventListener('keydown', keyAction);
    repeatMove(0);
}

main();