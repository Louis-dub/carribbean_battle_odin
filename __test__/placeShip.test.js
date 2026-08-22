jest.mock("../src/components/shipClass.js", () => ({
    Ship: jest.fn().mockImplementation((len, ogP, p) => ({ len, ogP, p })),
}));
jest.mock("../src/functions/changeColourShip.js", () => ({
    changeColourShip: jest.fn(),
}));
jest.mock("../src/functions/createPlayer.js", () => ({
    launchGame: jest.fn(),
}));
jest.mock("../src/functions/createShip.js", () => ({
    verifCollideShip: jest.fn(),
}));
jest.mock("../src/functions/moveShip.js", () => ({
    moveShip: jest.fn((e, len, p, dir) => p),
    rotateShip: jest.fn((len, ogP, dir) => ({ ogP, dir })),
}));

function getCell(root, value) {
    return Array.from(root.querySelector(".grid-place").children)
        .find(c => c.value === value);
}

describe("placeShip.js", () => {
    let placeShip, Ship, changeColourShip, launchGame, verifCollideShip, moveShip, rotateShip;
    let selectShip, btnPlaceShip, btnLaunchGame, errorMessage;

    beforeEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
        window.alert = jest.fn();

        ({ Ship } = require("../src/components/shipClass.js"));
        ({ changeColourShip } = require("../src/functions/changeColourShip.js"));
        ({ launchGame } = require("../src/functions/createPlayer.js"));
        ({ verifCollideShip } = require("../src/functions/createShip.js"));
        ({ moveShip, rotateShip } = require("../src/functions/moveShip.js"));
        ({ placeShip } = require("../src/placeShip.js"));

        selectShip = placeShip.querySelector("select[name='ship']");
        btnPlaceShip = placeShip.querySelector(".btn-place-ship");
        btnLaunchGame = placeShip.querySelector(".launch-game");
        errorMessage = placeShip.querySelector(".error-message");

        verifCollideShip.mockReturnValue(false);
    });

    function selectValue(value) {
        selectShip.value = value;
        selectShip.dispatchEvent(new Event("change"));
    }

    it("should highlight the correct number of cells at the default position when a ship is selected", () => {
        selectValue("3");

        expect(getCell(placeShip, "0 0").className).toBe("case ship-player");
        expect(getCell(placeShip, "0 1").className).toBe("case ship-player");
        expect(getCell(placeShip, "0 2").className).toBe("case ship-player");
        expect(getCell(placeShip, "0 3").className).not.toBe("case ship-player");
    });

    it("should show an error and not place anything when clicking Place Ship without selecting", () => {
        btnPlaceShip.dispatchEvent(new Event("click"));

        expect(errorMessage.textContent).toBe("Select a Ship");
        expect(Ship).not.toHaveBeenCalled();
    });

    it("should place the ship and mark cells as touch when there is no collision", () => {
        selectValue("2");

        btnPlaceShip.dispatchEvent(new Event("click"));
        const [calledP1, calledP2] = verifCollideShip.mock.calls[0];

        expect(calledP1).toEqual([0, 0]);
        expect(calledP2).toEqual([0, 1]);
        expect(Ship).toHaveBeenCalledWith(2, [0, 0], [0, 1]);
        expect(changeColourShip).toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({ len: 2 }),
            "case touch"
        );
        expect(errorMessage.textContent).toBe("");
    });

    it("should show a collision error and not push a ship when verifCollideShip returns true", () => {
        verifCollideShip.mockReturnValue(true);
        selectValue("2");

        btnPlaceShip.dispatchEvent(new Event("click"));

        expect(errorMessage.textContent).toBe("You cannot place your ship here");
        expect(Ship).not.toHaveBeenCalled();
    });

    it("should reset the grid and skip re-placing when reselecting an already placed ship length", () => {
        selectValue("2");
        btnPlaceShip.dispatchEvent(new Event("click"));

        selectValue("2");

        expect(getCell(placeShip, "0 0").className).toBe("case");
        expect(getCell(placeShip, "0 1").className).toBe("case");
        expect(Ship).toHaveBeenCalledTimes(1);
    });

    it("should clear the placement state when deselecting the ship option", () => {
        selectValue("3");

        selectValue("");

        expect(getCell(placeShip, "0 0").className).toBe("case");

        btnPlaceShip.dispatchEvent(new Event("click"));
        expect(errorMessage.textContent).toBe("Select a Ship");
    });

    it("should rotate and move the ship on keydown, then place it at the updated position", () => {
        selectValue("2");
        rotateShip.mockReturnValue({ ogP: [2, 3], dir: [1, 0] });
        moveShip.mockImplementation((e, len, p, dir) => p);

        document.dispatchEvent(new KeyboardEvent("keydown", { key: "r" }));

        expect(rotateShip).toHaveBeenCalledWith(2, [0, 0], [0, 1]);
        expect(moveShip).toHaveBeenCalledWith(expect.any(KeyboardEvent), 2, [2, 3], [1, 0]);
        expect(getCell(placeShip, "2 3").className).toBe("case ship-player");
        expect(getCell(placeShip, "3 3").className).toBe("case ship-player");

        btnPlaceShip.dispatchEvent(new Event("click"));

        expect(Ship).toHaveBeenCalledWith(2, [2, 3], [3, 3]);
    });

    it("should alert instead of launching the game when not all ships are placed", () => {
        btnLaunchGame.dispatchEvent(new Event("click"));

        expect(window.alert).toHaveBeenCalledWith("Place all your ships");
        expect(launchGame).not.toHaveBeenCalled();
    });

    it("should launch the game with all placed ships once every ship type is placed", () => {
        [2, 3, 4, 5, 6].forEach(len => {
            selectValue(String(len));
            btnPlaceShip.dispatchEvent(new Event("click"));
        });

        btnLaunchGame.dispatchEvent(new Event("click"));

        expect(window.alert).not.toHaveBeenCalled();
        expect(launchGame).toHaveBeenCalledTimes(1);
        expect(launchGame).toHaveBeenCalledWith(expect.arrayContaining([
            expect.objectContaining({ len: 2 }),
            expect.objectContaining({ len: 3 }),
            expect.objectContaining({ len: 4 }),
            expect.objectContaining({ len: 5 }),
            expect.objectContaining({ len: 6 }),
        ]));
    });
});