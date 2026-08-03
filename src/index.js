import './styles.css';
import logo from './images/logo_battleship.png';

document.addEventListener("DOMContentLoaded", () => {
    const logoLink = document.createElement("link")
    logoLink.rel = "icon";
    logoLink.type = "image/png";
    logoLink.href = logo;
    document.head.appendChild(logoLink);
});