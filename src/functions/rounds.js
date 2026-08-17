import { attack } from "./attack.js";

function findCaseWhenShipTouch(player) {
    let sens = Math.floor(Math.random() * 4);
    const cases = [[0, -1], [0, 1], [1, 0], [-1, 0]];
    let nextCase = [player.caseTouch[0] + cases[sens][0], player.caseTouch[1] + cases[sens][1], sens];

    while (nextCase[0] < 0 || nextCase[1] < 0 || nextCase[0] > 11 || nextCase[1] > 11) {
        sens++;
        sens %= 4;
        nextCase = [player.caseTouch[0] + cases[sens][0], player.caseTouch[1] + cases[sens][1], sens];
    }

    return nextCase;
}

export function computerRound(player) {
    if (!player.shipTouch) {
        let p = [Math.floor(Math.random() * 12), Math.floor(Math.random() * 12)];
        let hit = player.board.receiveAttack(p[0], p[1]);

        while (hit === 0) {
            p = [Math.floor(Math.random() * 12), Math.floor(Math.random() * 12)];
            hit = player.board.receiveAttack(p[0], p[1]);
        }
        const caseHit = Array.from(player.gridDOM.children[1].children).find(c =>
                c.value === `${p[0]} ${p[1]}`
        );
        if (hit === 1) {
            player.shipTouch = player.board.findShipHit(p);
            player.caseTouch = p;
            caseHit.className = "case sunk";
        }
        if (hit === 2)
            caseHit.className = "case miss";
    } else {
        if (!player.sens) {
            let p = findCaseWhenShipTouch(player);
            let hit = player.board.receiveAttack(p[0], p[1]);

            while (hit === 0) {
                p = findCaseWhenShipTouch(player);
                hit = player.board.receiveAttack(p[0], p[1]);
            }
            const caseHit = Array.from(player.gridDOM.children[1].children).find(c =>
                c.value === `${p[0]} ${p[1]}`
            );
            if (hit === 1) {
                player.shipTouch = player.board.findShipHit(p);
                player.caseTouch = p;
                player.sens = p[2];
                caseHit.className = "case sunk";
                if (player.shipTouch.isSunk()) {
                    player.shipTouch = undefined;
                    player.caseTouch = undefined;
                    player.sens = undefined;
                }
            }
            if (hit === 2)
                caseHit.className = "case miss";
        } else {
            const p = [player.caseTouch[0] + player.sens[0], player.caseTouch[1] + player.sens[1]];
            const hit = player.board.receiveAttack(p[0], p[1]);
            const caseHit = Array.from(player.gridDOM.children[1].children).find(c =>
                c.value === `${p[0]} ${p[1]}`);
            if (hit === 1) {
                caseHit.className = "case sunk";
                player.caseTouch = p;
                if (player.caseTouch[0] - player.sens[0] < 0 || player.caseTouch[1] - player.sens[1] < 0 || player.caseTouch[0] + player.sens[0] > 11 || player.caseTouch[1] + player.sens[1] > 11) {
                    player.sens = [player.sens[0] * -1, player.sens[1] * -1];
                    player.caseTouch = [player.caseTouch[0] + player.sens[0] * player.shipTouch.numHit, player.caseTouch[0] + player.sens[0] * player.shipTouch.numHit[1]];
                }
                if (player.shipTouch.isSunk()) {
                    player.shipTouch = undefined;
                    player.caseTouch = undefined;
                    player.sens = undefined;
                }
            } else {
                caseHit.className = "case miss";
                player.sens = [player.sens[0] * -1, player.sens[1] * -1];
                player.caseTouch = [player.caseTouch[0] + player.sens[0] * player.shipTouch.numHit, player.caseTouch[0] + player.sens[0] * player.shipTouch.numHit[1]];
            }
        }
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