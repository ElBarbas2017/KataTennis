describe("Match", function () {
    var playerOneLuck;
    var playerTwoLuck;
    var player1;
    var player2;
    var scoreBoard;
    var match;
    beforeEach(function () {
        playerOneLuck = new Luck();
        playerTwoLuck = new Luck();
        player1 = new Player("Player1", playerOneLuck);
        player2 = new Player("Player2", playerTwoLuck);
        scoreBoard = new Scoreboard();
        match = new Match(player1, player2, scoreBoard);
    });
    it("should need two Players to create a match", function () {
        var player = new Player("null", null);
        var twoPlayerMatch = new Match(player, player, scoreBoard);
        expect(twoPlayerMatch.player1).toBe(player);
        expect(twoPlayerMatch.player2).toBe(player);
    });
    it("should need throw if one of two players are null", function () {
        var firstParameterIsNull = function () {
            return new Match(null, new Player("Player2", null), null);
        };
        var secondParameterIsNull = function () {
            return new Match(new Player("Player1", null), null, null);
        };
        expect(firstParameterIsNull).toThrow("Player1 Is Required");
        expect(secondParameterIsNull).toThrow("Player2 Is Required");
    });
    it("should give 15 poins on First move only to the player with greater luck", function () {
        spyOn(playerOneLuck, "Do").andReturn(10);
        spyOn(playerTwoLuck, "Do").andReturn(25);
        match.PlayRound();
        expect(playerOneLuck.Do).toHaveBeenCalled();
        expect(playerTwoLuck.Do).toHaveBeenCalled();
        expect(match.scoreboard.player2Score).toBe(15);
        expect(match.scoreboard.player1Score).toBe(0);
    });
    it("should replay until some players gets greater luck", function () {
        SetupFakeLuckDoCall(playerOneLuck, 10, 15, 10);
        SetupFakeLuckDoCall(playerTwoLuck, 10, 15, 25);
        match.PlayRound();
        expect(GetNumberOfCalls(playerOneLuck.Do)).toEqual(11);
        expect(GetNumberOfCalls(playerTwoLuck.Do)).toEqual(11);
        expect(match.scoreboard.player2Score).toBe(15);
        expect(match.scoreboard.player1Score).toBe(0);
    });
    it("should gave players score in order 15 - 30 - 40", function () {
        spyOn(playerOneLuck, "Do").andReturn(25);
        spyOn(playerTwoLuck, "Do").andReturn(10);
        match.PlayRound();
        expect(match.scoreboard.player1Score).toBe(15);
        match.PlayRound();
        expect(match.scoreboard.player1Score).toBe(30);
        match.PlayRound();
        expect(match.scoreboard.player1Score).toBe(40);
    });
    it("should be winned by first player scoring after reaching 40", function () {
        spyOn(playerOneLuck, "Do").andReturn(25);
        spyOn(playerTwoLuck, "Do").andReturn(10);
        var winnerPlayer;
        spyOn(match, "onWin").andCallFake(function (p) {
            winnerPlayer = p;
        });
        match.scoreboard.player1Score = 40;
        match.PlayRound();
        expect(match.onWin).toHaveBeenCalled();
        expect(winnerPlayer).toBe(player1);
    });
    xit("should gave a player advantage if both players score is 40", function () {
        spyOn(playerOneLuck, "Do").andReturn(10);
        spyOn(playerTwoLuck, "Do").andReturn(15);
        match.PlayRound();
    });
    function SetupFakeLuckDoCall(luck, maxCalls, resultInRange, resultOutOfRange) {
        var callCount = 0;
        spyOn(luck, "Do").andCallFake(function () {
            if(callCount < maxCalls) {
                callCount++;
                return resultInRange;
            } else {
                return resultOutOfRange;
            }
        });
    }
    function GetNumberOfCalls(method) {
        return method.calls.length;
    }
});
//@ sourceMappingURL=MatchSpec.js.map
