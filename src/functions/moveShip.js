import { isValidCase } from "./computerRound.js";

export function rotateShip(len, ogP, dir) {
    const middle = (len / 2) - 1;
    const ogDir = [...dir];
    dir = (dir[0] === 0 && dir[1] === 1) ? [1, 0] : [0, 1];
    for (let i = 0; i < middle; i++)
        ogP = [ogP[0] + dir[0] * -1 + ogDir[0], ogP[1] + dir[1] * -1 + ogDir[1]];
    while (!isValidCase(ogP[0], ogP[1]))
        ogP = [ogP[0] + dir[0], ogP[1] + dir[1]];
    if (dir[0] === 1)
        while (!isValidCase(ogP[0] + len - 1, ogP[1]))
            ogP = [ogP[0] - 1, ogP[1]];
    else
        while (!isValidCase(ogP[0], ogP[1] + len - 1))
            ogP = [ogP[0], ogP[1] - 1];
    return { ogP, dir} ;
}

export function moveShip(e, len, p, dir) {
    let newP = [];
    let testWithLenX = false;
    let testWithLenY = false;

    switch (e.key) {
        case "ArrowUp":
            newP = [p[0] - 1, p[1]];
            break;
        case "ArrowRight":
            newP = [p[0], p[1] + 1];
            if (dir[1] === 1)
                testWithLenX = true;
            break;
        case "ArrowDown":
            newP = [p[0] + 1, p[1]];
            if (dir[0] === 1)
                testWithLenY = true;
            break;
        case "ArrowLeft":
            newP = [p[0], p[1] - 1];
            break;
        default:
            return p;
            break;
    }
    if (testWithLenX
        ? isValidCase(newP[0], newP[1] + len - 1)
        : testWithLenY
        ? isValidCase(newP[0] + len - 1, newP[1])
        : isValidCase(newP[0], newP[1]))
        return newP;
    return p;
}