const DIRECTIONS = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
];

function findValidCase(x, y) {
    let sens = Math.floor(Math.random() * 4);

    
}

export function computerSunkShip(player) {
    let p;

    if (player.sens) {
        p = [player.caseTouch[0] + player.sens[0], player.caseTouch[1] + player.sens[1]];
    } else {

    }
}