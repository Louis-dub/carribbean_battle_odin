import { attack } from "./attack.js";

export function computerRound(player) {
    let p = [Math.floor(Math.random() * 12), Math.floor(Math.random() * 12)];
    let hit = player.board.receiveAttack(p[0], p[1]);

    while (hit === 0) {
        p = [Math.floor(Math.random() * 12), Math.floor(Math.random() * 12)];
        hit = player.board.receiveAttack(p[0], p[1]);
    }
    const caseHit = Array.from(player.gridDOM.children[1].children).find(c =>
            c.value === `${p[0]} ${p[1]}`
    );
    if (hit === 1)
        caseHit.className = "case sunk";
    if (hit === 2)
        caseHit.className = "case miss";
}

export function roundPlayer(grid, computer, pos, player) {
    if (!pos)
        return false;
    const att = attack(grid.children, computer.board, pos);

    if (att !== 0) {
        if (computer.isLose()) {
            grid.style.cursor = "auto";
            computer.play = false;
            document.getElementById("content").innerHTML += `
                <h3>You win !!!</h3>
            `;
        } else {
            computerRound(player);
            if (player.isLose()) {
                grid.style.cursor = "auto";
                computer.play = false;
                document.getElementById("content").innerHTML += `
                    <h3>You Lose !!!</h3>
                `;                
            }
        }
    }
    return true;
}