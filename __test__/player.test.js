import { Player, Computer } from "../src/components/playerClass.js";

const  player = new Player();
const computer = new Computer();

test("player grid", () => {
    expect(player.gridDOM.tagName).toBe('DIV');
    expect(player.gridDOM.id).toBe('grid-player');
    expect(player.gridDOM.children.length).toBe(144);
    expect(player.gridDOM.children[30].tagName).toBe('DIV');
    expect(player.gridDOM.children[30].value).toBe('2 6');
});

test("computer grid", () => {
    expect(computer.gridDOM.tagName).toBe('DIV');
    expect(computer.gridDOM.id).toBe('grid-computer');
    expect(computer.gridDOM.children.length).toBe(144);
    expect(computer.gridDOM.children[30].tagName).toBe('DIV');
    expect(computer.gridDOM.children[30].value).toBe('2 6');
});