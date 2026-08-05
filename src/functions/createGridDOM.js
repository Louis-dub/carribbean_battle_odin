export function createGrid(type) {
    const grid = document.createElement("div");

    grid.className = "grid";
    grid.id = `grid-${type}`;
    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 12; j++) {
            let caseGrid = document.createElement("div");

            caseGrid.className = "case";
            caseGrid.value = `${i} ${j}`;
            grid.appendChild(caseGrid);
        }
    }
    return grid;
}