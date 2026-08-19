import { Player } from "../components/playerClass.js";
import { createGrid } from "./createGridDOM.js";
import { createShip } from "./createShip.js";
import { changeColourShip } from "./changeColourShip.js";
import { Ship } from "../components/shipClass.js";

export function launchGame(ships) {
    const content = document.getElementById("content");
    const player = new Player("player", "Your Fleet");
    const computer = new Player("computer", "Enemy Fleet");

    player.board.ships = createShip();

    createGrid(player);
    createGrid(computer, player);

    player.board.ships.forEach(ship => changeColourShip(player.gridDOM.children[1].children, ship, "case ship-player"));
    const grids = document.createElement("div");
    
    grids.className = "grids";
    grids.appendChild(player.gridDOM);
    grids.appendChild(computer.gridDOM);
    
    content.innerHTML = "";
    content.appendChild(grids);
}
