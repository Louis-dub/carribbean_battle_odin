import { Player } from "./components/playerClass.js";
import { createGrid } from "./functions/createGridDOM.js";
import { createShip } from "./functions/createShip.js";
import { changeColourShip } from "./functions/changeColourShip.js";

const player = new Player("player", "Your Fleet");
const computer = new Player("computer", "Enemy Fleet");

player.board.ships = createShip();

createGrid(player);
createGrid(computer, player);

player.board.ships.forEach(ship => changeColourShip(player.gridDOM.children[1].children, ship, "case ship-player"));

export { player, computer };