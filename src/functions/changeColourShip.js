export function changeColourShip(cases, ship, className) {
    let p1 = ship.coor[0];
    let p2 = ship.coor[1];
    let next = [];
    let d = p2[0] - p1[0];

    if (d == 0)
        next = [0, 1];
    else
        next = [1, 0];
    let caseGrid = Array.from(cases)
        .find(c => c.value === `${p1[0]} ${p1[1]}`);
    caseGrid.className = className;
    while (p1[0] !== p2[0] || p1[1] !== p2[1]) {
        p1[0] += next[0];
        p1[1] += next[1];
        caseGrid = Array.from(cases)
            .find(c => c.value === `${p1[0]} ${p1[1]}`);
        caseGrid.className = className;
    }
}