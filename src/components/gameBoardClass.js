import { Ship } from "./shipClass.js";

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
    let p1 = [Math.floor(Math.random() * 13), Math.floor(Math.random() * 13)];
    let p2 = [];
    let sens = Math.floor(Math.random() * 4) + 1;

    p2.push(...p1);
    while (p1[0] === p2[0] && p1[1] === p2[1]) {
        switch (sens % 4) {
            case 0:
                if (p2[0] + len >= 12)
                    sens++;
                else
                    p2[0] += len;
                break;
            case 1:
                if (p2[1] + len >= 12)
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

export class GameBoard {
    constructor() {
        this.player = this.createBoard();
        this.computer = this.createBoard();
        this.playerShip = this.createShip();
        this.computerShip = this.createShip();
        this.round = 1;
    }

    createBoard() {
        const board = [];

        for (let i = 0; i < 12; i++) {
            board.push([]);
            for (let j = 0; j < 12; j++)
                board[i].push("e");
        }
        return board;
    }

    createShip() {
        const ships = [];
        
        for (let i = 2; i < 7; i++) {
            let coor = createCoor(i);
            
            while (verifCollideShip(coor[0], coor[1], ships))
                coor = createCoor(i);
            const newShip = new Ship(i, coor[0], coor[1]);
            ships.push(newShip);
        }
        return ships;
    }

    receiveAttack(x, y) {
        const p = [x, y];

        if (this.round === 1) {
            this.computerShip.forEach(ship => {
                if (ship.hit(p))
                    this.computer[x][y] = "t";
            });
            if (this.computer[x][y] === "e")
                this.computer[x][y] = "m"
        }
        if (this.round === -1) {
            this.playerShip.forEach(ship => {
                if (ship.hit(p))
                    this.player[x][y] = "t";
            });
            if (this.player[x][y] === "e")
                this.player[x][y] = "m"
        }
        this.round = -this.round;
    }
}
