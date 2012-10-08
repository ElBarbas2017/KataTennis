/// <reference path="../lib/jasmine.d.ts" />
/// <reference path="../src/Player.ts" />
/// <reference path="../src/Match.ts" />
/// <reference path="../src/Luck.ts" />

describe("Match", () => {
    var playerOneLuck : Luck;
    var playerTwoLuck : Luck;
    var player1 : Player;
    var player2 : Player;
    var scoreBoard : Scoreboard;
    var match: Match;

    beforeEach(() => {
        playerOneLuck = new Luck();
        playerTwoLuck = new Luck();

        player1 = new Player(playerOneLuck);
        player2 = new Player(playerTwoLuck);
        scoreBoard = new Scoreboard();
        match = new Match(player1, player2, scoreBoard);
    });

    it("should need two Players to create a match", () => {
        var player = new Player(null);
        
        var twoPlayerMatch = new Match(player, player, scoreBoard);

        expect(twoPlayerMatch.player1).toBe(player);
        expect(twoPlayerMatch.player2).toBe(player);
    });

    it("should need throw if one of two players are null", () => {
        
        var firstParameterIsNull = () => new Match(null, new Player(null), null);
        var secondParameterIsNull = () => new Match(new Player(null), null, null);

        expect(firstParameterIsNull).toThrow("Player1 Is Required");
        expect(secondParameterIsNull).toThrow("Player2 Is Required");
    });
    
    it("should give 15 poins on First move only to the player with greater luck", () => {

        spyOn(playerOneLuck, "Do").andReturn(10);
        spyOn(playerTwoLuck, "Do").andReturn(25);

        match.PlayRound();

        expect(playerOneLuck.Do).toHaveBeenCalled();
        expect(playerTwoLuck.Do).toHaveBeenCalled();

        expect(match.scoreboard.player2Score).toBe(15);
        expect(match.scoreboard.player1Score).toBe(0);
    });

    it("should replay until some players gets greater luck", () => {

        SetupFakeLuckDoCall(playerOneLuck, 10, 15, 10);
        SetupFakeLuckDoCall(playerTwoLuck, 10, 15, 25);

        match.PlayRound();

        expect(GetNumberOfCalls(playerOneLuck.Do)).toEqual(11);
        expect(GetNumberOfCalls(playerTwoLuck.Do)).toEqual(11);

        expect(match.scoreboard.player2Score).toBe(15);
        expect(match.scoreboard.player1Score).toBe(0);
    });

    it("should gave players score in order 15 - 30 - 40", () => {

        spyOn(playerOneLuck, "Do").andReturn(25);
        spyOn(playerTwoLuck, "Do").andReturn(10);

        match.PlayRound();
        expect(match.scoreboard.player1Score).toBe(15);
        
        match.PlayRound();
        expect(match.scoreboard.player1Score).toBe(30);

        match.PlayRound();
        expect(match.scoreboard.player1Score).toBe(40);
    });

    it("should be winned by first player scoring after reaching 40", () => {
        spyOn(playerOneLuck, "Do").andReturn(25);
        spyOn(playerTwoLuck, "Do").andReturn(10);
        spyOn(match, "onWin");

        match.scoreboard.player1Score = 40;
        match.onWin = (p) => { };
        match.PlayRound();

        expect(match.onWin).toHaveBeenCalledWith([player1]);
    });

    xit("should gave a player advantage if both players score is 40", () => {

        spyOn(playerOneLuck, "Do").andReturn(10);
        spyOn(playerTwoLuck, "Do").andReturn(15);

        match.PlayRound();

        
    });

    function SetupFakeLuckDoCall(luck: Luck, maxCalls: number, resultInRange: number, resultOutOfRange: number) {
        var callCount = 0;

        spyOn(luck, "Do").andCallFake(() => {
            if (callCount < maxCalls) {
                callCount++;
                return resultInRange;
            }
            else
                return resultOutOfRange;
        });
    }

    function GetNumberOfCalls(method: any) : number {
        return method.calls.length;
    }
});