import './styles.css';
import logo from './images/logo_battleship.png';
import { Player, Computer } from './components/playerClass.js';
import { grids } from './displayGrid.js';


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

content.appendChild(grids);
