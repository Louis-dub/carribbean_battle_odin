import { Ship } from "./components/shipClass.js";
import { launchGame } from "./functions/createPlayer.js";

const ships = [];

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
    <option value="2">Gunboat</option>
    <option value="3">Schooner</option>
    <option value="4">Brick</option>
    <option value="5">Frigate</option>
    <option value="6">Man-o'-war</option>
`;

selectShip.addEventListener("change", () => {
    Array.from(grid.children).forEach(c => c.className = "case");
    let p = [0, 0];
    let dir = [0, 1];

    for (let i = 0; i < parseInt(selectShip.value); i++) {
        Array.from(grid.children).find(c => c.value === `${p[0]} ${p[1]}`).className = "case ship-player";
        p = [p[0] + dir[0], p[1] + dir[1]];
    }
});

const btnPlaceShip = document.createElement("button");
btnPlaceShip.className = "btn-place-ship";
btnPlaceShip.textContent = "Place Ship";

handleShip.appendChild(selectShip);
handleShip.appendChild(btnPlaceShip);

placeShip.appendChild(grid);
placeShip.appendChild(handleShip);
placeShip.appendChild(btnLauchGame);

export { placeShip };
