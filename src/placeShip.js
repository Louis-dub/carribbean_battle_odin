import { Ship } from "./components/shipClass.js";
import { launchGame } from "./functions/createPlayer.js";

const btnLauchGame = document.createElement("button");

btnLauchGame.textContent = "Player";
btnLauchGame.style.cursor = "pointer";

btnLauchGame.addEventListener("click", () => {
    launchGame(false);
});

export { btnLauchGame };