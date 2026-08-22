import { Ship } from "./components/shipClass.js";
import { changeColourShip } from "./functions/changeColourShip.js";
import { launchGame } from "./functions/createPlayer.js";
import { verifCollideShip } from "./functions/createShip.js";
import { moveShip, rotateShip } from "./functions/moveShip.js";

function handleKeydown(e, p, ogP, dir) {
    if (e.key === "r") {
        const newVal = rotateShip(parseInt(selectShip.value), ogP, dir);
        ogP = newVal.ogP;
        dir = newVal.dir;
    }
    ogP = moveShip(e, parseInt(selectShip.value), ogP, dir);
    p = [...ogP];
    Array.from(grid.children).forEach(c => {if (!c.className.includes("touch")) c.className = "case"});
    for (let i = 0; i < parseInt(selectShip.value); i++) {
        let currCase = Array.from(grid.children).find(c => c.value === `${p[0]} ${p[1]}` && !c.className.includes("touch"));
        if (currCase)
            currCase.className = "case ship-player";
        p = [p[0] + dir[0], p[1] + dir[1]];
    }
    return { p, ogP, dir};
}

const ships = [];
const listPlaceShip = [false, false, false, false, false];
let currVal = {
    place: false,
    ogP: [0, 0],
    dir: [0, 1],
    len: 2,
}

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
    if (listPlaceShip.includes(false))
        alert("Place all your ships");
    else
        launchGame(ships);
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
    errorMessage.textContent = "";
    if (selectShip.value !== "" && listPlaceShip[parseInt(selectShip.value) - 2]) {
        Array.from(grid.children).forEach(c => {if (!c.className.includes("touch")) c.className = "case"});
        document.activeElement.blur();
        return;
    }
    let p = [0, 0];
    let ogP = [0, 0];
    let dir = [0, 1];
    let len = parseInt(selectShip.value);
    currVal.ogP = [0, 0];
    currVal.dir = [0, 1];
    if (selectShip.value === "") {
        document.removeEventListener("keydown", (e) => {
            if (!listPlaceShip[parseInt(selectShip.value) - 2]) {
                errorMessage.textContent = "";
                const newVal = handleKeydown(e, p, ogP, dir);
                p = [...newVal.p];
                ogP = [...newVal.ogP];
                dir = [...newVal.dir];
                currVal.ogP = [...ogP];
                currVal.dir = [...dir];
            }
        });
    } else {
        document.addEventListener("keydown", (e) => {
            if (!listPlaceShip[parseInt(selectShip.value) - 2]) {
                errorMessage.textContent = "";
                const newVal = handleKeydown(e, p, ogP, dir);
                p = [...newVal.p];
                ogP = [...newVal.ogP];
                dir = [...newVal.dir];
                currVal.ogP = [...ogP];
                currVal.dir = [...dir];
            }
        });
    }
    Array.from(grid.children).forEach(c => {if (!c.className.includes("touch")) c.className = "case"});

    for (let i = 0; i < len; i++) {
        let currCase = Array.from(grid.children).find(c => c.value === `${p[0]} ${p[1]}` && !c.className.includes("touch"));
        if (currCase)
            currCase.className = "case ship-player";
        p = [p[0] + dir[0], p[1] + dir[1]];
    }
    currVal.place = true;
    currVal.len = parseInt(selectShip.value);
    if (selectShip.value === "") {
        currVal.place = false;
        currVal.len = 0;
    }
    document.activeElement.blur();
});

const errorMessage = document.createElement("p");
errorMessage.className = "error-message";

const btnPlaceShip = document.createElement("button");
btnPlaceShip.className = "btn-place-ship";
btnPlaceShip.textContent = "Place Ship";

btnPlaceShip.addEventListener("click", () => {
    if (!currVal.place) {
        errorMessage.textContent = "Select a Ship";
    } else if (!listPlaceShip[currVal.len - 2]) {
        let p = [...currVal.ogP];
        for (let i = 0; i < currVal.len - 1; i++)
            p = [p[0] + currVal.dir[0], p[1] + currVal.dir[1]];
        if (verifCollideShip(currVal.ogP, p, ships)) {
            errorMessage.textContent = "You cannot place your ship here";
        } else {
            listPlaceShip[currVal.len - 2] = true;
            ships.push(new Ship(currVal.len, currVal.ogP, p));
            changeColourShip(grid.children, ships[ships.length - 1], "case touch");
        }
    }
});

handleShip.appendChild(selectShip);
handleShip.appendChild(btnPlaceShip);
handleShip.appendChild(errorMessage);

placeShip.appendChild(grid);
placeShip.appendChild(handleShip);
placeShip.appendChild(btnLauchGame);

export { placeShip };
