import { createShip } from "../functions/createShip.js";
import { createGrid } from "../functions/createGridDOM.js";
import { GameBoard } from "./gameBoardClass.js";

export class Player {
    constructor() {
        this.board = new GameBoard();
        this.gridDOM = createGrid("player");
    }
}

export class Computer {
    constructor() {
        this.board = new GameBoard();
        this.gridDOM = createGrid("computer");
        this.board.ships = createShip();
    }
}