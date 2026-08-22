import { rotateShip, moveShip } from "../src/functions/moveShip.js";
import { isValidCase } from "../src/functions/computerRound.js";

jest.mock("../src/functions/computerRound.js", () => ({
    isValidCase: jest.fn(),
}));

describe("rotateShip", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should rotate a horizontal ship to vertical and pivot its origin when all cases are valid", () => {
        isValidCase.mockReturnValue(true);

        const result = rotateShip(4, [5, 5], [0, 1]);

        expect(result.dir).toEqual([1, 0]);
        expect(result.ogP).toEqual([4, 6]);
    });

    it("should rotate a vertical ship to horizontal and pivot its origin when all cases are valid", () => {
        isValidCase.mockReturnValue(true);

        const result = rotateShip(4, [5, 5], [1, 0]);

        expect(result.dir).toEqual([0, 1]);
        expect(result.ogP).toEqual([6, 4]);
    });

    it("should shift the origin forward while the pivoted starting case is off the board", () => {
        isValidCase
            .mockReturnValueOnce(false)
            .mockReturnValue(true);

        const result = rotateShip(4, [0, 5], [0, 1]);

        expect(result.dir).toEqual([1, 0]);
        expect(result.ogP).toEqual([0, 6]);
    });

    it("should shift the origin backward while the far end of a vertical ship is off the board", () => {
        isValidCase.mockImplementation((x) => x <= 10);

        const result = rotateShip(4, [10, 5], [0, 1]);

        expect(result.dir).toEqual([1, 0]);
        expect(result.ogP).toEqual([7, 6]);
    });

    it("should shift the origin backward while the far end of a horizontal ship is off the board", () => {
        isValidCase.mockImplementation((x, y) => y <= 10);

        const result = rotateShip(4, [5, 10], [1, 0]);

        expect(result.dir).toEqual([0, 1]);
        expect(result.ogP).toEqual([6, 7]);
    });
});

describe("moveShip", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should move up when the target case is valid", () => {
        isValidCase.mockReturnValue(true);

        const result = moveShip({ key: "ArrowUp" }, 3, [5, 5], [0, 1]);

        expect(isValidCase).toHaveBeenCalledWith(4, 5);
        expect(result).toEqual([4, 5]);
    });

    it("should not move up when the target case is invalid", () => {
        isValidCase.mockReturnValue(false);

        const result = moveShip({ key: "ArrowUp" }, 3, [5, 5], [0, 1]);

        expect(result).toEqual([5, 5]);
    });

    it("should move right and check the ship's far end when oriented horizontally", () => {
        isValidCase.mockReturnValue(true);

        const result = moveShip({ key: "ArrowRight" }, 3, [5, 5], [0, 1]);

        expect(isValidCase).toHaveBeenCalledWith(5, 8);
        expect(result).toEqual([5, 6]);
    });

    it("should move right and check only the target case when oriented vertically", () => {
        isValidCase.mockReturnValue(true);

        const result = moveShip({ key: "ArrowRight" }, 3, [5, 5], [1, 0]);

        expect(isValidCase).toHaveBeenCalledWith(5, 6);
        expect(result).toEqual([5, 6]);
    });

    it("should move down and check the ship's far end when oriented vertically", () => {
        isValidCase.mockReturnValue(true);

        const result = moveShip({ key: "ArrowDown" }, 3, [5, 5], [1, 0]);

        expect(isValidCase).toHaveBeenCalledWith(8, 5);
        expect(result).toEqual([6, 5]);
    });

    it("should move down and check only the target case when oriented horizontally", () => {
        isValidCase.mockReturnValue(true);

        const result = moveShip({ key: "ArrowDown" }, 3, [5, 5], [0, 1]);

        expect(isValidCase).toHaveBeenCalledWith(6, 5);
        expect(result).toEqual([6, 5]);
    });

    it("should move left when the target case is valid", () => {
        isValidCase.mockReturnValue(true);

        const result = moveShip({ key: "ArrowLeft" }, 3, [5, 5], [0, 1]);

        expect(isValidCase).toHaveBeenCalledWith(5, 4);
        expect(result).toEqual([5, 4]);
    });

    it("should return the position unchanged and skip validation for any other key", () => {
        const result = moveShip({ key: "Enter" }, 3, [5, 5], [0, 1]);

        expect(isValidCase).not.toHaveBeenCalled();
        expect(result).toEqual([5, 5]);
    });
});