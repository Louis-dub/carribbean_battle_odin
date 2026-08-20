import { isValidCase } from "./computerRound.js";

export function moveShip(e, len, p) {
    let newP = [];
    let testWithLen = false;

    switch (e.key) {
        case "ArrowUp":
            newP = [p[0] - 1, p[1]];
            break;
        case "ArrowRight":
            newP = [p[0], p[1] + 1];
            testWithLen = true;
            break;
        case "ArrowDown":
            newP = [p[0] + 1, p[1]];
            break;
        case "ArrowLeft":
            newP = [p[0], p[1] - 1];
            break;
        default:
            return;
            break;
    }
    if (testWithLen
        ? isValidCase(newP[0], newP[1] + len - 1)
        : isValidCase(newP[0], newP[1]))
        return newP;
    return p;
}