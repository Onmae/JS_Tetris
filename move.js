// JavaScript source code
function move(block, x, y) {
    block.x += x;
    block.y += y;
}

function rotate(block) {
    block.shape.forEach((row, y) => {
        for (let x = 0; x < y; x++) {
            [block.shape[x][y], block.shape[y][x]] = [block.shape[y][x], block.shape[x][y]];
        }
    });

    block.shape.forEach(row => {
        row.reverse();
    });
}


function vaildCheck(block) {
    let isVaild = true;

    block.shape.forEach((row, dy) => {
        row.some((value, dx) => {
            if (value > 0) {
                if (block.x + dx < 0 || block.y + dy < 0 ||
                    block.x + dx >= MAIN_COLS || block.y + dy >= MAIN_ROWS ||
                    MATRIX[block.y+dy][block.x+dx] > 0) {
                    isVaild = false;
                    return true;
                }
            }
        });

        if (!isVaild) {
            return true;
        }
    });

    return isVaild;
}

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function vaildMove(block, x, y) {
    const copyBlock = clone(block);
    move(copyBlock, x, y);
    if (vaildCheck(copyBlock)) {
        move(block, x, y);
        return true;
    } else {
        return false;
    }
}

function vaildRotate(block) {
    const copyBlock = clone(block);
    rotate(copyBlock);
    if (vaildCheck(copyBlock)) {
        rotate(block);
        return true;
    } else {
        return false;
    }
}

function keyAction(event) {
    const inputKey = event.keyCode;

    const KEY = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        SPACE_BAR: 32
    }

    switch (inputKey) {
        case KEY.UP:
            vaildRotate(mainBlock);
            break;
        case KEY.LEFT:
            vaildMove(mainBlock, -1, 0);
            break;
        case KEY.RIGHT:
            vaildMove(mainBlock, 1, 0);
            break;
        case KEY.DOWN:
            vaildMove(mainBlock, 0, 1);
            break;
        case KEY.SPACE_BAR:
            while (vaildMove(mainBlock, 0, 1));
            break;
    }

    drawBlock(mainBlock, ctxMain);
}