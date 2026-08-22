import { computerRound, roundPlayer } from "../src/functions/rounds.js";
import { computerSunkShip } from "../src/functions/computerRound.js";

jest.mock("../src/functions/computerRound.js", () => ({
    computerSunkShip: jest.fn(),
}));

describe("computerRound", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        computerSunkShip.mockClear();
    });

    it("should delegate to computerSunkShip when the player already has ships being tracked", () => {
        const mockPlayer = {
            shipsTouch: [{ length: 3 }],
            board: {
                receiveAttack: jest.fn(),
                findShipHit: jest.fn(),
            },
            gridDOM: {
                children: [null, { children: [] }],
            },
        };

        computerRound(mockPlayer);

        expect(computerSunkShip).toHaveBeenCalledWith(mockPlayer);
        expect(mockPlayer.board.receiveAttack).not.toHaveBeenCalled();
    });

    it("should mark the attacked cell as a miss when the random attack misses", () => {
        const mockPlayer = {
            shipsTouch: [],
            board: {
                receiveAttack: jest.fn().mockReturnValue(2),
                findShipHit: jest.fn(),
            },
            gridDOM: {
                children: [
                    null,
                    {
                        children: [
                            { value: "0 0", className: "" },
                            { value: "0 1", className: "" },
                        ],
                    },
                ],
            },
        };
        jest.spyOn(Math, "random").mockReturnValue(0);

        computerRound(mockPlayer);

        const hitCell = mockPlayer.gridDOM.children[1].children.find(c => c.value === "0 0");
        expect(hitCell.className).toBe("case miss");
        expect(mockPlayer.board.receiveAttack).toHaveBeenCalledWith(0, 0);
        expect(mockPlayer.shipsTouch).toHaveLength(0);
    });

    it("should mark the attacked cell as a touch, register the ship and set caseTouch when the attack hits", () => {
        const mockShip = { length: 3 };
        const mockPlayer = {
            shipsTouch: [],
            board: {
                receiveAttack: jest.fn().mockReturnValue(1),
                findShipHit: jest.fn().mockReturnValue(mockShip),
            },
            gridDOM: {
                children: [
                    null,
                    {
                        children: [
                            { value: "0 0", className: "" },
                        ],
                    },
                ],
            },
        };
        jest.spyOn(Math, "random").mockReturnValue(0);

        computerRound(mockPlayer);

        const hitCell = mockPlayer.gridDOM.children[1].children.find(c => c.value === "0 0");
        expect(hitCell.className).toBe("case touch");
        expect(mockPlayer.shipsTouch).toContain(mockShip);
        expect(mockPlayer.caseTouch).toEqual([0, 0]);
    });

    it("should keep drawing new coordinates while receiveAttack reports an already-attacked cell", () => {
        let callCount = 0;
        const mockPlayer = {
            shipsTouch: [],
            board: {
                receiveAttack: jest.fn().mockImplementation(() => {
                    callCount++;
                    return callCount < 3 ? 0 : 2;
                }),
                findShipHit: jest.fn(),
            },
            gridDOM: {
                children: [
                    null,
                    {
                        children: [
                            { value: "0 0", className: "" },
                        ],
                    },
                ],
            },
        };
        jest.spyOn(Math, "random").mockReturnValue(0);

        computerRound(mockPlayer);

        expect(mockPlayer.board.receiveAttack).toHaveBeenCalledTimes(3);
        const hitCell = mockPlayer.gridDOM.children[1].children.find(c => c.value === "0 0");
        expect(hitCell.className).toBe("case miss");
    });
});

describe("roundPlayer", () => {
    let mockGrid, mockComputer, mockPos, mockPlayer;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(Math, "random").mockReturnValue(0);

        mockGrid = {
            style: { cursor: "pointer" },
            children: [
                { value: "0 0", className: "" },
                { value: "0 1", className: "" },
                { value: "0 2", className: "" },
                { value: "0 3", className: "" },
                { value: "1 0", className: "" },
                { value: "2 0", className: "" },
                { value: "3 0", className: "" },
            ],
        };

        mockComputer = {
            board: {
                receiveAttack: jest.fn().mockReturnValue(1),
                ships: [],
            },
            isLose: jest.fn(),
            play: true,
        };

        mockPos = {
            value: "0 0",
            className: "case",
        };

        mockPlayer = {
            board: {
                receiveAttack: jest.fn().mockReturnValue(2),
                findShipHit: jest.fn(),
            },
            gridDOM: {
                children: [
                    null,
                    {
                        children: [
                            { value: "0 0", className: "" },
                            { value: "0 1", className: "" },
                            { value: "0 2", className: "" },
                            { value: "0 3", className: "" },
                            { value: "1 0", className: "" },
                            { value: "2 0", className: "" },
                            { value: "3 0", className: "" },
                        ],
                    },
                ],
            },
            shipsTouch: [],
            isLose: jest.fn(),
        };
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should return false when pos doesn't exist", () => {
        expect(roundPlayer(mockGrid, mockComputer, null, mockPlayer)).toBe(false);
    });

    it("should do nothing (return true but skip logic) when attack is invalid", () => {
        mockComputer.board.receiveAttack.mockReturnValue(0);

        const result = roundPlayer(mockGrid, mockComputer, mockPos, mockPlayer);

        expect(mockComputer.board.receiveAttack).toHaveBeenCalled();
        expect(mockComputer.isLose).not.toHaveBeenCalled();
        expect(mockPlayer.board.receiveAttack).not.toHaveBeenCalled();
        expect(mockGrid.style.cursor).toBe("pointer");
        expect(result).toBe(true);
    });

    it("should update the grid cursor and run the computer's round when attack is successful and player is not losing", () => {
        mockComputer.isLose.mockReturnValue(false);
        mockPlayer.isLose.mockReturnValue(false);

        roundPlayer(mockGrid, mockComputer, mockPos, mockPlayer);

        expect(mockGrid.style.cursor).toBe("pointer");
        expect(mockPlayer.board.receiveAttack).toHaveBeenCalled();
        expect(mockComputer.play).toBe(true);
        expect(mockPlayer.isLose).toHaveBeenCalled();
    });

    it("should update the grid cursor and display win message when attack is successful and computer is losing", () => {
    mockComputer.isLose.mockReturnValue(true);
    mockPlayer.isLose.mockReturnValue(false);

    const fakeContent = document.createElement("div");
    document.getElementById = jest.fn().mockReturnValue(fakeContent);

    roundPlayer(mockGrid, mockComputer, mockPos, mockPlayer);

    expect(mockGrid.style.cursor).toBe("auto");
    expect(mockComputer.play).toBe(false);
    expect(document.getElementById).toHaveBeenCalledWith("content");
    expect(fakeContent.innerHTML).toContain("WIN !!!");
});

    it("should update the grid cursor and display lose message when attack is successful and player is losing", () => {
        mockComputer.isLose.mockReturnValue(false);
        mockPlayer.isLose.mockReturnValue(true);

        const fakeContent = document.createElement("div");
        document.getElementById = jest.fn().mockReturnValue(fakeContent);

        roundPlayer(mockGrid, mockComputer, mockPos, mockPlayer);

        expect(mockGrid.style.cursor).toBe("auto");
        expect(mockComputer.play).toBe(false);
        expect(document.getElementById).toHaveBeenCalledWith("content");
        expect(fakeContent.innerHTML).toContain("LOSS !!!");
    });
});