describe("Match", function () {
    var playerOneLuck;
    var playerTwoLuck;
    var player1;
    var player2;
    beforeEach(function () {
        playerOneLuck = new Luck();
        playerTwoLuck = new Luck();
        player1 = new Player(playerOneLuck);
        player2 = new Player(playerTwoLuck);
    });
    it("should need two Players to create a match", function () {
        var player = new Player(null);
        var match = new Match(player, player);
        expect(match.player1).toBe(player);
        expect(match.player2).toBe(player);
    });
    it("should need throw if one of two players are null", function () {
        var firstParameterIsNull = function () {
            return new Match(null, new Player(null));
        };
        var secondParameterIsNull = function () {
            return new Match(new Player(null), null);
        };
        expect(firstParameterIsNull).toThrow("Player1 Is Required");
        expect(secondParameterIsNull).toThrow("Player2 Is Required");
    });
    it("should give 15 poins on First move only to the player with greater luck", function () {
        spyOn(playerOneLuck, "Do").andReturn(10);
        spyOn(playerTwoLuck, "Do").andReturn(25);
        var match = new Match(player1, player2);
        match.PlayRound();
        expect(playerOneLuck.Do).toHaveBeenCalled();
        expect(playerTwoLuck.Do).toHaveBeenCalled();
        expect(match.player2Score).toBe(15);
        expect(match.player1Score).toBe(0);
    });
    it("should replay until some players gets greater luck", function () {
        SetupFakeLuckDoCall(playerOneLuck, 10, 15, 10);
        SetupFakeLuckDoCall(playerTwoLuck, 10, 15, 25);
        var match = new Match(player1, player2);
        match.PlayRound();
        expect(GetNumberOfCalls(playerOneLuck.Do)).toEqual(11);
        expect(GetNumberOfCalls(playerTwoLuck.Do)).toEqual(11);
        expect(match.player2Score).toBe(15);
        expect(match.player1Score).toBe(0);
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
