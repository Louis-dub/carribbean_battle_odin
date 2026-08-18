import { createShip, createCoor, verifCollideShip } from "../src/functions/createShip.js";
import { Ship } from "../src/components/shipClass.js";

describe("createCoor", () => {
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

    it("should succeed immediately when the y-increasing direction (case 1) is free", () => {
        jest.spyOn(Math, 'random')
            .mockImplementationOnce(() => 0.45) // p1[0] -> 5
            .mockImplementationOnce(() => 0.45) // p1[1] -> 5
            .mockImplementationOnce(() => 0.1);  // sens -> 1 (case 1)

        const coors = createCoor(1);
        expect(coors).toEqual([[5, 5], [5, 6]]);
    });
});

describe("verifCollideShip", () => {
    it("should detect a collision when the ship occupies the end point of the path (x increasing)", () => {
        const ship = new Ship(1, [2, 0], [2, 0]);

        expect(verifCollideShip([0, 0], [2, 0], [ship])).toBe(true);
    });

    it("should not detect a collision for a cell one step past the end point (x increasing)", () => {
        const ship = new Ship(1, [3, 0], [3, 0]);

        expect(verifCollideShip([0, 0], [2, 0], [ship])).toBe(false);
    });

    it("should detect a collision when the ship occupies the end point of the path (y increasing)", () => {
        const ship = new Ship(1, [0, 2], [0, 2]);

        expect(verifCollideShip([0, 0], [0, 2], [ship])).toBe(true);
    });

    it("should not detect a collision for a cell one step past the end point (y increasing)", () => {
        const ship = new Ship(1, [0, 3], [0, 3]);

        expect(verifCollideShip([0, 0], [0, 2], [ship])).toBe(false);
    });

    it("should detect a collision when the ship occupies the end point of the path (x decreasing)", () => {
        const ship = new Ship(1, [0, 0], [0, 0]);

        expect(verifCollideShip([2, 0], [0, 0], [ship])).toBe(true);
    });

    it("should not detect a collision for a cell one step past the end point (x decreasing)", () => {
        const ship = new Ship(1, [-1, 0], [-1, 0]);

        // out of board bounds on purpose: only checking that the walk stops before reaching it
        expect(verifCollideShip([2, 0], [0, 0], [ship])).toBe(false);
    });

    it("should detect a collision when the ship occupies the end point of the path (y decreasing, default direction)", () => {
        const ship = new Ship(1, [0, 0], [0, 0]);

        expect(verifCollideShip([0, 2], [0, 0], [ship])).toBe(true);
    });

    it("should not detect a collision for a cell one step past the end point (y decreasing, default direction)", () => {
        const ship = new Ship(1, [0, -1], [0, -1]);

        // out of board bounds on purpose: only checking that the walk stops before reaching it
        expect(verifCollideShip([0, 2], [0, 0], [ship])).toBe(false);
    });

    it("should return false when no ship lies on the path", () => {
        const ship = new Ship(1, [10, 10], [10, 10]);

        expect(verifCollideShip([0, 0], [2, 0], [ship])).toBe(false);
    });

    it("should detect a collision even when it's not the first ship in the list", () => {
        const farShip = new Ship(1, [10, 10], [10, 10]);
        const blockingShip = new Ship(1, [1, 0], [1, 0]);

        expect(verifCollideShip([0, 0], [2, 0], [farShip, blockingShip])).toBe(true);
    });
});

describe("createShip", () => {
    it("should create 5 ships with lengths 2 through 6, in order", () => {
        const ships = createShip();

        expect(ships).toHaveLength(5);
        expect(ships.map(s => s.length)).toEqual([2, 3, 4, 5, 6]);
    });

    it("should never place two ships so that they collide", () => {
        // Run several times since placement is randomized; the collision-avoidance
        // loop inside createShip is expected to hold this invariant every time.
        for (let run = 0; run < 15; run++) {
            const ships = createShip();

            ships.forEach((ship, index) => {
                const otherShips = ships.filter((_, i) => i !== index);
                expect(verifCollideShip(ship.coor[0], ship.coor[1], otherShips)).toBe(false);
            });
        }
    });
});