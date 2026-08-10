import { createShip } from "../functions/createShip.js";
import { createGrid } from "../functions/createGridDOM.js";
import { GameBoard } from "./gameBoardClass.js";

export class Player {
    constructor() {
        this.board = new GameBoard();
        this.gridDOM = createGrid("player", "Your Fleet", this.board);
        this.lose = false;
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

export class Computer {
    constructor() {
        this.board = new GameBoard();
        this.gridDOM = createGrid("computer", "Enemy Fleet", this.board);
        this.board.ships = createShip();
        this.lose = false;
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