import { isValidCase, computerSunkShip } from "../src/functions/computerRound.js";
import { changeColourShip } from "../src/functions/changeColourShip.js";

jest.mock("../src/functions/changeColourShip.js", () => ({
    changeColourShip: jest.fn(),
}));

function buildEmptyBoard() {
    return Array.from({ length: 12 }, () => Array(12).fill("e"));
}

describe("isValidCase", () => {
    it("should return true for coordinates inside the board", () => {
        expect(isValidCase(5, 5)).toBe(true);
    });

    it("should return true on the boundaries (0 and 11)", () => {
        expect(isValidCase(0, 0)).toBe(true);
        expect(isValidCase(11, 11)).toBe(true);
    });

    it("should return false when x is out of range", () => {
        expect(isValidCase(-1, 5)).toBe(false);
        expect(isValidCase(12, 5)).toBe(false);
    });

    it("should return false when y is out of range", () => {
        expect(isValidCase(5, -1)).toBe(false);
        expect(isValidCase(5, 12)).toBe(false);
    });
});

describe("computerSunkShip - direction already known (player.sens set)", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        changeColourShip.mockClear();
    });

    it("should mark a miss and reverse direction, walking back to the other end of the touched line", () => {
        const board = buildEmptyBoard();
        board[5][5] = "t";
        board[4][5] = "t";
        board[3][5] = "e";

        const player = {
            sens: [1, 0],
            caseTouch: [5, 5],
            shipsTouch: [],
            board: {
                board,
                receiveAttack: jest.fn().mockReturnValue(2),
                findShipHit: jest.fn(),
                findHitOnShip: jest.fn(),
            },
            gridDOM: {
                children: [null, { children: [{ value: "6 5", className: "" }] }],
            },
        };

        computerSunkShip(player);

        expect(player.board.receiveAttack).toHaveBeenCalledWith(6, 5);
        const cell = player.gridDOM.children[1].children.find(c => c.value === "6 5");
        expect(cell.className).toBe("case miss");
        expect(player.sens).toEqual([-1, -0]);
        expect(player.caseTouch).toEqual([4, 5]);
    });

    it("should mark a touch and keep going in the same direction when the next cell is still valid", () => {
        const mockShip = { isSunk: jest.fn().mockReturnValue(false) };

        const player = {
            sens: [1, 0],
            caseTouch: [5, 5],
            shipsTouch: [],
            board: {
                board: buildEmptyBoard(),
                receiveAttack: jest.fn().mockReturnValue(1),
                findShipHit: jest.fn().mockReturnValue(mockShip),
                findHitOnShip: jest.fn(),
            },
            gridDOM: {
                children: [null, { children: [{ value: "6 5", className: "" }] }],
            },
        };

        computerSunkShip(player);

        const cell = player.gridDOM.children[1].children.find(c => c.value === "6 5");
        expect(cell.className).toBe("case touch");
        expect(player.caseTouch).toEqual([6, 5]);
        expect(player.sens).toEqual([1, 0]);
        expect(player.shipsTouch).toContain(mockShip);
        expect(changeColourShip).not.toHaveBeenCalled();
    });

    it("should mark a touch and reverse direction when the next cell would fall off the board", () => {
        const board = buildEmptyBoard();
        board[11][5] = "t";
        board[10][5] = "t";
        board[9][5] = "e";
        const mockShip = { isSunk: jest.fn().mockReturnValue(false) };

        const player = {
            sens: [1, 0],
            caseTouch: [10, 5],
            shipsTouch: [],
            board: {
                board,
                receiveAttack: jest.fn().mockReturnValue(1),
                findShipHit: jest.fn().mockReturnValue(mockShip),
                findHitOnShip: jest.fn(),
            },
            gridDOM: {
                children: [null, { children: [{ value: "11 5", className: "" }] }],
            },
        };

        computerSunkShip(player);

        const cell = player.gridDOM.children[1].children.find(c => c.value === "11 5");
        expect(cell.className).toBe("case touch");
        expect(player.board.findShipHit).toHaveBeenCalledWith([11, 5]);
        expect(player.sens).toEqual([-1, -0]);
        expect(player.caseTouch).toEqual([10, 5]);
        expect(player.shipsTouch).toContain(mockShip);
    });

    it("should not duplicate the ship in shipsTouch when it is hit again before sinking", () => {
        const mockShip = { isSunk: jest.fn().mockReturnValue(false) };

        const player = {
            sens: [1, 0],
            caseTouch: [5, 5],
            shipsTouch: [mockShip],
            board: {
                board: buildEmptyBoard(),
                receiveAttack: jest.fn().mockReturnValue(1),
                findShipHit: jest.fn().mockReturnValue(mockShip),
                findHitOnShip: jest.fn(),
            },
            gridDOM: {
                children: [null, { children: [{ value: "6 5", className: "" }] }],
            },
        };

        computerSunkShip(player);

        expect(player.shipsTouch).toEqual([mockShip]);
    });

    it("should sink the ship, remove it from shipsTouch and move on to another already-touched ship", () => {
        const otherShip = { isSunk: jest.fn() };
        const sunkShip = { isSunk: jest.fn().mockReturnValue(true) };

        const player = {
            sens: [1, 0],
            caseTouch: [5, 5],
            shipsTouch: [otherShip],
            board: {
                board: buildEmptyBoard(),
                receiveAttack: jest.fn().mockReturnValue(1),
                findShipHit: jest.fn().mockReturnValue(sunkShip),
                findHitOnShip: jest.fn().mockReturnValue([2, 2]),
            },
            gridDOM: {
                children: [null, { children: [{ value: "6 5", className: "" }] }],
            },
        };

        computerSunkShip(player);

        expect(changeColourShip).toHaveBeenCalledWith(
            player.gridDOM.children[1].children,
            sunkShip,
            "case sunk"
        );
        expect(player.shipsTouch).toEqual([otherShip]);
        expect(player.sens).toBeUndefined();
        expect(player.board.findHitOnShip).toHaveBeenCalledWith(otherShip);
        expect(player.caseTouch).toEqual([2, 2]);
    });

    it("should sink the ship and clear caseTouch when no other ship is being tracked", () => {
        const sunkShip = { isSunk: jest.fn().mockReturnValue(true) };

        const player = {
            sens: [1, 0],
            caseTouch: [5, 5],
            shipsTouch: [],
            board: {
                board: buildEmptyBoard(),
                receiveAttack: jest.fn().mockReturnValue(1),
                findShipHit: jest.fn().mockReturnValue(sunkShip),
                findHitOnShip: jest.fn(),
            },
            gridDOM: {
                children: [null, { children: [{ value: "6 5", className: "" }] }],
            },
        };

        computerSunkShip(player);

        expect(player.shipsTouch).toEqual([]);
        expect(player.sens).toBeUndefined();
        expect(player.caseTouch).toBeUndefined();
        expect(player.board.findHitOnShip).not.toHaveBeenCalled();
    });
});

describe("computerSunkShip - no direction known yet (initial search around the touched cell)", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        changeColourShip.mockClear();
    });

    it("should skip directions that fall off the board (findValidCase internal retry) and mark a miss", () => {
        jest.spyOn(Math, "random").mockReturnValue(0);

        const player = {
            sens: undefined,
            caseTouch: [0, 0],
            shipsTouch: [],
            board: {
                board: buildEmptyBoard(),
                receiveAttack: jest.fn().mockReturnValue(2),
                findShipHit: jest.fn(),
                findHitOnShip: jest.fn(),
            },
            gridDOM: {
                children: [null, { children: [{ value: "0 1", className: "" }] }],
            },
        };

        computerSunkShip(player);

        expect(player.board.receiveAttack).toHaveBeenCalledTimes(1);
        expect(player.board.receiveAttack).toHaveBeenCalledWith(0, 1);
        const cell = player.gridDOM.children[1].children.find(c => c.value === "0 1");
        expect(cell.className).toBe("case miss");
        expect(player.sens).toBeUndefined();
        expect(player.caseTouch).toEqual([0, 0]);
    });

    it("should retry with a new direction when the attacked cell was already attacked (hit === 0)", () => {
        jest.spyOn(Math, "random").mockReturnValue(0);
        const mockShip = { isSunk: jest.fn().mockReturnValue(false) };

        const player = {
            sens: undefined,
            caseTouch: [5, 5],
            shipsTouch: [],
            board: {
                board: buildEmptyBoard(),
                receiveAttack: jest.fn()
                    .mockReturnValueOnce(0)
                    .mockReturnValueOnce(1),
                findShipHit: jest.fn().mockReturnValue(mockShip),
                findHitOnShip: jest.fn(),
            },
            gridDOM: {
                children: [null, { children: [{ value: "5 4", className: "" }] }],
            },
        };

        computerSunkShip(player);

        expect(player.board.receiveAttack).toHaveBeenCalledTimes(2);
        expect(player.board.receiveAttack).toHaveBeenNthCalledWith(1, 5, 4);
        expect(player.board.receiveAttack).toHaveBeenNthCalledWith(2, 5, 4);
        const cell = player.gridDOM.children[1].children.find(c => c.value === "5 4");
        expect(cell.className).toBe("case touch");
        expect(player.sens).toEqual([0, -1]);
        expect(player.caseTouch).toEqual([5, 4, 0]);
    });
});