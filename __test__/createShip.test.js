import { createShip, createCoor, verifCollideShip } from "../src/functions/createShip.js";
import { Ship } from "../src/components/shipClass.js";


describe("createShip", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should find sens with a ship in (0, 0)", () => {
        jest.spyOn(Math, 'random')
            .mockImplementationOnce(() => 0)
            .mockImplementationOnce(() => 0)
            .mockImplementationOnce(() => 0.3);

        const coors = createCoor(1);
        expect(coors).toEqual([[0, 0], [1, 0]]);
    });

    it("should find sens with a ship in (11, 0)", () => {
        jest.spyOn(Math, 'random')
            .mockImplementationOnce(() => 0)
            .mockImplementationOnce(() => 0.92)
            .mockImplementationOnce(() => 0.2);

        const coors = createCoor(1);
        expect(coors).toEqual([[0, 11], [0, 10]]);
    });

    it("should find sens with a ship in (11, 11)", () => {
        jest.spyOn(Math, 'random')
            .mockImplementationOnce(() => 0.92)
            .mockImplementationOnce(() => 0.92)
            .mockImplementationOnce(() => 0.9);

        const coors = createCoor(1);
        expect(coors).toEqual([[11, 11], [10, 11]]);
    });

    describe("createShip", () => {
        it("should not detect collision", () => {
            const ships = createShip();
            const ship1 = ships[0];

            const result = verifCollideShip([2, 0], [3, 0], ships);
            expect(result).toBe(false);
        });

        it("should detect collision with while loop", () => {
            const ship1 = new Ship(2, [0, 0], [1, 0]);
            const ships = [ship1];

            const result = verifCollideShip([0, 0], [1, 0], ships);
            expect(result).toBe(true);
        });
    });
});
