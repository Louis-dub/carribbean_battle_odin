jest.mock("../src/styles.css", () => ({}), { virtual: true });
jest.mock("../src/images/logo_battleship.png", () => "logo-url", { virtual: true });

jest.mock("../src/placeShip.js", () => ({
    placeShip: global.document.createElement("div"),
}));

jest.mock("../src/backgroud/index.js", () => ({
    initBackground: jest.fn(() => ({ mock: "controller" })),
}));

describe("index.js", () => {
    beforeEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
        document.body.innerHTML = `
            <img id="img-logo" />
            <div id="content"></div>
        `;
    });

    it("should append placeShip into #content and initialize the background", () => {
        const { placeShip } = require("../src/placeShip.js");
        const { initBackground } = require("../src/backgroud/index.js");

        require("../src/index.js");

        expect(document.getElementById("content").contains(placeShip)).toBe(true);
        expect(initBackground).toHaveBeenCalledWith("pirate-bg", { particleCount: 46 });
    });

    it("should set the logo src and add a favicon link once DOMContentLoaded fires", () => {
        require("../src/index.js");

        document.dispatchEvent(new Event("DOMContentLoaded"));

        expect(document.getElementById("img-logo").src).toContain("logo-url");
        const faviconLink = document.head.querySelector("link[rel='icon']");
        expect(faviconLink).not.toBeNull();
        expect(faviconLink.type).toBe("image/png");
    });

    it("should not throw and should still add the favicon link when #img-logo is missing", () => {
        document.body.innerHTML = `<div id="content"></div>`;

        require("../src/index.js");

        expect(() => document.dispatchEvent(new Event("DOMContentLoaded"))).not.toThrow();
        expect(document.head.querySelector("link[rel='icon']")).not.toBeNull();
    });
});