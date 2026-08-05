import { createShip } from "../functions/createShip.js";
import { createGrid } from "../functions/createGridDOM.js";
import { GameBoard } from "./gameBoardClass.js";

export class Player {
    constructor() {
        this.board = new GameBoard();
        this.gridDOM = createGrid("player", "Your Fleet");
    }
}

export class Computer {
    constructor() {
        this.board = new GameBoard();
        this.gridDOM = createGrid("computer", "Enemy Fleet");
        this.board.ships = createShip();
    }
}