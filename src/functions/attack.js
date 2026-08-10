import { changeColourShip } from "./changeColourShip.js";

function checkSunkShip(cases, board) {
    board.ships.forEach(ship => {
        if (ship.isSunk())
            changeColourShip(cases, ship, "case sunk");
    });
}

export function attack(cases, board, pos) {
    if (!pos)
        return false;
    const val = pos.value;
    const p = val.split(' ').map(Number);;
    
    console.log(JSON.stringify(p));
    if (pos.className === "case sunk")
        return;
    const hit = board.receiveAttack(p[0], p[1]);
    if (hit === 1) {
        pos.className = "case touch";
        checkSunkShip(cases, board);
    }
    else if (hit === 2)
        pos.className = "case miss"
}