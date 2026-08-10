import { roundPlayer } from "./rounds.js";

export function createGrid(player) {
    const board = player.gridDOM;
    const grid = document.createElement("div");

    grid.className = "grid";
    grid.id = `grid-${player.type}`;
    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 12; j++) {
            let caseGrid = document.createElement("div");

            caseGrid.className = "case";
            caseGrid.value = `${i} ${j}`;
            grid.appendChild(caseGrid);
        }
    }
    if (player.type === "computer") {
        player.round = true;
        grid.addEventListener("click", (e) => {
            if (player.play)
                roundPlayer(grid, player, e.target.closest(".case"));
        });
    }
    board.appendChild(grid);
}