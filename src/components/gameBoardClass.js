import { Ship } from "./shipClass.js";

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
            if (ship.hit(p)) {
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
        let p = ship.coor[0];
        let sens = [];
        if (ship.coor[1][1] - ship.coor[0][1] > 0)
            sens = [0, 1];
        else
            sens = [1, 0];
        while (p !== ship.coor[1]) {
            if (this.board[p[0]][p[1]] === "t")
                return p;
            p = [p[0] + sens[0], p[1] + sens[1]];
        }
        return undefined;
    }
}
