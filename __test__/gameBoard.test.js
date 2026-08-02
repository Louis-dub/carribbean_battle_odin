import { GameBoard } from "../src/components/gameBoardClass.js";
import { Ship } from "../src/components/shipClass.js";

const board = new GameBoard();

const b1 = [
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
];

const b2 = [
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
];

board.computerShip = [];
board.playerShip = [];

board.playerShip.push(new Ship(2, [ 9, 2 ], [ 9, 4 ]));
board.playerShip.push(new Ship(3, [ 1, 4 ], [ 1, 7 ]));
board.playerShip.push(new Ship(4, [ 3, 5 ], [ 3, 9 ]));
board.playerShip.push(new Ship(5, [ 4, 1 ], [ 9, 1 ]));
board.playerShip.push(new Ship(6, [ 6, 7 ], [ 12, 7 ]));

board.computerShip.push(new Ship(2, [ 12, 4 ], [ 12, 6 ]));
board.computerShip.push(new Ship(3, [ 11, 8 ], [ 11, 11 ]));
board.computerShip.push(new Ship(4, [ 3, 1 ], [ 7, 1 ]));
board.computerShip.push(new Ship(5, [ 5, 3 ], [ 10, 3 ]));
board.computerShip.push(new Ship(6, [ 5, 5 ], [ 5, 11 ]));

test("Create boards", () => {
    expect(board.player).toEqual(b1);
    expect(board.computer).toEqual(b2);
});

test("Touch Ship", () => {
    board.receiveAttack(6, 3);
    expect(board.computer[6][3]).toBe("t");
});

test("Miss Ship", () => {
    board.receiveAttack(3, 4);
    expect(board.player[3][4]).toBe("m");
})