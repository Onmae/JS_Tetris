const TETRIS_BLOCK = [
    //   ���
    // ���
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    // ��
    // ����
    [
        [2, 0, 0],
        [2, 2, 2],
        [0, 0, 0]
    ],
    //   ��
    // ����
    [
        [0, 3, 0],
        [3, 3, 3],
        [0, 0, 0]
    ],
    // �����
    [
        [0, 0, 4, 0],
        [0, 0, 4, 0],
        [0, 0, 4, 0],
        [0, 0, 4, 0]
    ],
    // ���
    // ���
    [
        [5, 5],
        [5, 5]
    ],
    //     ��
    // ����
    [
        [0, 0, 6],
        [6, 6, 6],
        [0, 0, 0]
    ],
    // ���
    //   ���
    [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0]
    ]
];

const BLOCK_COLOR = [
    "",
    "#E96B93",
    "#EFA93F",
    "#F2DD00",
    "#C8D338",
    "#78C1B5",
    "#6FBBE2",
    "#978FCA"
]

//�����Լ�
function getRandomIndex(length) {
    return Math.floor(Math.random() * length);
}

//������ ���� ���� �Լ�
function getRandomBlock() {
    return TETRIS_BLOCK[getRandomIndex(TETRIS_BLOCK.length)];
}

let mainBlock = null;
let nextBlock = null;

function createNextBlock() {
    const nextBlock = {
        x : 0,
        y : 0,
        shape : getRandomBlock()
    }

    return nextBlock;
}

function drawBlock(block, ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    block.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value > 0) {
                ctx.fillStyle = BLOCK_COLOR[value];
                ctx.fillRect(x + block.x, y + block.y, 1, 1);
            }
        });
    });
}
 

function rebuild() {
    resize();
    drawBlock(mainBlock, ctxMain);
    drawBlock(nextBlock, ctxNext);
    drawBoard(ctxMain);
}


