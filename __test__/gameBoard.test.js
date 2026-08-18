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

test("constructor initializes an empty 12x12 board with no ships", () => {
    const freshBoard = new GameBoard();

    expect(freshBoard.board).toEqual(b1);
    expect(freshBoard.ships).toEqual([]);
});

test("Touch Ship", () => {
    board.receiveAttack(5, 3);
    expect(board.board[5][3]).toBe("t");
});

test("Miss Ship", () => {
    board.receiveAttack(11, 4);
    expect(board.board[11][4]).toBe("m");
});

test("Attacking an already attacked cell returns 0 and leaves the board unchanged", () => {
    board.receiveAttack(1, 1);
    const result = board.receiveAttack(1, 1);

    expect(result).toBe(0);
    expect(board.board[1][1]).toBe("m");
});

describe("GameBoard.findShipHit", () => {
    let localBoard, shipA, shipB;

    beforeEach(() => {
        localBoard = new GameBoard();
        shipA = new Ship(3, [2, 2], [2, 4]);
        shipB = new Ship(2, [6, 6], [7, 6]);
        localBoard.ships = [shipA, shipB];
    });

    it("should return the ship whose bounding box contains the given coordinates", () => {
        expect(localBoard.findShipHit([2, 3])).toBe(shipA);
        expect(localBoard.findShipHit([7, 6])).toBe(shipB);
    });

    it("should return undefined when no ship occupies the given coordinates", () => {
        expect(localBoard.findShipHit([0, 0])).toBeUndefined();
    });
});

describe("GameBoard.findHitOnShip", () => {
    let localBoard, horizontalShip, verticalShip;

    beforeEach(() => {
        localBoard = new GameBoard();
        horizontalShip = new Ship(3, [2, 2], [2, 4]); 
        verticalShip = new Ship(3, [5, 5], [7, 5]);   
        localBoard.ships = [horizontalShip, verticalShip];
    });

    it("should find the first hit cell along a horizontal ship (dx=0, dy=1)", () => {
        localBoard.board[2][3] = "t";
        expect(localBoard.findHitOnShip(horizontalShip)).toEqual([2, 3]);
    });

    it("should find the first hit cell along a vertical ship (dx=1, dy=0)", () => {
        localBoard.board[6][5] = "t";
        expect(localBoard.findHitOnShip(verticalShip)).toEqual([6, 5]);
    });

    it("should handle reversed horizontal ship (dx=0, dy=-1) to cover branch end[1] < start[1]", () => {
        const originalStart = horizontalShip.coor[0];
        const originalEnd = horizontalShip.coor[1];
        
        horizontalShip.coor[0] = [2, 4];
        horizontalShip.coor[1] = [2, 2];
        
        localBoard.board[2][3] = "t";
        expect(localBoard.findHitOnShip(horizontalShip)).toEqual([2, 3]);
        
        horizontalShip.coor[0] = originalStart;
        horizontalShip.coor[1] = originalEnd;
    });

    it("should handle reversed vertical ship (dx=-1, dy=0) to cover branch end[0] < start[0]", () => {
        const originalStart = verticalShip.coor[0];
        const originalEnd = verticalShip.coor[1];

        verticalShip.coor[0] = [7, 5];
        verticalShip.coor[1] = [5, 5];

        localBoard.board[6][5] = "t";
        expect(localBoard.findHitOnShip(verticalShip)).toEqual([6, 5]);
        verticalShip.coor[0] = originalStart;
        verticalShip.coor[1] = originalEnd;
    });

    it("should return undefined when no cell of the ship has been hit yet", () => {
        expect(localBoard.findHitOnShip(horizontalShip)).toBeUndefined();
    });
});