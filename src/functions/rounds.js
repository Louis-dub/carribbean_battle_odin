import { attack } from "./attack.js";

function computerRound() {
    console.log("je suis beau");
}

export function roundPlayer(grid, player, pos) {
    const att = attack(grid.children, player.board, pos);

    if (att !== 0) {
        computerRound();
        if (player.isLose()) {
            grid.style.cursor = "auto";
            player.play = false;
            document.getElementById("content").innerHTML += `
                <h3>You win !!!</h3>
            `;
        }
    }
}