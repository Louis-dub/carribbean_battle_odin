import { Ship } from "../src/components/shipClass.js";

const s1 = new Ship(3, [0, 0], [0, 2]);
const s2 = new Ship(4, [8, 5], [4, 5]);

test("Hit ship s1", () => {
    expect(s1.hit([0, 1])).toBe(true);
    expect(s1.numHit).toBe(1);
});

test("Miss ship s1", () => {
    expect(s1.hit([0, 3])).toBe(false);
    expect(s1.numHit).toBe(1);
});

test("Hit ship s2", () => {
    expect(s2.hit([6, 5])).toBe(true);
    expect(s2.numHit).toBe(1);
});

test("Miss ship s2", () => {
    expect(s2.hit([3, 4])).toBe(false);
    expect(s2.numHit).toBe(1);
});
