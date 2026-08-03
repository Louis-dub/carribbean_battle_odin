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

board.ships.push(new Ship(2, [ 2, 7 ], [ 2, 9 ]));
board.ships.push(new Ship(3, [ 5, 2 ], [ 5, 5 ]));
board.ships.push(new Ship(4, [ 3, 2 ], [ 3, 6 ]));
board.ships.push(new Ship(5, [ 2, 10 ], [ 7, 10 ]));
board.ships.push(new Ship(6, [ 5, 7 ], [ 11, 7 ]));

test("Create boards", () => {
    expect(board.board).toEqual(b1);
});

test("Touch Ship", () => {
    board.receiveAttack(5, 3);
    expect(board.board[5][3]).toBe("t");
});

test("Miss Ship", () => {
    board.receiveAttack(11, 4);
    expect(board.board[11][4]).toBe("m");
})