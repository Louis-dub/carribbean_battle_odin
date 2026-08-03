import { createShip } from "../functions/createShip.js";
import { GameBoard } from "./gameBoardClass.js";

export class Player {
    constructor() {
        this.board = new GameBoard();
    }
}

export class Computer {
    constructor() {
        this.board = new GameBoard();
        this.board.ships = createShip();
    }
}