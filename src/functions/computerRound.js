const DIRECTIONS = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
];

function isValidCase(x, y) {
    return x > 0 && x < 11 && y > 0 && y < 11;
}

function findOgCase(player) {
    let p = player.caseTouch;
    let nextP = player.caseTouch;

    while (player.gameBoard.board[nextP[0]][nextP[1]] === "t") {
        p = nextP;
        nextP = [p[0] + player.sens[0], p[1] + player.sens[1]];
    }
    return p;
}

function findValidCase(x, y) {
    let sens = Math.floor(Math.random() * 4);
    let p = [x + DIRECTIONS[sens][0], y + DIRECTIONS[sens][1], sens];

    while (!isValidCase(p[0], p[1])) {
        sens += 1;
        p = [x + DIRECTIONS[sens % 4][0], y + DIRECTIONS[sens % 4][1], sens];
    }
    return p;
}

export function computerSunkShip(player) {
    let p;
    let hit = 0;

    if (player.sens) {
        p = [player.caseTouch[0] + player.sens[0], player.caseTouch[1] + player.sens[1]];
        hit =  player.board.receiveAttack(p[0], p[1]);
    } else {
        p = findValidCase(player.caseTouch[0], player.caseTouch[1]);
        hit = player.board.receiveAttack(p[0], p[1]);
        while (hit === 0) {
            p = findValidCase(player.caseTouch[0], player.caseTouch[1]);
            hit = player.board.receiveAttack(p[0], p[1]);
        }
    }
    const caseHit = Array.from(player.gridDOM.children[1].children).find(c =>
        c.value === `${p[0]} ${p[1]}`
    );
    if (hit === 2) {
        caseHit.className = "case miss";
        player.caseTouch = findOgCase(player);
    } else {
        caseHit.className = "case sunk";
        if (!player.sens)
            player.sens = p[2];
        player.caseTouch = p;
        if (!isValidCase(p[0] + player.sens[0], p[1] + player.sens[1])) {
            player.sens = [player.sens[0] * -1, player.sens[1] * -1];
            player.caseTouch = findOgCase(player);
        }
    }
}