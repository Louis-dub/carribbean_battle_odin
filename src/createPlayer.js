import { Player } from "./components/playerClass.js";
import { createGrid } from "./functions/createGridDOM.js";
import { createShip } from "./functions/createShip.js";

const player = new Player("player", "Your Fleet");
const computer = new Player("computer", "Enemy Fleet");

player.board.ships = createShip();

createGrid(player);
createGrid(computer, player);

export { player, computer };