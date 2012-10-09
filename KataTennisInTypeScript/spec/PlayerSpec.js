describe("Player", function () {
    var luck = new Luck();
    var player = new Player("Player1", luck);
    it("should call luck when playing", function () {
        spyOn(luck, "Do").andCallThrough();
        var result = player.Play();
        expect(luck.Do).toHaveBeenCalled();
    });
    it("should play returning a number between 0 and 100", function () {
        var result = player.Play();
        expect(result).toBeLessThan(100);
        expect(result).toBeGreaterThan(0);
    });
});
//@ sourceMappingURL=PlayerSpec.js.map
