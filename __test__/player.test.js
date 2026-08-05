import { Player, Computer } from "../src/components/playerClass.js";

const  player = new Player();
const computer = new Computer();

test("Player title", () => {
    const title = player.gridDOM.children[0];

    expect(title.tagName).toBe('H1');
    expect(title.textContent).toBe("Your Fleet");
})

test("Player title", () => {
    const title = computer.gridDOM.children[0];

    expect(title.tagName).toBe('H1');
    expect(title.textContent).toBe("Enemy Fleet");
})

test("player grid", () => {
    const grid = player.gridDOM.children[1];

    expect(grid.tagName).toBe('DIV');
    expect(grid.id).toBe('grid-player');
    expect(grid.children.length).toBe(144);
    expect(grid.children[30].tagName).toBe('DIV');
    expect(grid.children[30].value).toBe('2 6');
});

test("computer grid", () => {
    const grid = computer.gridDOM.children[1];

    expect(grid.tagName).toBe('DIV');
    expect(grid.id).toBe('grid-computer');
    expect(grid.children.length).toBe(144);
    expect(grid.children[30].tagName).toBe('DIV');
    expect(grid.children[30].value).toBe('2 6');
});