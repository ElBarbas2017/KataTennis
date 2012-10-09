/// <reference path="../lib/jasmine.d.ts" />
/// <reference path="../src/Player.ts" />
/// <reference path="../src/Luck.ts" />
describe("Player", () => {

    var luck = new Luck();
    var player = new Player("Player1", luck);

    it("should call luck when playing", () => {
        spyOn(luck, "Do").andCallThrough();

        var result = player.Play();

        expect(luck.Do).toHaveBeenCalled();
    });

    it("should play returning a number between 0 and 100", () => {
        var result = player.Play();

        expect(result).toBeLessThan(100);
        expect(result).toBeGreaterThan(0);
    });


});