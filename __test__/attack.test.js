import { Player } from "../src/components/playerClass.js";
import { Ship } from "../src/components/shipClass.js";
import { attack } from "../src/functions/attack.js";
import { createGrid } from "../src/functions/createGridDOM.js";

const testPlayer = new Player();

const shipOne = new Ship(2, [0, 0], [0, 1]);
const shipTwo = new Ship(3, [1, 0], [1, 2]);
const shipThree = new Ship(4, [2, 0], [2, 3]);
const shipFour = new Ship(5, [3, 0], [3, 4]);
const shipFive = new Ship(6, [4, 0], [4, 5]);

testPlayer.board.ships = [shipOne, shipTwo, shipThree, shipFour, shipFive];

createGrid(testPlayer);
const cases = testPlayer.gridDOM.children[1].children;

test("Touch ship", () => {
    const caseHit = testPlayer.gridDOM.children[1].children[26];
    const hit = attack(cases, testPlayer.board, caseHit);

    expect(hit).toBe(1);
    expect(caseHit.className).toEqual("case touch");
});

test("Miss ship", () => {
    const caseHit = testPlayer.gridDOM.children[1].children[30];
    const hit = attack(cases, testPlayer.board, caseHit);

    expect(hit).toBe(2);
    expect(caseHit.className).toEqual("case miss");
});

test("Already touch", () => {
    const caseHit = testPlayer.gridDOM.children[1].children[26];
    
    expect(attack(cases, testPlayer.board, caseHit)).toBe(0);
});

test("Ship sunk", () => {
    const c1 = testPlayer.gridDOM.children[1].children[24];
    const c2 = testPlayer.gridDOM.children[1].children[27];
    const c3 = testPlayer.gridDOM.children[1].children[25];

    attack(cases, testPlayer.board, c1);
    attack(cases, testPlayer.board, c2);
    attack(cases, testPlayer.board, c3);
    expect(c1.className).toBe("case sunk");
    expect(c2.className).toBe("case sunk");
    expect(c3.className).toBe("case sunk");
});