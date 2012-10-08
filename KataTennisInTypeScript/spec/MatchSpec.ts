/// <reference path="../lib/jasmine.d.ts" />
/// <reference path="../src/Player.ts" />
/// <reference path="../src/Match.ts" />
/// <reference path="../src/Luck.ts" />

describe("Match", () => {
    var playerOneLuck : Luck;
    var playerTwoLuck : Luck;
    var player1 : Player;
    var player2 : Player;

    beforeEach(() => {
        playerOneLuck = new Luck();
        playerTwoLuck = new Luck();

        player1 = new Player(playerOneLuck);
        player2 = new Player(playerTwoLuck);
    });

    it("should need two Players to create a match", () => {
        var player = new Player(null);
        
        var match = new Match(player, player);

        expect(match.player1).toBe(player);
        expect(match.player2).toBe(player);
    });

    it("should need throw if one of two players are null", () => {
        
        var firstParameterIsNull = () => new Match(null, new Player(null));
        var secondParameterIsNull = () => new Match(new Player(null), null);

        expect(firstParameterIsNull).toThrow("Player1 Is Required");
        expect(secondParameterIsNull).toThrow("Player2 Is Required");
    });
    
    it("should give 15 poins on First move only to the player with greater luck", () => {

        spyOn(playerOneLuck, "Do").andReturn(10);
        spyOn(playerTwoLuck, "Do").andReturn(25);

        var match = new Match(player1, player2);

        match.PlayRound();

        expect(playerOneLuck.Do).toHaveBeenCalled();
        expect(playerTwoLuck.Do).toHaveBeenCalled();

        expect(match.player2Score).toBe(15);
        expect(match.player1Score).toBe(0);
    });

    it("should replay until some players gets greater luck", () => {

        SetupFakeLuckDoCall(playerOneLuck, 10, 15, 10);
        SetupFakeLuckDoCall(playerTwoLuck, 10, 15, 25);

        var match = new Match(player1, player2);

        match.PlayRound();

        expect(GetNumberOfCalls(playerOneLuck.Do)).toEqual(11);
        expect(GetNumberOfCalls(playerTwoLuck.Do)).toEqual(11);

        expect(match.player2Score).toBe(15);
        expect(match.player1Score).toBe(0);
    });

    it("should gave players score in order 15 - 30 - 40", () => {

        spyOn(playerOneLuck, "Do").andReturn(25);
        spyOn(playerTwoLuck, "Do").andReturn(10);

        var match = new Match(player1, player2);
        
        match.PlayRound();
        expect(match.player1Score).toBe(15);
        
        match.PlayRound();
        expect(match.player1Score).toBe(30);

        match.PlayRound();
        expect(match.player1Score).toBe(40);
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