import { Ship } from "./shipClass.js";
import { isValidCase } from "../functions/computerRound.js";

export class GameBoard {
    constructor() {
        this.board = this.createBoard();
        this.ships = [];
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

    receiveAttack(x, y) {
        if (this.board[x][y] !== "e")
            return 0;
        const p = [x, y];

        for (const ship of this.ships) {
            if (ship.hit(p, true)) {
                this.board[x][y] = "t";
                return 1;
            }
        }
        this.board[x][y] = "m";
        return 2;
    }

    findShipHit(p) {
        return this.ships.find(ship => ship.coor[0][0] <= p[0] && ship.coor[1][0] >= p[0] &&
            ship.coor[0][1] <= p[1] && ship.coor[1][1] >= p[1] === true);
    }

    findHitOnShip(ship) {
        const start = ship.coor[0];
        const end = ship.coor[1];
        let dx = 0;
        let dy = 0;
        
        if (end[0] !== start[0])
            dx = end[0] > start[0] ? 1 : -1;
        else if (end[1] !== start[1])
            dy = end[1] > start[1] ? 1 : -1;
        let currentX = start[0];
        let currentY = start[1];

        for (let i = 0; i < ship.length; i++) {
            if (isValidCase(currentX, currentY) && this.board[currentX][currentY] === "t")
                return [currentX, currentY];
            currentX += dx;
            currentY += dy;
        }
        return undefined;
    }
}
