import { Ship } from "./components/shipClass.js";
import { launchGame } from "./functions/createPlayer.js";

const placeShip = document.createElement("div");
placeShip.className = "place-ship";

const grid = document.createElement("div");
grid.className = "grid-place";

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
btnLauchGame.className = "launch-game";

btnLauchGame.addEventListener("click", () => {
    launchGame(false);
});

const handleShip = document.createElement("div");
handleShip.className = "handle-ship";

const selectShip = document.createElement("select");
selectShip.name = "ship";

selectShip.innerHTML = `
    <option value="">Choose a ship</option>
    <option value="gunboat">Gunboat</option>
    <option value="schooner">Schooner</option>
    <option value="brick">Brick</option>
    <option value="frigate">Frigate</option>
    <option value="man-o-war">Man-o'-war</option>
`;

const btnPlaceShip = document.createElement("button");
btnPlaceShip.className = "btn-place-ship";
btnPlaceShip.textContent = "Place Ship";

handleShip.appendChild(selectShip);
handleShip.appendChild(btnPlaceShip);

placeShip.appendChild(grid);
placeShip.appendChild(handleShip);
placeShip.appendChild(btnLauchGame);

export { placeShip };