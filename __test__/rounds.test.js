import { GameBoard } from "../src/components/gameBoardClass.js";
import { computerRound, roundPlayer } from "../src/functions/rounds.js";

describe("computerRound", () => {
    it("should update the class of the attacked cell based on a miss attack", () => {
        const mockPlayer = {
            board: {
                receiveAttack: jest.fn().mockImplementation((x, y) => {
                    return 2;
                }),
                ships: []
            },
            gridDOM: {
                children: [
                    null,
                    {
                        children: [
                            { value: "0 0", className: ""},
                            { value: "0 1", className: ""},
                            { value: "0 2", className: ""},
                            { value: "0 3", className: ""},
                            { value: "1 0", className: ""},
                            { value: "2 0", className: ""},
                            { value: "3 0", className: ""}
                        ]
                    }
                ]
            }
        };
        jest.spyOn(Math, "random").mockReturnValue(0);
        computerRound(mockPlayer);

        const hit = mockPlayer.gridDOM.children[1].children.find(c => c.value === "0 0");
        expect(hit.className).toBe("case miss");
    });

    it("should update the class of the attacked cell based on the attack result", () => {
        let callCount = 0;
        const mockPlayer = {
            board: {
                receiveAttack: jest.fn().mockImplementation((x, y) => {
                    callCount++;
                    return callCount < 3 ? 0 : 1;
                }),
                ships: []
            },
            gridDOM: {
                children: [
                    null,
                    {
                        children: [
                            { value: "0 0", className: ""},
                            { value: "0 1", className: ""},
                            { value: "0 2", className: ""},
                            { value: "0 3", className: ""},
                            { value: "1 0", className: ""},
                            { value: "2 0", className: ""},
                            { value: "3 0", className: ""}
                        ]
                    }
                ]
            }
        };
        jest.spyOn(Math, "random").mockReturnValue(0);
        computerRound(mockPlayer);

        const hit = mockPlayer.gridDOM.children[1].children.find(c => c.value === "0 0");
        expect(hit.className).toBe("case sunk");
    });
});

describe("roundPlayer", () => {
    let mockGrid, mockComputer, mockPos, mockPlayer;

    beforeEach(() => {
        jest.clearAllMocks();

        mockGrid = {
            style: { cursor: 'pointer' },
            children: [
                { value: "0 0", className: ""},
                { value: "0 1", className: ""},
                { value: "0 2", className: ""},
                { value: "0 3", className: ""},
                { value: "1 0", className: ""},
                { value: "2 0", className: ""},
                { value: "3 0", className: ""}
            ]
        };

        mockComputer = {
            board: {
                receiveAttack: jest.fn().mockImplementation((x, y) => {
                    return 1;
                }),
                ships: []
            },
            isLose: jest.fn(),
            play: true
        };

        mockPos = {
            value: "0 0",
            className: "case"
        };

        mockPlayer = {
            board: {
                receiveAttack: jest.fn().mockImplementation((x, y) => {
                    return 1;
                }),
                ships: []
            },
            gridDOM: {
                children: [
                    null,
                    {
                        children: [
                            { value: "0 0", className: ""},
                            { value: "0 1", className: ""},
                            { value: "0 2", className: ""},
                            { value: "0 3", className: ""},
                            { value: "1 0", className: ""},
                            { value: "2 0", className: ""},
                            { value: "3 0", className: ""}
                        ]
                    }
                ]
            },
            isLose: jest.fn()
        };
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
        expect(mockGrid.style.cursor).toBe('pointer');
        expect(result).toBe(true);
    });

    it("should update the grid cursor and call computerRound when attack is successful and player is not losing", () => {
        mockComputer.isLose.mockReturnValue(false);
        mockPlayer.isLose.mockReturnValue(false);

        roundPlayer(mockGrid, mockComputer, mockPos, mockPlayer);

        expect(mockGrid.style.cursor).toBe('pointer');
        expect(mockPlayer.board.receiveAttack).toHaveBeenCalled();
        expect(mockComputer.play).toBe(true);
        expect(mockPlayer.isLose).toHaveBeenCalled();
    });

    it("should update the grid cursor and display win message when attack is successful and computer is losing", () => {
        mockComputer.isLose.mockReturnValue(true);
        mockPlayer.isLose.mockReturnValue(false);

        document.getElementById = jest.fn().mockReturnValue({
            innerHTML: ''
        });

        roundPlayer(mockGrid, mockComputer, mockPos, mockPlayer);

        expect(mockGrid.style.cursor).toBe('auto');
        expect(mockComputer.play).toBe(false);
        expect(document.getElementById).toHaveBeenCalledWith('content');
        expect(document.getElementById('content').innerHTML).toContain('You win !!!');
    });

    it("should update the grid cursor and display lose message when attack is successful and player is losing", () => {
        mockComputer.isLose.mockReturnValue(false);
        mockPlayer.isLose.mockReturnValue(true);

        document.getElementById = jest.fn().mockReturnValue({
            innerHTML: ''
        });

        roundPlayer(mockGrid, mockComputer, mockPos, mockPlayer);

        expect(mockGrid.style.cursor).toBe('auto');
        expect(mockComputer.play).toBe(false);
        expect(document.getElementById).toHaveBeenCalledWith('content');
        expect(document.getElementById('content').innerHTML).toContain('You Lose !!!');
    });
});
