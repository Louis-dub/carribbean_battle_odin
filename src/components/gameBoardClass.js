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

        this.ships.forEach(ship => {
            if (ship.hit(p))
                this.board[x][y] = "t";
        });
        if (this.board[x][y] === "e")
            this.board[x][y] = "m"
    }
}
