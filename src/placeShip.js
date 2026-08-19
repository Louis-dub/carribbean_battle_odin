import { Ship } from "./components/shipClass.js";
import { launchGame } from "./functions/createPlayer.js";

const placeShip = document.createElement("div");

placeShip.className = "place-ship";

const grid = document.createElement("div");

grid.className = "grid";

for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 12; j++) {
        let caseGrid = document.createElement("div");

        caseGrid.className = "case";
        caseGrid.value = `${i} ${j}`;
        grid.appendChild(caseGrid);
    }
}

const btnLauchGame = document.createElement("button");

btnLauchGame.textContent = "Play";
btnLauchGame.className = "launch-game"

btnLauchGame.addEventListener("click", () => {
    launchGame(false);
});

placeShip.appendChild(grid);
placeShip.appendChild(btnLauchGame);

export { placeShip };