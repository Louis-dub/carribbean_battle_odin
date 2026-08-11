import './styles.css';
import logo from './images/logo_battleship.png';
import { player, computer } from './createPlayer.js';
import { initBackground } from './backgroud/index.js';

document.addEventListener("DOMContentLoaded", () => {
    const logoTitle = document.getElementById("img-logo");

    if (logoTitle)
        logoTitle.src = logo;
    const logoLink = document.createElement("link")
    logoLink.rel = "icon";
    logoLink.type = "image/png";
    logoLink.href = logo;
    document.head.appendChild(logoLink);
});

const content = document.getElementById("content");
const grids = document.createElement("div");

grids.className = "grids";
grids.appendChild(player.gridDOM);
grids.appendChild(computer.gridDOM);

content.appendChild(grids);

const bgController = initBackground('pirate-bg', { particleCount: 46 });
