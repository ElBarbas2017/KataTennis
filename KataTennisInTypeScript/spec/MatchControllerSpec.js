describe("MatchController", function () {
    var player1luck;
    var player2luck;
    var player1;
    var player2;
    var scoreBoard;
    var match;
    beforeEach(function () {
        player1luck = new Luck();
        player2luck = new Luck();
        player1 = new Player("Player 1", player1luck);
        player2 = new Player("Player 2", player2luck);
        scoreBoard = new Scoreboard();
        match = new Match(player1, player2, scoreBoard);
    });
    it("should  run a match until a player wins", function () {
        var matchController = new MatchController(match);
        var winner = matchController.Start();
        expect(winner).not.toBeNull();
        expect(winner.name).toBeDefined();
    });
    it("should notify when a player scores", function () {
        var player1Chance = [
            1, 
            0, 
            1, 
            0, 
            1, 
            0, 
            1, 
            0, 
            0, 
            0
        ];
        var player2Chance = [
            0, 
            1, 
            0, 
            1, 
            0, 
            1, 
            0, 
            1, 
            1, 
            1
        ];
        var player1Round = 0;
        var player2Round = 0;
        spyOn(player1luck, "Do").andCallFake(function () {
            var chance = player1Chance[player1Round];
            player1Round++;
            return chance;
        });
        spyOn(player2luck, "Do").andCallFake(function () {
            var chance = player2Chance[player2Round];
            player2Round++;
            return chance;
        });
        var expectedMessages = new Array("Player 1 scores 15", "Player 2 scores 15", "Player 1 scores 30", "Player 2 scores 30", "Player 1 scores 40", "Player 2 scores 40", "Player 1 gains advantage", "Player 1 loses advantage", "Player 2 gains advantage", "Player 2 wins");
        var messages = new Array();
        var matchController = new MatchController(match);
        spyOn(matchController, "onScoring").andCallFake(function (s) {
            messages.push(s);
        });
        ; ;
        matchController.Start();
        expect(matchController.onScoring).toHaveBeenCalled();
        expect(messages).toEqual(expectedMessages);
    });
});
//@ sourceMappingURL=MatchControllerSpec.js.map
