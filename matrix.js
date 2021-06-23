let MATRIX = null;

function initMatrix(col, row) {
    MATRIX = Array.from(Array(col), () => Array(row).fill(0));
}

function stackBlock(block) {
    block.shape.forEach((rows, dy) => {
        rows.forEach((value, dx) => {
            if (value > 0) {
                MATRIX[block.y + dy][block.x + dx] = block.shape[dy][dx];
            }
        });
    });
}

function isFilledLine() {
    MATRIX.forEach((row,y) => {
        if (row.every(value => value > 0)) {
            filled.add(y);
        }
    })
    return filled;
}

function deleteLine(filledLine) {
    filledLine.forEach(y => {
        MATRIX.splice(y, 1);
        MATRIX.unshift(new Array(MATRIX[0].length).fill(0));
    })
}