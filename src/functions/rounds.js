import { attack } from "./attack.js";
import { computerSunkShip } from "./computerRound.js";

let HITCOUNT = 0;

export function computerRound(player) {
    if (player.shipsTouch.length === 0) {
        let p = [Math.floor(Math.random() * 12), Math.floor(Math.random() * 12)];
        let hit = player.board.receiveAttack(p[0], p[1]);

        while (hit === 0) {
            p = [Math.floor(Math.random() * 12), Math.floor(Math.random() * 12)];
            hit = player.board.receiveAttack(p[0], p[1]);
        }
        if (HITCOUNT === 0) {
            p = [0, 0];
            hit = player.board.receiveAttack(p[0], p[1]);
            HITCOUNT++;
        }
        const caseHit = Array.from(player.gridDOM.children[1].children).find(c =>
                c.value === `${p[0]} ${p[1]}`
        );
        if (hit === 1) {
            player.shipsTouch.push(player.board.findShipHit(p));
            player.caseTouch = p;
            caseHit.className = "case touch";
        }
        if (hit === 2)
            caseHit.className = "case miss";
    } else {
        computerSunkShip(player);
    }
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