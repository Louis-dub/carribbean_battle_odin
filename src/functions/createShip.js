import { GameBoard } from "../components/gameBoardClass.js";
import { Ship } from "../components/shipClass.js";

function verifCollideShip(p1, p2, ships)
{
    const d0 = p2[0] - p1[0];
    const d1 = p2[1] - p1[1];
    const newCase = d0 > 0 ? [1, 0] : d1 > 0 ? [0, 1] : d0 < 0 ? [-1, 0] : [0, -1];
    let check = false;

    ships.forEach(s => {
        let p = [...p1]
        while (p[0] !== p2[0] + newCase[0] || p[1] !== p2[1] + newCase[1]) {
            if (s.hit(p)) {
                check = true;
                return;
            }
            p[0] += newCase[0];
            p[1] += newCase[1];
        }
    });
    return check;
}

function createCoor(len) {
    let p1 = [Math.floor(Math.random() * 12), Math.floor(Math.random() * 12)];
    let p2 = [];
    let sens = Math.floor(Math.random() * 4) + 1;

    p2.push(...p1);
    while (p1[0] === p2[0] && p1[1] === p2[1]) {
        switch (sens % 4) {
            case 0:
                if (p2[0] + len > 11)
                    sens++;
                else
                    p2[0] += len;
                break;
            case 1:
                if (p2[1] + len > 11)
                    sens++;
                else
                    p2[1] += len;
                break;
            case 2:
                if (p2[0] - len < 0)
                    sens++;
                else
                    p2[0] -= len;
                break;
            default:
                if (p2[1] - len < 0)
                    sens++;
                else
                    p2[1] -= len;
                break;
        }
    }
    return [p1, p2];
}

export function createShip() {
    const ships = [];
    
    for (let i = 1; i < 6; i++) {
        let coor = createCoor(i);
        
        while (verifCollideShip(coor[0], coor[1], ships))
            coor = createCoor(i);
        const newShip = new Ship(i + 1, coor[0], coor[1]);
        ships.push(newShip);
    }
    return ships;
}