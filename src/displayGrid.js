import { Player, Computer } from "./components/playerClass.js";
import { createShip } from "./functions/createShip.js";
import { changeColourShip } from "./functions/changeColourShip.js";

const player = new Player();
const computer = new Computer();

const grids = document.createElement("div");

grids.className = "grids";
grids.appendChild(player.gridDOM);
grids.appendChild(computer.gridDOM);

console.log("Ship player");
player.board.ships = createShip();

player.board.ships.forEach(ship => {
    changeColourShip(player.gridDOM.children[1].children, ship, "case touch");
});

export { grids, player, computer };