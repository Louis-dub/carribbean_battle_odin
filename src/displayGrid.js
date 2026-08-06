import { Player, Computer } from "./components/playerClass.js";
import { createShip } from "./functions/createShip.js";

const player = new Player();
const computer = new Computer();

const grids = document.createElement("div");

grids.className = "grids";
grids.appendChild(player.gridDOM);
grids.appendChild(computer.gridDOM);

console.log("Ship player");
player.board.ships = createShip();

player.board.ships.forEach(ship => {
    let p1 = ship.coor[0];
    let p2 = ship.coor[1];
    let next = [];
    let d = p2[0] - p1[0];

    if (d == 0)
        next = [0, 1];
    else
        next = [1, 0];
    let caseGrid = Array.from(player.gridDOM.children[1].children)
        .find(c => c.value === `${p1[0]} ${p1[1]}`);
    caseGrid.className += " touch";
    while (p1[0] !== p2[0] || p1[1] !== p2[1]) {
        p1[0] += next[0];
        p1[1] += next[1];
        caseGrid = Array.from(player.gridDOM.children[1].children)
            .find(c => c.value === `${p1[0]} ${p1[1]}`);
        caseGrid.className += " touch";
    }
});

export { grids, player, computer };