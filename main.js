import { GameBoard } from "./src/components/gameBoardClass.js";
import { createShip } from "./src/functions/createShip.js";

const board = new GameBoard();

board.ships = createShip();
board.ships.forEach(ship => {
    console.log(ship.coor);
});