import { Ship } from "./components/shipClass.js";
import { launchGame } from "./functions/createPlayer.js";
import { moveShip } from "./functions/moveShip.js";

function handleKeydown(e, p, ogP, dir) {
    if (e.key === "r") {
        dir = (dir[0] === 0 && dir[1] === 1) ? [1, 0] : [0, 1];
        console.log(JSON.stringify(dir));
    }
    ogP = moveShip(e, parseInt(selectShip.value), ogP);
    p = [...ogP];
    Array.from(grid.children).forEach(c => c.className = "case");
    for (let i = 0; i < parseInt(selectShip.value); i++) {
        Array.from(grid.children).find(c => c.value === `${p[0]} ${p[1]}`).className = "case ship-player";
        p = [p[0] + dir[0], p[1] + dir[1]];
    }
    return { p: p, ogP: ogP, dir: dir};
}

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
    let p = [0, 0];
    let ogP = [0, 0];
    let dir = [0, 1];
    if (selectShip.value === "") {
        document.removeEventListener("keydown", (e) => {
            const newVal = handleKeydown(e, p, ogP, dir);
            p = newVal.p;
            ogP = newVal.ogP;
            dir = [...newVal.dir];
        });
    } else {
        document.addEventListener("keydown", (e) => {
            const newVal = handleKeydown(e, p, ogP, dir);
            p = newVal.p;
            ogP = newVal.ogP;
            dir = [...newVal.dir];
        });
    }
    Array.from(grid.children).forEach(c => c.className = "case");

    for (let i = 0; i < parseInt(selectShip.value); i++) {
        Array.from(grid.children).find(c => c.value === `${p[0]} ${p[1]}`).className = "case ship-player";
        p = [p[0] + dir[0], p[1] + dir[1]];
    }
    document.activeElement.blur();
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
