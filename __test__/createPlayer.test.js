import { launchGame } from "../src/functions/createPlayer.js";
import { Player } from "../src/components/playerClass.js";
import { createGrid } from "../src/functions/createGridDOM.js";
import { changeColourShip } from "../src/functions/changeColourShip.js";

jest.mock("../src/components/playerClass.js");
jest.mock("../src/functions/createGridDOM.js");
jest.mock("../src/functions/changeColourShip.js");

function buildFakeGridDOM() {
    const root = document.createElement("div");
    root.appendChild(document.createElement("div"));
    const second = document.createElement("div");
    second.appendChild(document.createElement("div"));
    root.appendChild(second);
    return root;
}

describe("launchGame", () => {
    let contentDiv;

    beforeEach(() => {
        jest.clearAllMocks();
        document.body.innerHTML = "";
        contentDiv = document.createElement("div");
        contentDiv.id = "content";
        document.body.appendChild(contentDiv);

        Player.mockImplementation((type, name) => ({
            type,
            name,
            board: {},
            gridDOM: buildFakeGridDOM(),
        }));

        createGrid.mockImplementation((player) => {
            player.gridDOM = buildFakeGridDOM();
        });
    });

    it("should create a player and a computer with the correct labels", () => {
        launchGame([]);

        expect(Player).toHaveBeenCalledWith("player", "Your Fleet");
        expect(Player).toHaveBeenCalledWith("computer", "Enemy Fleet");
    });

    it("should build both grids and append them inside a .grids container in #content", () => {
        launchGame([]);

        expect(createGrid).toHaveBeenCalledTimes(2);
        const grids = contentDiv.querySelector(".grids");
        expect(grids).not.toBeNull();
        expect(grids.children).toHaveLength(2);
    });

    it("should copy the ships array into player.board.ships without keeping the same reference", () => {
        const ships = [{ id: 1 }];
        let capturedPlayer;
        Player.mockImplementationOnce((type, name) => {
            capturedPlayer = { type, name, board: {}, gridDOM: buildFakeGridDOM() };
            return capturedPlayer;
        });

        launchGame(ships);

        expect(capturedPlayer.board.ships).toEqual(ships);
        expect(capturedPlayer.board.ships).not.toBe(ships);
    });

    it("should call changeColourShip once per ship placed by the player", () => {
        const ships = [{ id: 1 }, { id: 2 }, { id: 3 }];

        launchGame(ships);

        expect(changeColourShip).toHaveBeenCalledTimes(ships.length);
        ships.forEach(ship => {
            expect(changeColourShip).toHaveBeenCalledWith(expect.anything(), ship, "case ship-player");
        });
    });

    it("should clear any previous content before appending the new grids", () => {
        contentDiv.innerHTML = "<p>old content</p>";

        launchGame([]);

        expect(contentDiv.querySelector("p")).toBeNull();
        expect(contentDiv.querySelector(".grids")).not.toBeNull();
    });
});