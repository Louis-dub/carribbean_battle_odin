import { Player } from "../src/components/playerClass.js";
import { Ship } from "../src/components/shipClass.js";
import { createGrid } from "../src/functions/createGridDOM.js";
import { changeColourShip } from "../src/functions/changeColourShip.js";

const testPlayer = new Player();

const shipOne = new Ship(2, [0, 0], [0, 1]);
const shipTwo = new Ship(3, [1, 0], [3, 0]);
const shipThree = new Ship(4, [2, 0], [2, 3]);
const shipFour = new Ship(5, [3, 0], [3, 4]);
const shipFive = new Ship(6, [4, 0], [4, 5]);

testPlayer.board.ships = [shipOne, shipTwo, shipThree, shipFour, shipFive];

createGrid(testPlayer);
const cases = testPlayer.gridDOM.children[1].children;

changeColourShip(cases, shipThree, "case sunk");

test.each([24, 25, 26, 27])("change class case n°%i", (i) => {
    expect(cases[i].className).toBe("case sunk");
});

changeColourShip(cases, shipTwo, "case sunk");

test.each([12, 24, 36])("change class case n°%i", (i) => {
    expect(cases[i].className).toBe("case sunk");
});