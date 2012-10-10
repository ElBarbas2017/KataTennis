describe("MatchController", function () {
    it("should  run a match until a player wins", function () {
        var luck = new Luck();
        var player1 = new Player("Player1", luck);
        var player2 = new Player("Player2", luck);
        var scoreBoard = new Scoreboard();
        var match = new Match(player1, player2, scoreBoard);
        var matchController = new MatchController(match);
        var winner = matchController.Start();
        expect(winner).not.toBeNull();
        expect(winner.name).toBeDefined();
    });
    it("should notify when a player scores", function () {
    });
});
//@ sourceMappingURL=MatchControllerSpec.js.map
