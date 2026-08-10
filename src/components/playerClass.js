import { createShip } from "../functions/createShip.js";
import { createGrid } from "../functions/createGridDOM.js";
import { GameBoard } from "./gameBoardClass.js";

export class Player {
    constructor(type, title) {
        this.type = type;
        this.board = new GameBoard();
        this.lose = false;
        if (type === "computer") {
            this.board.ships = createShip();
        }
        this.gridDOM = this.createBoard(title);
        this.round = false;
    }

    createBoard(fleet) {
        const board = document.createElement("div");

        board.className = "board";
        const title = document.createElement("h1");

        title.textContent = fleet;
        board.appendChild(title);
        return board
    }

    isLose() {
        let sunks = 0;
        this.board.ships.forEach(ship => {
            if (ship.isSunk())
                sunks++;
        })

        if (sunks === 5) {
            this.lose = true;
            return true;
        }
        return false;
    }
}
