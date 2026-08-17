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
        const p = [x, y];
        let result = 0;

        this.ships.forEach(ship => {
            if (this.board[x][y] === "e" && ship.hit(p)) {
                this.board[x][y] = "t";
                result = 1;
            }
        });
        if (this.board[x][y] === "e") {
            this.board[x][y] = "m";
            result = 2;
        }
        return result;
    }

    findShipHit(p) {
        return this.ships.find(ship => ship.coor[0][0] <= p[0] && ship.coor[1][0] >= p[0] &&
            ship.coor[0][1] <= p[1] && ship.coor[1][1] >= p[1] === true);
    }
}
