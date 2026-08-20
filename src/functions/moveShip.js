import { isValidCase } from "./computerRound.js";

export function moveShip(e, len, p) {
    let dir = [];

    switch (e.key) {
        case "ArrowUp":
            dir = [-1, 0];
            break;
        case "ArrowRight":
            dir = [0, 1];
            break;
        case "ArrowDown":
            dir = [1, 0];
            break;
        case "ArrowLeft":
            dir = [0, -1];
            break;
        default:
            return;
            break;
    }
}