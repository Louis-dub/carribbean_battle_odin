import { changeColourShip } from "./changeColourShip.js";

const DIRECTIONS = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
];

export function isValidCase(x, y) {
    return x >= 0 && x <= 11 && y >= 0 && y <= 11;
}

function findOgCase(player) {
    let p = player.caseTouch;
    let nextP = [p[0] + player.sens[0], p[1] + player.sens[1]];

    while (isValidCase(nextP[0], nextP[1]) && player.board.board[nextP[0]][nextP[1]] === "t") {
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
        if (player.sens) {
            player.sens = [player.sens[0] * -1, player.sens[1] * -1];
            player.caseTouch = findOgCase(player);
            player.countSens++;
            if (player.countSens === 2 || !isValidCase(player.caseTouch[0] + player.sens[0], player.caseTouch[1] + player.sens[1])) {
                player.sens = undefined;
                player.countSens = 0;
            }
        }
    } else {
        caseHit.className = "case touch";
        if (!player.sens)
            player.sens = DIRECTIONS[p[2] % 4];
        player.caseTouch = p;
        if (!isValidCase(p[0] + player.sens[0], p[1] + player.sens[1])) {
            player.sens = [player.sens[0] * -1, player.sens[1] * -1];
            player.caseTouch = findOgCase(player);
        }
        const shipTouch = player.board.findShipHit(p);
        if (!player.shipsTouch.includes(shipTouch))
            player.shipsTouch.push(shipTouch);
        if (shipTouch.isSunk()) {
            changeColourShip(player.gridDOM.children[1].children, shipTouch, "case sunk");
            const id = player.shipsTouch.indexOf(shipTouch);
            player.shipsTouch.splice(id, 1);
            player.sens = undefined;
            if (player.shipsTouch.length === 0)
                player.caseTouch = undefined;
            else
                player.caseTouch = player.board.findHitOnShip(player.shipsTouch[0]);
        }
    }
}