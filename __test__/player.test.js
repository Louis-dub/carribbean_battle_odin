import { Player } from "../src/components/playerClass.js";
import { Ship } from "../src/components/shipClass.js";
import { roundPlayer } from "../src/functions/rounds.js";
import { createGrid } from "../src/functions/createGridDOM.js";

const  player = new Player("player", "Your Fleet");
const computer = new Player("computer", "Enemy Fleet");

jest.mock('../src/functions/rounds', () => ({
    roundPlayer: jest.fn(),
}));

test("Player title", () => {
    const title = player.gridDOM.children[0];

    expect(title.tagName).toBe('H1');
    expect(title.textContent).toBe("Your Fleet");
})

test("Player title", () => {
    const title = computer.gridDOM.children[0];

    expect(title.tagName).toBe('H1');
    expect(title.textContent).toBe("Enemy Fleet");
})

test("player grid", () => {
    createGrid(player)
    const grid = player.gridDOM.children[1];

    expect(grid.tagName).toBe('DIV');
    expect(grid.id).toBe('grid-player');
    expect(grid.children.length).toBe(144);
    expect(grid.children[30].tagName).toBe('DIV');
    expect(grid.children[30].value).toBe('2 6');
});

test("computer grid", () => {
    createGrid(computer, player)
    const grid = computer.gridDOM.children[1];

    expect(grid.tagName).toBe('DIV');
    expect(grid.id).toBe('grid-computer');
    expect(grid.children.length).toBe(144);
    expect(grid.children[30].tagName).toBe('DIV');
    expect(grid.children[30].value).toBe('2 6');
});

test("Player.isLose returns false when fleet is only partially sunk", () => {
    const testPlayer = new Player();

    const shipOne = new Ship(2, [0, 0], [0, 1]);
    const shipTwo = new Ship(3, [1, 0], [1, 2]);
    const shipThree = new Ship(4, [2, 0], [2, 3]);
    const shipFour = new Ship(5, [3, 0], [3, 4]);
    const shipFive = new Ship(6, [4, 0], [4, 5]);

    testPlayer.board.ships = [shipOne, shipTwo, shipThree, shipFour, shipFive];

    shipOne.hit([0, 0]);
    shipOne.hit([0, 1]);
    shipOne.isSunk();

    shipTwo.hit([1, 0]);
    shipTwo.hit([1, 1]);
    shipTwo.hit([1, 2]);
    shipTwo.isSunk();

    expect(testPlayer.isLose()).toBe(false);
    expect(testPlayer.lose).toBe(false);
});

test("Player.isLose returns true and flips lose when the whole fleet is sunk", () => {
    const testPlayer = new Player();

    const shipOne = new Ship(2, [0, 0], [0, 1]);
    const shipTwo = new Ship(3, [1, 0], [1, 2]);
    const shipThree = new Ship(4, [2, 0], [2, 3]);
    const shipFour = new Ship(5, [3, 0], [3, 4]);
    const shipFive = new Ship(6, [4, 0], [4, 5]);

    testPlayer.board.ships = [shipOne, shipTwo, shipThree, shipFour, shipFive];

    const sink = (ship, coords) => {
        coords.forEach(coord => ship.hit(coord));
        ship.isSunk();
    };

    sink(shipOne, [[0, 0], [0, 1]]);
    sink(shipTwo, [[1, 0], [1, 1], [1, 2]]);
    sink(shipThree, [[2, 0], [2, 1], [2, 2], [2, 3]]);
    sink(shipFour, [[3, 0], [3, 1], [3, 2], [3, 3], [3, 4]]);
    sink(shipFive, [[4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5]]);

    expect(testPlayer.isLose()).toBe(true);
    expect(testPlayer.lose).toBe(true);
});

test("shoudl call roundPlayer", () => {
    const caseElement = computer.gridDOM.querySelector('.case');
    caseElement.click();

    expect(roundPlayer).toHaveBeenCalledTimes(1);
    expect(roundPlayer).toHaveBeenCalledWith(computer.gridDOM.children[1], computer, caseElement, player);
});

test("shoudl not call roundPlayer", () => {
    jest.clearAllMocks();
    computer.play = false;
    const caseElement = computer.gridDOM.querySelector('.case');
    caseElement.click();

    expect(roundPlayer).not.toHaveBeenCalled();
});