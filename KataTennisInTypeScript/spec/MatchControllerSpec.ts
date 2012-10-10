/// <reference path="../lib/jasmine.d.ts" />
/// <reference path="../src/MatchController.ts" />
/// <reference path="../src/Player.ts" />
/// <reference path="../src/Match.ts" />
/// <reference path="../src/Luck.ts" />

describe("MatchController", () => {
    var player1luck: Luck;
    var player2luck: Luck;
    var player1: Player;
    var player2: Player;
    var scoreBoard: Scoreboard;
    var match: Match;


    beforeEach(() => {
        player1luck = new Luck();
        player2luck = new Luck();
        player1 = new Player("Player 1", player1luck);
        player2 = new Player("Player 2", player2luck);
        scoreBoard = new Scoreboard();
        match = new Match(player1, player2, scoreBoard);
    });

    it("should  run a match until a player wins", () => {

        var matchController = new MatchController(match);

        var winner = matchController.Start();

        expect(winner).not.toBeNull();
        expect(winner.name).toBeDefined();
    });

    it("should notify when a player scores", () => {
        
        var player1Chance = [1, 0, 1, 0, 1, 0, 1, 0, 0, 0];
        var player2Chance = [0, 1, 0, 1, 0, 1, 0, 1, 1, 1];

        var player1Round = 0;
        var player2Round = 0;

        spyOn(player1luck, "Do").andCallFake(() => {
            var chance = player1Chance[player1Round];

            player1Round++;

            return chance;
        });

        spyOn(player2luck, "Do").andCallFake(() => {
            var chance = player2Chance[player2Round];

            player2Round++;

            return chance;
        });

        var expectedMessages = new Array("Player 1 scores 15", "Player 2 scores 15", "Player 1 scores 30", 
                                         "Player 2 scores 30", "Player 1 scores 40", "Player 2 scores 40", 
                                         "Player 1 gains advantage", "Player 1 loses advantage", 
                                         "Player 2 gains advantage", "Player 2 wins");
        var messages = new Array();
        var matchController = new MatchController(match);

        spyOn(matchController, "onScoring").andCallFake((s : string) => { 
            messages.push(s);
        });;
        
        matchController.Start();

        expect(matchController.onScoring).toHaveBeenCalled();
        expect(messages).toEqual(expectedMessages);
    });

});