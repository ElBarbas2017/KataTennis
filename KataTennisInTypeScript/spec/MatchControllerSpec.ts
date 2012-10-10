/// <reference path="../lib/jasmine.d.ts" />
/// <reference path="../src/MatchController.ts" />
/// <reference path="../src/Player.ts" />
/// <reference path="../src/Match.ts" />
/// <reference path="../src/Luck.ts" />

describe("MatchController", () => {

    it("should  run a match until a player wins", () => {

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

    it("should notify when a player scores", () => {

    });

});