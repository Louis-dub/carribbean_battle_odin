import { Player, Computer } from "./components/playerClass.js";
import { createShip } from "./functions/createShip.js";

const player = new Player();
const computer = new Computer();

const grids = document.createElement("div");

grids.className = "grids";
grids.appendChild(player.gridDOM);
grids.appendChild(computer.gridDOM);

export { grids, player, computer };